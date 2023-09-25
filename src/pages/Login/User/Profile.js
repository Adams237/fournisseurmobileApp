import React, { useState } from "react";
import { View, Image, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import DocumentPicker from 'react-native-document-picker'
import { useDispatch } from "react-redux";
import axios from "axios";

import { mowStrings } from "../../../values/Strings/MowStrings";
import { borderStyle, fontFamily, pageContainerStyle } from "../../../values/Styles/MowStyles";
import { mowColors } from "../../../values/Colors/MowColors";
import MowContainer from "../../../components/ui/Core/Container/MowContainer";
import { MowInput } from "../../../components/ui/Common/Input/MowInput";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { MowPicker } from "../../../components/ui/Common/Picker/MowPicker";
import { MowButtonBasic } from "../../../components/ui/Common/Button/MowButton";
import Gender from "../../../sampleData/Gender";
import Language from "../../../sampleData/Language";
import { auth } from "../../../redurcer/userSlice";
import { User } from "../../../components/utils/User/User";
import { updateAvatar, updateUserData, userData } from "../../../utils/apiEcommerce";

const Profile = (props) => {

    const dispatch = useDispatch()
    const user = props.route.params.user
    console.log(user.token);

    const [value, setValue] = useState(user)
    const [isLoading, setIsLoading] = useState(false)


    /**
     *  these style values are here because of the color change.
     *  when changed the color, styles that are outside the class, are not re-rendered!
     */

    const inputStyle = {
        container: {
            marginVertical: 5,
        },
        titleText: {
            fontSize: hp("1.8%"),
            fontWeight: "600",
            fontStyle: "normal",
            letterSpacing: 0,
            textAlign: "left",
            color: mowColors.titleTextColor,
            fontFamily: fontFamily.medium
        },
        inputContainer: {
            width: "100%",
            backgroundColor: mowColors.viewBGColor
        },
        inputText: {
            fontSize: hp("1.8%"),
            fontWeight: "normal",
            fontStyle: "normal",
            letterSpacing: 0,
            fontFamily: fontFamily.regular,
            textAlign: "left",
            color: mowColors.textColor
        }
    };

    const pickerStyle = {
        container: {
            marginVertical: 5,
        },
        button: {
            ...borderStyle,
            backgroundColor: mowColors.viewBGColor
        },
        buttonText: {
            width: "63%",
            fontSize: hp("1.8%"),
            fontWeight: "normal",
            fontStyle: "normal",
            letterSpacing: 0,
            textAlign: "left",
            fontFamily: fontFamily.regular,
            color: mowColors.textColor
        },
        buttonIcon: {
            color: mowColors.mainColor
        }
    };

    const selectImage = async () => {
        setIsLoading(true)
        try {
            const res = await DocumentPicker.pick({
                type: [DocumentPicker.types.images]
            });
            setValue({
                ...value, image:res[0].uri
            })
            const {data} = await axios.post(
                updateAvatar,
                {avatar:res[0].name},
                {
                    headers:{
                        Authorization: `Bearer ${user.token}`
                    }
                }
                );
                console.log(res[0].name);
                setIsLoading(false)

        } catch (error) {
            setIsLoading(false)
            if (DocumentPicker.isCancel(error)) {
                console.log("error -----", error);
            } else {
                throw error;
            }
        }
    }

    const handleSave = async () => {
        setIsLoading(true)
        if (value.username && value.phone && user.email) {
            try {
                const {data} = await axios.put(userData,
                    {first_name:value.username,email:value.email, phone: value.phone},
                    {
                        headers:{
                            Authorization: `Bearer ${user.token}`
                        }
                    }
                    )
                dispatch(auth(data.data))
                setIsLoading(false)
                props.navigation.navigate('ProfileUser')
            } catch (error) {
                setIsLoading(false)
                console.log(error);
            }
            
        }
    }

    // to store entered regular from user
    const onChangeText = (key, text) => {
        setValue({
            ...value,
            [key]: text,
        })
    };

    /**
     *      type -->
     *              1: gender
     *              2: language
     * */
    const _onSelect = (selectedItem) => {

        setValue({ ...value, pickerVisible: false });

        let type = value.pickerType;

        if (type === 1) {
            setValue({ ...value, gender: selectedItem["title"], pickerSelectedId: selectedItem["id"] })
        }
        else if (type === 2) {
            setValue({ ...value, language: selectedItem["title"], pickerSelectedId: selectedItem["id"] })
        }

    }


    return (

        <MowContainer
            title={mowStrings.profilePage.title}
            navigation={props.navigation}
        >

            <View
                style={[pageContainerStyle, { marginTop: hp("3%"), marginHorizontal: wp("7%") }]}>

                <View
                    style={{ flexDirection: "row" }}>

                    <Image
                        style={{ width: hp("8%"), height: hp("8%"), alignSelf: "center" }}
                        resizeMode={"contain"}
                        source={{ uri: user.image ? user.image:  "https://play-lh.googleusercontent.com/15OKLti0ofnjK4XK1bgRXgsoblPvMi3hCA5z2o9WAcjssFNt2dXxemp2Om9vB3A_jYAe" }} />

                    {/* name, email view */}
                    <View
                        style={{ justifyContent: "center", marginLeft: 20 }}>

                        <Text
                            style={{
                                fontSize: hp("2%"),
                                fontWeight: "600",
                                fontStyle: "normal",
                                letterSpacing: 0,
                                textAlign: "left",
                                color: mowColors.titleTextColor,
                                fontFamily: fontFamily.medium
                            }}>

                            {user.username}

                        </Text>

                        <Text
                            style={{
                                fontSize: hp("1.8%"),
                                fontWeight: "400",
                                fontStyle: "normal",
                                letterSpacing: 0,
                                textAlign: "left",
                                fontFamily: fontFamily.medium,
                                color: mowColors.titleTextColor
                            }}>

                            {user.email}

                        </Text>

                    </View>

                </View>

                {/* user information input view */}
                <KeyboardAwareScrollView
                    showsVerticalScrollIndicator={false}
                    style={{ marginTop: hp("2%"), marginBottom: hp("7%") }}>


                    <View
                        style={inputStyle.container}>

                        {/* username title regular */}
                        <Text
                            style={inputStyle.titleText}>

                            {mowStrings.placeholder.username}

                        </Text>

                        {/* username input */}
                        <MowInput
                            leftIcon={"user"}
                            type={"text"}
                            containerStyle={inputStyle.inputContainer}
                            textInputStyle={inputStyle.inputText}
                            value={value.username}
                            onChangeText={value => onChangeText('username', value)} />

                    </View>

                    <View
                        style={inputStyle.container}>

                        {/* email title regular */}
                        <Text
                            style={inputStyle.titleText}>

                            {mowStrings.placeholder.email}

                        </Text>

                        {/* email input */}
                        <MowInput
                            disabled={true}
                            leftIcon={"mail"}
                            type={"text"}
                            containerStyle={inputStyle.inputContainer}
                            textInputStyle={inputStyle.inputText}
                            value={value.email}
                            onChangeText={value => onChangeText('email', value)} />

                    </View>

                    <View
                        style={inputStyle.container}>

                        {/* gender title regular */}
                        {/* <Text
                                style={inputStyle.titleText}>

                                {mowStrings.placeholder.gender}

                            </Text> */}

                        {/* gender picker button */}
                        {/* <MowButtonBasic
                                onPress={() => { setValue({ ...value, pickerData: Gender, pickerVisible: true, pickerType: 1 }) }}
                                leftIcon={"user"}
                                leftIconStyle={pickerStyle.buttonIcon}
                                textStyle={pickerStyle.buttonText}
                                containerStyle={pickerStyle.button}>

                                {value.gender}

                            </MowButtonBasic> */}

                    </View>

                    <View style={inputStyle.container}>

                        {/* language title regular */}
                        {/* <Text
                                style={inputStyle.titleText}>

                                {mowStrings.placeholder.gender}

                            </Text> */}

                        {/* language picker button */}
                        {/* <MowButtonBasic
                                onPress={() => { setValue({ ...value, pickerData: Language, pickerVisible: true, pickerType: 2 }) }}
                                leftIcon={"globe"}
                                leftIconStyle={pickerStyle.buttonIcon}
                                textStyle={pickerStyle.buttonText}
                                containerStyle={pickerStyle.button}>

                                {value.language}

                            </MowButtonBasic> */}

                    </View>

                    <View
                        style={inputStyle.container}>

                        {/* phone title regular */}
                        <Text
                            style={inputStyle.titleText}>

                            {mowStrings.placeholder.phone}

                        </Text>

                        {/* phone input */}
                        <MowInput
                            leftIcon={"phone"}
                            type={"text"}
                            containerStyle={inputStyle.inputContainer}
                            textInputStyle={inputStyle.inputText}
                            value={value.phone}
                            onChangeText={value => onChangeText('phone', value)} />

                    </View>
                    <View
                        style={inputStyle.container}>

                        {/* image title regular */}
                        <Text
                            style={inputStyle.titleText}>

                            image

                        </Text>

                        <TouchableOpacity
                        disabled={isLoading}
                        style={{ width:'100%', backgroundColor : isLoading && '#383838',borderColor:'#0ba65a', borderWidth:1, borderRadius:5, height:35, justifyContent:'center'}}
                            onPress={() => selectImage()}
                        >
                           
                            <Text style={{color:'#0ba65a', textAlign:'center'}}> changer de profile</Text>
                        </TouchableOpacity>

                    </View>

                </KeyboardAwareScrollView>
                {
                     <MowButtonBasic
                        containerStyle={{ position: "absolute", bottom: 0, alignSelf: "center" }}
                        onPress={handleSave}
                        type={"success"}>

                        {isLoading? <ActivityIndicator size="large" color="#0ba65a" />: mowStrings.button.save}

                    </MowButtonBasic>
                }


            </View>

            <MowPicker
                selectedValue={value.pickerSelectedId}
                search={false}
                data={value.pickerData}
                onSelect={(obj) => { _onSelect(obj) }}
                modalVisible={value.pickerVisible} />

        </MowContainer>

    )


}

export default Profile