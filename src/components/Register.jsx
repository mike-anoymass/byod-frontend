import React, { useContext, useEffect, useState } from "react";
import Logo from "../assets/logo.png";
import { Formik } from "formik";
import * as Yup from "yup";
import swal from "sweetalert";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { LoginContext } from "../reactcontext/ReactContext";
import RegisterForm from "./forms/RegisterForm";

const Register = () => {
  const navigate = useNavigate();
  const { loginInfo, setLoginInfo } = useContext(LoginContext);
  const [loading, setLoading] = useState(false);
  const apiUrl = "http://localhost:3001";

  useEffect(() => {
    if (loginInfo.loginStatus) {
      navigate("/dashboard");
    }
  }, [loginInfo]);

  const initialValues = {
    email: "",
    firstName: "",
    lastName: "",
    gender: "",
    role: "",
    passwd: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Email must be valid")
      .required("Email is required"),
    firstName: Yup.string().required("FirstName is required"),
    lastName: Yup.string().required("lastname is required"),
    gender: Yup.string().required("gender is required"),
    role: Yup.string().required("role is required"),
    passwd: Yup.string().required("Password is required"),
  });

  const onSubmit = (data) => {
    //alert(JSON.stringify(data))
    setLoading(true);
    axios
      .post(`${apiUrl}/user/register`, { ...data, password: data.passwd })
      .then((res) => {
        setLoading(false);
           
            swal({
                icon: "success",
                title: "user added",
                text: "USer added succefully"
            })
            navigate("/login")
      })
      .catch((err) => {
        if (err.response) {
          swal({
            icon: "error",
            title: "Error !",
            text: JSON.stringify(err.response.data),
          });
        } else {
          swal({
            icon: "error",
            title: "Error !",
            text: JSON.stringify(err.message),
          });
        }

        setLoading(false);
      });
  };

  return (
    //login container
    <div className="h-[100vh] mx-2 flex flex-1 md:flex-row items-center flex-col w-[375px]">
      {/* login details */}
      <div className="h-full flex flex-col flex-1 py-5">
        {/* rectangle */}
        <div className="py-3 flex flex-row justify-center">
          <img src={Logo} alt="LOGO" className="w-24" />
        </div>
        <div className="flex flex-col p-3 px-5 bg-primary rounded-lg">
          <h1 className="text-gradient text-[18pt] font-bold text-center">
            Register to BYOD
          </h1>
        </div>

        {/* input collection */}
        <div className="flex flex-col p-3 overflow-auto">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            <RegisterForm loading={loading} />
          </Formik>
        </div>
      </div>
      <Link to={'/login'}>Login Here</Link> 
    </div>
  );
};

export default Register;
