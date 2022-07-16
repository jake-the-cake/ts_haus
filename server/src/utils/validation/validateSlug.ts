import RecipeModel from "../../models/Recipe.js"

const modelSelector: any = {
	recipe: async () => {return await RecipeModel.find()}
}

interface ValidateSlugProps {
	(
		originalSlug: string,
		model: any
	): Promise<string>
}

interface SlugProps {
	slug: string
}

export const validateSlug:ValidateSlugProps = async (originalSlug, model) => {
	const originalSlugArray: string[] = originalSlug.toLowerCase().trim().split(' ')
	originalSlugArray.forEach((word, index, array) => {
		array[index] = word.replace(/[^a-z0-9]/gi, '')
	})
	originalSlug = originalSlugArray.filter((text) => text !== '').join('-')
	const data: [] = await modelSelector[model]()

	// get all that contain requested slug
	const filteredData: [] | never[] = data.filter((item:SlugProps):boolean => {
		return item.slug.includes(originalSlug)
	})

	if (filteredData.length > 0) {
		// check if the exact url slug is avaiable
		const checkForExact = filteredData.filter((item:SlugProps):boolean => {
			return item.slug === originalSlug
		})
		if (checkForExact.length === 0) {
			return originalSlug
		}
		
		// filter out excess and return updated count
		const doubleFilteredData: [] = []
		const slugLength: string[] = originalSlug.split('-')
		filteredData.forEach((item:SlugProps, index):void => {
			const validationArray = item.slug.split('-')
			if (validationArray.length - 1 === slugLength.length) {
				doubleFilteredData.push(filteredData[index])
			}
		})
		const newSlug: string = `${originalSlug}-${doubleFilteredData.length}`
		return `${newSlug}`
	}
	else {
		// return original if no matches exist
		return originalSlug
	}
}