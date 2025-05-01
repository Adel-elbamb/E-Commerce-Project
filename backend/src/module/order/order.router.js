import Router from 'express'
import {createOrder} from './controller/oreder.controller.js'
const router = Router()

router.post('/' , createOrder)


export default router