const express = require ('express')
const routerAPI = express.Router()
const utilSec = require('../utils/utilSec')

const lista_produtos = 
{produtos:       
    [
        { id: 1, descricao: "Arroz parboilizado 5Kg", valor: 25.00, marca: "Tio João"  },
        { id: 2, descricao: "Maionese 250gr", valor: 7.20, marca: "Helmans"  },
        { id: 3, descricao: "Iogurte Natural 200ml", valor: 2.50, marca: "Itambé"  },
        { id: 4, descricao: "Batata Maior Palha 300gr", valor: 15.20, marca: "Chipps"  },
        { id: 5, descricao: "Nescau 400gr", valor: 8.00, marca: "Nestlé"  },
    ]
}

const knex = require ('knex') ({
    client: 'pg',
    connection: {
        connectionString : process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false }, 
        }
})

routerAPI.get ('/produtos/info', (req, res, next) => {
    res.status(200).json({message: 'Bem-vinde à API de Produtos'})
})

routerAPI.get ('/produtos', utilSec.checkToken, (req, res, next) => {
    knex.select('*')
      .from ('produto')
      .then (produtos => {
          res.status(200).json(produtos);
      })  
})

routerAPI.get ('/produtos/:id', utilSec.checkToken, (req, res, next) => {

    knex.select('*')
      .from ('produto')
      .where ({ id: req.params.id})
      .then (produtos => {
          if (produtos.length) {
            res.status(200).json(produtos);
        }
        else {
            res.status(404).json( { message: 'Produto não encontrado' });
        }
    }) 
})

routerAPI.post ('/produtos/', utilSec.checkToken, utilSec.isAdmin, (req, res, next) => {
    knex('produto')
        .insert ({ descricao: req.body.descricao, valor: req.body.valor, marca: req.body.marca},
            ['id'])
        .then ( result => {
            res.status(201).json({ message: 'Produto inserido com sucesso'})
        })

})

routerAPI.put ('/produtos/:id', utilSec.checkToken, utilSec.isAdmin, (req, res, next) => {
     knex('produto')
        .where({ id: req.params.id })
        .update({ descricao: req.body.descricao, valor: req.body.valor, marca: req.body.marca })
        .then ( result => {
            res.status(201).json({ message: 'Produto atualizado com sucesso'})
        })
})

routerAPI.delete ('/produtos/:id', utilSec.checkToken, utilSec.isAdmin, (req, res, next) => {
    knex('produto')
        .where ({ id: req.params.id})
        .del()
        .then (n => {
            if (n) {
                res.status(200).json( { message: 'Produto excluído com sucesso'});
            }
            else {
                res.status(404).json( { message: 'Produto não encontrado' });
            }
        })
        .catch (err => {
            res.status(500).json({ message: 'Erro na exclusão \n Mensagem: ' + err.message })
        })
})

module.exports = routerAPI