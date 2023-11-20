import { ErrorMessage, Field, Form, Formik } from "formik";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/auth";
import AuthContext from "../../services/loginContext";
import { initialValues, validationSchema } from "../../validations/login";
import { useState } from "react";
import { ColorRing } from "react-loader-spinner";
import { FiEyeOff, FiEye } from "react-icons/fi";

const AdminLogin = () => {
  const nav = useNavigate();
  const { adminLogin } = useContext(AuthContext);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [type, setType] = useState("password");


  const showPassword = () => {
    if (type === "password") {
      setType("text");
    } else {
      setType("password");
    }
  };

  return (
    <div className="bodyv d-flex justify-content-center align-items-center">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          setIsLoading(true);
          setTimeout(() => {
            login(values.email, values.password)
              .then((res) => {
                const token = res.accessToken;
                const username = res.username;
                const email = res.email;
                adminLogin(username, email, token);
                nav("/");
              })
              .catch((e) => {
                setError(true);
              });
            setIsLoading(false);
            setSubmitting(false);
          }, 2000);
        }}
      >
        <Form className="bg-light text-dark d-flex gap-2 flex-column align-items-center mx-auto bg-light rounded-5  p-4 shadow-lg text login-container">
          <h3>Admin Login:</h3>
          <div className=" d-flex flex-column align-items-start justify-content-center gap-2 inputs">
            <label htmlFor="email" className="font-bolder">
              Email:
            </label>
            <Field
              name="email"
              type="text"
              className="form-control"
              id="email"
            />
          </div>
          <ErrorMessage name="email" component="div" className="text-danger" />
          <div className="d-flex flex-column align-items-start justify-content-center gap-2 ">
            <label htmlFor="password" className="font-bolder">
              Password:
            </label>
            <div className="d-flex align-items-center gap-2 inputs">
              <Field
                name="password"
                type={type}
                className="form-control"
                id="password"
              />
            </div>
            <span
              onClick={() => {
                showPassword();
              }}
            >
              {type === "password" ? (
                <>
                  <FiEye />
                  <span className="mx-1">Show Password</span>
                </>
              ) : (
                <>
                  <FiEyeOff />
                  <span className="mx-1">Hide Password</span>
                </>
              )}
            </span>
          </div>
          <ErrorMessage
            name="password"
            component="div"
            className="text-danger"
          />
          {isLoading && <ColorRing />}
          {error && (
            <div className="text-danger font-bolder">
              Email Or Password is incorrect!!!
            </div>
          )}
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default AdminLogin;
