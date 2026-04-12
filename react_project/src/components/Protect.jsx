import { Navigate } from "react-router-dom"
export const Protect = ({children}) => {
    const token = localStorage.getItem('token')
    if(!token){
        return <Navigate to="/"/>;
    }
    return children
}