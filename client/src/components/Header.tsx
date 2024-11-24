import FontAwesome from '@expo/vector-icons/FontAwesome'
import Ionicons from '@expo/vector-icons/Ionicons'
import Checkbox from 'expo-checkbox'
import React, { useState } from 'react'
import {
	Modal,
	Pressable,
	SafeAreaView,
	Text,
	TextInput,
	View,
} from 'react-native'

const Header = () => {
	const [modalVisible, setModalVisible] = useState(false) // Состояние для управления видимостью меню

	return (
		<View className='bg-zinc-700 pt-20 p-3 flex-row gap-3'>
			<Pressable
				className='bg-zinc-600 w-12 aspect-square rounded-xl items-center justify-center'
				onPress={() => setModalVisible(true)} // Открытие меню при нажатии
			>
				<FontAwesome name='filter' size={24} color='white' />
			</Pressable>
			<View className='flex-1'>
				<TextInput
					className='h-12 bg-zinc-600 rounded-xl pl-11 text-white font-normal placeholder:text-zinc-300'
					placeholder='Search'
				/>
				<FontAwesome
					className='absolute top-2.5 left-2.5'
					name='search'
					size={24}
					color='white'
				/>
			</View>
			<Modal
				animationType='slide'
				transparent={true}
				visible={modalVisible}
				onRequestClose={() => setModalVisible(false)} // Закрытие меню
			>
				<SafeAreaView className='bg-zinc-800 w-full h-full justify-between'>
					<View className='flex-row items-center justify-between p-3'>
						<Pressable
							onPress={() => setModalVisible(false)} // Открытие меню при нажатии
						>
							<Ionicons name='close' size={32} color='white' />
						</Pressable>
						<View className='p-1.5 bg-zinc-700 rounded-md'>
							<Text className='text-white text-lg font-semibold'>Filters</Text>
						</View>
						<Text className='text-zinc-200'>Default</Text>
					</View>
					<View className='flex-col mt-5 gap-5 px-3 flex-1'>
						<View className='gap-5'>
							<Text className='text-white text-xl font-bold'>Types</Text>
							<View className='flex-row gap-2 items-center'>
								<Checkbox />
								<Text className='text-white text-lg'>TV</Text>
							</View>
							<View className='flex-row gap-2 items-center'>
								<Checkbox />
								<Text className='text-white text-lg'>Movie</Text>
							</View>
						</View>
						<View className='gap-5'>
							<Text className='text-white text-xl font-bold'>Date</Text>
							<View className='flex-row gap-2 items-center'>
								<Text className='text-white text-lg'>From</Text>
								<TextInput
									className='h-12 w-32 bg-zinc-700 rounded-xl pl-3 text-white font-normal placeholder:text-zinc-300'
									placeholder='Date'
								></TextInput>
								<Text className='text-white text-lg'>To</Text>
								<TextInput
									className='h-12 w-32 bg-zinc-700 rounded-xl pl-3 text-white font-normal placeholder:text-zinc-300'
									placeholder='Date'
								></TextInput>
							</View>
						</View>
					</View>
					<Pressable
						className='bg-zinc-200 p-3 items-center mb-5 mx-3 rounded-xl'
						onPress={() => setModalVisible(false)}
					>
						<Text className='text-lg font-semibold'>Apply</Text>
					</Pressable>
				</SafeAreaView>
			</Modal>
		</View>
	)
}

export default Header
