import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

const ContactSchema = Yup.object().shape({
	firstName: Yup.string().required('Required'),
	lastName: Yup.string().required('Required'),
	email: Yup.string().email('Invalid email').required('Required'),
	phone: Yup.string().required('Required'),
	address: Yup.string().required('Required'),
	notes: Yup.string(),
});

function ContactListManager() {
	const [contacts, setContacts] = useState([]);
	const [editingContact, setEditingContact] = useState(null);

	const handleAddContact = (values, { resetForm }) => {
		const newContact = {
			id: Date.now().toString(),
			...values,
		};
		setContacts([...contacts, newContact]);
		resetForm();
	};

	const handleDeleteContact = (id) => {
		setContacts(contacts.filter((contact) => contact.id !== id));
	};

	const handleEditContact = (contact) => {
		setEditingContact(contact);
	};

	return (
		<div className='max-w-4xl mx-auto'>
			<h2 className='text-2xl font-bold mb-6'>Contact List</h2>

			<Formik
				initialValues={
					editingContact || {
						firstName: '',
						lastName: '',
						email: '',
						phone: '',
						address: '',
						notes: '',
					}
				}
				validationSchema={ContactSchema}
				onSubmit={handleAddContact}>
				{({ errors, touched }) => (
					<Form className='bg-white p-6 rounded-lg shadow-md mb-8'>
						<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
							<div>
								<Field name='firstName' placeholder='First Name' className='input' />
								{errors.firstName && touched.firstName && (
									<div className='text-red-500'>{errors.firstName}</div>
								)}
							</div>

							<div>
								<Field name='lastName' placeholder='Last Name' className='input' />
								{errors.lastName && touched.lastName && <div className='text-red-500'>{errors.lastName}</div>}
							</div>

							<div>
								<Field name='email' type='email' placeholder='Email' className='input' />
								{errors.email && touched.email && <div className='text-red-500'>{errors.email}</div>}
							</div>

							<div>
								<Field name='phone' placeholder='Phone' className='input' />
								{errors.phone && touched.phone && <div className='text-red-500'>{errors.phone}</div>}
							</div>

							<div className='md:col-span-2'>
								<Field name='address' placeholder='Address' className='input' />
								{errors.address && touched.address && <div className='text-red-500'>{errors.address}</div>}
							</div>

							<div className='md:col-span-2'>
								<Field as='textarea' name='notes' placeholder='Notes' className='input h-32' />
							</div>
						</div>

						<button type='submit' className='btn btn-primary mt-4'>
							{editingContact ? 'Update Contact' : 'Add Contact'}
						</button>
					</Form>
				)}
			</Formik>

			<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
				{contacts.map((contact) => (
					<div key={contact.id} className='bg-white p-4 rounded-lg shadow'>
						<h3 className='font-bold'>
							{contact.firstName} {contact.lastName}
						</h3>
						<p className='text-gray-600'>{contact.email}</p>
						<p className='text-gray-600'>{contact.phone}</p>
						<p className='text-gray-600'>{contact.address}</p>
						{contact.notes && <p className='text-gray-500 mt-2'>{contact.notes}</p>}
						<div className='mt-4 flex space-x-2'>
							<button onClick={() => handleEditContact(contact)} className='btn btn-secondary'>
								Edit
							</button>
							<button
								onClick={() => handleDeleteContact(contact.id)}
								className='btn bg-red-500 text-white hover:bg-red-600'>
								Delete
							</button>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

export default ContactListManager;
