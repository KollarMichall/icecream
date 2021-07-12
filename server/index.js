const express = require("express")
const cors = require("cors")
const app = express()
const port = 5000
app.use(express.json())
app.use(cors())

app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})
const iceCreams = [
    { id: 0, name: "Coko"},
    { id: 1, name: "Melon"},
    { id: 2, name: "Chilli"},
    { id: 3, name: "Stawbery"},
]

let menuData = [{
id: 1,
iceCream: { id: 0, name: "Coko"},
price: 1.25,
description: "Good taste",
inStock: true,
quantity: 20
},
{
    id: 2,
    iceCream: { id: 1, name: "Melon"},
    price: 1.5,
    description: "Very ood taste Lore impsu descen prid nsath iaojksnsujd majkkdi8jsa.",
    inStock: true,
    quantity: 30
    },
    {
        id: 3,
        iceCream: { id: 2, name: "Chilli"},
        price: 1.45,
        description: "Most spicy",
        inStock: true,
        quantity: 40
        },
        {
            id: 4,
            iceCream:  { id: 3, name: "Stawbery"},
            price: 1.254,
            description: "Good small",
            inStock: true,
            quantity: 50
            },
]
const getAvailableStock = () => 
    iceCreams.filter(
        iceCream =>
        menuData.find(menuItem => menuItem.iceCream.id === iceCream.id) === undefined
    )

app.get('/api/menu/stock-ice-creams', (req, res) => {
    res.send(getAvailableStock())
})

app.get('/api/menu/stock-ice-creams/:id', (req, res) => {
    const iceCream = getAvailableStock().find(
        iceCream => iceCream.id === parseInt(req.params.id, 10)
    )
    if (iceCream) {
        res.send(iceCream)
        
    }else {
        res.status(404)
        res.send({ error: "Ice cream not found" })
    }
})

app.post(".api/menu", (req, res) => {
    const { iceCream, ...rest } = req.body
    const newIceMenu = {
        id: menuData.reduce((pre, cur) => (cur.id > pre ? cur.id : pre ),0) 
        +1, iceCream: {
            ...iceCreams.find(item => item.id === parseInt(iceCream.id, 10)),
        },
        ...rest
    }
    menuData.push(newIceMenu)
    res.send(newIceMenu)
})

app.get("/api/menu", (req, res) => {
    setTimeout(() => {
        res.send(menuData)
    }, 3000)
})

app.get("/api/menu/:id", (req, res) => {
    const menuItem = menuData.find(
        item => item.id === parseInt(req.params.id),
        10
    )
    if (menuItem) {
        res.send(menuItem)
        
    }else{
        res.status(404)
        res.send("Menu item does not exist")
    }
})

app.put("/api/menu/:id", (req, res) => {
    const intId = parseInt(req.params.id, 10)
    const {iceCream, ...rest } = req.body

    const updatedItem = {
        id: intId,
        iceCream: {
            ...iceCreams.find(item => item.id === parseInt(iceCream.id, 10 ))
        },
        ...rest
    }
    menuData = menuData.map(menuItem => {
        if (menuItem.id === parseInt(req.params.id, 10)) {
            return updatedItem
            
        }
        return menuItem
    })
    res.send(updatedItem)
})

app.delete("/api/menu/:id", (req, res) => {
    menuData = menuData.filter(menuItem => menuItem.id !== parseInt(req.params.id, 10))
    res.status(204)
    res.end()
})
