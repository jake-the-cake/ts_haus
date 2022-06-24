import React from "react"
import { Menu } from "./Menu"

export const Navbar:React.FC = () => {

	let menuStatus:boolean = false // closed

	const menuSlideIn = (position:number) => {
		const menuContainer = document.createElement('div')
		menuContainer.id = 'menu-slider'
		menuContainer.classList.add('menu-container')
		menuContainer.classList.add('bg-secondary')
		document.body.appendChild(menuContainer)
		const leftMax:number = position * (1/4)
		const slideTimer = setInterval(() => {
			if (position > leftMax) {
				position -= 15
				menuContainer.style.left = `${position}px`
			}
			else {
				clearInterval(slideTimer)
				Menu(menuContainer)
			}
		},10)
	}

	const menuSlideOut = (position:number) => {
		const menuContainer = document.getElementById('menu-slider')

		const moveSlider = () => {
			const pageWidth = document.body.offsetWidth
			const slideTimer = setInterval(() => {
				if (position < pageWidth) {
					position += 15
					menuContainer!.style.left = `${position}px`
				}
				else {
					clearInterval(slideTimer)
					menuContainer?.remove()
				}
			})
		}

		menuContainer?.style.left !== null && moveSlider()
	}

	const handleMenuClick = () => {
		menuStatus = !menuStatus
		let xPos:number = document.body.offsetWidth
		if (menuStatus === true) {
			menuSlideIn(xPos)
		}
		else {
			menuSlideOut(xPos * .25)
		}
	}

	return (
		<>
		<div className="vw-100 bg-dark navbar-stick">
			<nav className="navbar navbar-expand-md navbar-dark mx-3 text-light">
				<div className="navbar-layout">
					<div className="navbar-title">
						Haus
					</div>
					<div className="navbar-user">User</div>
					<div className="navbar-menu" onClick={handleMenuClick}>
						<div className="navbar-menu-line"></div>
						<div className="navbar-menu-line"></div>
						<div className="navbar-menu-line"></div>
					</div>
				</div>
			</nav>
		</div>
		{/* <Menu /> */}
		</>
	)
}