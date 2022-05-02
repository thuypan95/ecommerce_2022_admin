import { io } from 'socket.io-client'
import { urlBackend } from './api/config'
export const socket = io(urlBackend)