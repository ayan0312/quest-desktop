import pathToRegexp, { Key } from 'path-to-regexp'

import { isArray, isString } from 'src/shared/Utilities'

const cache: Record<string, CompilePathResult> | {} = {}
const cacheLimit: number = 10000
let cacheCount: number = 0

interface CompilePathOptions {
    strict: boolean
    sensitive: boolean
    end: boolean
}

interface CompilePathResult {
    keys: Key[]
    regexp: RegExp
}

function compilePath(
    path: string,
    options: CompilePathOptions
): CompilePathResult {
    const cacheKey: string = `${options.end}${options.strict}${options.sensitive}`
    const pathCache = cache[cacheKey] || (cache[cacheKey] = {})
    if (pathCache[path]) return pathCache[path]

    const keys: Key[] = []
    const regexp: RegExp = pathToRegexp(path, keys, options)
    const result: CompilePathResult = {
        keys,
        regexp
    }
    if (cacheCount < cacheLimit) {
        pathCache[path] = result
        cacheCount += 1
    }

    return result
}

export type MatchPathOptions = MatchPathOptionsObject | string | string[]
export interface MatchPathOptionsObject {
    path: string | string[]
    strict?: boolean
    sensitive?: boolean
    exact?: boolean
}

export type MatchPathResult = MatchPathResultObject | null | string
export interface MatchPathResultObject {
    url: string
    path: string
    params: Record<string, string>
    isExact: boolean
    sourcePath: string
}

/**
 * Public API for matching a URL pathname to a path.
 */
export function matchPath(
    pathname: string,
    options: MatchPathOptions
): MatchPathResult {
    if (isString(options) || isArray(options)) {
        options = { path: options }
    }
    const { path, exact = false, strict = false, sensitive = false } = options
    const paths: string[] = [].concat(path)
    return paths.reduce((matched: string, path: string) => {
        if (!path && path !== '') return null
        if (matched) return matched

        const { regexp, keys } = compilePath(path, {
            end: exact,
            strict,
            sensitive
        })
        const match: RegExpExecArray = regexp.exec(pathname)
        if (!match) return null
        const [url, ...values] = match
        const isExact: boolean = pathname === url
        if (exact && !isExact) return null
        return {
            path, // the path used to match
            sourcePath: pathname, // the source path
            isExact, // whether or not we matched exactly
            url: path === '/' && url === '' ? '/' : url, // the matched portion of the URL
            params: keys.reduce((memo: any, key: Key, index: number) => {
                memo[key.name] = values[index]
                return memo
            }, {})
        }
    }, null)
}
