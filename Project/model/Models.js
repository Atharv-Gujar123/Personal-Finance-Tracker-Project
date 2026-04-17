import { ObjectId } from "mongodb";
import { dbConnection } from "../index.js";
export const getUsers = async(query,sort) => {
    const db = await dbConnection()
    const result = await db.collection('transactions').find(query).sort(sort).toArray()
    return result
}

export const addUsers = async(transactions) => {
    const db = await dbConnection()
    const result = await db.collection('transactions').insertOne(transactions)
    return result
}

export const DeleteById = async(id) => {
    const db = await dbConnection()
    const result = await db.collection('transactions').deleteOne({_id:new ObjectId(id)})
    return result
}

export const getById = async(id) => {
    const db = await dbConnection()
    const result = await db.collection('transactions').findOne({_id:new ObjectId(id)})
    return result
}
export const updateById = async(id,transaction) => {
    const db = await dbConnection()
    const result = await db.collection('transactions').updateOne({_id: new ObjectId(id)},{$set: transaction})
    return result
}
export const Total = async() => {
    const db = await dbConnection()
    const result = db.collection('transactions').aggregate([{$group:{ _id : "$Type", total : {$sum :"$Amount"}}}]).toArray()
    return result
}
export const findByEmail = async(email) => {
        const db = await dbConnection()
    return await db.collection('users').findOne({email})
}
export const createUser = async(user) => {
        const db = await dbConnection()
    return await db.collection('users').insertOne(user)
}
export const modifyUser = async(userId,password) => {
    const db = await dbConnection()
    return await db.collection('users').updateOne({_id: userId},{$set: {password: password},$unset: {resetToken: "", resetTokenExpiry: ""}})
}
export const addUserData = async(userId,token,expiry) => {
    const db = await dbConnection()
    return await db.collection('users').updateOne({_id: userId},{$set: {
        resetToken: token,
        resetTokenExpiry: expiry
    }})
}
export const findByToken = async(token) => {
    const db = await dbConnection()
    return await db.collection('users').findOne({resetToken: token})
}