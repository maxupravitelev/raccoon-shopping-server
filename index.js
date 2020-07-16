const express = require('express')
// const { response } = require('express')
const app = express() 
const morgan = require('morgan')

app.use(express.json())
// app.use(morgan('tiny'))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'))
morgan.token('data', (req, res) => JSON.stringify(req.body)
)

// const requestLogger = (request, response, next) => {
//     console.log('Method:', request.method)
//     console.log('Path:  ', request.path)
//     console.log('Body:  ', request.body)
//     console.log('---')
//     next()
//   }

// app.use(requestLogger)


let items = [
    {
        "name": "Arto Hellas",
        "number": "4747",
        "id": 1
      },
      {
        "name": "Ada Lovelace",
        "number": "39-44-5323523",
        "id": 2
      },
      {
        "name": "Dan Abramov",
        "numbeid": "12-43-234345",
        "id": 3
      },
      {
        "name": "Mary Poppendieck",
        "numbeid": "39-23-6423122",
        "id": 4
      }
]

// app.get('/', (req, res) => {
//     res.send('<h1>test<h1>')
// })

app.get('/info', (req, res) => {
    res.send(`Phonebook has info for ${items.length} people<br><br>${Date()}`)
})

app.get('/api/items', (req, res) => {
    res.json(items)
})

app.get('/api/items/:id', (req, res) => {
    const id = Number(req.params.id)
    const item = items.find(item => item.id === id)
    
    if (item) {
        res.json(item)
    } else {
        res.status(404).end()
    }

})

app.post('/api/items', (req, res) => {
    // const maxId = items.length > 0
    // ? Math.max(...items.map(n => n.id))
    // : 0
    // const item = req.body
    // item.id = maxId + 1

    const item = req.body
    // console.log('!!!!!')
    // console.log(item)

    if (!item.name) {
        return res.status(400).json({
            error: 'name missing.'
        })
    }

    let nameDubl = items.find(item => item.name === req.body.name)
    if (nameDubl) {
        return res.status(400).json({
            error: 'name must be unique'
        })
    }

    if (!item.number) {
        return res.status(400).json({
            error: 'number missing.'
        })
    }


    item.id = Math.round(Math.random() * 999999)

    items = items.concat(item)

    res.json(item)

})

app.delete('/api/items/:id', (req, res) => {
    const id = Number(req.params.id)
    items = items.filter(item => item.id !== id)
  
    res.status(204).end()
  })

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

