'use client';

import type { FC } from 'react';

import { cn } from '@/app/_components/shadcn/utils';
import { useScroll } from '@/libs/broswer';

import { HeaderLogo } from './logo';
import { HeaderNav } from './nav';
import $styles from './styles.module.css';
import { HeaderTools } from './tools';

export const Header: FC = () => {
    const scrolled = useScroll(50);

    return (
        <header
            className={cn($styles.header, 'tw-page-container', {
                [$styles['header-scrolled']]: scrolled,
                [$styles['header-unscrolled']]: !scrolled,
            })}
        >
            <div className={cn($styles.container)}>
                <HeaderLogo />
                <HeaderNav />
                <HeaderTools />
            </div>
        </header>
    );
};
