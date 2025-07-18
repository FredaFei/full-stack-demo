import { z } from 'zod';
import { extendZodWithOpenApi } from 'zod-openapi';

import { successResponseSchema } from '../common/schema';

extendZodWithOpenApi(z);

/**
 * 文章详情查询请求数据结构
 */
export const tagItemRequestParamsSchema = z.object({
    id: z.string().openapi({ description: '标签ID' }),
});

/**
 * 单个标签数据结构
 */
export const tagSchema = z
    .object({
        id: z.string().openapi({ description: '标签ID' }),
        text: z.string().openapi({ description: '标签名称' }),
    })
    .openapi({ ref: 'Tag', description: '单个标签信息' });

/**
 * 标签列表查询数据结构
 */
export const tagsSchema = z.array(tagSchema).openapi({ ref: 'Tags', description: '标签列表数据' });

/**
 * 标签列表查询响应的数据结构
 */
export const tagsResponseSchema = successResponseSchema(z.array(tagSchema)).openapi({ ref: 'TagsResponse', description: '获取标签列表的响应' });

/**
 * 标签查询响应的数据结构
 */
export const tagDetailResponseSchema = successResponseSchema(tagSchema).openapi({ ref: 'TagDetail', description: '标签详情数据' });
