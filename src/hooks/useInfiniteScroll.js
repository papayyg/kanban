import { useState, useCallback } from 'react';

const SCROLL_THRESHOLD = 10;
const LOAD_DELAY = 100;

export const useInfiniteScroll = (onLoadMore) => {
    const [isLoadingMore, setIsLoadingMore] = useState(false);

    const onDataLoaded = useCallback(() => {
        setIsLoadingMore(false);
    }, []);

    const handleScroll = useCallback((e) => {
        const target = e.target;
        const isAtBottom = target.scrollTop + target.clientHeight >= target.scrollHeight - SCROLL_THRESHOLD;

        if (isAtBottom && !isLoadingMore) {
            setIsLoadingMore(true);
            setTimeout(() => {
                onLoadMore();
            }, LOAD_DELAY);
        }
    }, [isLoadingMore, onLoadMore]);

    return { isLoadingMore, handleScroll, onDataLoaded };
};