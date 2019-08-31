module.exports = (passportStratLocalBackEnd='local') => {
  if (passportStratLocalBackEnd=='local')                   { return require('./usersPassportAuthLocalLocal')                                                                }
  if (passportStratLocalBackEnd=='sqlite3')                 { return require('./usersPassportAuthLocalSqlite3')                                                              }
  if (passportStratLocalBackEnd.substring(0,8)=='postgres') { return require('./usersPassportAuthLocalPostgres')(passportStratLocalBackEnd=='postgres-native'?'native':'pg') }
}
