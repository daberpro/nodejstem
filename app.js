let {
	log: c
} = console;
let express = require("express");
let App = express();
let login = require("./login/login.js");
let tabel = require("./tabel/tabel.js");
const body = require("body-parser");

App.use(body.json());
App.use("/login",login);
App.use("/table",tabel);

App.use(express.static(__dirname+"/"));

App.listen(process.env.PORT || 3000,()=>{
	c("server listen on port 3000")
})


