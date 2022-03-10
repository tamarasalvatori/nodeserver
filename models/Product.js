const Product = model('Product', {
    id: Number,
    descricao: String,
    valor: Number,
    marca: String,
})

module.exports = Product