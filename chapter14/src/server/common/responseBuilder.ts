import type { z } from 'zod';

import type {
    baseMetaSchema,
    errorItemSchema,
    errorResponseSchema,
    paginatedResponseSchema,
    paginationMetaSchema,
    successResponseSchema,
} from './schema';

// 类型定义
type BaseMetaInput = Partial<z.infer<typeof baseMetaSchema>>;
type ErrorItem = z.infer<typeof errorItemSchema>;
type PaginationData = z.infer<typeof paginationMetaSchema>;

/**
 * 构建成功响应数据
 * @param data 业务数据
 * @param meta 可选的元数据
 * @returns 符合successResponseSchema的响应对象
 */
export const buildSuccessResponse = <T>(
    data: T,
    meta?: BaseMetaInput,
): z.infer<ReturnType<typeof successResponseSchema<z.ZodType<T>>>> => {
    const defaultMeta: z.infer<typeof baseMetaSchema> = {
        timestamp: meta?.timestamp || Date.now(),
        ...(meta??{}),
    };

    return {
        data,
        meta: defaultMeta,
    };
};

/**
 * 构建错误响应数据
 * @param errors 错误信息数组
 * @param meta 可选的元数据
 * @returns 符合errorResponseSchema的响应对象
 */
export const buildErrorResponse = (
    errors: ErrorItem[] | ErrorItem,
    meta?: BaseMetaInput,
): z.infer<typeof errorResponseSchema> => {
    const defaultMeta: z.infer<typeof baseMetaSchema> = {
        timestamp: meta?.timestamp || Date.now(),
        ...(meta??{}),
    };

    return {
        errors: Array.isArray(errors) ? errors : [errors],
        meta: defaultMeta,
    };
};

/**
 * 构建分页响应数据
 * @param data 分页数据数组
 * @param pagination 分页信息
 * @param meta 可选的基础元数据
 * @returns 符合paginatedResponseSchema的响应对象
 */
export const buildPaginatedResponse = <T>(
    data: T[],
    pagination: PaginationData,
    meta?: BaseMetaInput,
): z.infer<ReturnType<typeof paginatedResponseSchema<z.ZodType<T>>>> => {
    const defaultMeta = {
         timestamp: meta?.timestamp || Date.now(),
        ...(meta??{}),
        ...pagination,
    };

    return {
        data,
        meta: defaultMeta,
    };
};

/**
 * 构建验证错误响应（便捷函数）
 * @param fieldErrors 字段错误映射
 * @param meta 可选的元数据
 * @returns 符合errorResponseSchema的响应对象
 */
export const buildValidationErrorResponse = (
    fieldErrors: Record<string, string>,
    meta?: BaseMetaInput,
): z.infer<typeof errorResponseSchema> => {
    const errors: ErrorItem[] = Object.entries(fieldErrors).map(([field, message]) => ({
        code: 'VALIDATION_ERROR',
        message,
        field,
    }));

    return buildErrorResponse(errors, meta);
};
