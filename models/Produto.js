const db = require('./db')

const Produto = db.sequelize.define('produtos', {
    
    nome: {
        type: db.Sequelize.STRING
    },
    marca: {
        type: db.Sequelize.STRING
    },
    imagem: {
        type: db.Sequelize.STRING
    },
    quantidade: {
        type: db.Sequelize.INTEGER
    },
    descricao: {
        type: db.Sequelize.TEXT
    },
    preco: {
        type: db.Sequelize.FLOAT
    }
})

module.exports = Produto

Produto.sync({force: true})