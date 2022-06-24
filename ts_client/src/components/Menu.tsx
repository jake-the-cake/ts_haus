export const Menu:Function = async (outputDiv:Element) => {
	outputDiv.innerHTML = `
		<div class="menu-content">
			<div class="menu-title text-light">Select an app</div>
			<div class="menu-link bg-warning"><span id="menu-shopping"></span>Shopping</div>
			<div class="menu-link bg-info">Birthdays</div>
			<div class="menu-link bg-danger">Recipes</div>
			<div class="menu-link bg-success">Contacts</div>
			<div class="menu-link bg-primary">Albums</div>
		</div>
	`
}