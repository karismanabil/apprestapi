const jwt = require('jsonwebtoken');
const config = require('../config/secret');

function verifikasi(role){
    return function(req, rest, next){
        var role = req.body.role;
        // cek token header
        var tokenWithBearer = req.headers.authorization;
        if(tokenWithBearer){
            var token = tokenWithBearer.split(' ')[1];
            // verifikasi
            jwt.verify(token, config.secret, function(err, decoded){
                if(err){
                    return rest.status(401).send({auth:false, message:'Token tidak terdaftar!'});
                }else{
                    if(role==2){
                        req.auth= decoded;
                        next();
            
                    }else{
                        return rest.status(401).send({auth:false, message:'Gagal mengotorisasi roles'});
                    }
                }
            });
        }else{
            return rest.status(401).send({auth:false, message:'Token tidak tersedia!'});
        }
    }
}


module.exports = verifikasi;