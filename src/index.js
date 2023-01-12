import express from "express"
import { ProductManager } from "./ProductManager"

const productManager = new ProductManager("./products.json")
const products = await productManager.getProducts()

const server = express()

server.listen(8080, () => {
    console.log("Servidor Express ejecutándose en localhost:8080.")
})

server.get("/", (req, res) => {
    res.send("Bienvenido a mi propio servidor creado con Express.")
})

server.get("/products", (req, res) => {
    const { limit } = req.query

    if(limit) return res.send(products.slice(0, limit))

    return res.send(products)
})

server.get("/products/:productId", (req, res) => {
    const { productId } = req.params

    const product = products.find(product => product.id === +productId && product)

    res.send(product)
})