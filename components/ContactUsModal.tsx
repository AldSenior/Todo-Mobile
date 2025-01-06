import { useState } from 'react'
import { Button, Modal, StyleSheet, Text, TextInput, View } from 'react-native'

const ContactUsModal = ({ visible, onClose }) => {
	const [name, setName] = useState('')
	const [message, setMessage] = useState('')
	const [isCooldown, setIsCooldown] = useState(false)
	const [remainingTime, setRemainingTime] = useState(0) // Время оставшееся для кулдауна
	const cooldownTime = 30 * 60 * 1000 // 30 минут в миллисекундах

	const onSubmit = async () => {
		if (isCooldown) {
			// Уведомление о кулдауне
			return
		}

		const data = {
			service_id: 'service_o7noz1b',
			template_id: 'template_03w4o9u',
			user_id: 'aoSeXpKSosd3HCpZS',
			template_params: {
				name,
				message,
			},
		}

		const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		})

		// Успешная отправка сообщения
		if (response.ok) {
			setName('')
			setMessage('')
			setIsCooldown(true)
			startCooldown()
			onClose()
		}
	}

	const startCooldown = () => {
		setRemainingTime(cooldownTime) // Устанавливаем оставшееся время
		setIsCooldown(true)

		const interval = setInterval(() => {
			setRemainingTime((prev) => {
				if (prev <= 1000) {
					clearInterval(interval) // Останавливаем интервал при истечении времени
					setIsCooldown(false)
					return 0 // Сбрасываем оставшееся время
				}

				return prev - 1000 // Уменьшаем оставшееся время на одну секунду
			})
		}, 1000)
	}

	const getRemainingTimeString = (milliseconds) => {
		const minutes = Math.floor((milliseconds / 1000 / 60) % 60)
		const seconds = Math.floor((milliseconds / 1000) % 60)

		return `${minutes} минут(ы) ${seconds} секунд(ы)`
	}

	return (
		<Modal
			transparent={true}
			animationType="slide"
			visible={visible}
			onRequestClose={onClose}
		>
			<View style={styles.overlay}>
				<View style={styles.modal}>
					<Text style={styles.title}>Связаться с нами</Text>
					<TextInput
						placeholder="Имя"
						value={name}
						onChangeText={setName}
						style={styles.input}
					/>
					<TextInput
						multiline={true}
						numberOfLines={4}
						placeholder="Ваше сообщение..."
						value={message}
						onChangeText={setMessage}
						style={[styles.input, styles.textArea]}
					/>
					<Button title="Отправить" onPress={onSubmit} disabled={isCooldown} />

					{isCooldown && (
						<Text style={styles.cooldownText}>
							Вы сможете отправить сообщение через: {getRemainingTimeString(remainingTime)}
						</Text>
					)}

					<Button title="Закрыть" onPress={onClose} color="red" />
				</View>
			</View>
		</Modal>
	)
}

const styles = StyleSheet.create({
	overlay: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
	},
	modal: {
		width: '80%',
		backgroundColor: 'white',
		padding: 20,
		borderRadius: 10,
		elevation: 5,
	},
	title: {
		fontSize: 20,
		fontWeight: 'bold',
		marginBottom: 20,
		textAlign: 'center',
	},

	input: {
		height: 40,
		borderColor: 'gray',
		borderWidth: 1,
		marginBottom: 15,
		paddingHorizontal: 10,
		borderRadius: 5,
	},
	textArea: {
		height: 100,
	},
	cooldownText: {
		marginTop: 10,
		color: 'orange',
		fontSize: 16,
		textAlign: 'center',
	},
})

export default ContactUsModal
