import type { Context } from 'hono';

import { isNil } from 'lodash';

/**
 * 异常响应生成
 * @param title
 * @param error
 * @param code
 */
export const createErrorResult = (
    title: string,
    error?: any,
    code?: string,
): { code: string; message: string } => {
    let message = title;
    if (!isNil(error)) {
        message =
            error instanceof Error ||
            (typeof error === 'object' && error !== null && 'message' in error)
                ? `${title}:${error.message}`
                : `${title}:${error.toString()}`;
    }

    return {
        code: code ?? '',
        message,
    };
};

/**
 * 请求数据验证失败的默认响应
 * @param result
 * @param c
 */
export const defaultValidatorErrorHandler = (result: any, c: Context) => {
    if (!result.success) {
        return c.json(
            {
                ...createErrorResult('请求数据验证失败', 400),
                errors: result.error.format(),
            },
            400,
        );
    }
    return result;
};
