import { Platform } from "react-native";
import { pb } from "./pocketbase";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async (key,value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
    } catch (e) {
      // saving error
    }
};

export const getData = async (key) => {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      // error reading value
    }
};

export const getFavItem = async () => {
    const data = await getData("favoris");
    return data == null ? [] : data
}

export const addFavItem = async (item) => {
    const favs = await getFavItem();
    const newfavs = [...favs, item];
    await storeData("favoris", newfavs);
    return newfavs;
}

export const removeFavItem = async (itemtodelete) => {
    let favs = await getFavItem();
    let indextodelete = 0;
    favs.map((item, index) => {
        if(item == itemtodelete)
            indextodelete = index
    })
    favs.splice(indextodelete, 1);
    await storeData("favoris", favs);
    return favs
}

export const isInFavs = (favs, item) => {
    let otp = false;
    for(var i=0; i < favs.length; i++){
        if(item.id == favs[i].id){
            otp = true;
            break;
        }
    }
    return otp
}

export const getUserInfo = async () => {
    const userInfo = await getData("user");
    console.log(userInfo)
    const favs = await getFavItem();
    if(userInfo == null){
        const currentDate = parseInt(new Date().getTime()/1000);
        const data = {
            "mobile": Platform.OS,
            "favs": favs,
            "lastConnexion": currentDate
        };
        const record = await pb.collection('smarksUser').create(data);
        console.log(record)
        await storeData("user", record);
        return record
    }else{
        const currentDate = parseInt(new Date().getTime()/1000);
        const data = {
            "lastConnexion": currentDate
        };
        const record = await pb.collection('smarksUser').update(userInfo.id, data);
        return userInfo;
    }
}