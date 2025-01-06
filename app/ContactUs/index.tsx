import React, { useState } from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'
import ContactUsModal from '../../components/ContactUsModal'
const ContactUsPage = () => {
	const [modalVisible, setModalVisible] = useState(false)
	const openModal = () => setModalVisible(true)
	const closeModal = () => setModalVisible(false)

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Связаться с нами</Text>
			<Button title="Открыть форму обратной связи" onPress={openModal} />
			<ContactUsModal visible={modalVisible} onClose={closeModal} />
		</View>
	)
}


const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		padding: 20,
		backgroundColor: '#f5f5f5',
	},
	title: {
		fontSize: 24,
		fontWeight: 'bold',
		marginBottom: 20,
	},
})

export default ContactUsPage
