import Router from 'express'
import {auth} from './../../middleware/auth.js'
import {addToCart , allCart , updateCart , removeFromCart} from './controller/cart.controller.js'
const router = Router()

router.post('/' ,auth, addToCart)
router.get('/' ,auth, allCart )
router.put('/' ,auth, updateCart )
router.delete('/' ,auth, removeFromCart )
export default router