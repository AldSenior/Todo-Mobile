import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const TasksScreen = () => {
	return (
		<View style={styles.container}>
			<Text style={styles.header}>Список задач</Text>
			{/* Здесь будет ваш контент по задачам */}
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	header: {
		fontSize: 24,
		fontWeight: 'bold',
	},
})

export default TasksScreen
