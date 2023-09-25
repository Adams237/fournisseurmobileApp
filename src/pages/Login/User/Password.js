import React, { useState } from "react";
import { Text, View, ActivityIndicator } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

import { mowStrings } from "../../../values/Strings/MowStrings";
import { pageContainerStyle } from "../../../values/Styles/MowStyles";
import { mowColors } from "../../../values/Colors/MowColors";
import MowContainer from "../../../components/ui/Core/Container/MowContainer";
import { MowInput } from "../../../components/ui/Common/Input/MowInput";
import { MowButtonBasic } from "../../../components/ui/Common/Button/MowButton";
import { auth } from "../../../redurcer/userSlice";
import { updatePassword } from "../../../utils/apiEcommerce";

const Password = (props) => {
    const currentUser = useSelector((state) => state.currentUSer.value)
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(false)

    const [values, setValues] = useState({
        currentPassword: "",
        newPassword: "",
        newPassword2: ""
    })
    const [error, setError] = useState('')

    const validation = () => {
        if (values.newPassword.length < 8) {
            setError('le mot de pase doit contenir au moins 8 caractères')
            return false
        }
        if (values.newPassword !== values.newPassword2) {
            setError('les mots de passe ne correspondent pas')
            return false
        }
        return true
    }
    const handleUpadte = async () => {
        setIsLoading(true)
        const validate = validation()
        if (validate) {
            try {
                const { data } = await axios.put(updatePassword, {
                    password: values.newPassword
                },
                    {
                        headers: {
                            Authorization: `Bearer ${currentUser[0].token}`
                        }
                    }
                )
                console.log(data);
                dispatch(auth(currentUser[0]))
                setIsLoading(false)
                props.navigation.navigate('Home')
            } catch (error) {
                console.log(error);
                setIsLoading(false)
            }

        }
    }

    // to store entered regular from user
    const onChangeText = (key, value) => {
        setValues({
            ...values,
            [key]: value,
        })
    };




    return (

        <MowContainer
            title={mowStrings.passwordPage.title}
            navigation={props.navigation}
        >

            <View
                style={pageContainerStyle}>
                <View>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center', color: 'red' }} >{error}</Text>
                </View>
                <View
                    style={inputStyle.container}>

                    {/* currentPassword title regular */}
                    <Text
                        style={[inputStyle.titleText, { color: mowColors.titleTextColor }]}>

                        {mowStrings.placeholder.currentPassword}

                    </Text>

                    {/* currentPassword input */}
                    <MowInput
                        leftIcon={"lock"}
                        type={"text"}
                        passwordInput={true}
                        containerStyle={{ backgroundColor: mowColors.viewBGColor, width: "100%" }}
                        textInputStyle={{ color: mowColors.textColor }}
                        value={values.currentPassword}
                        onChangeText={value => onChangeText('currentPassword', value)} />

                </View>

                <View
                    style={inputStyle.container}>

                    {/* newPassword title regular */}
                    <Text
                        style={[inputStyle.titleText, { color: mowColors.titleTextColor }]}>

                        {mowStrings.placeholder.newPassword}

                    </Text>

                    {/* newPassword input */}
                    <MowInput
                        passwordInput={true}
                        leftIcon={"lock"}
                        type={"text"}
                        containerStyle={{ backgroundColor: mowColors.viewBGColor, width: "100%" }}
                        textInputStyle={{ color: mowColors.textColor }}
                        value={values.newPassword}
                        onChangeText={value => onChangeText('newPassword', value)} />

                </View>

                <View
                    style={inputStyle.container}>

                    {/* newPassword2 title regular */}
                    <Text
                        style={[inputStyle.titleText, { color: mowColors.titleTextColor }]}>

                        {mowStrings.placeholder.newPassword2}

                    </Text>

                    {/* newPassword2 input */}
                    <MowInput
                        passwordInput={true}
                        leftIcon={"lock"}
                        type={"text"}
                        containerStyle={{ backgroundColor: mowColors.viewBGColor, width: "100%" }}
                        textInputStyle={{ color: mowColors.textColor }}
                        value={values.newPassword2}
                        onChangeText={value => onChangeText('newPassword2', value)} />

                </View>

            </View>

            <View
                style={{ width: "90%", alignSelf: "center" }}>

                <MowButtonBasic
                    onPress={handleUpadte}
                    type={"success"}>

                    {isLoading? <ActivityIndicator size="large" color="#0ba65a" />:mowStrings.button.update}

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
    },

});
export default Password;