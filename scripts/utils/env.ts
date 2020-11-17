const env: string = process.env.NODE_ENV || 'development'
export const __DEV__: boolean = env === 'development'
export const __TEST__: boolean = env === 'test'
