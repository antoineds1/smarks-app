import { Image, Text, TouchableOpacity, View, useWindowDimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/AntDesign";

export function AccountScreen(){
    const dimension = useWindowDimensions();
    const insets = useSafeAreaInsets();
    return(
        <View style={{flex:1, backgroundColor:"white", paddingTop:insets.top+10}}>
            <View style={{width:dimension.width, height:dimension.width, alignItems:"center"}}>
                <Image style={{width:dimension.width*0.5, height:dimension.width,resizeMode:"contain"}} source={require("../assets/logo.png")}/>
            </View>
            <View style={{flex:1, padding:10, gap:15}}>
                <TouchableOpacity style={{zIndex:10, padding:10, flexDirection:"row", alignItems:"center", gap:15}}>
                    <Icon name="staro" size={29} style={{color:"#f3d5d3"}}/>
                    <Text numberOfLines={1} style={{fontFamily: 'CircularSp-Book', fontSize:17, opacity:0.8}}>Noter l'application</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{zIndex:10, padding:10, flexDirection:"row", alignItems:"center", gap:15}}>
                    <Icon name="inbox" size={29} style={{color:"#f3d5d3"}}/>
                    <Text numberOfLines={1} style={{fontFamily: 'CircularSp-Book', fontSize:17, opacity:0.8}}>Envoyer une suggestion</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{zIndex:10, padding:10, flexDirection:"row", alignItems:"center", gap:15}}>
                    <Icon name="mail" size={29} style={{color:"#f3d5d3"}}/>
                    <Text numberOfLines={1} style={{fontFamily: 'CircularSp-Book', fontSize:17, opacity:0.8}}>Nous contacter</Text>
                </TouchableOpacity>

                <Text numberOfLines={1} style={{fontFamily: 'CircularSp-Book', fontSize:17, opacity:0.3, paddingHorizontal:6, marginTop:10}}>Version: {require('../app.json')['expo']['version']}</Text>
            </View>
        </View>
    )
}