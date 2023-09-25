import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Text, View } from "react-native";
import { mowStrings } from "../../../values/Strings/MowStrings";
import { fontFamily, pageContainerStyle } from "../../../values/Styles/MowStyles";
import { mowColors } from "../../../values/Colors/MowColors";
import MowContainer from "../../../components/ui/Core/Container/MowContainer";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { MowInput } from "../../../components/ui/Common/Input/MowInput";
import { MowButtonBasic } from "../../../components/ui/Common/Button/MowButton";

const Feedback = (props) => {
    const [values, setValues] = useState({
        fullName: "Bianca Watkins",
        email: "biancawatkins@gmail.com",
        title: "About product types",
        message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."

    })


    // to store entered regular from user
   const  onChangeText = (key, value) => {
        setValues({
            ...values,
            [key]: value,
        })
    };


        return (

            <MowContainer
                title={mowStrings.feedback.title}
                navigation={props.navigation}
                >

                <View
                    style={pageContainerStyle}>

                    {/* user information input view */}
                    <KeyboardAwareScrollView
                        showsVerticalScrollIndicator={false}
                        style={{ marginTop: hp("2%") }}>

                        <View
                            style={inputStyle.container}>

                            {/* fullName title regular */}
                            <Text
                                style={[inputStyle.titleText, { color: mowColors.titleTextColor }]}>

                                {/* {mowStrings.placeholder.fullName} */}
                                Votre email

                            </Text>

                            {/* fullName input */}
                            <MowInput
                                leftIcon={"user"}
                                type={"text"}
                                containerStyle={{ width: "100%", backgroundColor: mowColors.viewBGColor }}
                                textInputStyle={{ color: mowColors.textColor }}
                                onChangeText={value => onChangeText('fullName', value)} />

                        </View>

                        <View
                            style={inputStyle.container}>

                            {/* email title regular */}
                            <Text
                                style={[inputStyle.titleText, { color: mowColors.titleTextColor }]}>

                                {mowStrings.placeholder.email}

                            </Text>

                            {/* email input */}
                            <MowInput
                                leftIcon={"mail"}
                                type={"text"}
                                containerStyle={{ width: "100%", backgroundColor: mowColors.viewBGColor }}
                                textInputStyle={{ color: mowColors.textColor }}
                                value={'contact@leratel.com'} />

                        </View>

                        <View
                            style={inputStyle.container}>

                            {/* fullName title regular */}
                            <Text
                                style={[inputStyle.titleText, { color: mowColors.titleTextColor }]}>

                                {/* {mowStrings.placeholder.feedbackTitle}: */}
                                Objet du Message
                            </Text>

                            {/* title input */}
                            <MowInput
                                leftIcon={"message-square"}
                                type={"text"}
                                containerStyle={{ width: "100%", backgroundColor: mowColors.viewBGColor }}
                                textInputStyle={{ color: mowColors.textColor }}
                                onChangeText={value => onChangeText('title', value)} />

                        </View>

                        <View
                            style={inputStyle.container}>

                            {/* message title */}
                            <Text
                                style={inputStyle.titleText}>

                                {/* {mowStrings.placeholder.feedbackComment} */}
                                Votre Message

                            </Text>

                            {/* message input */}
                            <MowInput
                                type={"textarea"}
                                containerStyle={{
                                    width: "100%",
                                    height: hp("15%"),
                                    backgroundColor: mowColors.viewBGColor
                                }}
                                textInputStyle={{
                                    fontSize: hp("1.8%"),
                                    fontWeight: "normal",
                                    fontStyle: "normal",
                                    letterSpacing: 0,
                                    fontFamily: fontFamily.regular,
                                    textAlign: "left",
                                    color: mowColors.textColor,
                                    width: "100%",
                                    paddingBottom: 10
                                }}
                                onChangeText={value => onChangeText('message', value)} />

                        </View>

                    </KeyboardAwareScrollView>

                    <MowButtonBasic
                        type={"success"}>

                        {/* {mowStrings.button.send} */}
                        Envoyer
                    </MowButtonBasic>

                </View>

            </MowContainer>

        )


}

const inputStyle = ({
    container: {
        marginVertical: 5,
    },
    titleText: {
        fontSize: hp("1.8%"),
        fontWeight: "600",
        fontStyle: "normal",
        letterSpacing: 0,
        textAlign: "left",
        fontFamily: fontFamily.medium
    }
});

export default Feedback