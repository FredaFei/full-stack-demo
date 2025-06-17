import { zValidator } from '@hono/zod-validator';
import { validator } from 'hono/validator';
import { isNil } from 'lodash';

import { createErrorResult, createHonoApp, defaultValidatorErrorHandler } from '../common/utils';
import {
    getPostItemRequestSchema,
    postDetailByIdRequestParamsSchema,
    postDetailBySlugRequestParamsSchema,
    postDetailRequestParamsSchema,
    postPageNumbersRequestQuerySchema,
    postPaginateRequestQuerySchema,
} from './schema';
import {
    createPostItem,
    deletePostItem,
    isSlugUnique,
    queryPostItem,
    queryPostItemById,
    queryPostItemBySlug,
    queryPostPaginate,
    queryPostTotalPages,
    updatePostItem,
} from './service';

const app = createHonoApp();
export const postApi = app
    .get(
        '/',
        zValidator('query', postPaginateRequestQuerySchema, defaultValidatorErrorHandler),
        async (c) => {
            try {
                const query = c.req.valid('query');
                const options = Object.fromEntries(
                    Object.entries(query).map(([k, v]) => [k, Number(v)]),
                );
                const result = await queryPostPaginate(options);
                return c.json(result, 200);
            } catch (error) {
                return c.json(createErrorResult('查询文章分页数据失败', error), 500);
            }
        },
    )
    .get(
        '/page-numbers',
        zValidator('query', postPageNumbersRequestQuerySchema, defaultValidatorErrorHandler),
        async (c) => {
            try {
                const query = c.req.valid('query');
                const limit = query.limit ? Number(query.limit) : undefined;
                const result = await queryPostTotalPages(limit);
                return c.json({ result }, 200);
            } catch (error) {
                return c.json(createErrorResult('查询页面总数失败', error), 500);
            }
        },
    )
    .get(
        '/:item',
        zValidator('param', postDetailRequestParamsSchema, defaultValidatorErrorHandler),
        async (c) => {
            try {
                const { item } = c.req.valid('param');
                const result = await queryPostItem(item);
                if (!isNil(result)) return c.json(result, 200);
                return c.json(createErrorResult('文章不存在'), 404);
            } catch (error) {
                return c.json(createErrorResult('查询文章失败', error), 500);
            }
        },
    )
    .get(
        '/byid/:id',
        zValidator('param', postDetailByIdRequestParamsSchema, defaultValidatorErrorHandler),
        async (c) => {
            try {
                const { id } = c.req.valid('param');
                const result = await queryPostItemById(id);
                if (!isNil(result)) return c.json(result, 200);
                return c.json(createErrorResult('文章不存在'), 404);
            } catch (error) {
                return c.json(createErrorResult('查询文章失败', error), 500);
            }
        },
    )
    .get(
        '/byslug/:slug',
        zValidator('param', postDetailBySlugRequestParamsSchema, defaultValidatorErrorHandler),
        async (c) => {
            try {
                const { slug } = c.req.valid('param');
                const result = await queryPostItemBySlug(slug);
                return c.json(result, 200);
            } catch (error) {
                return c.json(createErrorResult('查询文章失败', error), 500);
            }
        },
    )
    .post(
        '/',
        validator('json', async (value, c) => {
            const schema = getPostItemRequestSchema(await isSlugUnique());
            const parsed = await schema.safeParseAsync(value);
            if (!parsed.success) {
                return c.json(createErrorResult('数据验证失败'), 400);
            }
            return parsed.data;
        }),
        async (c) => {
            try {
                const body = c.req.valid('json');
                const result = await createPostItem(body);
                return c.json(result, 201);
            } catch (error) {
                return c.json(createErrorResult('创建文章失败', error), 500);
            }
        },
    )
    .patch(
        '/:id',
        zValidator('param', postDetailByIdRequestParamsSchema, defaultValidatorErrorHandler),
        validator('json', async (value, c) => {
            const params = c.req.param();
            const schema = getPostItemRequestSchema(await isSlugUnique(params.id));
            const parsed = await schema.safeParseAsync(value);
            if (!parsed.success) {
                return c.json(createErrorResult('数据验证失败'), 400);
            }
            return parsed.data;
        }),
        async (c) => {
            try {
                const params = c.req.valid('param');
                const body = c.req.valid('json');
                const result = await updatePostItem(params.id, body);
                return c.json(result, 200);
            } catch (error) {
                return c.json(createErrorResult('更新文章失败', error), 500);
            }
        },
    )
    .delete(
        '/:id',
        zValidator('param', postDetailByIdRequestParamsSchema, defaultValidatorErrorHandler),
        async (c) => {
            try {
                const { id } = c.req.valid('param');
                const result = await deletePostItem(id);
                return c.json(result, 200);
            } catch (error) {
                return c.json(createErrorResult('删除文章失败', error), 500);
            }
        },
    );
