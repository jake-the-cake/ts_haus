interface ParseRecipeComponentProps {
    (data: any) : {
        comps: object[], steps: object[]
    }
}

export const parseRecipeComponents: ParseRecipeComponentProps = (data) => {

	const comps: object[] = []
	const steps: object[] = []
	let tempObject: any = {}
	for (const [key, value] of Object.entries(data)) {
		let [ kind, field, index ]: string[] = key.split('-')
		if (kind === 'comp') {
			if (!tempObject[`comp${index}`] ) {
				tempObject = {}
				tempObject = {
                    name: data[`comp-name-${index}`],
					amount: data[`comp-amount-${index}`],
					unit: data[`comp-unit-${index}`],
				}
                tempObject[`comp${index}`] = true
				comps.push(tempObject)
			}
		}
		else if (kind === 'step') {
			if (!tempObject[`step${index}`]) {
				tempObject = {}
				tempObject = {
                    step: Number(index) + 1,
					text: data[`step-text-${index}`]
				}
                tempObject[`step${index}`] = true
				steps.push(tempObject)
			}
		}
	}

    return { comps, steps }
}