import { ErrorMessage, Field, Form, Formik } from 'formik'
import React, { useContext, useState } from 'react'
import { ColorRing } from 'react-loader-spinner'
import { Navigate, useNavigate } from 'react-router-dom'
import AuthContext from '../../services/loginContext'
import { initialValues, validationSchema } from '../../validations/register'
import { baseUrl } from '../../features/utils'


const SignUp = () => {

    const [isLoading , setIsLoading] = useState(false)
    const {isLoggedIn } = useContext(AuthContext);
    const [errMessage, setErrMessage] =useState('');
    const nav = useNavigate()

    const handleRegister = (formValues) => {
        fetch(`${baseUrl}api/auth/signup`, {
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formValues),
          method: "POST",
        })
          .then((res) => res.json())
          .then((json) => {setErrMessage(json.message)
            if(json.message === 'User Saved'){
                setTimeout(()=>{
                    nav("/login");
                },2000)
                
            }
        })
          .catch((e) => alert(e.message))
          
    }

    if(isLoggedIn){
        return <Navigate to={'/'}/>
    }


  return (
    <div className="container d-flex justify-content-center p-5 bodyv align-items-center">
      {isLoading && <ColorRing />}
      <Formik
        initialValues={initialValues}
        onSubmit={handleRegister}
        validationSchema={validationSchema}
      >
        <Form className="shadow-lg d-flex flex-column justify-content-center align-items-center gap-3 p-4 rounded bg-light rounded-5 w-100">
          <h3>Sign Up</h3>
          <div className="d-flex flex-column align-items-start w-75 gap-2">
            <label htmlFor="username" className="font-bolder">
              Username:
            </label>
            <Field
              name="username"
              type="text"
              className="form-control"
              id="username"
            />
            <ErrorMessage
              name="username"
              component="div"
              className="text-danger"
            />
          </div>
          <div className="d-flex flex-column align-items-start w-75 gap-2">
            <label htmlFor="email" className="font-bolder">
              Email:
            </label>
            <Field
              name="email"
              type="text"
              className="form-control"
              id="email"
            />
            <ErrorMessage
              name="email"
              component="div"
              className="text-danger"
            />
          </div>
          <div className="d-flex flex-column align-items-start w-75 gap-2">
            <label htmlFor="password" className="font-bolder">
              Password:
            </label>
            <Field
              name="password"
              type="text"
              className="form-control"
              id="password"
            />
            <ErrorMessage
              name="password"
              component="div"
              className="text-danger"
            />
          </div>
          <div className="d-flex flex-column align-items-start w-75 gap-2">
            <label htmlFor="phone" className="font-bolder">
              Phone:
            </label>
            <Field
              name="phone"
              type="text"
              className="form-control"
              id="phone"
            />
            <ErrorMessage
              name="phone"
              component="div"
              className="text-danger"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            onClick={handleRegister}
            className="btn btn-primary"
          >
            Register
          </button>
          <div className="font-bolder">{errMessage}</div>
        </Form>
      </Formik>
    </div>
  );
}

export default SignUp