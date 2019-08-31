const Sqlite3 = require('better-sqlite3')
const sqlite3 = new Sqlite3('supportPassportAuthLocalSqlite3.db', {memory:false, readonly:false, fileMustExist:false, timeout:5000, verbose:null})

const row = sqlite3.prepare('SELECT * FROM users WHERE id=?').get(userId)
console.log(row.firstName, row.lastName, row.email)

const findById = (id,doneCallBack) => {
  setImmediate(async () => {
    try {
      const cat = sqlite3.prepare('SELECT * FROM users_one WHERE id = ?').get(id)
      if (!cat) { return doneCallBack(null,null) }
      if (typeof cat.emails[0]==='string') {cat.emails.forEach((el,idx,arr)=>arr[idx]={value:el})}
        cat['displayName'] = cat.displayname
        return doneCallBack(null,cat)
    } catch(err) {
      return doneCallBack(err,null)
    }
  })
}
const findByUsername = (username,doneCallBack) => {
  setImmediate(async () => {
    try {
      const cat = sqlite3.prepare('SELECT * FROM users_one WHERE username = ?').get(username)
      if (!cat) { return doneCallBack(null,null) }
      if (typeof cat.emails[0]==='string') {cat.emails.forEach((el,idx,arr)=>arr[idx]={value:el})}
        cat['displayName'] = cat.displayname
        return doneCallBack(null,cat)
    } catch(err) {
      return doneCallBack(err,null)
    }
  })
}

module.exports.findById
module.exports.findByUsername
