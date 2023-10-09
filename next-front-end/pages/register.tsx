import Head from "next/head";
import Layout from "../components/Layout";
import Link from "next/link";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { register } from "../services/AuthServices/AuthServices";

export default function Register() {
  const validationSchema = Yup.object().shape({
    firstName: Yup.string()
      .required("First name is required")
      .min(3, "First name must be between 3 and 20 characters")
      .max(20, "First name must be between 3 and 20 characters"),
    lastName: Yup.string()
      .required("Last name is required")
      .min(3, "Last name must be between 3 and 20 characters")
      .max(20, "Last name must be between 3 and 20 characters"),
    email: Yup.string().required("Email is required"),
    jobTitle: Yup.string().required("Job Title is required"),
    password: Yup.string().required("Password is required"),
    repeatPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Repeat Password is required"),
  });

  return (
    <Layout pageTitle="Register" privateRoute={false}>
      <div className="py-24">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="logo.png"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
            Sign Up
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto  sm:max-w-sm">
          <Formik
            initialValues={{
              firstName: "",
              lastName: "",
              email: "",
              jobTitle: "",
              password: "",
              repeatPassword: "",
            }}
            validationSchema={validationSchema}
            onSubmit={async (values) => {
              // Handle form submission

              console.log(values);
              try {
                let registerRes = await register(values);
                console.log(registerRes);
              } catch (error) {
                console.log(error);
              }
            }}
          >
            <Form className="space-y-8">
              <div className="flex flex-row space-x-4">
                <div className="flex-1">
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium leading-6 text-white"
                  >
                    First Name
                  </label>
                  <div className="mt-2">
                    <Field
                      id="firstName"
                      name="firstName"
                      type="text"
                      autoComplete="firstName"
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    <ErrorMessage
                      name="firstName"
                      component="div"
                      className="text-red-500"
                    />
                  </div>
                </div>
                <div className="flex-1">
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium leading-6 text-white"
                  >
                    Last Name
                  </label>
                  <div className="mt-2">
                    <Field
                      id="lastName"
                      name="lastName"
                      type="text"
                      autoComplete="lastName"
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    <ErrorMessage
                      name="lastName"
                      component="div"
                      className="text-red-500"
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-row space-x-4">
                <div className="flex-1">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-white"
                  >
                    Email address
                  </label>
                  <div className="mt-2">
                    <Field
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-red-500"
                    />
                  </div>
                </div>
                <div className="flex-1">
                  <label
                    htmlFor="jobTitle"
                    className="block text-sm font-medium leading-6 text-white"
                  >
                    Job Title
                  </label>
                  <div className="mt-2">
                    <Field
                      id="jobTitle"
                      name="jobTitle"
                      type="text"
                      autoComplete="jobTitle"
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    <ErrorMessage
                      name="jobTitle"
                      component="div"
                      className="text-red-500"
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-row space-x-4">
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium leading-6 text-white"
                    >
                      Password
                    </label>
                  </div>
                  <div className="mt-2">
                    <Field
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="text-red-500"
                    />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="repeatPassword"
                      className="block text-sm font-medium leading-6 text-white"
                    >
                      Repeat Password
                    </label>
                  </div>
                  <div className="mt-2">
                    <Field
                      id="repeatPassword"
                      name="repeatPassword"
                      type="password"
                      autoComplete="current-password"
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    <ErrorMessage
                      name="repeatPassword"
                      component="div"
                      className="text-red-500"
                    />
                  </div>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign Up
                </button>
              </div>
            </Form>
          </Formik>

          <p className="mt-10 text-center text-base text-white">
            Already have an account ?{" "}
            <Link
              href="/login"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </Layout>
  );
}
