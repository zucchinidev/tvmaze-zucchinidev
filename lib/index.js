import { Client } from './lib/client'
const createClient = (options) => new Client(options)
export const tvmaze = {
  createClient
}
