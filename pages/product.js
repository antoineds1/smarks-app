import { useContext, useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View, useWindowDimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Icon from 'react-native-vector-icons/AntDesign';
import { Linking } from 'react-native';
import { AppContext } from "../component/context";
import { addFavItem, isInFavs, removeFavItem } from "../storage";

export function ProductScreen({route, navigation}){
    const insets = useSafeAreaInsets();
    const dimension = useWindowDimensions();
    const [selected, setSelected] = useState(0);
    const {favs, setFavs} = useContext(AppContext);
    const onAddToFav = async (item) => {
		const newFavs = await addFavItem(item);
		setFavs(newFavs)
	}

	const onRemoveToFav = async (item) => {
		const newFavs = await removeFavItem(item);
		setFavs(newFavs)
	}

    const product = route.params.data;
    const isInFav = isInFavs(favs, product)
    const openURL = (url) => {
        // Check if the given URL can be handled by any app installed on the device.
        Linking.canOpenURL(url).then(supported => {
          if (supported) {
            Linking.openURL(url);
          } else {
            console.log(`Don't know how to open this URL: ${url}`);
          }
        }).catch(err => console.error('An error occurred', err));
    }

    return(
        <View style={{flex:1, paddingTop:insets.top+10, backgroundColor:"white"}}>
            <View style={{flexDirection:"row", paddingHorizontal:16, justifyContent:"space-between"}}>
                <TouchableOpacity onPress={()=>{navigation.goBack()}} style={{zIndex:10, borderRadius:100}}>
                    <Icon name="arrowleft" size={23} style={{color:"black"}}/>
                </TouchableOpacity>
                <TouchableOpacity style={{}} onPress={()=>{isInFav?onRemoveToFav(product):onAddToFav(product)}}>
                    <Icon name={isInFav?"heart":"hearto"} size={23} style={{color:isInFav?"red":"black"}}/>
                </TouchableOpacity>
            </View>
            <Image source={{uri:product.image}} resizeMode="contain" style={{width:dimension.width, height:dimension.width/3}}/>
            <View style={{padding:16, paddingVertical:10}}>
                <Text numberOfLines={1} style={{fontFamily: 'CircularSp-Book', fontSize:16, opacity:0.5, letterSpacing:-0.3}}>{product.marque}</Text>
                <Text numberOfLines={1} style={{fontFamily: 'CircularSp-Bold', fontSize:23, letterSpacing:-0.5}}>{product.nom}</Text>
            </View>
            <View style={{padding:16, flexDirection:"row", gap:7, paddingVertical:5}}>
                {["Ou àcheter", "Description", "Ingrédients"].map((item, index)=>{
                    return(
                        <TouchableOpacity key={index} onPress={()=>{setSelected(index)}}>
                            <Text numberOfLines={1} style={{fontFamily: 'CircularSp-Bold', fontSize:17, letterSpacing:-0.3, opacity:selected==index?1:0.4}}>{item}</Text>
                        </TouchableOpacity>
                    )
                })}
            </View>
            {selected==0&&<ScrollView style={{flex:1}} contentContainerStyle={{gap:5}}>
                {product.offers.map((item, index)=>{
                    return(
                        <TouchableOpacity onPress={() => openURL(item.url)} key={index} style={{backgroundColor:"white", padding:10, flexDirection:"row", justifyContent:"space-between"}}>
                            <View style={{flexDirection:"row", alignItems:"center", gap:10}}>
                                <Image source={{uri:item.img}} style={{width:50, height:50, borderRadius:10, resizeMode:"contain"}}/>
                                <Text style={{fontFamily: 'CircularSp-Bold', fontSize:17, letterSpacing:-0.3}}>{item.boutique}</Text>
                            </View>
                            <View style={{flexDirection:"row", alignItems:"center", gap:10}}>
                                <Text style={{fontFamily: 'CircularSp-Bold', fontSize:17, letterSpacing:-0.3}}>{item.price}€</Text>
                                <Icon name="right" size={18} style={{color:"black"}}/>
                            </View>
                        </TouchableOpacity>
                    )
                })}
            </ScrollView>}
            {selected==1&&<ScrollView style={{flex:1, padding:10}}>
                <Text style={{fontFamily: 'CircularSp-Book', fontSize:17, letterSpacing:-0.3}}>{product.description}</Text>
            </ScrollView>}
            {selected==2&&<ScrollView style={{flex:1, padding:10}}>
                <Text style={{fontFamily: 'CircularSp-Book', fontSize:17, letterSpacing:-0.3}}>{product.ingredients}</Text>
            </ScrollView>}
        </View>
    )
}