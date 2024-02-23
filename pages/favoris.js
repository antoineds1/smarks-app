import { FlatList, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ProductItem } from "../component/productItem";
import { AppContext } from "../component/context";
import { useContext } from "react";

export function FavorisScreen(){
	const insets = useSafeAreaInsets();
	const {favs, setFavs} = useContext(AppContext);
	const renderItem = ({ item }) => (
		<ProductItem data={item}/>
	);
	return(
		<View style={{flex:1, paddingTop:insets.top+10, backgroundColor:"white"}}>
			<Text style={{fontSize:30, fontFamily: 'CircularSp-Bold', letterSpacing:-0.5, alignSelf:"center", paddingBottom:10}}>Favoris</Text>
			<FlatList
				style={{paddingHorizontal:5}}
				data={favs}
				renderItem={renderItem}
				keyExtractor={(item, index) => index}
				numColumns={2}
				showsVerticalScrollIndicator={false}
			/>
		</View>
	)
}