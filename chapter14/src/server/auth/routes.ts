import { describeRoute } from 'hono-openapi';
import { validator } from 'hono-openapi/zod';
import { isNil } from 'lodash';

import type { AuthItem } from './type';

import { createHonoApp } from '../common/app';
import { createErrorResult, defaultValidatorErrorHandler } from '../common/error';
import { AuthProtected } from '../common/middlwares';
import {
    createServerErrorResponse,
    createSuccessResponse,
    createUnauthorizedErrorResponse,
    createValidatorErrorResponse,
} from '../common/response';
import { buildErrorResponse, buildSuccessResponse } from '../common/responseBuilder';
import { authLoginRequestBodySchema, logoutResponseSchema, profileResponseSchema, tokenResponseSchema } from './schema';
import { getUser } from './service';
import { addTokenToBlacklist, authLogin, verifyJWT } from './utils';

const app = createHonoApp();

export const authTags = ['认证操作'];

export const authPath = '/auth';

export type AuthApiType = typeof authRoutes;

export const authRoutes = app
    .get(
        '/profile',
        describeRoute({
            tags: authTags,
            summary: '获取用户信息',
            description: '无论是否登录，都会返回状态码 200，如果未登录则用户信息返回null',
            responses: {
                // 创建可为空的成功响应
                ...createSuccessResponse(profileResponseSchema.nullable()),
                ...createServerErrorResponse(),
            },
        }),
        async (c) => {
            try {
                const isAuthenticated = await verifyJWT(c);
                if (!isAuthenticated) return c.json(buildSuccessResponse(null), 200);
                const { id } = (c.req as any).user as AuthItem;
                const user = await getUser(id);
                if (isNil(user)) return c.json(buildSuccessResponse(null), 200);
                return c.json(buildSuccessResponse(user), 200);
            } catch (error) {
                const info = createErrorResult('获取用户失败', error, 'INVALID_USER');
                return c.json(buildErrorResponse(info), 500);
            }
        },
    )
    .post(
        '/login',
        describeRoute({
            tags: authTags,
            summary: '用户登录',
            description: '用户登录',
            responses: {
                ...createValidatorErrorResponse(),
                ...createSuccessResponse(tokenResponseSchema),
                ...createUnauthorizedErrorResponse('认证失败'),
                ...createServerErrorResponse(),
            },
        }),
        validator('json', authLoginRequestBodySchema, defaultValidatorErrorHandler),
        async (c) => {
            const body = await c.req.json();
            // 手动构建认证请求
            const authReq = {
                ...c.req.raw,
                body,
            };
            const result = await authLogin(authReq, (c.res as any).raw);
            console.log('result.code', result, result.code);
            switch (result.code) {
                case 200:
                    return c.json(buildSuccessResponse({ token: result.token }), 200);
                default:
                    return c.json(
                        buildErrorResponse({ message: result.message, code: result.businessCode }),
                        result.code,
                    );
            }
        },
    )
    .post(
        '/logout',
        describeRoute({
            tags: authTags,
            summary: '用户登出',
            description: '用户登出',
            responses: {
                ...createUnauthorizedErrorResponse(),
                ...createSuccessResponse(logoutResponseSchema),
                ...createServerErrorResponse(),
            },
        }),
        AuthProtected,
        async (c) => {
            try {
                const token = (c.req as any).token;
                const success = await addTokenToBlacklist(token);
                // 注意：这里直接返回200就行了。因为反正你是退出成功还是token失效，前端都是跳转到登录页，没有什么区别
                if (!success)
                    return c.json(buildErrorResponse(createErrorResult('用户未登录')), 200);
                return c.json(buildSuccessResponse({ message: '登出成功' }), 200);
            } catch (error) {
                return c.json(
                    buildErrorResponse(createErrorResult('登出失败', error, 'SERVER_ERROR')),
                    500,
                );
            }
        },
    );
