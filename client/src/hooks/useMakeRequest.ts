/*
	The code below was built upon a YouTube tutorial by Dave Gray
*/

import { useState, useEffect, EffectCallback } from 'react'

type ReturnValues = [
	response: any[],
	error: string,
	loading: boolean
]

interface UseMakeRequestProps {
	({
		axiosInstance,
		method,
		url,
		requestConfig
	} : any ) : ReturnValues
}

export const useMakeRequest: UseMakeRequestProps = ({
	axiosInstance, method, url, requestConfig = {}
}) => {
	const [response, setResponse] = useState([])
	const [error, setError] = useState('')
	const [loading, setLoading] = useState(true)

	interface CallbackProps {
		(): void
	}

	useEffect((): CallbackProps  => {
		const controller = new AbortController()

		const fetchData = (async () => {
			try {
				const res = await axiosInstance[method.toLowerCase()](url, {
					...requestConfig,
					signal: controller.signal
				})
				setResponse(res.data)
			}
			catch (err: any) {
				console.log(err.message)
				setError(err.message)
			}
			finally {
				setLoading(false)
			}
		})()

		return () => controller.abort
	}, [])

	return [response, error, loading]
}