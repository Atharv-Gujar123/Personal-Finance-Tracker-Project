import {
  addUsers,
  createUser,
  DeleteById,
  findByEmail,
  getById,
  getUsers,
  Total,
  updateById,
} from "../model/Models.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export const home = async (req, res) => {
  let query = {};
  let sort = { Date: 1 };
  if (req.query.filter) {
    const [type, id] = req.query.filter.split("-");
    query = { [type]: id };
  }
  if (req.query.sort) {
    const [type, value] = req.query.sort.split(".");
    sort = { [type]: value };
  }
  const result = await getUsers(query, sort);
  const total = await Total(); 
  const date = result.map((item) => {
    return item.Date.toISOString().split("T")[0];
  });
    // res.render("Home", {
    //   data: result,
    //   date: date,
    //   income: 100,
    //   expense: 300,
    //   selectFilter : req.query.filter,
    //   selectSort : req.query.sort,
    // });
   res.json({result:result});
};
export const add = async (req, res) => {
  res.render("Register");
};
export const update = async (req, res) => {
  const id = req.params.id;
  const result = await getById(id);
  const date = result.Date.toISOString().split("T")[0];
  res.render("Login", { data: result, date: date });
};
export const Delete = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await DeleteById(id);
    return res.status(200).json({
      success: true,
      message: "Deleted",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "failed",
    });
  }
};
export const submit = async (req, res) => {
  try{
  const { type, Amount, category, date } = req.body;
  const transaction = {
    Type: type,
    Amount: Number(Amount),
    Category: category,
    Date: new Date(date),
  };
  const add = await addUsers(transaction);
  return res.status(200).json({
    status:true,
    message: "success"
  })
} catch(err){
  return res.status(400).json({
    status:false,
    message:err
  })
}
};
export const Edit = async (req, res) => {
  try {
    const { id, type, Amount, category, date } = req.body;
    const transaction = {
      Type: type,
      Amount: Number(Amount),
      Category: category,
      Date: new Date(date),
    };
    const update = await updateById(id, transaction);
    return res.status(200).json({
      status: true,
      message: "updated",
    });
  } catch (err) {
    return res.status(400).json({
      status: false,
      message: err,
    });
  }
};
export const register = async(req,res) => {
  const {email, password} = req.body
  try{
    const existing = await findByEmail(email)
    if(existing){
      return res.json({
        message:"User already exists"
      })
    }
    const hashed = await bcrypt.hash(password,10)
    const result = await createUser({email,password:hashed})
    return res.status(201).json({
      message:"User registered"
    })
  } catch(err){
    return res.status(500).json({
      message:err
    })
  }
}
export const login = async(req,res) => {
  const {email, password} = req.body
  try{
    const user = await findByEmail(email)
    if(!user){
      return res.status(400).json({
        message:"Invalid credentials"
      })
    }
    const match = await bcrypt.compare(password,user.password)
    if(!match){
      return res.status(400).json({
        message:"Invalid password"
      })
    }
    const token = jwt.sign(
      {id: user._id},
      "SECRET_KEY",
      {expiresIn:"1d"}
    )
      res.json({token})
  } catch(err){
    return res.status(500).json({
      message:err
    })
  }
}