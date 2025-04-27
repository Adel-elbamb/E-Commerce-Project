import connection from "../DB/connection.js"
import userRouter from './module/user/user.route.js'
const boostrap = (app, express)=> {
    app.use(express.json())
    connection()
    app.use('/user' , userRouter)
}

export default boostrap