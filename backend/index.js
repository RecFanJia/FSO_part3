require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')


const app = express()
app.use(express.json())
app.use(cors())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
app.use(express.static('dist'))

morgan.token('body', function (req, res) {
  if (req.method === 'POST' && req.headers['content-type'] && req.headers['content-type'].includes('application/json')) {
      return JSON.stringify(req.body);
  } else {
      return '';
  }
});


//app.get('/info', (request, response) => {
//    response.send(   
//     `Phonebook has info for ${persons.length} people<br/>
//     ${Date()}`
//    )
//  })

app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})


app.get('/api/persons/:_id', (request, response) => {
  Person.findById(request.params._id).then(person => {
    response.json(person)
  })
  })

app.delete('/api/persons/:_id', (request, response) => {
    Person.findByIdAndDelete(request.params._id)
    .then(result => {
      if (result) {
        response.status(204).end();
      } else {
        response.status(404).end();
      }
    })
    .catch(error => next(error));
})

app.post('/api/persons', (request, response) => {
  const body = request.body
  
  if (body.name===undefined) {
    return response.status(400).json({
      error: 'name missing'
    })
  }

  if (body.number===undefined) {
    return response.status(400).json({
      error: 'number missing'
    })
  }
  //const nameRepeated = persons.some(person => person.name === body.name);
  //if (nameRepeated) {
  //    return response.status(400).json({
  //      error: 'name must be unique'
  //    })
  //  }

const person = new Person({
  name: body.name,
  number: body.number 
})

person.save().then(savedPerson => {
  response.json(savedPerson)
})
})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})


