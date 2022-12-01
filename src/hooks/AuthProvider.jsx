import { createContext } from "react";
import { isAuth, login, logout, getSession } from '../services/MockAuthServices'

const AuthContext = createContext(null);

function AuthProvider({ children, ...rest }) {
   const auth = {
      getSession,
      isAuth,
      login,
      logout
   };

   return (
      <AuthContext.Provider value={auth} {...rest}>
         {children}
      </AuthContext.Provider>
   )
}

export { AuthContext };
export default AuthProvider;