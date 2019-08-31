const Promise = require('bluebird')
const pgPromiseInitOptions = {
  pgFormatting: false,
  pgNative:     true,
  promiseLib:   Promise,
  noLocking:    false,
  capSQL:       false,
  noWarnings:   false,
  connect(client,dc,useCount) {console.log('Connected to database: ', client.connectionParameters.database)},
  disconnect(client,dc,useCount) {console.log('Disconnecting from database: ', client.connectionParameters.database)}
}
const db_connection = {
  host:process.env.PGHOST,
  port:process.env.PGPORT,
  database:process.env.PGDATABASE,
  user:process.env.PGUSER,
  password:process.env.PGPASSWORD
}
let pgPromise, db

module.exports = (driver='pg') => {
  let toExport = {}
  if (driver==='native') {
    pgPromiseInitOptions.pgNative = true
    pgPromise                     = require('pg-promise')(pgPromiseInitOptions)
    db                            = pgPromise(db_connection)
//    toExport.pgPromise      = pgPromise
    toExport.db             = db
  } else {
    pgPromiseInitOptions.pgNative = false
    pgPromise                     = require('pg-promise')(pgPromiseInitOptions)
    db                            = pgPromise(db_connection)
//    toExport.pgPromise      = pgPromise
    toExport.db             = db
  }
  return toExport
}
