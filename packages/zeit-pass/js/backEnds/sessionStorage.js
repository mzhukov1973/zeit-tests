module.exports = (which='postgres')=>require('./sessionStoragePostgres')((which.substring(0,8)!=='postgres')?undefined:(which==='postgres-native'?'native':'pg'))
