import Router from 'express'
import {createProduct , updateProduct ,deleteProduct , getAllProducts , getProductById} from './controller/product.controller.js'
import {auth ,restrictTo} from '../../middleware/auth.js'
import validation from '../../middleware/validation.js'
import {createProductSchema} from './product.validation.js'
const router = Router()


router.post('/' ,auth,restrictTo('seller'),validation(createProductSchema),createProduct )
router.get('/' , getAllProducts)
router.put('/:productId' , updateProduct)
router.delete('/:productId' , deleteProduct)
router.get('/:productId' , getProductById)

export default router