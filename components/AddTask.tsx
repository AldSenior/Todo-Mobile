// app/AddTask.js
import { useRouter } from 'expo-router'
import React, { useState } from 'react'
import { Button, StyleSheet, Text, TextInput, View } from 'react-native'

export default function AddTask() {
	const router = useRouter()

	const [task, setTask] = useState('')
	const [timeLimit, setTimeLimit] = useState('')
	const [difficulty, setDifficulty] = useState('Easy')
	const [notes, setNotes] = useState('')

	const handleAddTask = () => {
		// Здесь вы можете добавить логику для сохранения задачи
		console.log('Task:', task)
		console.log('Time Limit:', timeLimit)
		console.log('Difficulty:', difficulty)
		console.log('Notes:', notes)

		// В этом примере просто вернемся на главный экран после добавления
		router.push('/')
	}

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Добавить новую задачу</Text>
			<TextInput
				style={styles.input}
				placeholder="Введите задачу"
				value={task}
				onChangeText={setTask}
			/>
			<TextInput
				style={styles.input}
				placeholder="Ограничение по времени (в минутах)"
				keyboardType="numeric"
				value={timeLimit}
				onChangeText={setTimeLimit}
			/>
			<TextInput
				style={styles.input}
				placeholder="Уровень сложности"
				value={difficulty}
				onChangeText={setDifficulty}
			/>
			<TextInput
				style={styles.input}
				placeholder="Дополнительно (примечания)"
				value={notes}
				onChangeText={setNotes}
			/>
			<Button title="Добавить задачу" onPress={handleAddTask} />
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
		justifyContent: 'center',
	},
	title: {
		fontSize: 24,
		marginBottom: 20,
		textAlign: 'center',
	},
	input: {
		height: 40,
		borderColor: 'gray',
		borderWidth: 1,
		marginBottom: 20,
		paddingLeft: 8,
	},
})
