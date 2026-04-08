import exp from 'express'
import { add, Delete, Edit, home, submit, update } from './controller/Control.js'
import { MongoClient } from 'mongodb'
import cors from 'cors'
const url = "mongodb://localhost:27017"
const client = new MongoClient(url)
const app = exp()
app.set('view engine','ejs')
app.use(exp.json())
app.use(cors())
app.use(exp.urlencoded({extended:true}))
export const dbConnection = async() => {
    await client.connect()
    const db = client.db("Data")
    return db
}
app.get("",home)
app.get("/add",add)
app.delete("/delete/:id",Delete)
app.get("/update/:id",update)
app.post("/submit",submit)
app.put("/edit",Edit)
app.listen(5000,() => {
    console.log(`Server running`)
})