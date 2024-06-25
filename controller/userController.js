const UserPost = require("../model/UserPost");
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const session = require('express-session');

exports.cadastrarUsuario = function(req,res){
    const nomeDeUsuario = req.body.nome;
    const email = req.body.email;
    const senha = req.body.senha;
    const telefone = req.body.telefone;

    //PROCURAR UM USUÁRIO COM O EMAIL IGUAL
    UserPost.findOne({ where: { email: email } }).then(function(usuario){
        if(usuario){
            console.log("[CADASTRO] Usuário já existe!");
            res.redirect('/cadastro?usuarioExiste=usuario ja existe')
        }
        else{

            bcrypt.hash(senha, 10, function(err, hash){

                if(err){
                    console.log("[HASH] Erro ao gerar Hash da senha do usuário!")
                    res.redirect('/cadastro');
                }

                UserPost.create({
                    nomeDeUsuario,
                    email,
                    senha: hash,
                }).then(function(){
                    console.log("[CADASTRO] Usuário cadastrado com sucesso!");
                    res.redirect('/login?success=usuario cadastrado com sucesso');
                }).catch(function(erro){
                    console.log("[CADASTRO] Erro ao cadastrar usuario!");
                    res.redirect('/cadastro?erro=erro ao cadastrar usuario');
                });
            }); // fecha bcrypt
        };
    });
}

exports.autenticarUsuario = function(req,res){

    const email = req.body.email;
    const senha = req.body.senha;

    UserPost.findOne({ where: { email: email } }).then(function(usuario){
        if(usuario){ //Usuário encontrado!
            console.log("[CADASTRO] Usuário existe!");
            bcrypt.compare(senha, usuario.senha, function(err, result){
                if(result){ //Usuário foi encontrado e a senha está CORRETA
                    console.log("[LOGIN] Usuário autenticado!");
                    res.redirect('/?sucessLogin=Login bem sucedido');
                }
                else{ //Usuário foi encontrado mas a senha está INCORRETA
                    console.log("[LOGIN] Senha incorreta!");
                    res.redirect('/login?erroLoginSenha=Senha incorreta')
                }
            })
        }
        else{ //Usuário não foi encontrado
            console.log("[LOGIN] Usuário não foi encontrado!");
            res.redirect('/login?erroLoginUsuario=Email incorreto')
        }
    }).catch(function(erro){
        console.error('[AUTENTICAÇÃO] ERRO')
    });
};
