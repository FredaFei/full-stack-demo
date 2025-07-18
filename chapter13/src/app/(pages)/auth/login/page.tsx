import type { Metadata, ResolvingMetadata } from 'next';
import type { FC } from 'react';

import { AuthLoginForm } from '@/app/_components/auth/login-form';
import { cn } from '@/app/_components/shadcn/utils';

import $styles from './style.module.css';

export const generateMetadata = async (_: any, parent: ResolvingMetadata): Promise<Metadata> => {
    return {
        title: `用户登录 - ${(await parent).title?.absolute}`,
        description: '用户登录页面',
    };
};

const AuthLoginPage: FC = async () => {
    return (
        <div className="tw-page-item">
            <div
                className={cn($styles.item, 'tw-page-container tw-page-block')}
                style={{ flex: 'none' }}
            >
                <div className="tw-text-center tw-text-xl tw-font-bold">用户登录</div>
                <AuthLoginForm />
            </div>
        </div>
    );
};
export default AuthLoginPage;
