const express = require("express");
const session = require('express-session')
const app = express();
const bodyParser = require('body-parser');
const Produto = require('./models/Produto')
const Usuario = require('./models/Usuario')

//Aplicando sessão 
app.use(session({secret: 'ascdbdbfgbfdvscmcscsdvffds'}))


//Path 
const path = require('path')
app.use(express.static(path.join(__dirname,"public")))

//HandleBars Template 
const handlebars = require('express-handlebars')

app.engine('handlebars', handlebars.engine({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')
app.set('views', './views');


app.get('/', (req, res) => {
    res.render('index');
});


app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


//Rotas Views 
app.get('/', function(req,res){
    res.render('index')
})

//Rota Loja 
app.get('/loja', function(req, res){ 
    Produto.findAll().then(function(produtos){
        res.render('loja', {produtos: produtos.map(produto => produto.toJSON())})
    })
})


//Rota Quem-Somos 
app.get('/quem-somos', function(req, res){
    res.render('quem-somos')
})

//Rota Duvidas 
app.get('/duvidas', function(req, res){
    res.render('duvidas')
})


//Rota Orcamento 
app.get('/orcamento', function(req, res){
    res.render('orcamento')
})

//Rota Area de Atuacao 
app.get('/area-de-atuacao', function(req, res){
    res.render('area-atuacao')
})


//Rota Login Usuário 

app.get('/login', function(req, res){ 
    res.render('login', {layout: false})
})


app.get('/criarConta', function(req, res){ 
    res.render('cadastrarUsuario', {layout: false})
})





app.post('/userLogin', async function(req, res){ 
  try {
    const {email, senha} = req.body
    const usuario = await Usuario.findOne({where: { email, senha }})
    if(!usuario) { 
        res.status(401).json({message: 'Email ou senha inválido'})
    } else { 
        req.session.user = usuario
        console.log(req.session.user)
        res.render('index', {usuario: usuario.toJSON})
    }
  } catch (error) {
      res.status(400).json({message: 'Error ao efetuar login'})
  }
})


app.post('/criarUsuario', async function(req, res){ 
    try {
        const email = req.body.email
        const usuario = await Usuario.findOne({where: { email }})
        if(!usuario) {
            Usuario.create({ 
                nome: req.body.nome, 
                email: req.body.email,
                contato: req.body.contato,
                senha: req.body.senha
            }).then(function(){ 
                res.redirect('/')
            })
        } else { 
            res.status(400).json({message: 'Já existe um usuário com esse email'})
        }
    } catch (error) {
        res.status(400).json({ message: 'Erro ao criar usuário'})
    }
})



//Rota Cadastrar Produto 
app.get('/novoProduto', function(req, res){
    res.render('cadastrarProduto')
})

//Rota Criar Produto
app.post('/criarProduto', async function(req, res){

    try {
        Produto.create( {
            nome: req.body.nome,
            marca: req.body.marca,
            imagem: req.body.imagem,
            quantidade: req.body.quantidade,
            descricao: req.body.descricao,
            preco: req.body.preco
        }).then(function(){
            res.redirect('/loja')
        })
    } catch (error) {
        res.status(400).json({message: "Erro ao cadastrar produto"})
    }
})

//Rota Listar Produto
app.get('/listarProdutos', async function(req, res){
    const produtos = await Produto.findAll()
    res.json(produtos)
})


//Rota Atualizar Produto 
app.put('/atualizarProduto/:id', async function(req, res){
    try {
        const id = req.params.id
        const produto = await Produto.findOne({where: { id }})
        const {nome, marca, imagem, descricao, quantidade, preco } = req.body
        if(!produto) { 
            res.status(401).json({message: 'Produto não encontrado'})
        } else { 
            const produto = await Produto.update({nome, marca, imagem, descricao, quantidade, preco}, { where: { id }})
            res.status(200).json({produto})
            
        }
    } catch (error) {
        res.status(400).json({error})
    }
})   


//Delete Produto
app.delete('/apagarProduto/:id', async function(req, res){
    try {
        const id = req.params.id
        const produto = await Produto.findOne({where: {id}})
        if (!produto) {
            res.status(401).json({message: 'Produto não encontrado'})
        } else { 
            await Produto.destroy({where: { id }})
            res.status(200).json({ok: true})
        }
    } catch (error) {
        res.status(400).json({error})
    }
})

const PORT = process.env.PORT || 8089

app.listen(PORT, function(){ 
    console.log("Servidor ON localhost:3000");
});