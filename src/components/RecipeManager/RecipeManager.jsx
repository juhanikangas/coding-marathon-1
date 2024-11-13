import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

const RecipeSchema = Yup.object().shape({
	name: Yup.string().required('Required'),
	ingredients: Yup.string().required('Required'),
	instructions: Yup.string().required('Required'),
	prepTime: Yup.number().required('Required').min(0),
	cookTime: Yup.number().required('Required').min(0),
	servings: Yup.number().required('Required').min(1),
	category: Yup.string().required('Required'),
	image: Yup.string(),
});

function RecipeManager() {
	const [recipes, setRecipes] = useState([]);
	const [editingRecipe, setEditingRecipe] = useState(null);

	const handleAddRecipe = (values, { resetForm }) => {
		const newRecipe = {
			id: Date.now().toString(),
			...values,
			ingredients: values.ingredients.split('\n'),
			instructions: values.instructions.split('\n'),
		};
		setRecipes([...recipes, newRecipe]);
		resetForm();
	};

	const handleDeleteRecipe = (id) => {
		setRecipes(recipes.filter((recipe) => recipe.id !== id));
	};

	const handleEditRecipe = (recipe) => {
		const editableRecipe = {
			...recipe,
			ingredients: recipe.ingredients.join('\n'),
			instructions: recipe.instructions.join('\n'),
		};
		setEditingRecipe(editableRecipe);
	};

	return (
		<div className='max-w-4xl mx-auto'>
			<h2 className='text-2xl font-bold mb-6'>Recipe Manager</h2>

			<Formik
				initialValues={
					editingRecipe || {
						name: '',
						ingredients: '',
						instructions: '',
						prepTime: '',
						cookTime: '',
						servings: '',
						category: '',
						image: '',
					}
				}
				validationSchema={RecipeSchema}
				onSubmit={handleAddRecipe}>
				{({ errors, touched }) => (
					<Form className='bg-white p-6 rounded-lg shadow-md mb-8'>
						<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
							<div className='md:col-span-2'>
								<Field name='name' placeholder='Recipe Name' className='input' />
								{errors.name && touched.name && <div className='text-red-500'>{errors.name}</div>}
							</div>

							<div>
								<Field name='category' placeholder='Category' className='input' />
								{errors.category && touched.category && <div className='text-red-500'>{errors.category}</div>}
							</div>

							<div>
								<Field name='image' placeholder='Image URL' className='input' />
							</div>

							<div>
								<Field name='prepTime' type='number' placeholder='Prep Time (minutes)' className='input' />
								{errors.prepTime && touched.prepTime && <div className='text-red-500'>{errors.prepTime}</div>}
							</div>

							<div>
								<Field name='cookTime' type='number' placeholder='Cook Time (minutes)' className='input' />
								{errors.cookTime && touched.cookTime && <div className='text-red-500'>{errors.cookTime}</div>}
							</div>

							<div>
								<Field name='servings' type='number' placeholder='Servings' className='input' />
								{errors.servings && touched.servings && <div className='text-red-500'>{errors.servings}</div>}
							</div>

							<div className='md:col-span-2'>
								<Field
									as='textarea'
									name='ingredients'
									placeholder='Ingredients (one per line)'
									className='input h-32'
								/>
								{errors.ingredients && touched.ingredients && (
									<div className='text-red-500'>{errors.ingredients}</div>
								)}
							</div>

							<div className='md:col-span-2'>
								<Field
									as='textarea'
									name='instructions'
									placeholder='Instructions (one step per line)'
									className='input h-32'
								/>
								{errors.instructions && touched.instructions && (
									<div className='text-red-500'>{errors.instructions}</div>
								)}
							</div>
						</div>

						<button type='submit' className='btn btn-primary mt-4'>
							{editingRecipe ? 'Update Recipe' : 'Add Recipe'}
						</button>
					</Form>
				)}
			</Formik>

			<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
				{recipes.map((recipe) => (
					<div key={recipe.id} className='bg-white p-4 rounded-lg shadow'>
						{recipe.image && (
							<img src={recipe.image} alt={recipe.name} className='w-full h-48 object-cover mb-4 rounded' />
						)}
						<h3 className='font-bold text-xl mb-2'>{recipe.name}</h3>
						<p className='text-gray-600 mb-2'>Category: {recipe.category}</p>
						<p className='text-gray-600 mb-2'>
							Prep: {recipe.prepTime}min | Cook: {recipe.cookTime}min | Serves: {recipe.servings}
						</p>

						<div className='mb-4'>
							<h4 className='font-semibold mb-2'>Ingredients:</h4>
							<ul className='list-disc pl-5'>
								{recipe.ingredients.map((ingredient, index) => (
									<li key={index} className='text-gray-600'>
										{ingredient}
									</li>
								))}
							</ul>
						</div>

						<div className='mb-4'>
							<h4 className='font-semibold mb-2'>Instructions:</h4>
							<ol className='list-decimal pl-5'>
								{recipe.instructions.map((instruction, index) => (
									<li key={index} className='text-gray-600'>
										{instruction}
									</li>
								))}
							</ol>
						</div>

						<div className='mt-4 flex space-x-2'>
							<button onClick={() => handleEditRecipe(recipe)} className='btn btn-secondary'>
								Edit
							</button>
							<button
								onClick={() => handleDeleteRecipe(recipe.id)}
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

export default RecipeManager;
