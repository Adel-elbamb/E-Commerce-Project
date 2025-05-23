import connection from "../DB/connection.js"
// import userRouter from './module/user/user.route.js'
import AuthRouter from './module/auth/auth.router.js'
import productRouter from './module/product/product.router.js'
// import OrderRouter from './../src/module/order/order.router.js'
import cartRouter from './module/cart/cart.router.js'
import { globalError } from "./utils/asyncHandler.js"
import cors from 'cors'
const boostrap = (app, express)=> {
    app.use(express.json())
    // app.use(cors());
    connection()
    // app.use('/user' , userRouter)
    app.use('/product' , productRouter)
    app.use('/auth' , AuthRouter) 
    app.use('/cart' , cartRouter)
    // app.use('/order' , OrderRouter)
    app.use('/{*eny}', (req, res, next) => {
        res.status(404).json({ 
            success: false,
            message: `Can't find this route: ${req.originalUrl}` 
        });
    });
    


    app.use(globalError)
}

export default boostrap