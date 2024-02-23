import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen } from './pages/home';
import { SearchScreen } from './pages/search';
import { InitScreen } from './pages/init';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FavorisScreen } from './pages/favoris';
import { ProductScreen } from './pages/product';
import { AccountScreen } from './pages/account';
import { AppContext } from './component/context';
import { useRef, useState } from 'react';
import Icon from 'react-native-vector-icons/Feather';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function BottomTabs() {
  return (
      <Tab.Navigator screenOptions={{headerShown:false, tabBarActiveTintColor:"#f3d5d3", tabBarInactiveTintColor:"#acacac", tabBarShowLabel:false}}>
        <Tab.Screen name="Home" component={HomeScreen} options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" color={color} size={28} />
          ),
        }}/>
        <Tab.Screen name="Search" component={SearchScreen} options={{
          tabBarLabel: 'Search',
          tabBarIcon: ({ color, size }) => (
            <Icon name="search" color={color} size={28} />
          ),
        }}/>
        <Tab.Screen name="Favoris" component={FavorisScreen} options={{
          tabBarLabel: 'Favoris',
          tabBarIcon: ({ color, size }) => (
            <Icon name="heart" color={color} size={28} />
          ),
        }}/>
        <Tab.Screen name="Account" component={AccountScreen} options={{
          tabBarLabel: 'Account',
          tabBarIcon: ({ color, size }) => (
            <Icon name="user" color={color} size={28} />
          ),
        }}/>
      </Tab.Navigator>
  );
}

export default function App() {
  const [shouldFocus, setShouldFocus] = useState(false);
  const searchRef = useRef();
  const [userInfo, setUserInfo] = useState({});
  const [favs, setFavs] = useState([]);
  return (
    <AppContext.Provider value={{ shouldFocus, setShouldFocus, searchRef, userInfo, setUserInfo, setFavs, favs}}>
      <NavigationContainer>
          <StatusBar theme="light"/>
          <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="Init" component={InitScreen} options={{gestureEnabled:false}}/>
            <Stack.Screen name="Product" component={ProductScreen} />
            <Stack.Screen 
              name="BottomTabs" 
              component={BottomTabs}
              options={{gestureEnabled:false}}
            />
          </Stack.Navigator>
        </NavigationContainer>
    </AppContext.Provider>
  );
}
