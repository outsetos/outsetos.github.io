const Sequelize = require('sequelize');

const sequelize = new Sequelize('outsetos_db', 'root', '12345678', { 
    host: "localhost",
    dialect: 'mysql'
}
);

module.exports = { 
    Sequelize: Sequelize,
    sequelize: sequelize
}