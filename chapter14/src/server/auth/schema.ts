import { z } from 'zod';
import { extendZodWithOpenApi } from 'zod-openapi';

import { successResponseSchema } from '../common/schema';

extendZodWithOpenApi(z);

/**
 * 登录请求数据结构
 */
export const authLoginRequestBodySchema = z.object({
    credential: z.string().min(1, '用户名或邮箱不能为空').openapi({ description: '用户名或邮箱' }),
    password: z.string().min(8, '密码至少8位').openapi({ description: '用户密码' }),
});
/**
 * token数据结构
 */
export const tokenSchema = z
    .object({
        token: z.string().openapi({ ref: 'Token', description: 'jwt token' })
    })
    .openapi({ description: 'token信息' });
/**
 * 用户数据结构
 */
export const authSchema = z
    .object({
        id: z.string().openapi({ description: '用户id' }),
        username: z.string().openapi({ description: '用户名' }),
        email: z.string().email().openapi({ description: '用户邮箱' }),
        createdAt: z.string(),
        updatedAt: z.string(),
    })
    .openapi({ ref: 'Auth', description: '用户信息' });

/**
 * 获取用户信息响应数据结构
 */
export const profileResponseSchema = successResponseSchema(authSchema.or(z.null())).openapi({ ref: 'AuthProfile', description: '获取用户信息响应数据' });

/**
 * 登录响应数据结构
 */
export const tokenResponseSchema = successResponseSchema(tokenSchema).openapi({ ref: 'AuthToken', description: '用户登录/获取token响应数据' });

/**
 * 登出响应数据结构
 */
export const logoutResponseSchema = successResponseSchema(z.object({ message: z.string() }).openapi({ description: '登出成功消息' }))
.openapi({ ref: 'AuthLogout', description: '登出响应数据' });
