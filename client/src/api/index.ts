import { IAnime } from '@/types/type'
import axios from 'axios'

export default async function fetchAnime() {
	try {
		const response = await axios.get<IAnime[]>('https://api.jikan.moe/v4/anime')
		return response.data
	} catch (e) {
		alert(e)
	}
}
