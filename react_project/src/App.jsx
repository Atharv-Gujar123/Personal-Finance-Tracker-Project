import { Card } from './components/Card.jsx'
import { Navbar } from './components/Navbar.jsx'
import { Routes,Route, Outlet } from 'react-router-dom'
import './App.css'
import { Dashboard } from './components/Dashboard.jsx'
import { Add } from './components/Add.jsx'
import { Update } from './components/Update.jsx'
import { TransactionProvider } from './Context/TransactionContext.jsx'
import { Login } from './components/Login.jsx'
import { Register } from './components/Register.jsx'
import { Forgot } from './components/Forgot.jsx'
import { Reset } from './components/Reset.jsx'
import { NotFound } from './components/notFound.jsx'
import { Protect } from './components/Protect.jsx'
import { useState } from 'react'
import {ToastContainer} from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
const AppLayout = () => {

  return(
    <>
    <Protect>
      <Navbar/>
    <Outlet/>
    </Protect>
    
    </>
  )
}
const AuthLayout = () => {
  return(
    <>
    <Outlet/>
    </>
  )
}

function App() {
  const [data,setData] = useState("")
  return (
    <>
    <TransactionProvider>
    <Routes>
      <Route element = {<AuthLayout/>}>
      <Route path = "/forgot" element = {<Forgot/>}/>
      <Route path = "/forgot/reset" element = {<Reset/>}/>
      <Route path = "/register" element = {<Register data = {data}/>}/>
        <Route path = "/" element = {<Login setData = {setData}/>}/>
 </Route>
      <Route element = {<AppLayout/>}>
      <Route path = "/dashboard" element = {<Dashboard/>}/>
      <Route path = "/add" element = {<Add/>}/>
      <Route path = "/Transactions" element = {<Card/>}/>
      <Route path="/Update/:id" element = {<Update/>}/>
      </Route>
      <Route path='*' element = {<NotFound/>}></Route>
    </Routes>
     <ToastContainer autoClose = {1000}/>
    </TransactionProvider>
    </>
  )
}

export default App
