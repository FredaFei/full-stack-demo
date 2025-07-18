'use server';
import type { Compatible } from 'vfile';

import { deepMerge } from '@/libs/utils';
import { serialize } from 'next-mdx-remote-client/serialize';

import type { MdxSerializeOptions } from './types';

import { defaultMdxSerializeOptions } from './options/serialize';

export const serializeMdx = async (source: Compatible, options: MdxSerializeOptions = {}) => {
    const result = await serialize({
        source,
        ...deepMerge(defaultMdxSerializeOptions, options, 'merge'),
    });
    return result;
};
