import type { Metadata } from 'next';
import type { FC, PropsWithChildren, ReactNode } from 'react';

import { Auth } from '../_components/auth/provider';
import './global.css';
import { Header } from '../_components/header';
import { Toaster } from '../_components/shadcn/ui/toaster';
import Theme from '../_components/theme';
import $styles from './layout.module.css';
export const metadata: Metadata = {
    title: 'pincman的博客',
    description:
        'pincman的个人博客,提供一些ts、react、node.js、php、golang相关的技术文档以及分享一些生活琐事',
};

const AppLayout: FC<PropsWithChildren<{ modal: ReactNode }>> = ({ children, modal }) => (
    <Auth>
        <Theme>
            <div className={$styles.layout}>
                <Header />
                {children}
            </div>
            {modal}
            <Toaster />
        </Theme>
    </Auth>
);
export default AppLayout;
