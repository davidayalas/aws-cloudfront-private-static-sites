const s3select = require("./s3select");

const _BUCKET = process.env.PERMISSIONS_BUCKET || "";
const _FILE = process.env.PERMISSIONS_FILE || "";

exports.getPermissions = async function(user){
  if(!_BUCKET || !_FILE){
    return [];
  }

  const permissions = JSON.parse(await s3select.query({
    "Bucket" : _BUCKET, 
    "Key": _FILE, 
    "Expression": `select * from s3object s where s.id='${user}'`,
  }));
  
  /*let _auth = {};
  for(let i=0,z=permissions.length;i<z;i++){
    if(!_auth[permissions[i][1]]){
      _auth[permissions[i][1]] = [];
    }
    _auth[permissions[i][1]].push({folder:permissions[i][2], role: (permissions[i][3] || 'admin')});
  }
  return _auth;*/

  return permissions.length>0 ? true : false;
}