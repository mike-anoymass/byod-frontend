import React, { useContext, useEffect, useState, } from 'react'
import Logo from '../assets/logo.png'
import { Formik } from 'formik'
import { LoginForm } from '../components'
import * as Yup from 'yup'
import swal from 'sweetalert'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { LoginContext } from '../reactcontext/ReactContext'

const Login = () => {

  const navigate = useNavigate()
  const { loginInfo, setLoginInfo } = useContext(LoginContext)
  const [loading, setLoading] = useState(false)
  const apiUrl = 'http://localhost:3001';

  useEffect(() => {
    if(loginInfo.loginStatus){
      navigate('/dashboard')
    }
  }, [loginInfo])

  const initialValues= {
    email: '',
    passwd: '',
  }

  const validationSchema = Yup.object().shape({
    email: Yup.string()
        .email('Email must be valid')
        .required('Email is required'),
    passwd: Yup.string()
        .required('Password is required')
  })

  const onSubmit = data => {
    //alert(JSON.stringify(data))
    setLoading(true)
    axios.post(`${apiUrl}/auth/login`, { ...data , password: data.passwd})
    .then(res => {
      setLoading(false)
  
      localStorage.setItem('loginToken', res.data)

      axios.get(`${apiUrl}/auth`, {
            headers: {
              loginToken: localStorage.getItem('loginToken')
            }
          })
          .then(res => {
            const userData = {
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
            }

            setLoginInfo(userData)

            console.log(res.data)

            navigate('/dashboard')
          })
          .catch(err => {
          
            if(err.response){
              console.log(err.response.data.error)
            }else{
              console.log(err)
            }
          })
            
    })
      .catch(err => {

        if(err.response){
            swal({
                icon: 'error',
                title: 'Error !',
                text: JSON.stringify(err.response.data),
            })
        }else{
            swal({
                icon: 'error',
                title: 'Error !',
                text: JSON.stringify(err.message),
            })
        }
      
        setLoading(false)
      })
  }

  return (
    //login container
    <div className='h-[100vh] mx-2 flex flex-1 md:flex-row items-center flex-col w-[375px]'>
      {/* login details */}
      <div className='h-full flex flex-col flex-1 py-5'>
        {/* rectangle */}
        <div className='py-3 flex flex-row justify-center'>
            <img src={Logo} alt="LOGO" className='w-24'/>
        </div>
        <div className='flex flex-col p-3 px-5 bg-primary rounded-lg'>
            <h1 className='text-gradient text-[18pt] font-bold text-center'>Login to BYOD</h1>
        </div>

        {/* input collection */}
        <div className='flex flex-col p-3 overflow-auto'>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
                <LoginForm loading={loading}/>
            </Formik>
        </div>

        <Link to={'/register'}>Register Here</Link> 
      </div>

      
    </div>
  )
}

export default Login
