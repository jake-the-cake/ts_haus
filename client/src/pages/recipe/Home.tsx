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
	const url: string = 'http://localhost:4200/cookbook/new'
	// const url: string = 'https://haus-app-server.herokuapp.com/cookbook/new'
	return (
		<div className="form-container">
			Add a recipe.
			<form name='recipe-form' id='recipe-form' action={url} method="POST" style={{display: 'flex', flexDirection: 'column'}}>
				<label htmlFor="name">Title</label><input name="name" type="text" />
				<label htmlFor="cat">Categories</label><input name="cat" type="text" />
				<fieldset id="ingredients-box" className="ingredients-box">
					<legend >Ingredients</legend>
					<input name="comp-name-0" type="text" placeholder="Item Description" />
					<input name="comp-amount-0" type="text" width="10" placeholder="Amount"  />
					<input name="comp-unit-0" type="text" width="5" placeholder="Unit" />
					<input name="comp-name-1" type="text" placeholder="Item Description" />
					<input name="comp-amount-1" type="text" width="10" placeholder="Amount"  />
					<input name="comp-unit-1" type="text" width="5" placeholder="Unit" />
				</fieldset>
				<label htmlFor="steps">Directions</label><input name="step-text-0" type="text" />
				<button id='submit-recipe-button'>Submit</button>
			</form>
		</div>
	)
}