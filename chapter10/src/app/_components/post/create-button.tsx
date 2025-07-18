'use client';

import type { FC } from 'react';

import { useUrlQuery } from '@/libs/url';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import { Suspense } from 'react';

import { Button as CNButton } from '../shadcn/ui/button';
import { cn } from '../shadcn/utils';

export const Button: FC<{ iconBtn?: boolean }> = ({ iconBtn }) => {
    const urlQuery = useUrlQuery();
    return (
        <CNButton
            asChild
            className={cn('tw-ml-auto tw-justify-end', {
                'focus-visible:!tw-ring-0': !iconBtn,
                'tw-rounded-sm': !iconBtn,
            })}
            variant="outline"
            size={iconBtn ? 'icon' : 'default'}
        >
            <Link href={`/posts/create${urlQuery}`}>
                <Plus />
                {!iconBtn && '创建'}
            </Link>
        </CNButton>
    );
};

export const PostCreateButton: FC<{ iconBtn?: boolean }> = ({ iconBtn = false }) => (
    <Suspense>
        <Button iconBtn={iconBtn} />
    </Suspense>
);
