'use client';

import type { PostItem } from '@/server/post/type';
import type { FC } from 'react';

import { AuthProtector } from '@/app/_components/auth/checking';
import { useAuth } from '@/app/_components/auth/hooks';
import { cn } from '@/app/_components/shadcn/utils';
import { isNil } from 'lodash';

import { PostDelete } from './delete';
import { PostEditButton } from './edit-button';

export const Buttons: FC<{ item: PostItem; className?: string }> = ({ item, className }) => {
    const auth = useAuth();
    if (isNil(auth) || auth.id !== item.author.id) return null;
    return (
        <div className={cn('tw-flex tw-items-end tw-space-x-1', className)}>
            <PostEditButton item={item} />
            <PostDelete item={item} />
        </div>
    );
};

export const PostActions: FC<{ item: PostItem; className?: string }> = ({ item, className }) => (
    <AuthProtector>
        <Buttons item={item} className={className} />
    </AuthProtector>
);
