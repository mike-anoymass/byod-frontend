import { Routes, Route, } from 'react-router-dom'
import { Home, } from './containers';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { LoginContext } from './reactcontext/ReactContext'
import { Login } from './components';
import { Welcome } from './containers';
import Register from './components/Register';

function App() {
  const [loginInfo, setLoginInfo] = useState({
    userDetails: {
      id: '',
      email: '',
      firstName: '',
      lastName: '',
      gender: '',
      role: '',
    },
    loginStatus: false
  })

  const apiUrl = 'http://localhost:3001'
  
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios.get(`${apiUrl}/auth`, {
      headers: {
        loginToken: localStorage.getItem('loginToken')
      }
    })
    .then(res => { 
      setLoading(false)
      console.log(res.data)
      setLoginInfo({
        ...loginInfo,
        userDetails: {
          id: res.data.user.id,
          email: res.data.user.email,
          firstName: res.data.user.firstName,
          lastName: res.data.user.lastName,
          role: res.data.user.role,
          gender: res.data.user.gender,
        },
        loginStatus: res.data.loginStatus
      })
    })
    .catch(err => {
      setLoading(false)
      console.log(err.response.data.error)
    })
  }, [])

  if(!loading){
    return (
      <LoginContext.Provider value={{loginInfo, setLoginInfo}}>
        
        <div className="w-full h-full flex flex-col items-center justify-center bg-dimWhite font-poppins">
            <Routes>
              <Route path='/' element={<Welcome />} exact/>
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />
              <Route path='*' element={<Home />}/>
            </Routes>
        </div>
      </LoginContext.Provider>
    );
  }else{
    (
      <div>Loading... Please Wait</div>
    )
  }
  
}

export default App;
