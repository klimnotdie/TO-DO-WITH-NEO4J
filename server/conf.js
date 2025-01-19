import { config } from 'dotenv'
import path from 'path'
import appRoot from 'app-root-path'
const env = process.env
config({
  path: path.join(appRoot.path, './', `.env.${env.NODE_ENV}`),
})

export const APP_PORT = process.env.APP_PORT || 3000
export const NEO4J_URI = process.env.NEO4J_URI
export const NEO4J_USERNAME = process.env.NEO4J_USERNAME
export const NEO4J_PASSWORD = process.env.NEO4J_PASSWORD
