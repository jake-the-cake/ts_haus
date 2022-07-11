interface FormatTitleProps {
	(title: string) : string
}

export const formatTitle: FormatTitleProps = (text) => {
	
	const splitText: string[] = text.split(' ')
	splitText.forEach((word, i) => {
		splitText[i] = `${word[0].toUpperCase()}${word.slice(1).toLowerCase()}`
	})
	
	return splitText.join(' ')
}