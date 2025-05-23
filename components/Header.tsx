import { Link } from 'expo-router'
import { StyleSheet, View } from 'react-native'

const Header = () => {
	return (
		<View style={styles.header}>
			<View style={styles.linksContainer}>
				<Link href="/tasks" style={styles.link}>Задачи</Link>
				<Link href="/theory" style={styles.link}>Теория</Link>
				<Link href="/notes" style={styles.link}>Заметки</Link>
				<Link href="/ContactUs" style={styles.link}>Связь с нами</Link>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	header: {
		padding: 20,
		position: "absolute",
		bottom: 0,
		backgroundColor: '#f8f8f8',
		borderBottomWidth: 1,
		borderBottomColor: '#ddd',
	},
	headerText: {
		fontSize: 28,
		fontWeight: 'bold',
		marginBottom: 10,
	},
	linksContainer: {
		width: "100%",
		flexDirection: 'row',
		justifyContent: 'space-around',
	},
	link: {
		fontSize: 18,
		color: '#007BFF',
	},
})

export default Header