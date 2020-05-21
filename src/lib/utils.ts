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
