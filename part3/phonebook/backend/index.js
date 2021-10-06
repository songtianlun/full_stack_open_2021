const express = require('express')
var morgan = require('morgan')

const app = express()
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
    let info = `PhoneBook has info for ${persons.length} people. </br> ${new Date()}`
    res.send(info)
})

app.get('/api/persons', (req, res) => {
    res.json(persons)
})

app.post('/api/persons', (req, res) => {
    const body = req.body
    let hasPerson = -1
    
    if (!body.name || !body.number) {
        return res.status(400).json({ 
          error: 'content missing' 
        })
    }

    persons.forEach((item) => {
        if(item.name == body.name) {
            hasPerson = item.id
        }
    })
    if(hasPerson < 0) {
        const person = {
            name: body.name,
            number: body.number,
            id: generateId(),
        }
        persons = persons.concat(person)
        // console.log(person)
        res.json(person)
    } else {
        console.log(`already has ${body.name} with id ${hasPerson}`)
        res.status(400).json({
            error: `name must be unique`
        })
    }
    
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find( person => (person.id === id))
    console.log(id, person)
    if (person) {
        res.json(person)
    } else {
        res.status(404).end()
    }
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter(note => note.id !== id)
    res.status(204).end()
})

app.use(unknownEndpoint)

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})