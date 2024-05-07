const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
app.use(express.json())
app.use(cors())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
morgan.token('body', function (req, res) {
  if (req.method === 'POST' && req.headers['content-type'] && req.headers['content-type'].includes('application/json')) {
      return JSON.stringify(req.body);
  } else {
      return '';
  }
});

let persons = [
    {
        "id": 1,
        "name": "Arto Hellas",
        "number": "040-123456"
      },
      {
        "id": 2,
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
      },
      {
        "id": 3,
        "name": "Dan Abramov",
        "number": "12-43-234345"
      },
      {
        "id": 4,
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
      }
]

app.get('/info', (request, response) => {
    response.send(   
     `Phonebook has info for ${persons.length} people<br/>
     ${Date()}`
    )
  })

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)

    if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
  })

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
    response.status(204).end()
})


    


  app.post('/api/persons', (request, response) => {
    const body = request.body
    const newId = Math.random(9999999)
    const nameRepeated = persons.some(person => person.name === body.name);
    if (!body.name) {
      return response.status(400).json({
        error: 'name missing'
      })
    }

    if (nameRepeated) {
        return response.status(400).json({
          error: 'name must be unique'
        })
      }

    if (!body.number) {
        return response.status(400).json({
          error: 'number missing'
        })
      }
  
    const person = {
      id: newId,
      name: body.name,
      number: body.number
    }
  
    persons = persons.concat(person)
  
    response.json(person)
  })

  const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})


