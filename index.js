require('dotenv').config()
const express = require ('express')

const routerAPI = require ('./routers/routerAPI')
const routerSec = require ('./routers/routerSec')

const app = express ()

app.use (express.urlencoded({extended: true})) 
app.use (express.json()) 

app.use ((req, res, next) => {
    let data_req = new Date()
    console.log (`${data_req.toLocaleString()} - ${req.path} - ${req.get('content-type')}`)
    next()
})

app.use ('/app', express.static('public', { index: false, cacheControl: 'public' }))
app.use ('/seguranca/', routerSec)
app.use ('/api', routerAPI)

const PORTA = process.env.PORT || 3000
app.listen (PORTA, () => {
    console.log(`Servidor rodando em http://localhost:${PORTA}`);
})