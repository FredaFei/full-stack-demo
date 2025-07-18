'use client';

import { cn } from '@/app/_components/shadcn/utils';
import { useCallback, useEffect, useRef } from 'react';

const morphTime = 1.5;
const cooldownTime = 0.5;

const useMorphingText = (texts: string[]) => {
    const textIndexRef = useRef(0);
    const morphRef = useRef(0);
    const cooldownRef = useRef(0);
    const timeRef = useRef(new Date());

    const text1Ref = useRef<HTMLSpanElement>(null);
    const text2Ref = useRef<HTMLSpanElement>(null);

    const setStyles = useCallback(
        (fraction: number) => {
            const [current1, current2] = [text1Ref.current, text2Ref.current];
            if (!current1 || !current2) return;

            current2.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
            current2.style.opacity = `${fraction ** 0.4 * 100}%`;

            const invertedFraction = 1 - fraction;
            current1.style.filter = `blur(${Math.min(8 / invertedFraction - 8, 100)}px)`;
            current1.style.opacity = `${invertedFraction ** 0.4 * 100}%`;

            current1.textContent = texts[textIndexRef.current % texts.length];
            current2.textContent = texts[(textIndexRef.current + 1) % texts.length];
        },
        [texts],
    );

    const doMorph = useCallback(() => {
        morphRef.current -= cooldownRef.current;
        cooldownRef.current = 0;

        let fraction = morphRef.current / morphTime;

        if (fraction > 1) {
            cooldownRef.current = cooldownTime;
            fraction = 1;
        }

        setStyles(fraction);

        if (fraction === 1) {
            textIndexRef.current++;
        }
    }, [setStyles]);

    const doCooldown = useCallback(() => {
        morphRef.current = 0;
        const [current1, current2] = [text1Ref.current, text2Ref.current];
        if (current1 && current2) {
            current2.style.filter = 'none';
            current2.style.opacity = '100%';
            current1.style.filter = 'none';
            current1.style.opacity = '0%';
        }
    }, []);

    useEffect(() => {
        let animationFrameId: number;

        const animate = () => {
            animationFrameId = requestAnimationFrame(animate);

            const newTime = new Date();
            const dt = (newTime.getTime() - timeRef.current.getTime()) / 1000;
            timeRef.current = newTime;

            cooldownRef.current -= dt;

            if (cooldownRef.current <= 0) doMorph();
            else doCooldown();
        };

        animate();
        return () => {
            cancelAnimationFrame(animationFrameId);
        };
    }, [doMorph, doCooldown]);

    return { text1Ref, text2Ref };
};

interface MorphingTextProps {
    className?: string;
    texts: string[];
}

const Texts: React.FC<Pick<MorphingTextProps, 'texts'>> = ({ texts }) => {
    const { text1Ref, text2Ref } = useMorphingText(texts);
    return (
        <>
            <span
                className="tw-absolute tw-inset-x-0 tw-top-0 tw-m-auto tw-inline-block tw-w-full"
                ref={text1Ref}
            />
            <span
                className="tw-absolute tw-inset-x-0 tw-top-0 tw-m-auto tw-inline-block tw-w-full"
                ref={text2Ref}
            />
        </>
    );
};

const SvgFilters: React.FC = () => (
    <svg id="filters" className="tw-fixed tw-h-0 tw-w-0" preserveAspectRatio="xMidYMid slice">
        <defs>
            <filter id="threshold">
                <feColorMatrix
                    in="SourceGraphic"
                    type="matrix"
                    values="1 0 0 0 0
                  0 1 0 0 0
                  0 0 1 0 0
                  0 0 0 255 -140"
                />
            </filter>
        </defs>
    </svg>
);

export const MorphingText: React.FC<MorphingTextProps> = ({ texts, className }) => (
    <div
        className={cn(
            'tw-relative tw-mx-auto tw-h-16 tw-w-full tw-max-w-screen-md tw-text-center tw-font-sans tw-text-[40pt] tw-font-bold tw-leading-none [filter:tw-url(#threshold)_blur(0.6px)] md:tw-h-24 lg:tw-text-[6rem]',
            className,
        )}
    >
        <Texts texts={texts} />
        <SvgFilters />
    </div>
);
