import { View, Text, FlatList, Image, TextInput, Pressable, ScrollView, Touchable, TouchableOpacity } from "react-native";

export function PromotionItem(){
    return(
        <View style={{backgroundColor:"#debaba", height:150, flexDirection:"row", marginHorizontal:16, borderRadius:16}}>
            <Image style={{width:"40%", height:150}}/>
            <TouchableOpacity style={{backgroundColor:"#c5a596", alignSelf:"flex-start", position:"absolute", top:10, right:10, borderRadius:10}}>
                <Text style={{fontFamily: 'CircularSp-Bold', color:"white", padding:7, letterSpacing:-0.3, paddingHorizontal:10}}>Voir le soins du moments</Text>
            </TouchableOpacity>
            <View style={{position:"absolute", bottom:10, right:10, fontSize:15, left:"40%",}}>
                <Text style={{fontFamily: 'CircularSp-Bold', color:"black", letterSpacing:-0.3, paddingHorizontal:10, lineHeight:16, alignSelf:"flex-end"}}>Niacinamide 10% + Zinc 1% - Sérum Anti-Imperfections </Text>
                <Text style={{fontFamily: 'CircularSp-Bold', color:"black", letterSpacing:-0.7, paddingHorizontal:10, fontSize:25, alignSelf:"flex-end"}}>10,80€</Text>
            </View>
            <View style={{position:"absolute", left:-10, bottom:10, width:"40%", zIndex:1999, alignItems:"center"}}>
                <View style={{backgroundColor:"#c5a596", borderRadius:10}}>
                    <Text style={{fontFamily: 'CircularSp-Bold', color:"white", padding:7, letterSpacing:-0.3, paddingHorizontal:10}}>The Ordinary</Text>
                </View>
            </View>
        </View>
)
}