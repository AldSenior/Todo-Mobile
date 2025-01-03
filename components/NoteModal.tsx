// NoteModal.tsx
import React, { useState } from 'react'
import { Button, Modal, StyleSheet, TextInput, View } from 'react-native'

interface NoteModalProps {
	isVisible: boolean
	onClose: () => void
	onSubmit: (note: { title: string; subject: string }) => void // Изменяем тип на объект
}

const NoteModal: React.FC<NoteModalProps> = ({ isVisible, onClose, onSubmit }) => {
	const [title, setTitle] = useState<string>('')
	const [subject, setSubject] = useState<string>('')

	const handleSubmit = () => {
		if (title && subject) {
			onSubmit({ title, subject }) // Передаем объект с названием и темой
			setTitle('')
			setSubject('')
			onClose()
		}
	}

	return (
		<Modal visible={isVisible} animationType="slide">
			<View style={styles.modalContainer}>
				<TextInput
					placeholder="Название заметки"
					value={title}
					onChangeText={setTitle}
					style={styles.input}
				/>
				<TextInput
					placeholder="Тема"
					value={subject}
					onChangeText={setSubject}
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
		marginBottom: 15,
		paddingHorizontal: 10,
	},
})

export default NoteModal
