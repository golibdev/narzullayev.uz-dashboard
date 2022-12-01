const keyUser = 'authx.user';
import { authApi } from '../api/auth'

function setSession(user, token) {
   // Remove the password property.
   const { password, ...rest } = user;
 
   // Merge token to the final object.
   const merged = {
     ...rest,
     token,
   };
 
   localStorage.setItem(keyUser, JSON.stringify(merged));
}

function getSession() {
   const user = localStorage.getItem(keyUser);
 
   return JSON.parse(user);
}

function isAuth() {
   return !!getSession();
}

async function login(username, password) {
   try {
      const params = { username, password };
      const res = await authApi.login(params);
      const admin = res.data.admin
      const token = res.data.token;
      const message = res.data.message;
      setSession(admin, token)
      return {message, status: 200}
   } catch (err) {
      return {message: err.response.data.message, status: 400}
   }
}

async function logout() {
   try {
      localStorage.clear(keyUser);
   } catch (err) {}
}

export {
   getSession, isAuth, login, logout
}