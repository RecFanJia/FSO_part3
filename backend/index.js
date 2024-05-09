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


app.get('/info', (request, response, next) => {
  Person.countDocuments({})
  .then(count => {
      response.send(`
          Phonebook has info for ${count} people<br/>
          ${new Date()}
      `);
  })
  .catch(error => next(error)); 
})

app.get('/api/persons', (request, response) => {
  Person.find({})
  .then(persons => {
    response.json(persons)
  })
})


app.get('/api/persons/:_id', (request, response, next) => {
  Person.findById(request.params._id)
  .then(person => {
    if (person) {
      response.json(person)
    } else {
      response.status(404).end()
    }
  })
  .catch(error => next(error))
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

app.post('/api/persons', (request, response, next) => {
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
.catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const { id } = request.params;
  const { number } = request.body;

  Person.findByIdAndUpdate(id, { number }, { new: true, runValidators: true, context: 'query' })
    .then(updatedPerson => {
      if (updatedPerson) {
        response.json(updatedPerson);
      } else {
        response.status(404).json({ error: 'Person not found' });
      }
    })
    .catch(error => next(error));
});

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }  else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})


