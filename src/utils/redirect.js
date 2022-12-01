import { isAuthenticated } from "../handlers/authHandler";

export const redirectAdminPanel = (path, navigate) => {
   const token = localStorage.getItem('token');
   const isAuth = isAuthenticated(token)
   if (isAuth) return navigate(path)
}

export const redirectLoginPage = (path, navigate) => {
   const token = localStorage.getItem('token');
   const isAuth = isAuthenticated(token)
   if (!isAuth) return navigate(path)
}