'use strict'

var path = require('path')
var fs = require('fs')
var url = require('url')

// Make sure any symlinks in the project folder are resolved:
// https://github.com/facebookincubator/create-react-app/issues/637
var appDirectory = fs.realpathSync(process.cwd())
const resolveApp = (relativePath) => {
  return path.resolve(appDirectory, relativePath)
}

var nodePaths = (process.env.NODE_PATH || '')
  .split(process.platform === 'win32' ? ';' : ':')
  .filter(Boolean)
  .filter(folder => !path.isAbsolute(folder))
  .map(resolveApp)

var envPublicUrl = process.env.PUBLIC_URL

const ensureSlash = (path, needsSlash) => {
  var hasSlash = path.endsWith('/')
  if (hasSlash && !needsSlash) {
    return path.substr(path, path.length - 1)
  } else if (!hasSlash && needsSlash) {
    return path + '/'
  } else {
    return path
  }
}

const getPublicUrl = (appPackageJson) => {
  return envPublicUrl || require(appPackageJson).homepage
}

const getServedPath = (appPackageJson) => {
  var publicUrl = getPublicUrl(appPackageJson)
  var servedUrl = envPublicUrl || (
    publicUrl ? url.parse(publicUrl).pathname : '/'
  )
  return ensureSlash(servedUrl, true)
}

module.exports = {
  appBuild: resolveApp('build/public'),
  appPublic: resolveApp('public'),
  appHtml: resolveApp('public/index.html'),
  appIndexJs: resolveApp('src/client/index.js'),
  appPackageJson: resolveApp('package.json'),
  appSrc: resolveApp('src/client'),
  yarnLockFile: resolveApp('yarn.lock'),
  testsSetup: resolveApp('src/setupTests.js'),
  appNodeModules: resolveApp('node_modules'),
  nodePaths: nodePaths,
  publicUrl: getPublicUrl(resolveApp('package.json')),
  servedPath: getServedPath(resolveApp('package.json')),
}
