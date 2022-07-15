const envObj = import.meta.env

export const env = envObj.MODE

console.log('env', envObj)
export const isProd = envObj?.env === 'prod'
export const envConfig = envObj
