import { Card } from './components/Card.jsx'
import { Navbar } from './components/Navbar.jsx'
import { Routes,Route } from 'react-router-dom'
import './App.css'
import { Dashboard } from './components/Dashboard.jsx'
import { Add } from './components/Add.jsx'
import { Update } from './components/Update.jsx'
import { TransactionProvider } from './Context/TransactionContext.jsx'
import { Login } from './components/Login.jsx'
import { Register } from './components/Register.jsx'
function App() {
  return (
    <>
    <TransactionProvider>
    <Navbar/>
    <Routes>
      <Route path = "/register" element = {<Register/>}/>
      <Route path = "/dashboard" element = {<Dashboard/>}/>
      <Route path = "/" element = {<Login/>}/>
      <Route path = "/add" element = {<Add/>}/>
      <Route path = "/Transactions" element = {<Card/>}/>
      <Route path="/Update/:id" element = {<Update/>}/>
    </Routes>
    </TransactionProvider>
    </>
  )
}

export default App
