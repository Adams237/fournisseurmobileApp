import React, { useEffect, useState } from "react";
import {Text, View, Switch} from "react-native";
import {mowStrings} from "../../../values/Strings/MowStrings";
import {borderStyle, fontFamily, pageContainerStyle} from "../../../values/Styles/MowStyles";
import {colorAlias, mowColors} from "../../../values/Colors/MowColors";
import MowContainer from "../../../components/ui/Core/Container/MowContainer";
import {heightPercentageToDP as hp} from "react-native-responsive-screen";
import {MowButtonBasic} from "../../../components/ui/Common/Button/MowButton";
import {MowPicker} from "../../../components/ui/Common/Picker/MowPicker";
import FeatherIcon from "react-native-vector-icons/Feather";
import LanguageData from "../../../sampleData/LanguageData";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ThemeList from "../../../sampleData/ThemeList";
import RNRestart from "react-native-restart";
import { useSelector } from "react-redux";

const Settings =(props)=> {
    const currentUSer = useSelector(state => state.currentUSer.value)
    const [values, setValues ] = useState({
        pickerVisible: false,
        pickerData: [],
        pickerTitle: "",
        languageData: LanguageData,
        language: "English",
        darkTheme: false,
        category: false,
        themeData: ThemeList,
        theme: "default",
        type: 0
    })
    const [showTabBar, setShowTabBar] = useState(false)


   const  componentDidMount = async ()=> {
        let category = await  AsyncStorage.getItem("category");

        // to set category toggle
        if (category) {
            if (category === 2) {
                setValues({ ...values, category: true})
            }
        }

        // to set selected color
        let theme = await AsyncStorage.getItem("color");
        setValues({ ...values, theme: theme ? theme : "default"});

    }

    const setVisibiliTyTabBar = ()=>{
        if (currentUSer.length){
            setShowTabBar(true)
        }
    }

    useEffect(()=>{
        componentDidMount()
    },[])
    useEffect(()=>{
        setVisibiliTyTabBar()
    },[currentUSer])

    /**
     *  type = 1 --> language
     *  type = 2 --> theme
     * */
    const _onSelect = (selectedItem) => {
        let type = values.pickerType;
        let selected = selectedItem["title"];

        if (type === 1) {
            setValues({
                ...values,
                language: selected, // selected item title/name
                pickerVisible: false // to close picker
            });

            setTimeout(function () {

                // to save selected language
                AsyncStorage.setItem('language', selectedItem["alias"]);

                // to update selected language
                mowStrings.setLanguage(selectedItem["alias"]);

                // to restart the app
                RNRestart.Restart();

            },100)
        }
        else if (type === 2) {

            let color;
            switch(selected) {
                case "default":
                    color = colorAlias.DEFAULT;
                    break;
                case "blue":
                    color = colorAlias.BLUE;
                    break;
                case "red":
                    color = colorAlias.RED;
                    break;
                case "dark":
                    color = colorAlias.DARK;
                    break;
                default:
                    color = colorAlias.DEFAULT;
            }

            // to set selected color to local storage
            AsyncStorage.setItem("color", color);

            setValues({
                ...values,
                theme: selected, // selected item title/name
                pickerVisible: false // to close picker
            });

            // to restart app for applying selected theme color
            RNRestart.Restart();
        }
    }

    // to handle switch value
    const _toggleSwitch = (key, value) => {
        setValues({ ...values, [key]: value})
    };

    const _handleCategoryUiSelection = (value) => {
        _toggleSwitch("category", value);
        AsyncStorage.setItem("category", value ? 2 : 1);
    }

        return(

            <MowContainer
                title={mowStrings.settings.title}
                navigation={props.navigation}
                footer={showTabBar}
                >

                <View
                    style={pageContainerStyle}>

                    {/* language view */}
                    <View
                        style={{marginTop: 15}}>

                        {/* language title */}
                        <Text
                            style={[rowStyle.title, {color: mowColors.titleTextColor}]}>

                            {mowStrings.__language}

                        </Text>

                        {/* language picker button */}
                        <MowButtonBasic
                            onPress={() => {setValues({ ...values, pickerVisible: true, pickerTitle: mowStrings.__language, pickerData: values.languageData, pickerType: 1})}}
                            rightIcon={"chevron-down"}
                            leftIcon={"globe"}
                            leftIconStyle={{color: mowColors.mainColor}}
                            rightIconStyle={{color: mowColors.mainColor}}
                            textStyle={{
                                width: "70%",
                                fontSize: hp("1.8%"),
                                fontWeight: "normal",
                                fontStyle: "normal",
                                letterSpacing: 0,
                                textAlign: "left",
                                fontFamily: fontFamily.medium,
                                color: mowColors.titleTextColor,
                                paddingLeft: 10
                            }}
                            containerStyle={{marginVertical: 5, ...borderStyle, backgroundColor: mowColors.viewBGColor}}>

                            {values.language}

                        </MowButtonBasic>

                    </View>

                    {/* category ui selection view */}
                    <View
                        style={{marginTop: 15}}>

                        {/* category title */}
                        <Text
                            style={[rowStyle.title, {color: mowColors.titleTextColor}]}>

                            Category Page UI

                        </Text>

                        {/* category view */}
                        <View
                            style={[rowStyle.rowView, {backgroundColor: mowColors.viewBGColor}]}>

                            {/* category icon */}
                            <FeatherIcon
                                style={{
                                    color: mowColors.mainColor,
                                    fontSize: hp("2.5"),
                                    width: "15%",
                                    textAlign: "center"
                                }}
                                name={"eye"}/>

                            {/* category text */}
                            <Text
                                style={[rowStyle.content, {color: mowColors.titleTextColor}]}>

                                {values.category ? 2 : 1}

                            </Text>

                            {/* category switch view */}
                            <View
                                style={{width: "25%", alignItems: "flex-end", paddingRight: "5%"}}>

                                {/* category switch */}
                                <Switch
                                    thumbTintColor={"white"}
                                    trackColor={{true: mowColors.mainColor, false: "#eee6e6"}}
                                    onValueChange={value => _handleCategoryUiSelection(value)}
                                    value={values.category}/>

                            </View>

                        </View>

                    </View>

                    {/* theme view */}
                    <View
                        style={{marginTop: 15}}>

                        {/* theme title */}
                        <Text
                            style={[rowStyle.title, {color: mowColors.titleTextColor}]}>

                            {mowStrings.theme}

                        </Text>

                        {/* theme picker button */}
                        <MowButtonBasic
                            onPress={() => {setValues({ ...values, pickerVisible: true, pickerTitle: mowStrings.theme, pickerData: values.themeData, pickerType: 2})}}
                            rightIcon={"chevron-down"}
                            leftIcon={"smartphone"}
                            leftIconStyle={{color: mowColors.mainColor}}
                            rightIconStyle={{color: mowColors.mainColor}}
                            textStyle={{
                                width: "70%",
                                fontSize: hp("1.8%"),
                                fontWeight: "normal",
                                fontStyle: "normal",
                                letterSpacing: 0,
                                textAlign: "left",
                                fontFamily: fontFamily.medium,
                                color: mowColors.titleTextColor,
                                paddingLeft: 10
                            }}
                            containerStyle={{marginVertical: 5, ...borderStyle, backgroundColor: mowColors.viewBGColor}}>

                            {values.theme}

                        </MowButtonBasic>

                    </View>

                </View>

                <MowPicker
                    pickerTitle={values.pickerTitle}
                    search={false}
                    data={values.pickerData}
                    onSelect={(obj) => {_onSelect(obj)}}
                    modalVisible={values.pickerVisible}/>

            </MowContainer>

        )


}

const rowStyle = ({
    rowView: {
        flexDirection: "row",
        margin: 10,
        width: "100%",
        alignSelf: 'center',
        padding: 0,
        height: hp("6%"),
        backgroundColor: "white",
        borderRadius: 5,
        alignItems: "center",
        ...borderStyle
    },
    title: {
        fontSize: hp("1.8%"),
        fontWeight: "600",
        fontStyle: "normal",
        letterSpacing: 0,
        textAlign: "left",
        fontFamily: fontFamily.medium
    },
    content: {
        textAlign: "left",
        width: "60%",
        paddingLeft: 10,
        fontSize: hp("1.8%"),
        fontStyle: "normal",
        letterSpacing: 0,
        fontFamily: fontFamily.medium
    },
});

export default Settings