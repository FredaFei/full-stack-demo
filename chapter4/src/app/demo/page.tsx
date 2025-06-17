import type { FC } from 'react';

import ThemeDemo from '../_components/theme/demo';
import $styles from './page.module.css';

const DemoPage: FC = () => (
    <div className={$styles.demo}>
        <ThemeDemo />
    </div>
);

export default DemoPage;
