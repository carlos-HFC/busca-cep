import axios from 'axios'

export const api = (cep: string) => axios.create({
  baseURL: 'https://viacep.com.br/ws'
}).get(`/${cep}/json`)