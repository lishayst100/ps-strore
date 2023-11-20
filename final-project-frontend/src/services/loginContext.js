import{ createContext, useState }from"react"
;
const AuthContext = createContext()
;
const UserContextProvider = ({ children }) =>{
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState(undefined);
  const [email, setEmail] = useState(undefined);
  const [token, setToken] = useState(undefined);
  const [isAdmin , setIsAdmin] = useState(false)

  

  const Userlogin = (username, email, token) => {
    setIsLoggedIn(true);
    setEmail(email);
    setUsername(username);
    setToken(token);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setIsAdmin(false)
    setToken(undefined);
    setEmail(undefined);
    setUsername(undefined);
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    
  };

  const adminLogin = (username,email,token) => {
    setIsLoggedIn(true);
    setIsAdmin(true)
    setEmail(email);
    setUsername(username);
    setToken(token);
  }
  const contextValues = {
    isLoggedIn,
    username,
    token,
    email,
    isAdmin,
    Userlogin,
    logout,
    setIsLoggedIn,
    adminLogin,
    
  };
  return (
    <AuthContext.Provider value={contextValues}>
      {children}
    </AuthContext.Provider>
  );
};


export default AuthContext
export {AuthContext , UserContextProvider}