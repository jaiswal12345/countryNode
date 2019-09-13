var express = require("express");
var router = express.Router();
var countryCtrl = require('../controllers/country.ctrl');
var jwt = require('jsonwebtoken');

function authentication(req,res,next){
    var user = jwt.verify(req.headers['authorization'],'secret',function(err,decode){
        if (!err && decode.role == 1){
            res.status(200);
            next();
        }else{
            res.status(401);
            res.send("Unauthorized: Admin is only allowed");
        }
    });
}

router.get("/",countryCtrl.get);
router.get("/:pageIndex/:pageSize",countryCtrl.get);
//authentication for admin -- if the role is 1-admin 2-viewer

router.use(authentication);

router.post('/',countryCtrl.save);
router.delete("/:id",countryCtrl.delete);
router.put('/:id',countryCtrl.put);

module.exports = router;