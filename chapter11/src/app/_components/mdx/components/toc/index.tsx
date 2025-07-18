import { Button } from '@/app/_components/shadcn/ui/button';
import { cn } from '@/app/_components/shadcn/utils';
import BookNumber24Filled from '@ricons/fluent/BookNumber24Filled';
import { isNil } from 'lodash';
import { NotepadText, X } from 'lucide-react';
import { type FC, useCallback, useState } from 'react';

import type { MdxHydrateProps } from '../../types';

import { TocList } from './list';
import $styles from './style.module.css';

/**
 * 桌面设备下的目录组件
 * @param props
 */
const DesktopToc: FC<{ serialized: MdxHydrateProps['serialized'] }> = (props) => {
    const { serialized } = props;
    if (isNil(serialized.scope?.toc) || serialized.scope?.toc.length < 1) return null;
    return (
        <div className={$styles.desktopToc}>
            <TocList toc={serialized.scope.toc} />
        </div>
    );
};

/**
 * 移动或平板设备下的目录组件
 * @param props
 */
const MobileToc: FC<{ serialized: MdxHydrateProps['serialized'] }> = (props) => {
    const [collapsed, setCollapsed] = useState(true);
    const toggleCollapsed = useCallback(() => setCollapsed((prev) => !prev), []);
    const close = useCallback(() => setCollapsed(true), []);
    return (
        <div
            className={cn($styles.mobileToc, {
                [$styles['mobileToc-collapsed']]: collapsed,
                [$styles['mobileToc-expanded']]: !collapsed,
            })}
        >
            <Button
                variant="outline"
                size="icon"
                className={cn('tw-btn-icon-transparent', $styles.mobileTocButton)}
                onClick={toggleCollapsed}
            >
                <span className="xicon tw-text-2xl">
                    <BookNumber24Filled />
                </span>
            </Button>
            <div className={$styles.mobileTocMain}>
                <div className={$styles.mobileTocTitle}>
                    <div className="tw-flex tw-items-center">
                        <NotepadText className="tw-mr-1" />
                        目录
                    </div>
                    <div className="tw-block tw-items-center">
                        <Button
                            variant="outline"
                            size="icon"
                            className={cn('tw-btn-icon-transparent')}
                            onClick={close}
                        >
                            <X />
                        </Button>
                    </div>
                </div>
                <div className={cn($styles.mobileTocContent, 'tw-transparent-scrollbar')}>
                    <DesktopToc {...props} />
                </div>
            </div>
        </div>
    );
};

export const Toc: FC<{ serialized: MdxHydrateProps['serialized']; isMobile: boolean }> = (
    props,
) => {
    const { isMobile, serialized } = props;
    return isMobile ? (
        <MobileToc serialized={serialized} />
    ) : (
        <DesktopToc serialized={serialized} />
    );
};
