import AnimeListItem from '@/components/AnimeListItem'
import Header from '@/components/Header'
import { IAnime } from '@/types/type'
import axios from 'axios'
import React, { FC, useEffect, useState } from 'react'
import { FlatList, SafeAreaView } from 'react-native'

const HomeScreen: FC = () => {
	const [anime, setAnime] = useState<IAnime[]>([])

	useEffect(() => {
		fetchAnime() // Вызов функции для получения аниме
	}, [])

	async function fetchAnime() {
		try {
			const response = await axios.get<{ data: IAnime[] }>(
				'https://api.jikan.moe/v4/anime'
			)
			setAnime(response.data.data) // Устанавливаем массив аниме
		} catch (e) {
			alert(e)
		}
	}

	return (
		<>
			<Header />
			<SafeAreaView className='bg-zinc-800 flex-1'>
				<FlatList
					data={anime}
					renderItem={({ item }) => <AnimeListItem anime={item} />}
					keyExtractor={item => item.mal_id.toString()} // Уникальный ключ для каждого элемента
				/>
			</SafeAreaView>
		</>
	)
}

export default HomeScreen
