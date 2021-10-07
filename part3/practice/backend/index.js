const express = require('express')
const cors = require('cors')
const Note = require('./models/node')

const app = express()

app.use(express.json())
app.use(cors())

let notes = [
    {
      id: 1,
      content: "HTML is easy",
      date: "2019-05-30T17:30:31.098Z",
      important: true
    },
    {
      id: 2,
      content: "Browser can execute only Javascript",
      date: "2019-05-30T18:39:34.091Z",
      important: false
    },
    {
      id: 3,
      content: "GET and POST are the most important methods of HTTP protocol",
      date: "2019-05-30T19:20:14.298Z",
      important: true
    }
]

const generateId = () => {
    const maxId = notes.length > 0
      ? Math.max(...notes.map(n => n.id))
      : 0
    return maxId + 1
}

app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>')
})

app.get('/api/notes', (req, res) => {
    Note.find({}).then((note) => {
        res.json(note)
    })
})

app.post('/api/notes', (req, res) => {
    const body = req.body
    
    if (!body.content) {
        return res.status(400).json({ 
          error: 'content missing' 
        })
    }
    
    const note = new Note({
        content: body.content,
        important: body.important || false,
        date: new Date(),
    })
    note.save().then((savedNote) => {
        notes = notes.concat(note)
        res.json(savedNote)
    })
})

app.get('/api/notes/:id', (req, res, next) => {
    // const id = Number(req.params.id)
    Note.findById(req.params.id).then(note => {
        if(note) {
            res.json(note)
        } else {
            res.status(404).end()
        }
    }).catch(error => next(error))
})

app.put('/api/notes/:id', (req, res) => {
    // const id = Number(req.params.id)
    const body = req.body
    const note = {
        content: body.content,
        important: body.important
    }
    Note.findByIdAndUpdate(req.params.id, note, {new: true})
        .then(updateNote => {
            res.json(updateNote)
        })
        .catch(err => next(err))
    // let note = notes.find(note => note.id === id)

    // if (body.important !== undefined){
    //     note.important = body.important
    // }

    // notes = notes.map(n=>n.id !== id ? n : note)
    // console.log(note)
    // res.json(note)
})

app.delete('/api/notes/:id', (req, res) => {
    // const id = Number(req.params.id)
    // notes = notes.filter(note => note.id !== id)
    Note.findByIdAndRemove(req.params.id)
        .then(result => {
            res.status(204).end()        
        })
        .cache(err => next(err))
    
})

const errorHandler = (error, request, response, next) => {
    console.error(error.message)
  
    if (error.name === 'CastError' && error.kind === 'ObjectId') {
      return response.status(400).send({ error: 'malformatted id' })
    } 
  
    next(error)
}

const unknownEndpoint = (request, response) => {
response.status(404).send({ error: 'unknown endpoint' })
}

// handler of requests with unknown endpoint
app.use(unknownEndpoint)
  
  // 这是最后加载的中间件
app.use(errorHandler)

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})