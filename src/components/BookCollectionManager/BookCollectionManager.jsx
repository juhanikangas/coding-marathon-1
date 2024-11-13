import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

const BookSchema = Yup.object().shape({
	title: Yup.string().required('Required'),
	author: Yup.string().required('Required'),
	isbn: Yup.string().required('Required'),
	genre: Yup.string().required('Required'),
	publishedYear: Yup.number().required('Required'),
	description: Yup.string(),
	coverImage: Yup.string(),
});

function BookCollectionManager() {
	const [books, setBooks] = useState([]);
	const [editingBook, setEditingBook] = useState(null);

	const handleAddBook = (values, { resetForm }) => {
		const newBook = {
			id: Date.now().toString(),
			...values,
		};
		setBooks([...books, newBook]);
		resetForm();
	};

	const handleDeleteBook = (id) => {
		setBooks(books.filter((book) => book.id !== id));
	};

	const handleEditBook = (book) => {
		setEditingBook(book);
	};

	return (
		<div className='max-w-4xl mx-auto'>
			<h2 className='text-2xl font-bold mb-6'>Book Collection</h2>

			<Formik
				initialValues={
					editingBook || {
						title: '',
						author: '',
						isbn: '',
						genre: '',
						publishedYear: '',
						description: '',
						coverImage: '',
					}
				}
				validationSchema={BookSchema}
				onSubmit={handleAddBook}>
				{({ errors, touched }) => (
					<Form className='bg-white p-6 rounded-lg shadow-md mb-8'>
						<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
							<div>
								<Field name='title' placeholder='Title' className='input' />
								{errors.title && touched.title && <div className='text-red-500'>{errors.title}</div>}
							</div>

							<div>
								<Field name='author' placeholder='Author' className='input' />
								{errors.author && touched.author && <div className='text-red-500'>{errors.author}</div>}
							</div>

							<div>
								<Field name='isbn' placeholder='ISBN' className='input' />
								{errors.isbn && touched.isbn && <div className='text-red-500'>{errors.isbn}</div>}
							</div>

							<div>
								<Field name='genre' placeholder='Genre' className='input' />
								{errors.genre && touched.genre && <div className='text-red-500'>{errors.genre}</div>}
							</div>

							<div>
								<Field name='publishedYear' type='number' placeholder='Published Year' className='input' />
								{errors.publishedYear && touched.publishedYear && (
									<div className='text-red-500'>{errors.publishedYear}</div>
								)}
							</div>

							<div>
								<Field name='coverImage' placeholder='Cover Image URL' className='input' />
							</div>

							<div className='md:col-span-2'>
								<Field as='textarea' name='description' placeholder='Description' className='input h-32' />
							</div>
						</div>

						<button type='submit' className='btn btn-primary mt-4'>
							{editingBook ? 'Update Book' : 'Add Book'}
						</button>
					</Form>
				)}
			</Formik>

			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
				{books.map((book) => (
					<div key={book.id} className='bg-white p-4 rounded-lg shadow'>
						{book.coverImage && (
							<img src={book.coverImage} alt={book.title} className='w-full h-48 object-cover mb-4 rounded' />
						)}
						<h3 className='font-bold'>{book.title}</h3>
						<p className='text-gray-600'>by {book.author}</p>
						<p className='text-sm text-gray-500'>ISBN: {book.isbn}</p>
						<p className='text-sm text-gray-500'>Genre: {book.genre}</p>
						<p className='text-sm text-gray-500'>Published: {book.publishedYear}</p>
						<div className='mt-4 flex space-x-2'>
							<button onClick={() => handleEditBook(book)} className='btn btn-secondary'>
								Edit
							</button>
							<button
								onClick={() => handleDeleteBook(book.id)}
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

export default BookCollectionManager;
