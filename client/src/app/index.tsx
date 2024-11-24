import AnimeListItem from '@/components/AnimeListItem'
import Header from '@/components/Header'
import { DateRange, Filters, IAnime } from '@/types/type'
import axios from 'axios'
import React, { FC, useEffect, useState } from 'react'
import { FlatList, SafeAreaView, Text, View } from 'react-native'

const HomeScreen: FC = () => {
	const [anime, setAnime] = useState<IAnime[]>([])
	const [searchQuery, setSearchQuery] = useState<string>('')
	const [filters, setFilters] = useState<Filters>({ TV: false, Movie: false })
	const [dateRange, setDateRange] = useState<DateRange>({ from: '', to: '' })

	useEffect(() => {
		fetchAnime()
	}, [])

	async function fetchAnime() {
		try {
			const response = await axios.get<{ data: IAnime[] }>(
				'https://api.jikan.moe/v4/anime'
			)
			setAnime(response.data.data)
		} catch (e) {
			alert(e)
		}
	}

	const filteredAnime = anime.filter(a => {
		const matchesSearch = a.title
			.toLowerCase()
			.includes(searchQuery.toLowerCase())
		const matchesFilter =
			(filters.TV && a.type === 'TV') ||
			(filters.Movie && a.type === 'Movie') ||
			(!filters.TV && !filters.Movie)

		const animeYear = a.year
		const fromYear = parseInt(dateRange.from, 10)
		const toYear = parseInt(dateRange.to, 10)

		if (!dateRange.from && !dateRange.to) {
			return matchesSearch && matchesFilter
		}

		const matchesDate =
			(!dateRange.from || animeYear >= fromYear) &&
			(!dateRange.to || animeYear <= toYear) &&
			fromYear >= 1998 &&
			toYear >= 1998

		return matchesSearch && matchesFilter && matchesDate
	})

	return (
		<>
			<Header
				setSearchQuery={setSearchQuery}
				filters={filters}
				setFilters={setFilters}
				dateRange={dateRange}
				setDateRange={setDateRange}
			/>
			<SafeAreaView className='bg-zinc-800 flex-1'>
				{filteredAnime.length > 0 ? (
					<FlatList
						data={filteredAnime}
						renderItem={({ item }) => <AnimeListItem anime={item} />}
						keyExtractor={item => item.mal_id.toString()}
					/>
				) : (
					<View className='flex-1 justify-center items-center'>
						<Text className='text-white text-lg'>Ничего не найдено</Text>
					</View>
				)}
			</SafeAreaView>
		</>
	)
}

export default HomeScreen
