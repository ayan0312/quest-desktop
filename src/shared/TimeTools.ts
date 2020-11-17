export type TimeName = 'millisecond' | 'second' | 'minute' | 'hour' | 'day'

export type FullTimeOptions = Record<TimeName, number>
export type TimeOptions = Partial<FullTimeOptions>

export const MILLISECOND = 1
export const SECOND = 1000 * MILLISECOND
export const MINUTE = 60 * SECOND
export const HOUR = 60 * MINUTE
export const DAY = 24 * HOUR

export function getSecondEnd(date: Date): Date {
    date.setMilliseconds(999)
    return date
}

export function getMinuteEnd(date: Date): Date {
    let millisecondEnd = getSecondEnd(date)
    millisecondEnd.setSeconds(59)
    return millisecondEnd
}

export function getHourEnd(date: Date): Date {
    let secondEnd = getMinuteEnd(date)
    secondEnd.setMinutes(59)
    return secondEnd
}

export function getDayEnd(date: Date): Date {
    let minuteEnd = getHourEnd(date)
    minuteEnd.setHours(23)
    return minuteEnd
}

export function getWeekEnd(date: Date): Date {
    let today = date.getDay()
    let dayEnd = getDayEnd(date)
    if (today !== 0) date.setTime(today * DAY + dayEnd.getTime())
    else date.setTime(dayEnd.getTime())
    return date
}

export function getMonthEnd(date: Date): Date {
    let dayEnd = getDayEnd(date)
    let month = dayEnd.getMonth()
    if (month === 11) month = 0
    else month = month + 1
    dayEnd.setMonth(month)
    dayEnd.setDate(0)
    return dayEnd
}

export function getRemainingMillisecond(date: Date): number {
    return getSecondEnd(date).getTime() - date.getTime()
}

export function getRemainingSecond(date: Date): number {
    return getMinuteEnd(date).getTime() - date.getTime()
}

export function getRemainingMinute(date: Date): number {
    return getHourEnd(date).getTime() - date.getTime()
}

export function getRemainingHour(date: Date): number {
    return getDayEnd(date).getTime() - date.getTime()
}

/**
 * How many days are left in the week
 */
export function getRemainingDay(date: Date): number {
    return getWeekEnd(date).getTime() - date.getTime()
}

export function millisecondToTimeOptions(ms: number): TimeOptions {
    let dayRemainder = ms % DAY
    let day = Math.floor(ms / DAY)

    let hourRemainder = dayRemainder % HOUR
    let hour = Math.floor(dayRemainder / HOUR)

    let minuteRemainder = hourRemainder % MINUTE
    let minute = Math.floor(hourRemainder / MINUTE)

    let millisecond = minuteRemainder % SECOND
    let second = Math.floor(minuteRemainder / SECOND)

    return { day, hour, minute, second, millisecond }
}

export function isTimeOptionsEmpty(option: TimeOptions): boolean {
    let n = 0
    Object.keys(option).forEach((key: TimeName) => {
        if (option[key]) n = n + 1
    })
    if (n === 0) return false
    return true
}

export function timeOptionsToMillisecond(option: TimeOptions): number {
    let milliSecond = 0
    Object.keys(option).forEach((timeName: TimeName) => {
        let n = option[timeName]
        if (n > 0)
            milliSecond = milliSecond + timeNameToMillisecond(timeName, n)
    })
    return milliSecond
}

export function timeNameToMillisecond(timeName: TimeName, n: number): number {
    let millisecond = 0
    switch (timeName) {
        case 'millisecond':
            millisecond = n * MILLISECOND
            break
        case 'second':
            millisecond = n * SECOND
            break
        case 'minute':
            millisecond = n * MINUTE
            break
        case 'hour':
            millisecond = n * HOUR
            break
        case 'day':
            millisecond = n * DAY
            break
    }
    return millisecond
}

export function formatDate(formatString: string, date: Date) {
    let fmt = formatString
    const o = {
        'y+': date.getFullYear(),
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours() % 12 === 0 ? 12 : date.getHours() % 12,
        'H+': date.getHours(),
        'm+':
            date.getMinutes() < 10
                ? `0${date.getMinutes()}`
                : date.getMinutes(),
        's+':
            date.getSeconds() < 10
                ? `0${date.getSeconds()}`
                : date.getSeconds(),
        'q+': Math.floor((date.getMonth() + 3) / 3),
        S: date.getMilliseconds()
    }
    for (const k in o) {
        if (new RegExp(`(${k})`).test(fmt)) {
            fmt = fmt.replace(
                RegExp.$1,
                RegExp.$1.length === 1
                    ? o[k]
                    : `00${o[k]}`.substr(`${o[k]}`.length)
            )
        }
    }
    return fmt
}
