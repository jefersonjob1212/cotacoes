const path = require('path')
const express = require('express')
const hbs = require('hbs');
const cotacao = require('./util/cotacao')

const app = express()
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Bem vindo ao Sistema de Cotações',
        author: 'Jeferson Job'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'Sobre',
        author: 'Jeferson Job'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Ajuda'
    })
})

app.get('/cotacoes', (req, res) => {
    if(!req.query.ativo) {
        return res.send({
            error:{
                message: 'O ativo deve ser informado como query parameter',
                code: 400
            }
        });
    }

    const symbol = req.query.ativo.toUpperCase();

    cotacao(symbol, (data) => {
        if(data.message){
            res.json({ 
                error:{
                    message: data.message,
                    code: data.statusCode
                }
            })
        } else {
            res.status(data.statusCode);
            res.send(data.retorno)
        }
    })
})

app.get('/help/*', (req, res) => {
    res.status(404);
    res.render('404', { 
        title: '404',
        author: 'Jeferson Job',
        errorMessage : 'Não existe página depois de /help' 
    })
})

app.get('/*', (req, res) => {
    res.status(404);
    res.render('404', { 
        
        title: '404',
        author: 'Jeferson Job',
        errorMessage : 'Página não encontrada' 
    })
})

app.listen(3000, () => {
    console.log('server is up on port 3000')
})