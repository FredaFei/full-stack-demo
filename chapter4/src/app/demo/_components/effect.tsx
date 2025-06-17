'use client';

import { Button } from 'antd';
import { type FC, useEffect, useState } from 'react';

import $styles from './style.module.css';

const EffectDemo: FC = () => {
    const [ghost, setGhost] = useState<boolean>(false);
    const [width, setWidth] = useState(0);
    const toggleGhostBtn = () => setGhost(!ghost);
    const resizeHandle = () => setWidth(window.innerWidth);
    const [red, setRed] = useState<boolean>(false);
    useEffect(() => {
        if (typeof window !== 'undefined') {
            setWidth(window.innerWidth);
            console.log('浏览器宽度改变');
            window.addEventListener('resize', resizeHandle);
        }
        return () => {
            window.removeEventListener('resize', resizeHandle);
        };
    }, [width]);
    useEffect(() => {
        (async () => {
            await new Promise((resolve) => {
                setTimeout(() => resolve(true), 1000);
            });
            setRed(ghost);
        })();
    }, [ghost]);
    useEffect(() => {
        console.log('只在第一次或重新渲染组件时触发');
    }, []);
    return (
        <div className={$styles.container}>
            <h2 className="tw-text-center">useEffect Demo</h2>
            <p className="tw-py-5 tw-text-center">{ghost ? 'ghost' : '普通'}按钮</p>
            <div className="tw-flex tw-flex-col tw-justify-center">
                <Button type="primary" onClick={toggleGhostBtn} ghost={ghost} danger={red}>
                    切换按钮样式
                </Button>
                <p className="tw-pt-5 tw-text-center">宽度为: {width}</p>
            </div>
        </div>
    );
};
export default EffectDemo;
