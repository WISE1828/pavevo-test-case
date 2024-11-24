import AnimeListItem from '@/components/AnimeListItem'
import Header from '@/components/Header'
import { IAnime } from '@/types/type'
import axios from 'axios'
import React, { FC, useEffect, useState } from 'react'
import { FlatList, SafeAreaView } from 'react-native'

const HomeScreen: FC = () => {
	const [anime, setAnime] = useState<IAnime[]>([])
	const [searchQuery, setSearchQuery] = useState('') // Состояние для хранения поискового запроса
	const [filters, setFilters] = useState({ TV: false, Movie: false }) // Состояние для хранения фильтров

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

	// Фильтрация аниме на основе поискового запроса и выбранных фильтров
	const filteredAnime = anime.filter(a => {
		const matchesSearch = a.title
			.toLowerCase()
			.includes(searchQuery.toLowerCase())
		const matchesFilter =
			(filters.TV && a.type === 'TV') ||
			(filters.Movie && a.type === 'Movie') ||
			(!filters.TV && !filters.Movie)
		return matchesSearch && matchesFilter
	})

	return (
		<>
			<Header
				setSearchQuery={setSearchQuery}
				filters={filters}
				setFilters={setFilters}
			/>
			<SafeAreaView className='bg-zinc-800 flex-1'>
				<FlatList
					data={filteredAnime} // Используем отфильтрованный список
					renderItem={({ item }) => <AnimeListItem anime={item} />}
					keyExtractor={item => item.mal_id.toString()} // Уникальный ключ для каждого элемента
				/>
			</SafeAreaView>
		</>
	)
}

export default HomeScreen
