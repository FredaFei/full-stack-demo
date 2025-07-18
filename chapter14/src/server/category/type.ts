import type { z } from 'zod';

import type {
    categoryBreadcrumbRequestParamsSchema,
    categoryListRequestParamsSchema,
    categoryListResponseSchema,
    categoryListSchema,
    categorySchema,
    categoryTreeResponseSchema,
    categoryTreeSchema,
} from './schema';

/**
 * 分类树查询请求参数类型
 */
export type categoryListRequestParams = z.infer<typeof categoryListRequestParamsSchema>;
/**
 * 分类面包屑查询请求参数类型
 */
export type CategoryBreadcrumbRequestParams = z.infer<typeof categoryBreadcrumbRequestParamsSchema>;
/**
 * 分类查询响应数据类型
 */
export type CategoryItem = z.infer<typeof categorySchema>;
/**
 * 分类列表查询响应数据类型
 */
export type CategoryList = z.infer<typeof categoryListSchema>;

/**
 * 分类树查询响应数据类型
 */
export type CategoryTree = z.infer<typeof categoryTreeSchema>;

/**
 * 请求分类列表的响应数据类型（与API文档一致）
 * todo 包含分页信息和元数据
 * */ 
export type CategoryListResponse = z.infer<typeof categoryListResponseSchema>;

/**
 * 请求分类树的响应数据类型 （与API文档一致）
 * */ 
export type CategoryTreeResponse = z.infer<typeof categoryTreeResponseSchema>;
