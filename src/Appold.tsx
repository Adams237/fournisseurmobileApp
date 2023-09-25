import React, {Component, useEffect, useState} from 'react';
import {View, Image, Text} from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Router from "./pages/Router";
import {mowColorFunction} from "./values/Colors/MowColors";
import {heightPercentageToDP as hp} from "react-native-responsive-screen";
import {fontFamily} from "./values/Styles/MowStyles";
import {mowStrings} from "./values/Strings/MowStrings";
import { Provider } from 'react-redux';
import { store } from './redurcer/store';

let _self;

const App = ()=> {
    const [isReady, setIsReady] = useState(false)

    useEffect(()=>{
        // console.disableYellowBox = true,
        initApp()
    },[])

 const initApp =    async () =>{

        // to init local storage data, for retrieving data when entered the app
        
        // to set theme color according to the user selection
        let color = AsyncStorage.getItem("color");
        mowColorFunction(color);

        // to set selected language from user
        let lang = AsyncStorage.getItem("language");

        if (!lang) {

            mowStrings.setLanguage("en");
        }
        else {
            // to update selected language
            // mowStrings.setLanguage(lang);
        }

        try {
            // for showing custom splash screen
            setTimeout(function () {
                setIsReady(true)
            }, 500)

        } catch (error) {
            console.log('App.js error: ', error);
        }

    }

        return (

            isReady !== true ?

                // splash ui here
                <View
                    style={{flex: 1, width: "100%", height: "100%", alignItems: "center", justifyContent: "center"}}>

                    <Image
                        style={{flex: 1}}
                        resizeMode={"contain"}
                        source={require("./assets/image/mowega_splash.jpg")}/>

                    <View
                        style={{position: "absolute", width: "100%", height: hp(11), alignItems: "center", justifyContent: "center"}}>

                        <View
                            style={{position: "absolute",  opacity: 0.7, backgroundColor: "#090909", width: "100%", height: hp(11)}}/>

                        <Image
                            style={{width: "80%", height: hp(4)}}
                            resizeMode={"contain"}
                            source={require("./assets/logo/logo_with_text.png")}/>

                        <Text
                            style={{
                                color: "white",
                                fontSize: hp(2),
                                fontWeight: "normal",
                                fontFamily: fontFamily.regular
                            }}>

                            Shopping

                        </Text>

                    </View>


                </View>

                :

                // after timeout, go to router
                <Provider store={store}>
                <Router/>
                </Provider>

        );

}

export default App
