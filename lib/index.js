import { Client } from './client'
const createClient = (options) => new Client(options)
export const tvmaze = {
  createClient
}
