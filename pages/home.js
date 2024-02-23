import { View, Text, FlatList, Image, TextInput, Pressable, ScrollView, Touchable, TouchableOpacity } from "react-native";
import { ProductItem } from "../component/productItem";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Icon from 'react-native-vector-icons/AntDesign';
import { memo, useContext, useEffect, useState } from "react";
import { pb } from "../pocketbase";
import { Carousel } from "../component/carousel";
import { AppContext } from "../component/context";
import { PromotionItem } from "../component/promotion";

export const HomeScreen = memo((props) => {
	const [data, setData] = useState([])
	const insets = useSafeAreaInsets();
	const {setShouldFocus} = useContext(AppContext);
	useEffect(()=>{
		pb.collection('smarksProducts').getList(1, 50, {
			sort: '@random',
		}).then((e)=>{
			setData(e.items)
		})
	}, [])


	return(
		<View style={{flex:1, paddingTop:insets.top+10, backgroundColor:"white"}}>
			<Pressable onPress={()=>{navigation.navigate("Search");}}>
				<View style={{height:50, flexDirection:"row", alignItems:"center", backgroundColor:"rgba(0,0,0,0.06)", marginHorizontal:10, borderRadius:20, paddingHorizontal:12, gap:5, marginBottom:10}}>
					<Icon name="search1" size={23} style={{opacity:0.3}}/>
					<TextInput style={{flex:1, fontSize:17, fontFamily: 'CircularSp-Book', marginLeft:5, pointerEvents:"none"}} placeholder="Rechercher un article"/>
				</View>
			</Pressable>
			<ScrollView style={{flex:1}} contentContainerStyle={{gap:10}} showsVerticalScrollIndicator={false}>
				<PromotionItem/>
				<PromotionItem/>
				<PromotionItem/>
				<PromotionItem/>
				<PromotionItem/>
			</ScrollView>
		</View>
	)
})