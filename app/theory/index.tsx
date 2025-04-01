// app/tasks.tsx
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const TheoryScreen = () => {
	return (
		<View style={styles.container}>
			<Text style={styles.header}>Теория</Text>
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

export default TheoryScreen
