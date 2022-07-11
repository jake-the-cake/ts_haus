import { FC } from "react";

interface HomeProps {
	props?: string
}

const handleRecipeSubmission = document
	.getElementById('submit-recipe-button')
	?.addEventListener('click', (e) => {
		e.preventDefault()
		const inputs: HTMLFormControlsCollection | any = (document.getElementById('recipe-form') as HTMLFormElement).elements
		
		// name is required
		if (inputs['name'] === '') {
			console.log('name required')
		}
		else {
			console.log(`You entered the name ${inputs['name'].value}`)
		}

	})

export const Home:FC<HomeProps> = () => {
	return (
		<div className="form-container">
			Add a recipe.
			<form name='recipe-form' id='recipe-form' action="http://localhost:4200/cookbook/new" method="POST" style={{display: 'flex', flexDirection: 'column'}}>
				<label htmlFor="name">Title</label><input name="name" type="text" />
				<label htmlFor="cat">Categories</label><input name="cat" type="text" />
				<label htmlFor="comps">Ingredients</label><input name="comps" type="text" />
				<label htmlFor="steps">Directions</label><input name="steps" type="text" />
				<button id='submit-recipe-button'>Submit</button>
			</form>
		</div>
	)
}