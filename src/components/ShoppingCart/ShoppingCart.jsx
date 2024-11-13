import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

const CartItemSchema = Yup.object().shape({
	name: Yup.string().required('Required'),
	quantity: Yup.number().required('Required').min(1, 'Must be at least 1'),
	price: Yup.number().required('Required').min(0, 'Must be at least 0'),
	category: Yup.string().required('Required'),
});

function ShoppingCart() {
	const [cartItems, setCartItems] = useState([]);
	const [editingItem, setEditingItem] = useState(null);

	const handleAddItem = (values, { resetForm }) => {
		const newItem = {
			id: Date.now().toString(),
			...values,
			total: values.price * values.quantity,
		};
		setCartItems([...cartItems, newItem]);
		resetForm();
	};

	const handleDeleteItem = (id) => {
		setCartItems(cartItems.filter((item) => item.id !== id));
	};

	const handleEditItem = (item) => {
		setEditingItem(item);
	};

	const calculateTotal = () => {
		return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
	};

	const categories = ['Groceries', 'Electronics', 'Clothing', 'Books', 'Other'];

	return (
		<div className='max-w-4xl mx-auto'>
			<h2 className='text-2xl font-bold mb-6'>Shopping Cart</h2>

			<Formik
				initialValues={
					editingItem || {
						name: '',
						quantity: 1,
						price: '',
						category: '',
					}
				}
				validationSchema={CartItemSchema}
				onSubmit={handleAddItem}>
				{({ errors, touched }) => (
					<Form className='bg-white p-6 rounded-lg shadow-md mb-8'>
						<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
							<div>
								<Field name='name' placeholder='Item Name' className='input' />
								{errors.name && touched.name && <div className='text-red-500'>{errors.name}</div>}
							</div>

							<div>
								<Field as='select' name='category' className='input'>
									<option value=''>Select Category</option>
									{categories.map((category) => (
										<option key={category} value={category}>
											{category}
										</option>
									))}
								</Field>
								{errors.category && touched.category && <div className='text-red-500'>{errors.category}</div>}
							</div>

							<div>
								<Field name='quantity' type='number' placeholder='Quantity' min='1' className='input' />
								{errors.quantity && touched.quantity && <div className='text-red-500'>{errors.quantity}</div>}
							</div>

							<div>
								<Field name='price' type='number' step='0.01' placeholder='Price' className='input' />
								{errors.price && touched.price && <div className='text-red-500'>{errors.price}</div>}
							</div>
						</div>

						<button type='submit' className='btn btn-primary mt-4'>
							{editingItem ? 'Update Item' : 'Add Item'}
						</button>
					</Form>
				)}
			</Formik>

			{cartItems.length > 0 ? (
				<>
					<div className='bg-white rounded-lg shadow overflow-hidden'>
						<table className='min-w-full divide-y divide-gray-200'>
							<thead className='bg-gray-50'>
								<tr>
									<th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
										Item
									</th>
									<th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
										Category
									</th>
									<th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
										Quantity
									</th>
									<th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
										Price
									</th>
									<th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
										Total
									</th>
									<th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
										Actions
									</th>
								</tr>
							</thead>
							<tbody className='bg-white divide-y divide-gray-200'>
								{cartItems.map((item) => (
									<tr key={item.id}>
										<td className='px-6 py-4 whitespace-nowrap'>{item.name}</td>
										<td className='px-6 py-4 whitespace-nowrap'>{item.category}</td>
										<td className='px-6 py-4 whitespace-nowrap'>{item.quantity}</td>
										<td className='px-6 py-4 whitespace-nowrap'>${item.price}</td>
										<td className='px-6 py-4 whitespace-nowrap'>
											${(item.price * item.quantity).toFixed(2)}
										</td>
										<td className='px-6 py-4 whitespace-nowrap'>
											<div className='flex space-x-2'>
												<button onClick={() => handleEditItem(item)} className='btn btn-secondary'>
													Edit
												</button>
												<button
													onClick={() => handleDeleteItem(item.id)}
													className='btn bg-red-500 text-white hover:bg-red-600'>
													Delete
												</button>
											</div>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>

					<div className='mt-6 bg-white p-4 rounded-lg shadow'>
						<h3 className='text-xl font-bold'>Total: ${calculateTotal().toFixed(2)}</h3>
					</div>
				</>
			) : (
				<div className='text-center text-gray-500 mt-8'>
					Your cart is empty. Add some items to get started!
				</div>
			)}
		</div>
	);
}

export default ShoppingCart;
