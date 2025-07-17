import type { DurationUnitsObjectType } from 'dayjs/plugin/duration';
import type { z } from 'zod';

import type { authLoginRequestBodySchema, authSchema } from './schema';

/**
 * Auth配置
 */
export interface AuthConfig {
    /**
     * jwt令牌加密秘钥
     */
    jwtSecret: string;
    /**
     * 令牌过期时间,如果是number格式则默认为毫秒
     */
    tokenExpiry: DurationUnitsObjectType | number;
}

export type AuthLoginRequest = z.infer<typeof authLoginRequestBodySchema>;
export type AuthlocalLoginResult =
    | { code: 200; token: string }
    | { code: 401 | 500; message: string; businessCode: string };
export type AuthItem = z.infer<typeof authSchema>;
