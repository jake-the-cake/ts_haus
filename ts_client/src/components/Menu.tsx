import { CakeOutlined, ContactPhoneOutlined, FastfoodOutlined, PhotoLibraryOutlined, ShoppingBagOutlined } from "@mui/icons-material"

export const Menu:React.FC = () => {
	return (
		<div className="menu-container" id="menu-slider">
			<div className="menu-content">
				<div className="menu-title text-light">Select an app</div>
				<div className="menu-link bg-warning"><div className="menu-icon"><ShoppingBagOutlined /></div>Shopping</div>
				<div className="menu-link bg-info"><div className="menu-icon"><CakeOutlined /></div>Birthdays</div>
				<div className="menu-link bg-danger"><div className="menu-icon"><FastfoodOutlined /></div>Recipes</div>
				<div className="menu-link bg-success"><div className="menu-icon"><ContactPhoneOutlined /></div>Contacts</div>
				<div className="menu-link bg-primary"><div className="menu-icon"><PhotoLibraryOutlined /></div>Albums</div>
			</div>
		</div>
	)
}