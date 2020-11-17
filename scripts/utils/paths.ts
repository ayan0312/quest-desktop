import path from 'path'

const rootPath: string = path.resolve(__dirname, '../../')
const srcPath: string = path.resolve(rootPath, 'src')
const electronMainPath: string = path.resolve(srcPath, 'electron-main')
const electronBrowserPath: string = path.resolve(srcPath, 'electron-browser')

export default {
    rootPath,
    srcPath,
    electronMainPath,
    electronBrowserPath
}
