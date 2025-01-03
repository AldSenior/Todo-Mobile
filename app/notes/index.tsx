import * as Notifications from "expo-notifications"
import React, { useEffect, useState } from 'react'
import { Alert, Button, FlatList, StyleSheet, Switch, Text, TextInput, TouchableOpacity, View } from 'react-native'
import NoteModal from '../../components/NoteModal' // Убедитесь, что путь указан верно

interface Note {
	id: string
	title: string
	completed: boolean
	subject: string // Тематическое поле
}

const MainScreen: React.FC = () => {
	const [isModalVisible, setModalVisible] = useState<boolean>(false)
	const [notes, setNotes] = useState<Note[]>([])
	const [searchTerm, setSearchTerm] = useState<string>('')
	const [isDarkTheme, setIsDarkTheme] = useState<boolean>(false)

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

	const handleAddNote = (note: { title: string; subject: string }) => {
		const newNote: Note = { id: String(notes.length + 1), title: note.title, completed: false, subject: note.subject }
		setNotes(prevNotes => [...prevNotes, newNote])
		scheduleNotification(note.title)
		setModalVisible(false)
	}

	const handleDeleteNote = (id: string) => {
		Alert.alert("Удалить заметку", "Вы уверены, что хотите удалить эту заметку?", [
			{ text: "Отмена", style: "cancel" },
			{ text: "Удалить", onPress: () => setNotes(prevNotes => prevNotes.filter(note => note.id !== id)) }
		])
	}

	const toggleNoteCompletion = (id: string) => {
		setNotes(prevNotes =>
			prevNotes.map(note =>
				note.id === id ? { ...note, completed: !note.completed } : note
			)
		)
	}

	// Фильтрация заметок по заголовку и теме
	const filteredNotes = notes.filter(note =>
		note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
		note.subject.toLowerCase().includes(searchTerm.toLowerCase())
	)

	return (
		<View style={[styles.container, isDarkTheme ? styles.darkContainer : styles.lightContainer]}>
			<TextInput
				style={styles.searchInput}
				placeholder="Поиск заметок..."
				value={searchTerm}
				onChangeText={setSearchTerm}
				placeholderTextColor={isDarkTheme ? '#bbb' : '#aaa'}
			/>

			<Text style={styles.header}>Подготовка к экзаменам</Text>

			<View style={styles.section}>
				<Text style={styles.sectionTitle}>Заметки</Text>
				<FlatList
					data={filteredNotes}
					renderItem={({ item }) => (
						<View style={styles.noteContainer}>
							<TouchableOpacity
								onPress={() => toggleNoteCompletion(item.id)}
								style={styles.noteTouchable}
							>
								<Text style={[styles.listItem, item.completed ? styles.completed : null]}>

									{item.title} - <Text style={styles.subject}>{item.subject}</Text>
								</Text>
							</TouchableOpacity>
							<TouchableOpacity
								style={styles.deleteButton}
								onPress={() => handleDeleteNote(item.id)}
							>
								<Text style={styles.deleteText}>Удалить</Text>
							</TouchableOpacity>
						</View>
					)}
					keyExtractor={item => item.id}
					contentContainerStyle={styles.listContainer}
				/>
			</View>

			<Button title="Добавить заметку" onPress={() => setModalVisible(true)} />

			<View style={styles.toggleContainer}>
				<Text>Темная тема</Text>
				<Switch value={isDarkTheme} onValueChange={() => setIsDarkTheme(previous => !previous)} />
			</View>

			<NoteModal
				isVisible={isModalVisible}
				onClose={() => setModalVisible(false)}
				onSubmit={handleAddNote}
			/>
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
