import { DateRange, Filters } from '@/types/type'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import React, { useState } from 'react'
import { Pressable, TextInput, View } from 'react-native'
import FilterModal from './FilterModal'

interface HeaderProps {
	setSearchQuery: (query: string) => void
	filters: Filters
	setFilters: (filters: Filters) => void
	dateRange: DateRange
	setDateRange: (range: DateRange) => void
}

const Header: React.FC<HeaderProps> = ({
	setSearchQuery,
	filters,
	setFilters,
	dateRange,
	setDateRange,
}) => {
	const [modalVisible, setModalVisible] = useState(false)

	const applyFilters = () => {
		setModalVisible(false)
	}

	const resetFilters = () => {
		setFilters({ TV: false, Movie: false })
		setDateRange({ from: '', to: '' })
		setModalVisible(false)
	}

	const isAnyFilterActive =
		filters.TV || filters.Movie || dateRange.from || dateRange.to

	return (
		<View className='bg-zinc-700 pt-20 p-3 flex-row gap-3'>
			<Pressable
				className={`w-12 aspect-square rounded-xl items-center justify-center ${
					isAnyFilterActive ? 'bg-blue-600' : 'bg-zinc-600'
				}`}
				onPress={() => setModalVisible(true)}
			>
				<FontAwesome name='filter' size={24} color='white' />
			</Pressable>
			<View className='flex-1'>
				<TextInput
					className='h-12 bg-zinc-600 rounded-xl pl-11 text-white font-normal placeholder:text-zinc-300'
					placeholder='Search'
					onChangeText={setSearchQuery}
				/>
				<FontAwesome
					className='absolute top-2.5 left-2.5'
					name='search'
					size={24}
					color='white'
				/>
			</View>
			<FilterModal
				modalVisible={modalVisible}
				setModalVisible={setModalVisible}
				filters={filters}
				setFilters={setFilters}
				dateRange={dateRange}
				setDateRange={setDateRange}
				resetFilters={resetFilters}
				applyFilters={applyFilters}
			/>
		</View>
	)
}

export default Header
