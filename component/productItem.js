import { useNavigation } from "@react-navigation/native";
import { BlurView } from "expo-blur";
import { memo, useContext, useEffect, useState } from "react";
import { View, Text, Image, Touchable, TouchableOpacity, Pressable } from "react-native";
import Icon from 'react-native-vector-icons/AntDesign';
import { AppContext } from "./context";
import { addFavItem, isInFavs, removeFavItem } from "../storage";


function PriceIndicator(props){
	return(
		<View style={{flexDirection:"row", alignItems:"center", gap:4}}>
			<Text style={{fontSize:14, fontWeight:800, fontFamily: 'CircularSp-Bold', textDecorationLine:"line-through", opacity:0.4}}>{props.indicatif}€</Text>
			<Text style={{fontSize:16, fontWeight:800, fontFamily: 'CircularSp-Bold', color:"red"}}>{props.offers[0].price}€</Text>
		</View>
	)
}


export const ProductItem = memo((props) => {
	const navigation = useNavigation();
	const {favs, setFavs} = useContext(AppContext);
	const isInFav = isInFavs(favs, props.data)

	const onAddToFav = async (item) => {
		const newFavs = await addFavItem(item);
		setFavs(newFavs)
	}

	const onRemoveToFav = async (item) => {
		const newFavs = await removeFavItem(item);
		setFavs(newFavs)
	}
	return(
		<Pressable onPress={()=>{navigation.navigate("Product", {data:props.data})}} style={{marginVertical: 4, marginHorizontal: 4, flex: 1, backgroundColor:"white", maxWidth:200, padding:10}}>
			<View style={{flex:1}}>
				<TouchableOpacity activeOpacity={0.2} onPress={()=>{isInFav?onRemoveToFav(props.data):onAddToFav(props.data)}} style={{position:"absolute", right:-15, top:-15, zIndex:10, borderRadius:100, padding:20}}>
					<Icon name={isInFav?"heart":"hearto"} size={23} style={{color:isInFav?"red":"black"}}/>
				</TouchableOpacity>
				<Image style={{flex:1, height:150, backgroundColor:"white", borderRadius:10, padding:40}} resizeMode="contain" source={{uri:props.data.image}}/>
			</View>
			<View tint="light" blurReductionFactor={2} style={{marginTop:8, gap:3, padding:10, alignItems:"center"}}>
				<Text numberOfLines={1} style={{fontFamily: 'CircularSp-Book', fontSize:14, letterSpacing:-0.6, opacity:0.5, textAlign:"center"}}>{props.data.marque}</Text>
				<Text numberOfLines={2} style={{fontSize:15, fontWeight:500, fontFamily: 'CircularSp-Book', lineHeight:15, opacity:0.8, letterSpacing:-0.3,textAlign:"center"}}>{props.data.nom}</Text>
				<View style={{flexDirection:"row", justifyContent:"space-between", alignItems:"center"}}>
					<View style={{zIndex:10, borderRadius:100, alignSelf:"flex-start"}}>
						<Text style={{fontSize:16, fontWeight:800, fontFamily: 'CircularSp-Bold',}}>{props.data.offers[0].price}€</Text>
					</View>
				</View>
				<Text numberOfLines={1} style={{fontFamily: 'CircularSp-Book', fontSize:14, letterSpacing:-0.6, opacity:0.6, textAlign:"center"}}>{props.data.offers.length} offre{props.data.offers.length>1?"s":""}</Text>
			</View>
		</Pressable>
	)
})