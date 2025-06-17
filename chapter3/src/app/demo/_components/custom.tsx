'use client';
import { Button } from 'antd';
import clsx from 'clsx';
import { type FC, useState } from 'react';

import { useUpdateEffect } from './hooks';
import $styles from './style.module.css';

const CustomDemo: FC = () => {
    const [count, setCount] = useState(0);
    useUpdateEffect(() => {
        console.log('changed');
    }, [count]);
    return (
        <div className={clsx($styles.container, 'tw-w-80')}>
            <h2 className="tw-text-center">Custom Demo</h2>
            <p className="tw-py-5 tw-text-center">{count}</p>
            <div className="tw-flex tw-justify-around">
                <Button onClick={() => setCount(Math.ceil(Math.random() * 10))} type="dashed">
                    变化
                </Button>
            </div>
        </div>
    );
};
export default CustomDemo;
