export const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms))

export const debounce = <T, R>(fn: (...args: T[]) => R, t = 250) => {
    let timeout: number
    let resolveFn: (result: R) => void
    const promise: Promise<R> = new Promise((resolve) => {
        resolveFn = resolve
    })

    return function debouncedFn(...args: T[]): Promise<R> {
        const functionCall = () => resolveFn(fn(...args))

        clearTimeout(timeout)
        timeout = setTimeout(functionCall, t)
        return promise
    }
}

export const isElementContainedByOther = (
    container: Node,
    element?: HTMLElement,
): boolean => {
    if (!element) {
        return false
    }
    if (element === container) {
        return true
    }

    return isElementContainedByOther(
        container,
        element.parentElement || undefined,
    )
}

export const isElementContainedByElementType = (
    types: string[],
    element?: HTMLElement,
): boolean => {
    if (!element) {
        return false
    }
    if (types.includes(element.tagName.toLowerCase())) {
        return true
    }

    return isElementContainedByElementType(
        types,
        element.parentElement || undefined,
    )
}

export const clamp = (min: number, max: number, real: number) => {
    return Math.min(max, Math.max(min, real))
}
