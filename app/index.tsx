import * as Notifications from "expo-notifications"
import React, { useEffect } from 'react'
import { Alert, StyleSheet, Text, View } from 'react-native'


const MainScreen: React.FC = () => {
	useEffect(() => {
		const requestPermissions = async () => {
			const { status } = await Notifications.requestPermissionsAsync()
			if (status !== 'granted') {
				Alert.alert('Необходимы разрешения', 'Пожалуйста, дайте разрешение на уведомления.')
			}
		}

		requestPermissions()

		Notifications.setNotificationHandler({
			handleNotification: async () => ({
				shouldPlaySound: true,
				shouldSetBadge: true,
				shouldShowAlert: true,
			}),
		})
	}, [])

	const scheduleNotification = async (title: string) => {
		await Notifications.scheduleNotificationAsync({
			content: {
				title: "Заметка успешно добавлена!",
				body: `Вы добавили новую заметку: "${title}".`,
			},
			trigger: { seconds: 5 },
		})
	}



	return (
		<View>
			<Text>Главная</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 20,
		paddingTop: 50,
	},
	darkContainer: {
		backgroundColor: '#1E1E1E', // Цвет фона для темной темы
	},
	lightContainer: {
		backgroundColor: '#F9F9F9', // Цвет фона для светлой темы
	},
	header: {
		fontSize: 28,
		fontWeight: 'bold',
		marginBottom: 20,
		textAlign: 'center',
		color: '#333',
	},
	searchInput: {
		height: 45,
		borderColor: '#ccc',
		borderWidth: 1,
		borderRadius: 8,
		paddingHorizontal: 15,
		marginBottom: 15,
		backgroundColor: '#fff', // Цвет фона для поля поиска
		color: '#000', // Цвет текста
	},
	sectionTitle: {
		fontSize: 22,
		fontWeight: 'bold',
		marginBottom: 15,
		color: '#555',
	},
	listItem: {
		padding: 15,
		backgroundColor: '#fff',
		borderRadius: 8,
		marginVertical: 5,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.4,
		shadowRadius: 4,
		elevation: 3,
	},
	subject: {
		fontWeight: 'normal',
		color: '#888',
	},
	noteContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	noteTouchable: {
		width: '75%',
	},
	deleteButton: {
		alignItems: 'center',
		justifyContent: 'center',
	},
	deleteText: {
		color: '#FF6B6B',
		fontWeight: 'bold',
	},
	completed: {
		textDecorationLine: 'line-through',
		color: '#bbb',
	},
	listContainer: {
		paddingBottom: 10,
	},
	toggleContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		marginTop: 20,
	},
})

export default MainScreen
