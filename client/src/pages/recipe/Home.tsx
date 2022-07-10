import { FC } from "react";

interface HomeProps {
	props?: string
}



export const Home:FC<HomeProps> = () => {
	return (
		<div className="form-container">
			Add a recipe.
			<form action="http://localhost:4200/cookbook/new" method="POST" style={{display: 'flex', flexDirection: 'column'}}>
				<label htmlFor="name">Title</label><input name="name" type="text" />
				<label htmlFor="cat">Categories</label><input name="cat" type="text" />
				<label htmlFor="ingredients">Ingredients</label><input name="ingredients" type="text" />
				<label htmlFor="directions">Directions</label><input name="steps" type="text" />
				<button>Submit</button>
			</form>
		</div>
	)
}