let express = require("express");
let Router = express.Router();


Router.use((req,res,next)=>{
	next();
});

Router.use(express.static(__dirname+"/"));

module.exports = Router;