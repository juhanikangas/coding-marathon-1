import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useNavigate, Link } from 'react-router-dom';

// Validation schema with better error messages
const SignupSchema = Yup.object().shape({
	firstName: Yup.string()
		.min(2, 'First name must be at least 2 characters')
		.max(50, 'First name must be less than 50 characters')
		.required('First name is required'),
	lastName: Yup.string()
		.min(2, 'Last name must be at least 2 characters')
		.max(50, 'Last name must be less than 50 characters')
		.required('Last name is required'),
	email: Yup.string()
		.email('Please enter a valid email address')
		.required('Email is required'),
	password: Yup.string()
		.min(8, 'Password must be at least 8 characters')
		.matches(/[a-z]/, 'Password must contain at least one lowercase letter')
		.matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
		.matches(/[0-9]/, 'Password must contain at least one number')
		.matches(/[^a-zA-Z0-9]/, 'Password must contain at least one special character')
		.required('Password is required'),
	confirmPassword: Yup.string()
		.oneOf([Yup.ref('password'), null], 'Passwords must match')
		.required('Please confirm your password'),
});

// Custom Input component for consistent styling
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

function SignupPage() {
	const [signupError, setSignupError] = useState('');
	const navigate = useNavigate();

	const handleSignup = async (values, { setSubmitting }) => {
		try {
			setSignupError('');
			
			// Prepare data for API
			const userData = {
				firstName: values.firstName.trim(),
				lastName: values.lastName.trim(),
				email: values.email.toLowerCase().trim(),
				password: values.password
			};

			// TODO: Replace with actual API call
			console.log('Signup data:', userData);
			await new Promise(resolve => setTimeout(resolve, 1000));

			// Store user token/data
			// localStorage.setItem('authToken', response.token);
			
			navigate('/');
		} catch (error) {
			setSignupError(
				error.response?.data?.message || 
				'An error occurred during signup. Please try again.'
			);
		} finally {
			setSubmitting(false);
		}
	};

	return (
		<div className="max-w-md mx-auto mt-10 px-4">
			<div className="text-center mb-8">
				<h2 className="text-3xl font-bold text-primary">Create Account</h2>
				<p className="text-gray-600 mt-2">Join us to manage your collections</p>
			</div>

			<Formik
				initialValues={{
					firstName: '',
					lastName: '',
					email: '',
					password: '',
					confirmPassword: ''
				}}
				validationSchema={SignupSchema}
				onSubmit={handleSignup}
			>
				{({ errors, touched, isSubmitting }) => (
					<Form className="bg-white p-8 rounded-lg shadow-md">
						{signupError && (
							<div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700">
								<p className="font-medium">Signup failed</p>
								<p className="text-sm">{signupError}</p>
							</div>
						)}

						<div className="space-y-6">
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<FormField
									name="firstName"
									placeholder="First Name"
									error={errors.firstName}
									touched={touched.firstName}
								/>
								<FormField
									name="lastName"
									placeholder="Last Name"
									error={errors.lastName}
									touched={touched.lastName}
								/>
							</div>

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

							<FormField
								name="confirmPassword"
								type="password"
								placeholder="Confirm Password"
								error={errors.confirmPassword}
								touched={touched.confirmPassword}
							/>
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
									Creating account...
								</span>
							) : (
								'Create Account'
							)}
						</button>

						<p className="text-center text-gray-600 mt-6">
							Already have an account?{' '}
							<Link to="/signin" className="text-primary hover:text-primary/80 font-medium">
								Sign in
							</Link>
						</p>
					</Form>
				)}
			</Formik>
		</div>
	);
}

export default SignupPage;
