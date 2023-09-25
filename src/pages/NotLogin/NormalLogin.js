import React, { useState } from "react";
import { Text, View, ActivityIndicator } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import axios from "axios";
import { useDispatch } from "react-redux";

import MowContainer from "../../components/ui/Core/Container/MowContainer";
import { pageContainerStyle } from "../../values/Styles/MowStyles";
import MowForwardBack from "../../components/ui/Core/Navbar/MowForwardBack";
import { MowButtonBasic } from "../../components/ui/Common/Button/MowButton";
import { mowColors } from "../../values/Colors/MowColors";
import { mowStrings } from "../../values/Strings/MowStrings";
import { MowInput } from "../../components/ui/Common/Input/MowInput";
import { User } from "../../components/utils/User/User";
import { setLogin } from "../Router";
import { loginApi, userData } from "../../utils/apiEcommerce";
import { addProduct } from "../../redurcer/cartSlice";
import { auth } from "../../redurcer/userSlice";


const NormalLogin = (props) => {
    const product =  props.route.params?.product
    let iconColor = "white";
    const dispatch = useDispatch();
    const [values, setValues] = useState({
        email: "",
        password: ""
    })
    const [error, setError] = useState()
    const [isLoading, setIsLoading] = useState(false)



    // to store entered regular from user
    const onChangeText = (key, value) => {
        setError('')
        setValues({
            ...values,
            [key]: value,
        })
    };

    const validation = () =>{
        if(!values.email.length || !values.password.length) return false
        else return true
    }

    const _handleLogin = async () =>{
        setIsLoading(true)
        const validate = validation()
        if (!validate){
            setIsLoading(false)
            setError('remplissez tous les champs')
            return
        }
        else {
            try {
                const {data} = await axios.post(loginApi,{email:values.email, password:values.password})
                const userdata = await axios.get(userData, {headers:{
                    Authorization : `Bearer ${data.data.token}`
                }})
                const user = {
                    username: userdata.data.data.email,
                    image: userdata.data.data.avatar,
                    email : userdata.data.data.email,
                    phone: userdata.data.data.phone,
                    id: userdata.data.data.id,
                    gender: userdata.data.data.gender,
                    validate: true,
                    token : data.data.token
                }
                if(product){
                    setLogin(true);
                    dispatch(addProduct({product:{...product, quantity: 1}}))
                    dispatch(auth(user))
                    props.navigation.navigate('Cart')
                    setIsLoading(false)
                }
                else{
                    setLogin(true)
                    dispatch(auth(user))
                    setIsLoading(false)
                }
                
            } catch (error) {
                setError('email ou mot de passe incorrecte')
                setIsLoading(false)
                console.log(error.message);
            }
        }
    //    // to update user login situation
    //     new User().setLogin(true);
    //     // to change router
    //     setLogin(true);
    }


        return (

            <MowContainer
                footer={false}
                hideStatusBar={true}
                navbar={false}
                style={{ backgroundColor: mowColors.mainColor }}
                navigation={props.navigation}
                >

                <KeyboardAwareScrollView
                    showsVerticalScrollIndicator={false}
                    style={pageContainerStyle}>

                    {/* top navigation button area */}
                    <MowForwardBack
                        leftOnPress={() => props.navigation.goBack()}
                        left={true} />

                    <View
                        style={{ ...pageContainerStyle, marginTop: hp("3%") }}>

                        <Text
                            style={{
                                fontSize: hp(3),
                                fontWeight: "600",
                                fontStyle: "normal",
                                textAlign: "center",
                                color: "#ffffff",
                                marginBottom: hp(5)
                            }}>

                            {/* {mowStrings.login} */}
                            Connexion

                        </Text>

                        {/* username view */}
                        <View style={{
                            justifyContent:'center',
                            alignItems:'center'
                        }}>
                            <Text style={{
                                color:'red',
                                textAlign:'center',
                                fontWeight:'bold',
                                fontSize:20
                            }} >{error}</Text>
                        </View>
                        <View
                            style={inputStyle.container}>

                            <Text
                                style={inputStyle.titleText}>

                                {mowStrings.loginPage.username}

                            </Text>

                            <MowInput
                                iconColor={iconColor}
                                rightIcon={"check"}
                                containerStyle={inputStyle.inputContainer}
                                textInputStyle={inputStyle.inputText}
                                onChangeText={value => onChangeText("email", value)} />

                        </View>

                        {/* password view */}
                        <View
                            style={inputStyle.container}>

                            {/* title regular */}
                            <Text
                                style={inputStyle.titleText}>

                                {mowStrings.loginPage.password}

                            </Text>

                            <MowInput
                                containerStyle={inputStyle.inputContainer}
                                textInputStyle={inputStyle.inputText}
                                onChangeText={value => onChangeText("password", value)}
                                passwordInput={true}
                                iconColor={iconColor}
                                rightIcon={"eye"} />

                        </View>

                        <MowButtonBasic
                            disabled = {isLoading}
                            onPress={() => { _handleLogin() }}
                            style={{ marginTop: hp("3%") }}
                            containerStyle={{ marginTop: hp("5%") }}
                            textStyle={{ color: mowColors.mainColor, fontWeight: "normal", letterSpacing: 0 }}
                            type={"default"}>

                            { isLoading? <ActivityIndicator size="large" color="#0ba65a" />: mowStrings.login}

                        </MowButtonBasic>

                        {/* forgot password view */}
                        <View
                            style={{ marginTop: hp(3) }}>

                            <Text
                                style={{
                                    color: "white",
                                    fontSize: hp(1.8),
                                    textAlign: "center"
                                }}>

                                {mowStrings.loginPage.cantAccessAccount}

                            </Text>

                            {/* forgot password button */}
                            <MowButtonBasic
                                onPress={() => { 
                                    if(product){
                                        props.navigation.navigate('ForgotPassword',{product:product})
                                    }
                                    else{
                                        props.navigation.navigate("ForgotPassword") 
                                    }
                                    
                                }}
                                containerStyle={{ borderWidth: 0 }}
                                filled={false}
                                type={"default"}>

                                {mowStrings.loginPage.forgotPassword}

                            </MowButtonBasic>

                        </View>

                    </View>

                </KeyboardAwareScrollView>

            </MowContainer>
        )

}

export const inputStyle = ({
    container: {
        marginVertical: 10
    },
    titleText: {
        fontSize: hp("2%"),
        fontWeight: "normal",
        fontStyle: "normal",
        letterSpacing: 0,
        textAlign: "left",
        color: "#ffffff",
        opacity: 0.8
    },
    inputContainer: {
        backgroundColor: "transparent",
        orderStyle: "solid",
        borderWidth: 0,
        borderBottomWidth: 1,
        borderBottomColor: "#ffffff",
        width: "100%"
    },
    inputText: {
        fontSize: hp("2.2%"),
        fontWeight: "500",
        fontStyle: "normal",
        letterSpacing: 0,
        textAlign: "left",
        color: "#ffffff",
        width: "85%"
    },
});

export default NormalLogin