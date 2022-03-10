const express = require ('express')
const app = express()

const lista_produtos = 
     {produtos: [
        { id: 1, descricao: "Arroz parboilizado 5Kg", valor: 25.00, marca: "Tio João"  },
        { id: 2, descricao: "Maionese 250gr", valor: 7.20, marca: "Helmans"  },
        { id: 3, descricao: "Iogurte Natural 200ml", valor: 2.50, marca: "Itambé"  },
        { id: 4, descricao: "Batata Maior Palha 300gr", valor: 15.20, marca: "Chipps"  },
        { id: 5, descricao: "Nescau 400gr", valor: 8.00, marca: "Nestlé"  },
    ]}


app.use (express.urlencoded({extended: true})) //processa o body em formato URLEnconded
app.use (express.json()) //Processa o body em formato JSON

app.use ((req, res, next) => {
    let data_req = new Date()
    console.log (`${data_req.toLocaleString()} - ${req.path} - ${req.get('content-type')}`)
    next()
})

app.get ('/api/produtos', (req, res, next) => {
    res.json(lista_produtos)
})

app.get ('/api/produtos/:id', (req, res, next) => {
    let id = parseInt (req.params.id)
    let idx = lista_produtos.produtos.findIndex (elem => elem.id === id)

    if (idx != -1) {
        res.status(200).json(lista_produtos.produtos[idx])
    } else {
        res.status(404).json( { message: 'Produto não encontrado' } )
    }
})

app.post ('/api/produtos/', (req, res, next) => {
    const { id, descricao, valor, marca } = req.body

    try {
        //lista_produtos.push({ id, descricao, valor, marca})
        lista_produtos.push([{ id, descricao, valor, marca}])
        return res.json(lista_produtos)
        res.status(201).json({ message: 'Produto inserido na lista com sucesso!' })
    } catch {
        res.status(500).json({erro: error})    
    }
})

app.put ('/api/produtos/:id', (req, res, next) => {
    let id = parseInt (req.params.id)
    let idx = lista_produtos.produtos.findIndex (elem => elem.id === id)

    res.json( { message: 'A implementar' } )
})

app.delete ('/api/produtos/:id', (req, res, next) => {
    let id = parseInt (req.params.id)
    let idx = lista_produtos.produtos.findIndex (elem => elem.id === id)

    res.json( { message: 'A implementar' } )
})

const PORTA = process.env.PORT || 3000
app.listen (PORTA, () => {
    console.log(`Servidor rodando em http://localhost:${PORTA}`);
})