import type { FC } from 'react';

import { Button } from 'antd';

import $styles from './page.module.css';

const DemoPage: FC = () => (
    <div className={$styles.demo}>
        <div className={$styles.container}>
            <h2 className="tw-text-center">First React App</h2>
            <div className="tw-flex tw-flex-col tw-items-center">
                <div className="tw-my-5 tw-flex-auto">
                    <Button type="dashed" href="https://3rcd.com" target="_blank">
                        3R教室
                    </Button>
                </div>
            </div>
        </div>
    </div>
);

export default DemoPage;
