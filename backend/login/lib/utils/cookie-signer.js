const AWS = require("aws-sdk");
const util = require("util");

//Private Key
let pk = process.env.AWS_PRIVATEKEY;
if(pk){
	pk = pk.split("-----")
	pk[2] = pk[2].split(" ").join("\n")
	pk = pk.join("-----")	
}

//CloudFront signer
const CF = new AWS.CloudFront.Signer(process.env.AWS_KEYPAIRID, pk);
const cookieSigner = util.promisify(CF.getSignedCookie).bind(CF);

//Cookie TTL
let cookie_ttl = process.env.AWS_SIGNEDCOOKIES_TTL;

cookie_ttl = !isNaN(cookie_ttl) ? cookie_ttl*1 : 900; //default 15min

exports.sign = async function(){

    let hash;
    let expires = Math.ceil((new Date().getTime()/1000) + cookie_ttl);
    try{
        hash = await cookieSigner({
		    'policy' : JSON.stringify({"Statement":[{"Resource": "*","Condition":{"DateLessThan":{"AWS:EpochTime":expires}}}]})
	    }); 
	}catch(e){
        console.log(e.message)
	}
	
    return {'hash' : hash, 'expires' : expires};

};
