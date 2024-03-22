import React from "react";
export function debounce(callback: Function, delay: number, timerRef: React.MutableRefObject<any>) {

    let timeoutId: string | NodeJS.Timeout = timerRef.current;

    return () => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            callback();
        }, delay);
    }
}