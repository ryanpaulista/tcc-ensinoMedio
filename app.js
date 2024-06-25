const express = require('express');
const db = require(__dirname+'/model/database.js');
const userController = require(__dirname+'/controller/userController.js');
const UserPost = require(__dirname+"/model/UserPost.js");
const app = express();
const port = 8082;
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');
const session = require('express-session');


//BODY PARSER 
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//use
app.use(express.static(__dirname+"/view"));

// set
app.set('view engine', 'ejs');

// rotas POST

app.post('/cadastrar-usuario', userController.cadastrarUsuario);
app.post('/autenticar-usuario', userController.autenticarUsuario);

//rotas GET
app.get("/", function(req,res){
    res.redirect('/home')
});

app.get("/home", function(req,res){
    res.render(__dirname+'/view/layout.ejs', {contentFile: 'home',});
});

app.get("/cadastro", function(req,res){
    res.render(__dirname+'/view/layout.ejs', {contentFile: 'cadastro', usuarioExiste: req.query.usuarioExiste});
});

app.get("/login", function(req,res){
    res.render(__dirname+'/view/layout.ejs', {contentFile: 'login', sucessLogin: req.query.sucessLogin, erroLoginSenha: req.query.erroLoginSenha, erroLoginUsuario: req.query.erroLoginUsuario});
});


app.listen(port, function(){
        console.log("[SERVER] Online!") 
    }) // localhost:8081


//http.createServer(function(req, res){
//    res.write("Hello World! ");
//    res.end("Hello World!")
//}).listen(8081);

//console.log('O servidor está online!')