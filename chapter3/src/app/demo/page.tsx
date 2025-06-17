import type { FC } from 'react';

import ContextDemo from './_components/context';
import CustomDemo from './_components/custom';
import ReducerDemo from './_components/reducer';
import $styles from './page.module.css';

const DemoPage: FC = () => (
    <div className={$styles.demo}>
        <ContextDemo />
        <ReducerDemo />
        <CustomDemo />
    </div>
);

export default DemoPage;
