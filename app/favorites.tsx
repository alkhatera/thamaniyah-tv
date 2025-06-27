import { View } from 'react-native';

function Favorites() {
	return (
		<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
			<View style={{ width: 100, height: 100, backgroundColor: 'blue' }} />
			<View style={{ width: 100, height: 100, backgroundColor: 'red', marginTop: 20 }} />
			<View style={{ width: 100, height: 100, backgroundColor: 'green', marginTop: 20 }} />
			<View style={{ width: 100, height: 100, backgroundColor: 'yellow', marginTop: 20 }} />
		</View>
	);
}

export default Favorites;
