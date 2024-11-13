import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useNavigate, Link } from 'react-router-dom';

const SignInSchema = Yup.object().shape({
  email: Yup.string()
    .email('Please enter a valid email address')
    .required('Email is required'),
  password: Yup.string()
    .required('Password is required'),
});

const FormField = ({ name, type = 'text', placeholder, error, touched }) => (
  <div className="space-y-1">
    <Field
      name={name}
      type={type}
      placeholder={placeholder}
      className={`input transition-all duration-200 ${
        error && touched ? 'border-red-500 ring-red-200' : 'hover:border-primary/50 focus:border-primary'
      }`}
    />
    {error && touched && (
      <div className="text-red-500 text-sm flex items-center">
        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
        </svg>
        {error}
      </div>
    )}
  </div>
);

function SignInPage() {
  const [signInError, setSignInError] = useState('');
  const navigate = useNavigate();

  const handleSignIn = async (values, { setSubmitting }) => {
    try {
      setSignInError('');
      
      const userData = {
        email: values.email.toLowerCase().trim(),
        password: values.password
      };

      // TODO: Replace with actual API call
      console.log('SignIn data:', userData);
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Store user token/data
      // localStorage.setItem('authToken', response.token);
      
      navigate('/');
    } catch (error) {
      setSignInError(
        error.response?.data?.message || 
        'Invalid email or password. Please try again.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 px-4">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-primary">Welcome Back</h2>
        <p className="text-gray-600 mt-2">Sign in to your account</p>
      </div>

      <Formik
        initialValues={{
          email: '',
          password: ''
        }}
        validationSchema={SignInSchema}
        onSubmit={handleSignIn}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form className="bg-white p-8 rounded-lg shadow-md">
            {signInError && (
              <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700">
                <p className="font-medium">Sign in failed</p>
                <p className="text-sm">{signInError}</p>
              </div>
            )}

            <div className="space-y-6">
              <FormField
                name="email"
                type="email"
                placeholder="Email Address"
                error={errors.email}
                touched={touched.email}
              />

              <FormField
                name="password"
                type="password"
                placeholder="Password"
                error={errors.password}
                touched={touched.password}
              />

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center">
                  <input type="checkbox" className="rounded border-gray-300 text-primary focus:ring-primary" />
                  <span className="ml-2 text-gray-600">Remember me</span>
                </label>
                <Link to="/forgot-password" className="text-primary hover:text-primary/80 font-medium">
                  Forgot password?
                </Link>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full btn btn-primary mt-6 transition-all duration-200
                ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-primary/90'}
              `}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing in...
                </span>
              ) : (
                'Sign In'
              )}
            </button>

            <p className="text-center text-gray-600 mt-6">
              Don't have an account?{' '}
              <Link to="/signup" className="text-primary hover:text-primary/80 font-medium">
                Sign up
              </Link>
            </p>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default SignInPage; 