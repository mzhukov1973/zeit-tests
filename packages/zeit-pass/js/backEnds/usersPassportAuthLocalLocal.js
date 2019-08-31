const localStorage = [
  { id:1, username:'jack', password:'secret',   displayName:'Jack',   emails:[{value:'jack@example.com'}], scopes:['profile:edit', 'sensitiveInfo1:noRead', 'sensitiveInfo1:noEdit', 'sensitiveInfo2:noRead'], permissions:['homeFolder:rx', 'homeFolder:w', 'sharedFolder1:rx'], roles:['accountant', 'restrictedCommsUser', 'user'], groups:['finance', 'accounting', 'headOfficeStaff']                                                                                 },
  { id:2, username:'jill', password:'birthday', displayName:'Jill',   emails:[{value:'jill@example.com'}], scopes:['profile:edit', 'sensitiveInfo1:read',   'sensitiveInfo1:noEdit', 'sensitiveInfo2:noRead'], permissions:['homeFolder:rx', 'homeFolder:w'                    ], roles:['salesperson', 'manager', 'user'           ], groups:['sales', 'marketing', 'headOfficeStaff'   ]                                                                                 },
  { id:3, username:'max',  password:'123456',   displayName:'Maxim',  emails:[{value:'max@example.com'}, {value:'mzhukov31415@gmail.com'}, {value:'mzhukov31415dev@gmail.com'}], scopes:['profile:edit', 'sensitiveInfo1:read',  'sensitiveInfo1:edit', 'sensitiveInfo2:read', 'sensitiveInfo2:noEdit'], permissions:['homeFolder:rx', 'homeFolder:w', 'sharedFolder1:rx',  'sharedFolder1:w', 'sharedFolder2:rx'], roles:['admin','user'], groups:['administrators','it'] }
]

const findUserById = (id, done) => {
  if (!id||!done) { return done(new TypeError('[findUserById]: One or both function arguments (id,done) are either null or undefined!')) }
  const usArr = localStorage.filter(el => el.id==id)
  return done(null, usArr.length>0?usArr[0]:false)
}

const authenticateByCredObj = (credObj, done) => {
  if (!credObj||!done) { return done(new TypeError('[authenticateByCredObj]: One or both function arguments (credObj,done) are either null or undefined!')) }
  const usrArr = localStorage.filter(el => (el.username == credObj.username)&&(el.password == credObj.password))
  return done(null, usrArr.length>0?{'id':usrArr[0].id}:false)
}




module.exports = {
  'findUserById':          findUserById,
  'authenticateByCredObj': authenticateByCredObj
}
