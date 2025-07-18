import type { z } from 'zod';
import { errorResponseSchema } from './schema';

/**
 * 请求错误的响应数据类型
 */
export type ErrorResponse = z.infer<typeof errorResponseSchema>;
