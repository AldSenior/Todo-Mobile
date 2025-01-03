// Внесите изменения в TaskModal
// app/TaskModal.js
import React, { useState } from 'react'
import { Button, Modal, StyleSheet, TextInput, View } from 'react-native'

interface TaskModalProps {
	isVisible: boolean
	onClose: () => void
	onSubmit: (task: Task) => void // Тип передаваемой задачи
}

interface Task {
	title: string
	notes: string
	difficulty: string
	timeLimit: number // Временной лимит в минутах
}

const TaskModal: React.FC<TaskModalProps> = ({ isVisible, onClose, onSubmit }) => {
	const [title, setTitle] = useState<string>('')
	const [timeLimit, setTimeLimit] = useState<string>('') // Измените на строку для пользовательского ввода
	const [difficulty, setDifficulty] = useState<string>('Easy')
	const [notes, setNotes] = useState<string>('')

	const handleSubmit = () => {
		if (title && timeLimit) {
			onSubmit({ title, timeLimit: Number(timeLimit), difficulty, notes }) // Передаем как число
			setTitle('')
			setTimeLimit('')
			setDifficulty('Easy')
			setNotes('')
			onClose()
		}
	}

	return (
		<Modal visible={isVisible} animationType="slide">
			<View style={styles.modalContainer}>
				<TextInput
					placeholder="Введите задачу"
					value={title}
					onChangeText={setTitle}
					style={styles.input}
				/>
				<TextInput
					placeholder="Ограничение по времени (в минутах)"
					keyboardType="numeric"
					value={timeLimit}
					onChangeText={setTimeLimit}
					style={styles.input}
				/>
				<TextInput
					placeholder="Уровень сложности"
					value={difficulty}
					onChangeText={setDifficulty}
					style={styles.input}

				/>
				<TextInput
					placeholder="Дополнительно (примечания)"
					value={notes}
					onChangeText={setNotes}
					style={styles.input}
				/>
				<Button title="Сохранить" onPress={handleSubmit} />
				<Button title="Закрыть" onPress={onClose} />
			</View>
		</Modal>
	)
}

const styles = StyleSheet.create({
	modalContainer: {
		flex: 1,
		padding: 20,
		justifyContent: 'center',
		backgroundColor: '#fff',
	},
	input: {
		height: 40,
		borderColor: '#ccc',
		borderWidth: 1,
		paddingHorizontal: 10,
		marginVertical: 12,
	},
})

export default TaskModal
