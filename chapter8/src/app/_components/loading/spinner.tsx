import type { CSSProperties, FC } from 'react';

import { cn } from '@/app/_components/shadcn/utils';

import classes from './spinner.module.css';

export const Spinner: FC<{ className?: string; style?: CSSProperties }> = ({
    className,
    style,
}) => {
    const defaultClassName = cn([
        'tw-h-full',
        'tw-w-full',
        'tw-flex',
        'tw-items-center',
        'tw-justify-center',
    ]);
    const wrapperClasses = className ? `${defaultClassName} ${className}` : defaultClassName;
    return (
        <div className={wrapperClasses} style={style ?? {}}>
            <div className={classes.container} />;
        </div>
    );
};
