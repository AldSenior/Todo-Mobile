// app/index.js
import * as Notifications from 'expo-notifications'
import React, { useEffect, useState } from 'react'
import { Alert, Button, FlatList, StyleSheet, Text, View } from 'react-native'
import TaskModal from '../../components/TaskModal'

interface Task {
	id: string
	title: string
	notes: string
	difficulty: string
	failed: boolean
	completed: boolean
	timeLimit: number
	timer: number
	notificationSent: boolean
}

export default function TasksScreen() {
	const [isModalVisible, setModalVisible] = useState(false)
	const [tasks, setTasks] = useState<Task[]>([])

	useEffect(() => {
		const requestPermissions = async () => {
			const { status } = await Notifications.requestPermissionsAsync()
			if (status !== 'granted') {
				Alert.alert('Необходимы разрешения', 'Пожалуйста, дайте разрешение на уведомления.')
			}
		}

		requestPermissions()

		const interval = setInterval(() => {
			setTasks(prevTasks => prevTasks.map(task => {
				if (task.completed || task.failed || task.notificationSent) return task // Таймер не идет

				if (task.timer > 0) {
					return { ...task, timer: task.timer - 1 }
				} else {
					sendNotification(task.title)
					return { ...task, failed: true, timer: 0, notificationSent: true }
				}
			}))
		}, 1000)

		return () => clearInterval(interval) // Очистка интервала
	}, [])

	const sendNotification = async (title: string) => {
		await Notifications.scheduleNotificationAsync({
			content: {
				title: "Время вышло!",
				body: `Время для задачи "${title}" истекло! Задача провалена!`,
			},
			trigger: null,
		})
	}

	const handleAddTask = (task: Task) => {
		const newTask = {
			...task,
			id: Date.now().toString(),
			completed: false,
			failed: false,
			timer: task.timeLimit * 60,
			notificationSent: false
		}
		setTasks(prevTasks => [...prevTasks, newTask])
		setModalVisible(false)
	}

	const handleTaskStatus = (id: string, status: 'complete' | 'delete') => {
		setTasks(prevTasks => prevTasks.map(task => {
			if (task.id === id) {
				if (status === 'complete') {
					return { ...task, completed: true, timer: 0 } // Завершение задачи
				}
				return null // Удаление задачи
			}
			return task
		}).filter(task => task !== null)) // Убираем утечки в случае удаления
	}

	const confirmDeleteTask = (id: string) => {
		Alert.alert("Удалить задачу", "Вы уверены, что хотите удалить эту задачу?", [
			{ text: "Отмена", style: "cancel" },
			{ text: "Удалить", onPress: () => handleTaskStatus(id, 'delete') }
		])
	}

	const renderTask = ({ item }: { item: Task }) => (
		<View style={[styles.taskItem, { backgroundColor: item.completed ? '#d4edda' : item.failed ? '#f8d7da' : '#ffffff' }]}>
			<Text style={styles.taskTitle}>{item.title}</Text>
			<Text>Оставшееся время: {Math.floor(item.timer / 60)} мин {item.timer % 60} сек</Text>
			<Text>Сложность: {item.difficulty}</Text>
			<Text>Примечания: {item.notes}</Text>
			{item.failed ? (
				<Text style={styles.statusText}>Задача провалена!</Text>
			) : item.completed ? (
				<Text style={styles.statusText}>Задача завершена!</Text>
			) : (
				<View style={styles.buttonContainer}>

					<Button title="Завершить" onPress={() => handleTaskStatus(item.id, 'complete')} />
					<Button title="Удалить" color="red" onPress={() => confirmDeleteTask(item.id)} />
				</View>
			)}
		</View>
	)

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Список задач</Text>
			<Button title="Добавить новую задачу" onPress={() => setModalVisible(true)} />
			<FlatList
				data={tasks}
				renderItem={renderTask}
				keyExtractor={(item) => item.id}
			/>
			<TaskModal
				isVisible={isModalVisible}
				onClose={() => setModalVisible(false)}
				onSubmit={handleAddTask}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
		backgroundColor: '#f8f9fa',
	},
	title: {
		fontSize: 24,
		fontWeight: 'bold',
		marginBottom: 20,
		textAlign: 'center',
	},
	taskItem: {
		borderRadius: 8,
		borderWidth: 1,
		borderColor: '#ccc',
		padding: 10,
		marginVertical: 5,
		elevation: 2, // Тень для Android
		shadowColor: '#000', // Тень для iOS
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.2,
		shadowRadius: 1,
	},
	taskTitle: {
		fontSize: 18,
		fontWeight: 'bold',
	},
	buttonContainer: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		marginTop: 10,
	},
	statusText: {
		fontWeight: 'bold',
	},
})
