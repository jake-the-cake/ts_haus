import { FC } from "react";
import { Link } from "react-router-dom";

interface RecipeHomeProps {
	props?: string
}

export const RecipeHome:FC<RecipeHomeProps> = () => {
	const url: string = 'http://localhost:4200/cookbook/new'
	// const url: string = 'https://haus-app-server.herokuapp.com/cookbook/new'
	return (
		<div>
			<h2>Recipe Home Page</h2>
			<ul>
				<li>top/favorites</li>
				<li>notifications/stats</li>
				<li>functions</li>
				<li>featured/ads</li>
			</ul>
			<Link to='/ts_haus/cookbook/add'>Add A Recipe</Link><br />
			<Link to='/ts_haus/cookbook/chef-jake'>view my recipes</Link>
		</div>
	)
}