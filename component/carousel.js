import { memo, useCallback, useEffect, useState } from "react";
import { FlatList, View, Text, Touchable, TouchableOpacity, Image } from "react-native";
import { pb } from "../pocketbase";
import { ProductItem } from "./productItem";
import Icon from 'react-native-vector-icons/AntDesign';
import { FlashList } from "@shopify/flash-list";
import { getFavItem } from "../storage";


export const Carousel = memo((props) => {
    console.log("carousel render")
    const data = props.data


    const renderItem = ({ item }) => (
        <ProductItem data={item}/>
    );

    return(
        <View style={{height:325}}>
            <View style={{paddingHorizontal:16, flexDirection:"row", justifyContent:"space-between"}}>
                <Text numberOfLines={1} style={{fontFamily: 'CircularSp-Bold', fontSize:25, letterSpacing:-1,}}>{props.name}</Text>
                <TouchableOpacity style={{flexDirection:"row", alignItems:"center", gap:3, opacity:0.3}}>
                    <Text style={{fontFamily: 'CircularSp-Bold', fontSize:15, letterSpacing:-0.3,}}>Tout voir</Text>
                    <Icon name="right" size={13}/>
                </TouchableOpacity>
            </View>
                {data.length!=0&&<FlatList
                    data={data}
                    renderItem={renderItem}
                    removeClippedSubviews
                    keyExtractor={(item) => item.id.toString()}
                    horizontal
                    initialNumToRender={5}
                    maxToRenderPerBatch={5}
                    windowSize={5}
                    showsHorizontalScrollIndicator={false}
                />}
        </View>
    )
})

export function CarouselImage(props){
    const data = ["https://www.sephora.fr/on/demandware.static/-/Library-Sites-SephoraV2/default/dw144284f4/brands/Logos/CHARLOTTE-TILBURY_300_150_logo.png",
    "https://app.ladn-data.eu/storage/uploads/companies/hyteck-aroma-zone.jpg",
    "https://www.imiza.com/img/imiza-logo_mobile-1479121339.jpg?1689670649",
    "https://logos-marques.com/wp-content/uploads/2020/06/Herm%C3%A8s-logo-650x366.jpg"
]

    const renderItem = ({ item }) => (
		<Image source={{uri:item}} style={{height:120, width:100, resizeMode:"contain"}}/>
	);

    return(
        <View style={{height:120}}>
            <View style={{paddingHorizontal:10, flexDirection:"row", justifyContent:"space-between"}}>
                <Text numberOfLines={1} style={{fontFamily: 'CircularSp-Bold', fontSize:25, letterSpacing:-1,}}>{props.name}</Text>
            </View>
            <FlatList
				style={{paddingHorizontal:5}}
				data={data}
				renderItem={renderItem}
                contentContainerStyle={{gap:10}}
				keyExtractor={(item, index) => index}
                horizontal
                showsHorizontalScrollIndicator={false}
			/>
        </View>
    )
}