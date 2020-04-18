const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const swaggerUi = require('swagger-ui-express')

const swaggerDocument = require('./swagger.json')
const routes = require('./src/routes')

const port = process.env.PORT || 8080
const uri =
  process.env.ATLAS_URI ||
  'mongodb://admin:note1123@cluster0-shard-00-00-bom0x.mongodb.net:27017,cluster0-shard-00-01-bom0x.mongodb.net:27017,cluster0-shard-00-02-bom0x.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority'

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
app.use((err, req, res, next) => {
  handleError.handleError(err, res)
})
app.use(routes)

app.listen(port)
