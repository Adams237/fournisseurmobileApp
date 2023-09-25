import React, { useRef, useState } from "react";
import { View, Image, Text, ActivityIndicator } from "react-native";
import axios from "axios";
import { mowColors } from "../../../values/Colors/MowColors";
import MowContainer from "../../../components/ui/Core/Container/MowContainer";
import { pageContainerStyle } from "../../../values/Styles/MowStyles";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { mowStrings } from "../../../values/Strings/MowStrings";
import { MowInput } from "../../../components/ui/Common/Input/MowInput";
import { MowButtonBasic } from "../../../components/ui/Common/Button/MowButton";
import { User } from "../../../components/utils/User/User";
import { setLogin } from "../../Router";
import { useDispatch } from "react-redux";
import { auth } from "../../../redurcer/userSlice";
import { addProduct } from "../../../redurcer/cartSlice";
import { loginApi, verificationEmail } from "../../../utils/apiEcommerce";

const Verification = (props) => {

    const dispatch = useDispatch()
    const user = props.route.params.user

    const [step, setStep] = useState(1);
    const inputRef = useRef()
    const [validate, setValidate] = useState('');
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const userRegister = props.route.params.user

    const validation = () => {
        // if (validate.length < 5) {
        //     setError('besoin du code de validation')
        //     return false
        // }
        setStep(2)
        return true
    }

    const _handleLogin = () => {
        userRegister.validate = true
        // to update user login situation
        new User().setUser(userRegister);
        // to change router
        setLogin(true);
        dispatch(auth(userRegister))
    }

    const sendAgain = async()=>{
        setError('')
        setIsLoading(true)
        console.log(userRegister.email);
        console.log(userRegister.password);
        try {
            await axios.post(verificationEmail,{ email:userRegister.email })
            setError('mail envoyé avec succès')
            setIsLoading(false)
        } catch (err) {
            setError('un problème est survenue, veiller réessayer')
            setIsLoading(false)
            console.log(err);
        }
    }
    // to move forward to the next input when user touched the next
    // const _nextInput = refName => {
    //     inputRef[refName].textInputRef.focus();
    // }


    return (

        <MowContainer
            footer={false}
            navbar={false}
            navigation={props.navigation}
            style={{ backgroundColor: mowColors.mainColor }}>

            <View
                style={[pageContainerStyle]}>

                {/* check icon */}
                <Image
                    style={{
                        alignSelf: "center",
                        marginTop: hp("5%"),
                        height: hp("10%"),
                        width: hp("10%"),
                    }}
                    resizeMode={"contain"}
                    source={require("../../../assets/icon/ic_check.png")} />

                {
                    step === 1 &&

                    <View>

                        {/* almost done text */}
                        <Text
                            style={{
                                marginTop: hp("3%"),
                                fontSize: hp("2.5%"),
                                fontWeight: "bold",
                                fontStyle: "normal",
                                letterSpacing: 0,
                                textAlign: "center",
                                color: "#ffffff"
                            }}>

                            {mowStrings.signUpPage.almostDone}

                        </Text>

                        {/* security code text */}
                        <Text
                            style={{
                                marginTop: hp("2%"),
                                fontSize: hp("1.8%"),
                                fontWeight: "normal",
                                fontStyle: "normal",
                                lineHeight: 28,
                                letterSpacing: 0,
                                textAlign: "center",
                                color: "#ffffff"
                            }}>

                            {mowStrings.signUpPage.securityCodeMessage}{user.email}

                        </Text>

                        {/* verification code info text */}
                        <Text
                            style={{
                                marginTop: hp("5%"),
                                fontSize: hp("1.8%"),
                                fontWeight: "normal",
                                fontStyle: "normal",
                                lineHeight: 38,
                                letterSpacing: 0,
                                textAlign: "center",
                                color: "#ffffff"
                            }}>

                            {mowStrings.signUpPage.verificationCodeMessage}

                        </Text>
                        <View>
                            <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center', color: 'red' }} >{error}</Text>
                        </View>
                        {/* code input view */}
                        {/* <View
                            style={{ flexDirection: "row" }}>

                            <MowInput
                                ref={inputRef}
                                onSubmitEditing={(a) => { _nextInput("input2") }}
                                onChangeText={(value) => setValidate({ validate: validate + '' + value })}
                                maxLength={1}
                                type={"number"}
                                textInputStyle={codeInput.text}
                                containerStyle={codeInput.container} />

                            <MowInput
                                ref={inputRef}
                                onSubmitEditing={(a) => { _nextInput("input3") }}
                                returnKeyType='next'
                                maxLength={1}
                                onChangeText={(value) => setValidate({ validate: validate + '' + value })}
                                type={"number"}
                                textInputStyle={codeInput.text}
                                containerStyle={codeInput.container} />

                            <MowInput
                                ref={inputRef}
                                onSubmitEditing={(a) => { _nextInput("input4") }}
                                returnKeyType='next'
                                maxLength={1}
                                onChangeText={(value) => setValidate({ validate: validate + '' + value })}
                                type={"number"}
                                textInputStyle={codeInput.text}
                                containerStyle={codeInput.container} />

                            <MowInput
                                ref={inputRef}
                                onSubmitEditing={(a) => { _nextInput("input5") }}
                                returnKeyType='next'
                                maxLength={1}
                                onChangeText={(value) => setValidate({ validate: validate + '' + value })}
                                type={"number"}
                                textInputStyle={codeInput.text}
                                containerStyle={codeInput.container} />

                            <MowInput
                                ref={inputRef}
                                returnKeyType={"done"}
                                maxLength={1}
                                type={"number"}
                                textInputStyle={codeInput.text}
                                containerStyle={codeInput.container} />

                        </View> */}

                        {/* no verification code text */}
                        <Text
                            style={{
                                marginTop: hp("3%"),
                                fontSize: hp("1.8%"),
                                fontWeight: "normal",
                                fontStyle: "normal",
                                letterSpacing: 0,
                                textAlign: "center",
                                color: "#ffffff"
                            }}>

                            {mowStrings.signUpPage.codeError}

                        </Text>

                        {/* re-send button */}
                        <MowButtonBasic
                            type={"success"}
                            onPress={sendAgain}
                            >

                            { isLoading? <ActivityIndicator size="large" color="#0ba65a" />: mowStrings.button.sendAgain}

                        </MowButtonBasic>

                        {/* approve button */}
                        <MowButtonBasic
                            onPress={validation}
                            containerStyle={{ marginTop: hp("5%") }}
                            textStyle={{ color: mowColors.mainColor }}
                            type={"default"}>

                            {mowStrings.button.approve}

                        </MowButtonBasic>

                    </View>
                }

                {
                    step === 2 &&

                    <View>

                        <Text
                            style={{
                                marginVertical: hp("5%"),
                                fontSize: hp("2.2%"),
                                fontWeight: "normal",
                                fontStyle: "normal",
                                lineHeight: 38,
                                letterSpacing: 0,
                                textAlign: "center",
                                color: "#ffffff"
                            }}>

                            {mowStrings.signUpPage.congratsMessage}

                        </Text>

                        <MowButtonBasic
                            onPress={() => { _handleLogin() }}
                            textStyle={{ color: mowColors.mainColor }}
                            type={"default"}>

                            {mowStrings.button.continue}

                        </MowButtonBasic>

                    </View>
                }

            </View>

        </MowContainer>

    )


}

const codeInput = ({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 0,
        margin: 0,
        width: "100%",
        marginHorizontal: 10
    },
    text: {
        textAlign: "center",
        margin: 0,
        padding: 0,
        width: "100%",
        color: mowColors.mainColor
    }
});
export default Verification;
