import type { FC } from 'react';

import { ArrowBigRight } from 'lucide-react';
import Link from 'next/link';

import { Button } from '../_components/shadcn/ui/button';
import $styles from './page.module.css';

const HomePage: FC = async () => {
    return (
        <div className="tw-page-container">
            <div className={$styles.block}>
                <span>欢迎来到3R教室，这是Nextjs课程的开始</span>
                <Button asChild>
                    <Link href="https://3rcd.com" target="_blank">
                        <ArrowBigRight /> 查看官网
                    </Link>
                </Button>
            </div>
        </div>
    );
};

export default HomePage;
