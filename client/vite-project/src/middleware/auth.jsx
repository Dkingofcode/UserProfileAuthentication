import { Navigate } from "react-router-dom";


export const AuthorizeUser = ({ children }) => {
    const data = localStorage.getItem('token');
    if(!token){
        return <Navigate to={'/'} replace={true}></Navigate>
    }
    return children;
}

export const protectedRoute = () => {
    const username = auth.state.username
    if(username){
        return <Navigate to={'/'} replace={true}></Navigate>
    } 
    return 
}















