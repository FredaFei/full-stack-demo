import { z } from 'zod';
import { extendZodWithOpenApi } from 'zod-openapi';

extendZodWithOpenApi(z);

// 通用元数据Schema
export const baseMetaSchema = z
    .object({
        timestamp: z.number().default(() => Date.now()).openapi({ description: '时间戳' }),
        /**
     * 生成规则：
        使用 UUID 或纳秒时间戳作为 requestId（如 uuidv4()）
        格式建议：[服务名]-[时间戳]-[随机数]（如 api-1690000000-4f8a1d7b）
    * 传递方式：
        HTTP 请求头：X-Request-Id
        上下文对象：在服务间传递时放入请求上下文
    */
        requestId: z.string().optional().openapi({ description: '请求id' }),
        version: z.string().optional().openapi({ description: '版本号' }),
    })
    .strict();

// 元数据Schema - 分页信息
export const paginationMetaSchema = z
    .object({
        page: z.number().min(1).openapi({ description: '当前页码' }),
        limit: z.number().openapi({ description: '每页数量' }),
        count: z.number().min(0).openapi({ description: '总记录数(符合查询条件的所有记录的总数，未分页前的数量)' }),
        totalPages: z.number().min(0).openapi({ description: '总页数（根据count和limit计算）' }),
    })
    .strict();

// 分页响应Schema
export const paginatedResponseSchema = <T extends z.ZodTypeAny>(itemSchema: T) =>
    z.object({
        data: z.array(itemSchema).openapi({ description: '数据列表' }),
        meta: baseMetaSchema.merge(paginationMetaSchema).openapi({ description: '分页信息和元数据' }),
    })
    .strict();

// 成功响应Schema
export const successResponseSchema = <T extends z.ZodTypeAny, M extends z.ZodTypeAny = typeof baseMetaSchema,>(dataSchema: T, metaSchema?: M,) =>
    z.object({
        data: dataSchema,
        meta: (metaSchema || baseMetaSchema).optional(),
    })
    .strict();

// 错误信息Schema
export const errorItemSchema = z
    .object({
        code: z.string().openapi({ description: '业务code' }),
        message: z.string().openapi({ description: '错误信息' }),
        field: z.string().optional().openapi({ description: '存在错误的字段' }),
        detail: z.string().optional().openapi({ description: '错误详情' }),
    })
    .strict();

// 错误响应Schema
export const errorResponseSchema = z
    .object({
        errors: z.array(errorItemSchema).openapi({ description: '所有发生的错误' }),
        meta: baseMetaSchema.optional().openapi({ description: '元数据' }),
    })
    .strict();

// {
//   "data": { ... },       // 业务数据（必选）
//   "meta": { ... },       // 元数据（可选，如分页信息）
//   "errors": [    // 错误信息（仅错误时存在）
//     {
//       "code": "INVALID_PARAMETER",     // 业务逻辑层的错误分类
//       "message": "参数格式不正确",       // 人类可读的错误信息
//       "field"?: "email",                // 发生错误的字段（可选）
//       "detail"?: "必须是有效的邮箱格式"  // 详细描述（可选）
//     }
//   ]
// }
