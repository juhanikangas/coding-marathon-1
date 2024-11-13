import React from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';

function Layout() {
	const location = useLocation();

	const isActive = (path) => {
		return location.pathname === path ? 'text-accent font-bold' : '';
	};

	return (
		<div className='min-h-screen bg-gray-50 flex flex-col'>
			<nav className='bg-white border-b border-gray-200'>
				<div className='max-w-7xl mx-auto px-4'>
					<div className='flex justify-between h-16'>
						<div className='flex items-center space-x-8'>
							<div className='flex items-center space-x-2'>
								<Link to='/' className='text-xl font-bold text-primary'>
									Management App
								</Link>
								<span className='text-sm text-gray-500 border-l border-gray-300 pl-2'>by Group X</span>
							</div>

							<div className='hidden md:flex items-center space-x-4'>
								<NavLink to='/' text='Home' isActive={isActive('/')} />
								<NavLink to='/books' text='Books' isActive={isActive('/books')} />
								<NavLink to='/contacts' text='Contacts' isActive={isActive('/contacts')} />
								<NavLink to='/recipes' text='Recipes' isActive={isActive('/recipes')} />
								<NavLink to='/shoppingcart' text='Cart' isActive={isActive('/shoppingcart')} />
							</div>
						</div>

						<div className='flex items-center space-x-4'>
							<Link to='/signin' className='btn btn-secondary text-sm'>
								Sign In
							</Link>
							<Link to='/signup' className='btn btn-primary text-sm'>
								Sign Up
							</Link>
						</div>
					</div>
				</div>
			</nav>

			<main className='max-w-7xl mx-auto px-4 py-8 flex-grow'>
				<Outlet />
			</main>

			<footer className='bg-white border-t border-gray-200 mt-auto'>
				<div className='max-w-7xl mx-auto px-4 py-6'>
					<div className='text-center text-gray-600'>
						<p>Made with ❤️ by Group X</p>
						<p className='text-sm mt-1'>© 2024 Management App. All rights not reserved 😹.</p>
					</div>
				</div>
			</footer>
		</div>
	);
}

function NavLink({ to, text, isActive }) {
	return (
		<Link
			to={to}
			className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200
        ${isActive ? 'text-primary' : 'text-gray-600 hover:text-primary hover:bg-gray-50'}`}>
			{text}
		</Link>
	);
}

export default Layout;
