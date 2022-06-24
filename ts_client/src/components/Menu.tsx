export const Menu:Function = (outputDiv:Element) => {
		const html:string = `
			<div class="menu-content">
				<div class="menu-title">Generic Links</div>
				<div class="menu-link bg-warning">link</div>
				<div class="menu-link bg-info">link</div>
				<div class="menu-link bg-danger">link</div>
				<div class="menu-link bg-success">link</div>
				<div class="menu-link bg-primary">link</div>
			</div>
		`
	outputDiv.innerHTML = html
}