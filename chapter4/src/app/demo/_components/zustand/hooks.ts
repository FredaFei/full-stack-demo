import { useContext } from 'react';
import { useStore } from 'zustand';
import { useShallow } from 'zustand/shallow';

import type { LayoutState } from './types';

import { LayoutContext } from './constants';

/**
 * 状态选择器
 * @param selector
 */
export function useLayoutContext<T>(selector: (state: LayoutState) => T): T {
    const store = useContext(LayoutContext);
    if (!store) throw new Error('Missing LayoutContext.Provider in the tree');
    return useStore(store, useShallow(selector));
}
