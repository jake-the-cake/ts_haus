import React from "react"

type Props = {
	type: string
}

export const Navbar:React.FC = (Props) => {

	return (
		<div className="vw-100 bg-dark navbar-stick">
			<nav className="navbar navbar-expand-md navbar-dark mx-3 text-light">
				<div className="navbar-layout">
					<div className="navbar-menu">
						Menu
					</div>
					<div className="navbar-title">
						Haus
					</div>
				</div>
			</nav>
		</div>
	)
}