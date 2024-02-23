import { TextInput, View, Text, FlatList, TouchableOpacity, ScrollView, useWindowDimensions, ImageBackground, Image } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Icon from 'react-native-vector-icons/AntDesign';
import { ProductItem } from "../component/productItem";
import { useFocusEffect, useIsFocused, useNavigation } from "@react-navigation/native";
import { memo, useContext, useEffect, useRef, useState } from "react";
import { Carousel, CarouselImage } from "../component/carousel";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import categories from "../categories";
import { AppContext } from "../component/context";
import { pb } from "../pocketbase";

const SearchProductItem = memo((props) => {
	const item = props.data
	const navigation = useNavigation()
	return(
		<TouchableOpacity onPress={()=>{navigation.navigate("Product", {data:item})}} style={{paddingVertical:10, flexDirection:"row", gap:10, alignItems:"center"}}>
			<Image source={{uri:item.image}} style={{width:40, height:40, resizeMode:"contain"}}/>
			<View style={{flex:1}}>
				<Text numberOfLines={1} style={{fontFamily: 'CircularSp-Book', fontSize:13, opacity:0.4}}>{item.marque}</Text>
				<Text numberOfLines={1} style={{fontFamily: 'CircularSp-Book', fontSize:15,}}>{item.nom}</Text>
				<Text numberOfLines={1} style={{fontFamily: 'CircularSp-Bold', fontSize:15}}>{item.offers[0].price}€</Text>
			</View>
		</TouchableOpacity>
	)
})

const getMarquesFromSearch = (result) => {
	const brands = []
	result.map((item, index)=>{
		brands.push(item.marque) 
	})

	const countBrands = {};
	for (const brand of brands) {
		if (countBrands[brand] === undefined) {
			countBrands[brand] = 0;
		}
		countBrands[brand]++;
	}

	// Trier les marques par le nombre d'occurrences
	const sortedBrands = Object.keys(countBrands).sort((a, b) => {
		return countBrands[b] - countBrands[a];
	});
	return sortedBrands;
}


const Stack = createNativeStackNavigator();
export function SearchScreen({route, navigation}){
	const insets = useSafeAreaInsets();
	const data = [1,1,1,1,1,1,1];
	const focused = useIsFocused();
	const {shouldFocus, setShouldFocus} = useContext(AppContext);
	const [searchText, setSearchText] = useState("");
	const [searchResult, setSearchResult] = useState([])
	const [brandResult, setBrandResult] = useState([])
	const searchRef = useRef()
	const renderItem = ({ item }) => (
		<ProductItem data={item}/>
	);
	
	useEffect(()=>{
		if(shouldFocus){
			searchRef.current.focus()
			setShouldFocus(false)
		}
	}, [focused])

	const searchNewItem = async (term) => {
		const resultList = await pb.collection('smarksProducts').getList(1, 30, {
			filter: 'nom ~ "'+term+'%" || marque ~ "'+term+'%"',
			sort:'rating'
		});
		setBrandResult(getMarquesFromSearch(resultList.items))
		setSearchResult(resultList.items)
	}


	return(
		<View style={{flex:1, paddingTop:insets.top+10, backgroundColor:"white"}}>
			<View style={{height:50, flexDirection:"row", alignItems:"center", backgroundColor:"rgba(0,0,0,0.06)", marginHorizontal:10, borderRadius:20, paddingHorizontal:12, gap:5, marginBottom:10}}>
				<Icon name="search1" size={23} style={{opacity:0.3}}/>
				<TextInput autoCorrect={false} spellCheck={false} value={searchText} ref={searchRef} onChangeText={(e)=>{(e.length>3?searchNewItem(e):setSearchResult([]));setSearchText(e)}} style={{flex:1, fontSize:17, fontFamily: 'CircularSp-Book', marginLeft:5}} placeholder="Rechercher un article"/>
				{searchText.length>0&&<TouchableOpacity onPress={()=>{setSearchText("");setSearchResult([])}}><Icon name="close" size={23} style={{opacity:0.3}}/></TouchableOpacity>}
			</View>
			{searchResult.length>0&&<View style={{flex:1}}>
				<View style={{paddingBottom:10, gap:5}}>
					<Text numberOfLines={1} style={{fontFamily: 'CircularSp-Book', fontSize:16, opacity:0.5, letterSpacing:-0.3, paddingHorizontal:16}}>Marques pour {searchText}</Text>
					<ScrollView horizontal contentContainerStyle={{gap:10}} showsHorizontalScrollIndicator={false} style={{paddingLeft:16}}>
						{brandResult.map((item, index)=>{
							return(
								<TouchableOpacity key={index} onPress={()=>{setSearchText(item);searchNewItem(item)}} style={{backgroundColor:"rgba(0,0,0,0.06)", padding:6, paddingHorizontal:10, borderRadius:100}}>
									<Text numberOfLines={1} style={{fontFamily: 'CircularSp-Bold', fontSize:15, opacity:1, letterSpacing:-0.5}}>{item}</Text>
								</TouchableOpacity>
							)
						})}
					</ScrollView>
				</View>
				<ScrollView style={{flex:1, paddingHorizontal:16}}>
					<Text numberOfLines={1} style={{fontFamily: 'CircularSp-Book', fontSize:16, opacity:0.5, letterSpacing:-0.3}}>Résultats pour {searchText}</Text>
					<View style={{marginTop:5}}>
						{searchResult.map((item, index)=>{
							return(
								<SearchProductItem key={index} data={item}/>
							)
						})}
					</View>
				</ScrollView>
			</View>}
			{searchResult.length<1&&
			<Stack.Navigator screenOptions={{headerShown:false}}>
				<Stack.Screen name="SearchCategorie" component={SearchCategorie} />
				<Stack.Screen name="SearchSpecific" component={SearchSpecificCategorie} />
				<Stack.Screen name="SearchProduct" component={SearchSpecificProduct} />
		  	</Stack.Navigator>}
		</View>
	)
}

const CategorieItem = memo((props) => {
	const dimension = useWindowDimensions();
	const navigation = useNavigation()
	return(
		<TouchableOpacity onLayout={(e)=>{console.log(e.nativeEvent)}} onPress={()=>{navigation.navigate("SearchSpecific", {data:props.data.souscat, cat:props.name})}} style={{width:"50%", height:200}}>
			<ImageBackground source={{uri:props.data.image}} style={{margin:4, flex:1, alignItems:"center", padding:10, resizeMode:"cover", justifyContent:"center", overflow:"hidden"}} borderRadius={20}>
				<View style={{position:"absolute", top:0, left:0, right:0, bottom:0, backgroundColor:"rgba(0,0,0,0.05)", borderRadius:20}}></View>
				<Text style={{fontFamily: 'CircularSp-Bold', fontSize:21, letterSpacing:-1.5, opacity:1, color:"white", textShadowColor: 'rgba(0, 0, 0, 0.4)', textShadowOffset: {width: -1, height: 1}, textShadowRadius: 5}}>{props.name}</Text>
			</ImageBackground>
		</TouchableOpacity>
	)
})

function SearchCategorie({navigation}){
	const dimension = useWindowDimensions();
	return(
		<ScrollView style={{flex:1, paddingHorizontal:6, backgroundColor:"white"}} showsVerticalScrollIndicator={false} contentContainerStyle={{flexDirection: 'row', flexWrap: 'wrap',}}>
			{Object.keys(categories).map((item, index)=>{
				const elem = categories[item]
				return(
					<CategorieItem key={index} data={elem} name={item}/>
				)
			})}
			
		</ScrollView>
	)
}
function generatePastelCreamColor() {
	// Pour des tons crèmes, la teinte (hue) peut varier généralement entre 30 et 60 (oranges et jaunes)
	const hue = Math.floor(Math.random() * 30 + 30);
  
	// La saturation peut être assez élevée mais pas trop pour garder des tons doux
	const saturation = Math.floor(Math.random() * 10 + 70);
  
	// La luminosité est également généralement élevée pour des tons pastel
	const lightness = Math.floor(Math.random() * 10 + 80);
  
	// Créer la couleur en format HSL
	const hslColor = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  
	return hslColor;
}


function SearchSpecificCategorie({route, navigation}){
	const souscats = route.params.data;
	const categorie = route.params.cat;

	const colors = ["#e1cabb", "#c5a697", "#bb998c", "#e4c4aa", "#eec19e", "#d7a491"]
	return(
		<ScrollView contentContainerStyle={{gap:7}} showsVerticalScrollIndicator={false} style={{backgroundColor:"white", flex:1, paddingHorizontal:10}}>
			<View style={{flexDirection:"row", alignItems:"center", gap:5}}>
				<TouchableOpacity onPress={()=>{navigation.goBack()}}>
					<Icon name="left" size={19} style={{}}/>
				</TouchableOpacity>
				<Text style={{fontFamily: 'CircularSp-Bold', fontSize:23, letterSpacing:-1, paddingVertical:5}}>{categorie}</Text>
			</View>
			{souscats.map((item, index)=>{
				const random = Math.floor(Math.random() * colors.length);
				return(
					<TouchableOpacity key={index} onPress={()=>{navigation.navigate("SearchProduct", {data:item, from:categorie})}} style={{backgroundColor:colors[random], height:100, borderRadius:20, justifyContent:"center", alignItems:"center"}}>
						<Text style={{fontFamily: 'CircularSp-Bold', fontSize:22, letterSpacing:-1, opacity:1, color:"white", textShadowColor: 'rgba(0, 0, 0, 0.1)', textShadowOffset: {width: -1, height: 1}, textShadowRadius: 4, opacity:1}}>{item}</Text>
					</TouchableOpacity>
				)
			})}
		</ScrollView>
	)
	
}

function SearchSpecificProduct({route, navigation}){
	const [data, setData] = useState([]);
	const [incrementation, setIncrementation] = useState(1);
	const subcategorie = route.params.data
	const categorie = route.params.from

	const renderItem = ({ item }) => (
		<ProductItem data={item}/>
	);
	const getCategorieItem = async () => {
		console.log(incrementation)
		const resultList = await pb.collection('smarksProducts').getList(incrementation, 50, {
			filter: 'categorie = "'+categorie+","+subcategorie+'"',
			sort:"rating"
		});
		setData([...data, ...resultList.items])
	}
	useEffect(()=>{
		getCategorieItem()
	}, [])
	return(
		<View style={{flex:1, backgroundColor:"#f3f3f3"}}>
			<View style={{flexDirection:"row", alignItems:"center",  paddingHorizontal:16, gap:5, backgroundColor:"white"}}>
				<TouchableOpacity onPress={()=>{navigation.goBack()}}>
					<Icon name="left" size={19} style={{}}/>
				</TouchableOpacity>
				<Text style={{fontFamily: 'CircularSp-Bold', fontSize:23, letterSpacing:-1, paddingVertical:5}}>{subcategorie}</Text>
			</View>
			<FlatList
				style={{paddingHorizontal:5}}
				data={data}
				renderItem={renderItem}
				keyExtractor={(item, index) => index}
				numColumns={2}
				showsVerticalScrollIndicator={false}
				onEndReached={()=>{setIncrementation(incrementation+1); getCategorieItem()}}
			/>
		</View>
	)
}