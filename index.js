const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const swaggerUi = require('swagger-ui-express')

const swaggerDocument = require('./swagger.json')
const routes = require('./src/routes')

const port = process.env.PORT || 8080
const uri =
  process.env.ATLAS_URI ||
  ''

const app = express()

app.use(cors())
app.use(express.json())

mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false
})

app.use('/apiDocs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
app.use(routes)

app.listen(port)
