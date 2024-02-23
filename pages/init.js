import * as Font from 'expo-font';
import { useEffect } from 'react';
import { View, Text } from 'react-native';
import { getUserInfo } from '../storage';


export function InitScreen({navigation}){
	const loadFonts = async () => {
		await Font.loadAsync({
			'CircularSp-Bold': require('../assets/fonts/CircularSp-Bold.ttf'),
			'CircularSp-Book': require('../assets/fonts/CircularSp-Book.ttf'),
		});
		const userInfo = await getUserInfo();
		navigation.navigate("BottomTabs");
	};
	useEffect(() => {
		loadFonts();
	}, []);

	return (
		<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
		  <Text style={{}}>This is CircularSp-Bold text</Text>
		  <Text style={{}}>This is CircularSp-Book text</Text>
		</View>
	);
}