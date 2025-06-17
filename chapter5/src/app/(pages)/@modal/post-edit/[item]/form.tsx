import type { FC } from 'react';

import { PostActionForm } from '@/app/_components/post/action-form';
import { queryPostItemById } from '@/app/actions/post';
import { isNil } from 'lodash';
import { notFound } from 'next/navigation';

export const PostEditForm: FC<{ id: string }> = async ({ id }) => {
    const post = await queryPostItemById(id);
    if (isNil(post)) return notFound();
    return <PostActionForm type="update" item={post} />;
};
