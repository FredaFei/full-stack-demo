import type { Metadata, ResolvingMetadata } from 'next';

import { postApi } from '@/api/post';
import { isNil } from 'lodash';

export interface IPostMetadata {
    params: Promise<{ item: string }>;
    parent: ResolvingMetadata;
}

export const getPostItemMetadata = async ({ params, parent }: IPostMetadata): Promise<Metadata> => {
    const { item } = await params;
    const result = await postApi.detail(item);
    if (!result.ok) return {};
    const post = await result.json();
    const title = `${post.title} - ${(await parent).title?.absolute}`;
    const keywords = post.keywords ?? '';
    const description =
        isNil(post.description) || post.description.length === 0 ? post.summary : post.description;

    return {
        title,
        keywords,
        description,
    };
};
