import { Slot } from 'expo-router'
import '../../global.css'

export default function RootLayout() {
	return (
		// <Stack>
		// 	<Stack.Screen
		// 		name='index'
		// 		options={{
		// 			header: props => <Header />,
		// 		}}
		// 	></Stack.Screen>
		// </Stack>
		<Slot />
	)
}
