	interface ParseCategoryListProps {
		(list: string) : string[]
	}

	export const parseCategoryList: ParseCategoryListProps = (list) => {
		const splitList = list.split(',')
		splitList.forEach((item:string, i:number) => {
			splitList[i] = item.trim()
		})
		return splitList.filter((category) => category !== '')
	}