import React from "react";
import { Form, ErrorMessage, Field, useFormikContext } from "formik";

const RegisterForm = ({ loading }) => {
  const { touched, dirty, isValid, errors } = useFormikContext();
  const labelStyle = "md:text-lg text-md px-1 font-bold";

  return (
    <div className="w-full p-3 overflow-auto">
      <Form className="overflow-auto">
        <div className="gap-1 flex flex-col items-start p-2 w-full">
          <label htmlFor="" className={labelStyle}>
            Email Address * :
          </label>
          <div className="flex w-full animate-pulse flex-row items-end text-red-900 font-medium justify-end px-2">
            <ErrorMessage name="email" />
          </div>
          <Field
            name="email"
            id="email"
            type="email"
            className={
              touched.email && errors.email
                ? "w-full p-3 rounded-lg px-5 text-red-800 border-2 border-red-500"
                : "w-full p-3 rounded-lg px-5 text-black border-2 border-gray-300"
            }
            autoComplete="off"
          />
        </div>
        <div className="gap-1 flex flex-col items-start p-2 w-full">
          <label htmlFor="" className={labelStyle}>
            First name :
          </label>
          <div className="flex w-full animate-pulse flex-row items-end text-red-900 font-medium justify-end px-2">
            <ErrorMessage name="firstName" />
          </div>
          <Field
            name="firstName"
            id="firstName"
            type="firstName"
            className={
              touched.firstName && errors.firstName
                ? "w-full p-3 rounded-lg px-5 text-red-800 border-2 border-red-500"
                : "w-full p-3 rounded-lg px-5 text-black border-2 border-gray-300"
            }
            autoComplete="off"
          />
        </div>
        <div className="gap-1 flex flex-col items-start p-2 w-full">
          <label htmlFor="" className={labelStyle}>
            Last name :
          </label>
          <div className="flex w-full animate-pulse flex-row items-end text-red-900 font-medium justify-end px-2">
            <ErrorMessage name="lastName" />
          </div>
          <Field
            name="lastName"
            id="lastName"
            type="lastName"
            className={
              touched.lastName && errors.lastName
                ? "w-full p-3 rounded-lg px-5 text-red-800 border-2 border-red-500"
                : "w-full p-3 rounded-lg px-5 text-black border-2 border-gray-300"
            }
            autoComplete="off"
          />
        </div>
        <div className="gap-1 flex flex-col items-start p-2 w-[275px]">
          <label htmlFor="gender" className={labelStyle}>
            Gender:
          </label>
          <div className="flex w-full animate-pulse flex-row items-end text-red-900 font-medium justify-end px-2">
            <ErrorMessage name="gender" />
          </div>
          <Field
            name="gender"
            as="select" // Render as select element
            className={
              touched.gender && errors.gender
                ? "w-full p-3 px-5 text-red-800 border-2 border-red-500"
                : "w-full p-3 px-5 text-black border-2 border-black"
            }
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </Field>
        </div>
        <div className="gap-1 flex flex-col items-start p-2 w-[275px]">
          <label htmlFor="role" className={labelStyle}>
            Gender:
          </label>
          <div className="flex w-full animate-pulse flex-row items-end text-red-900 font-medium justify-end px-2">
            <ErrorMessage name="role" />
          </div>
          <Field
            name="role"
            as="select" // Render as select element
            className={
              touched.role && errors.role
                ? "w-full p-3 px-5 text-red-800 border-2 border-red-500"
                : "w-full p-3 px-5 text-black border-2 border-black"
            }
          >
            <option value="">Select Gender</option>
            <option value="admin">Admin</option>
            <option value="regular">Regular</option>
          </Field>
        </div>
        <div className="gap-1 flex flex-col items-start p-2 w-full">
          <label htmlFor="" className={labelStyle}>
            Password * :
          </label>
          <div className="flex w-full animate-pulse flex-row items-end text-red-900 font-medium justify-end px-2">
            <ErrorMessage name="passwd" />
          </div>
          <Field
            name="passwd"
            id="passwd"
            type="password"
            className={
              touched.passwd && errors.passwd
                ? "w-full p-3 rounded-lg px-5 text-red-800 border-2 border-red-500"
                : "w-full p-3 rounded-lg px-5 text-black border-2 border-gray-300"
            }
            autoComplete="off"
          />
        </div>

        <div className="w-full flex flex-col items-end justify-center font-bold mt-3">
          <button
            type="submit"
            className={
              !(dirty && isValid)
                ? "border-0 p-2 bg-gray-300 bg-opacity-80 text-gray-400 rounded-xl px-5 mr-2"
                : "border-0 p-3 bg-green-600 bg-opacity-60 text-white rounded-xl px-5 mr-2 w-fu"
            }
          >
            {loading ? "registering ... " : "register"}
          </button>
        </div>
      </Form>
    </div>
  );
};

export default RegisterForm;
