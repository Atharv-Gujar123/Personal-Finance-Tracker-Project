import exp from 'express'
import { add, Delete, Edit, home, submit, update,register,login, forgot, reset } from './controller/Control.js'
import { MongoClient } from 'mongodb'
import cors from 'cors'
import jwt from 'jsonwebtoken'
const url = "mongodb://localhost:27017"
const client = new MongoClient(url)
const app = exp()
app.set('view engine','ejs')
app.use(exp.json())
app.use(cors())
app.use(exp.urlencoded({extended:true}))
const auth = (req,res,next) => {
    const header = req.headers.authorization;
    if(!header){
        console.log(header)
        console.log('unauthorized')
        return res.status(401).json({message:"Unauthorized"})
    }
    const token = header.split(" ")[1]
    try{
        const decoded = jwt.verify(token,"SECRET_KEY")
        req.user = decoded
        next()
    }catch(err){
        console.log(err)
        return res.status(401).json({message:"Unauthorized"})
}}

export const dbConnection = async() => {
    await client.connect()
    const db = client.db("Data")
    return db
}
app.post("/reset",reset)
app.post("/forgot",forgot)
app.post("/register", register)
app.post("/login", login)
app.get("/dashboard",auth,home)
app.get("/add",auth,add)
app.delete("/delete/:id",auth,Delete)
app.get("/update/:id",auth,update)
app.post("/submit",auth,submit)
app.put("/edit",auth,Edit)
app.listen(5000,() => {
    console.log(`Server running`)
})