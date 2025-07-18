'use server';

import db from '@/libs/db/client';
/**
 * 查询标签信息
 * @param id
 */
export const queryTagItem = async (id: string) => {
    return await db.tag.findFirst({
        where: { OR: [{ text: decodeURIComponent(id) }, { id }] },
    });
};

/**
 * 查询标签列表信息
 */
export const queryTagList = async () => {
    return await db.tag.findMany();
};
