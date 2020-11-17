export const extend = <T extends object, U extends object>(
    a: T,
    b: U
): T & U => {
    for (const key in b) {
        ;(a as any)[key] = b[key]
    }
    return a as any
}

export function* getSequence() {
    let i = 0
    while (true) {
        yield (i = i + 1)
    }
}

let sequence = getSequence()

export function getId(name: string): string {
    return `${name}.${new Date().getTime()}.${Math.floor(
        Math.random() * 10000
    )}.${sequence.next().value}`
}

export const isArray = Array.isArray
export const isFunction = (val: unknown): val is Function =>
    typeof val === 'function'
export const isString = (val: unknown): val is string => typeof val === 'string'
export const isSymbol = (val: unknown): val is symbol => typeof val === 'symbol'
export const isObject = (val: unknown): val is Record<any, any> =>
    val !== null && typeof val === 'object'

export function isPromise<T = any>(val: unknown): val is Promise<T> {
    return isObject(val) && isFunction(val.then) && isFunction(val.catch)
}

export const objectToString = Object.prototype.toString
export const toTypeString = (value: unknown): string =>
    objectToString.call(value)
export function toRawType(value: unknown): string {
    return toTypeString(value).slice(8, -1)
}
export const isPlainObject = (val: unknown): val is object =>
    toTypeString(val) === '[object Object]'

const hasOwnProperty = Object.prototype.hasOwnProperty
export const hasOwn = (
    val: object,
    key: string | symbol
): key is keyof typeof val => hasOwnProperty.call(val, key)
