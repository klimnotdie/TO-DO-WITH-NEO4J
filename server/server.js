import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import { initDriver } from './neo4j.js'
import { configureTasksRoutes } from './tasks/tasks.routes.js'
import { APP_PORT, NEO4J_PASSWORD, NEO4J_URI, NEO4J_USERNAME } from './conf.js'
import errorMiddleware from './middleware/error.middleware.js'
const app = express()
const port = APP_PORT

app.use(cors({ origin: true }))
app.use(bodyParser.json())

initDriver(NEO4J_URI, NEO4J_USERNAME, NEO4J_PASSWORD)

const router = express.Router()
configureTasksRoutes(app, router)
app.use('/api', router)
app.use(errorMiddleware)

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})
