const cors = require('cors');
const express = require('express')
const bodyParser = require('body-parser')

const app = express()

const fs = require("fs")
const YAML = require('yaml')
const swaggerUi = require('swagger-ui-express');

const file  = fs.readFileSync('./swagger.yaml', 'utf8')
const swaggerDocument = YAML.parse(file)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

require("dotenv").config();

app.use(cors());
app.use(bodyParser.json())

const userRouter = require("./routes/user.routes")

app.use("/user", userRouter)

app.listen(3001);