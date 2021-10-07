const express = require('express')
const cors = require('cors')
var morgan = require('morgan')
const Person = require('./models/person')

const app = express()
app.use(cors())
const requestLogger = (request, response, next) => {
    console.log('Method:', request.method)
    console.log('Path:  ', request.path)
    console.log('Body:  ', request.body)
    console.log('---')
    next()
}
const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}
// app.use(requestLogger)
morgan.token('body', 
    function (req, res) {
        return JSON.stringify(req.body)
    })
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
app.use(express.json())

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

const generateId = () => {
    const maxId = persons.length > 0
      ? Math.max(...persons.map(n => n.id))
      : 0
    return maxId + 1
}

app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>')
})

app.get('/info', (req, res) => {
    Person.find({}).then((person) => {
        let info = `PhoneBook has info for ${person.length} people. </br> ${new Date()}`
        res.send(info)
    })
})

app.get('/api/persons', (req, res) => {
    Person.find({}).then((person) => {
        res.json(person)
    })
})

app.post('/api/persons', (req, res) => {
    const body = req.body
    let hasPerson = -1
    
    if (!body.name || !body.number) {
        return res.status(400).json({ 
          error: 'content missing' 
        })
    }
    Person.find({}).then((person) => {
        person.forEach(item => {
            if(item.name == body.name) {
                hasPerson = item.id
            }
        })

        if(hasPerson < 0) {
            const person = new Person({
                name: body.name,
                number: body.number,
            })
            person.save().then(savePerson => {
                res.json(person)
            })
            // persons = persons.concat(person)
            // console.log(person)
        } else {
            console.log(`already has ${body.name} with id ${hasPerson}`)
            res.status(400).json({
                error: `name must be unique`
            })
        }
    })

    // persons.forEach((item) => {
    //     if(item.name == body.name) {
    //         hasPerson = item.id
    //     }
    // })
    
    
})

app.get('/api/persons/:id', (req, res, next) => {
    Person.findById(req.params.id).then(person => {
        if(person) {
            res.json(person)
        } else {
            res.status(404).end()
        }
    }).catch(err => next(err))
})

app.delete('/api/persons/:id', (req, res, next) => {
    Person.findByIdAndRemove(req.params.id)
        .then(result => {
            res.status(204).end()
        })
        .catch(err => next(err))
})

const errorHandler = (error, request, response, next) => {
    console.error(error.message)
  
    if (error.name === 'CastError' && error.kind === 'ObjectId') {
      return response.status(400).send({ error: 'malformatted id' })
    } 
  
    next(error)
}

// handler of requests with unknown endpoint
app.use(unknownEndpoint)
  
  // 这是最后加载的中间件
app.use(errorHandler)


const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})