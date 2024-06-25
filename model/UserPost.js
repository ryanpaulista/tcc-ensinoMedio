const Sequelize = require('sequelize');
const db = require(__dirname+'/database.js');

const UserPost = db.define('user', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    nomeDeUsuario: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    senha: {
        type: Sequelize.STRING,
        allowNull: false
    }

});

UserPost.sync();
module.exports = UserPost;