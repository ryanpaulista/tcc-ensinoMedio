const Sequelize = require('sequelize');
const sequelize = new Sequelize('dbfluxo', 'root', '1234', {
    host: "localhost",
    dialect: "mysql"
});

sequelize.authenticate().then(function(){ 
    console.log("[DATABASE] Conexão bem sucedida!")
}).catch(function(erro){
    console.log("[DATABASE] Conexão mal sucedida" + erro)
})

module.exports = sequelize;
//then função de callback - é executada quando um evento acontece
//caso dê certo a função then vai ser chamada, caso não dê certo que vai ser chamada será a catch