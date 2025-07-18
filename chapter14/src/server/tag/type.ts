import type { z } from 'zod';

import type { tagItemRequestParamsSchema, tagsSchema, tagSchema, tagsResponseSchema, tagDetailResponseSchema } from './schema';
/**
 * 标签查询请求参数类型
 */
export type TagItemRequestParams = z.infer<typeof tagItemRequestParamsSchema>;
/**
 * 标签详情数据类型
 */
export type TagItem = z.infer<typeof tagSchema>;
/**
 * 标签列表数据类型
 */
export type TagList = z.infer<typeof tagsSchema>;

/**
 * 请求标签列表的响应数据类型（与API文档一致）
 * todo 包含分页信息和元数据
 * */ 
export type TagListResponse = z.infer<typeof tagsResponseSchema>;

/**
 * 请求标签详情的响应数据类型 （与API文档一致）
 * */ 
export type TagDetailResponse = z.infer<typeof tagDetailResponseSchema>;
