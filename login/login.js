let express = require("express");
let Router = express.Router();
let body = require("body-parser");
let env = require("dotenv");
let fs = require("fs");
const jwt = require("jsonwebtoken");

env.config();
Router.use(body.json());
Router.use(express.static(__dirname+"/"));
Router.use((req,res,next)=>{
	next();
});

Router.get("/data.json",(req,res)=>{

	res.send(JSON.parse(fs.readFileSync(__dirname+"/dataset/data.json").toString()));

});

Router.post("/",(req,res)=>{

	let data = fs.readFileSync(__dirname+"/dataset/data.json").toString();
	let data_array = JSON.parse(data);
	
	if(req.body.name && req.body.id && data_array.length > 0){

		data_array.push(req.body);

		fs.writeFileSync(__dirname+"/dataset/data.json",
			JSON.stringify(data_array),{
				encoding: "utf-8"
			});

	}else if(req.body.name && req.body.id && data_array.length === 0){

		fs.writeFileSync(__dirname+"/dataset/data.json",
			JSON.stringify([req.body]),{
				encoding: "utf-8"
			});
		
	}

	res.json({message: "user not define"});
	
});

Router.put("/",(req,res)=>{

	let data = req.body;
	console.log(data)
	let array = JSON.parse(fs.readFileSync(__dirname+"/dataset/data.json").toString());

	array[data.index] = {
		name: data.name,
		id: data.id	
	};

	fs.writeFileSync(__dirname+"/dataset/data.json",JSON.stringify(array),{
				encoding: "utf-8"
			});
	res.json({
		name: data.name,
		id: data.id,
		message: "success to update data"
	});
});

Router.delete("/",(req,res)=>{

	let data = JSON.parse(fs.readFileSync(__dirname+"/dataset/data.json").toString());

	delete data[req.body.index];

	let hasil = []

	for(let x of data){
		if(x && x !== null){
			hasil.push(x);
		}
	}

	fs.writeFileSync(__dirname+"/dataset/data.json",JSON.stringify(hasil),{
		encode: "utf-8"
	});	

	res.send("okay bisa bro");

});

// Router.get("/:user-:id",(req,res)=>{
// 	res.send(`my name: ${req.params.user} <br> 
// 		my id: ${req.params.id}`);
// });

module.exports = Router;
