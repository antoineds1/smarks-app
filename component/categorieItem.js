import { View, useWindowDimensions } from "react-native";

export function CategorieItem(){
    const dimension = useWindowDimensions();
    return(
        <View style={{width:(dimension.width-30)/2, height:((dimension.width-30)/2)*0.8, backgroundColor:"red", borderRadius:12}}>
            
        </View>
    )
}