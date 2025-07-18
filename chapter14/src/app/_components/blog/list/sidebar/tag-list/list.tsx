import type { TagList } from '@/server/tag/type';
import type { FC } from 'react';

import { cn } from '@/app/_components/shadcn/utils';

import { TagLink } from '../../../form/tag';
import $styles from './list.module.css';
export const TagListComponent: FC<{ items: TagList; actived?: string }> = ({
    items,
    actived,
}) => {
    return (
        <div className={$styles.container}>
            {items.map((tagItem) => (
                <TagLink
                    key={tagItem.id}
                    tag={tagItem}
                    className={cn({
                        [$styles.tagActived]: actived === tagItem.id,
                    })}
                />
            ))}
        </div>
    );
};
