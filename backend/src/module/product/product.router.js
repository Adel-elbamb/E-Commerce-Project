import Router from 'express'
import {createProduct , updateProduct ,deleteProduct , getAllProducts , getProductById} from './controller/product.controller.js'
import {auth} from '../../middleware/auth.js'
const router = Router()


router.post('/' ,auth,createProduct )
router.get('/' , getAllProducts)
router.put('/:productId' , updateProduct)
router.delete('/:productId' , deleteProduct)
router.get('/:productId' , getProductById)

export default router