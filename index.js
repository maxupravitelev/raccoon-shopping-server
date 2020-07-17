const express = require('express')
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
        "id": 1,
        "text": "T-Rex",
        "amount": 2,
        "price": 1250,
        "isCompleted": false
      },
      {
        "id": 2,
        "text": "Eggs",
        "amount": 5,
        "price": 1,
        "isCompleted": false
      },
      {
        "id": 3,
        "text": "Bananas",
        "amount": 24,
        "price": 2,
        "isCompleted": false
      }

]

// app.get('/', (req, res) => {
//     res.send('<h1>test<h1>')
// })


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

const generateId = () => {
    const maxId = items.length > 0
      ? Math.max(...items.map(n => n.id))
      : 0
    return maxId + 1
  }

app.post('/api/items', (req, res) => {


    const body = request.body

    if (!body.content) {
      return response.status(400).json({ 
        error: 'content missing' 
      })
    }

    const item = {
        id: generateId(),
        text: body.text,
        amount: body.amount,
        isCompleted: body.isCompleted || false,
        date: new Date(),
      }

    items = items.concat(item)

    res.json(item)

})

app.delete('/api/items/:id', (req, res) => {
    const id = Number(req.params.id)
    items = items.filter(item => item.id !== id)
  
    res.status(204).end()
  })

  const PORT = process.env.PORT || 3001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

// built upon: https://fullstackopen.com/en/part3/

