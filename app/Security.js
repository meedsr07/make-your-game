export function throttle(fn, delay) {
    let lastTime = 0;

    return function (...args) {
        const now = performance.now();

        if (now - lastTime >= delay) {
            lastTime = now;
            fn.apply(this, args);
        }
    };
}

export function debounce(fn, delay = 300) {
    let timer;

    return function (...args) {
        clearTimeout(timer);

        timer = setTimeout(() => {
            fn.apply(this, args);
        }, delay);
    };
}