import React, { useState } from "react";
import { Text, View, ActivityIndicator } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import axios from "axios";

import MowContainer from "../../../components/ui/Core/Container/MowContainer";
import { pageContainerStyle } from "../../../values/Styles/MowStyles";
import { mowColors } from "../../../values/Colors/MowColors";
import MowForwardBack from "../../../components/ui/Core/Navbar/MowForwardBack";
import { mowStrings } from "../../../values/Strings/MowStrings";
import { MowInput } from "../../../components/ui/Common/Input/MowInput";
import { MowButtonBasic } from "../../../components/ui/Common/Button/MowButton";
import { userRegister } from "../../../utils/apiEcommerce";


let iconColor = "white";

const NormalRegister = (props) => {

    const [user, setUser] = useState({
        username: "",
        secondName:"",
        email: '',
        password: '',
        confirmPassword: '',
        phone:'',
        boutiquePhone:'',
        localization:'',
        boutiqueName:'',
        validate:false
    });
    const [erreur, setErreur] = useState('');
    const [isLoading, setIsLoading] = useState(false)
    // to store entered regular from user
    const onChangeText = (key, value) => {
        setUser({
            ...user,
            [key]: value,
        })
    };

    const validation = () => {
        if (!user.username || !user.email || !user.password  || !user.phone || !user.boutiqueName || !user.boutiquePhone || !user.localization ) {
            setErreur('Remplissez tous les champs')
            return false
        }
        if (!user.email.includes('@')) {
            setErreur('email incorrect')
            return false
        }
        if (user.password.length < 8) {
            setErreur('le mot de passe doit contenir au mons 8 carractères')
            return false
        }
        if (user.password !== user.confirmPassword) {
            setErreur('les mots de passe ne correpondent pas')
            return false
        }
        return true
    }

    const handlRegister = async ()=>{
        setIsLoading(true)
        const validate = validation()
        if (validate){
            try {
                // const {data} = await axios.post(userRegister,{
                //     first_name: user.username,
                //     last_name:user.secondName,
                //     name:user.username,
                //     email:user.email,
                //     phone: user.phone,
                //     password:user.password,
                //     password_confirmation: user.confirmPassword
                // })
               
                 props.navigation.navigate('Verification',{user:user})
                 setIsLoading(false)
            } catch (error) {
                setIsLoading(false)
                setErreur('email incorrect ou déjà existant');
                console.log(error);
            }
           
        }
        setIsLoading(false)
    }

    return (

        <MowContainer
            footer={false}
            hideStatusBar={true}
            navbar={false}
            navigation={props.navigation}
            style={{ backgroundColor: mowColors.mainColor }}>

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
                            marginBottom: hp(8)
                        }}>

                        {/* {mowStrings.signUp} */}
                        Créer un Compte Vendeur

                    </Text>
                        <View>
                            <Text style={{ fontSize:20, fontWeight:'bold', color:'red', textAlign:'center' }} >{erreur}</Text>
                        </View>
                    {/* name view */}
                    <View
                        style={inputStyle.container}>

                        <Text
                            style={inputStyle.titleText}>

                            Votre Nom

                        </Text>

                        <MowInput
                            iconColor={iconColor}
                            rightIcon={"check"}
                            containerStyle={inputStyle.inputContainer}
                            textInputStyle={inputStyle.inputText}
                            onChangeText={value => onChangeText("username", value)} />

                    </View>
                    <View
                        style={inputStyle.container}>

                        <Text
                            style={inputStyle.titleText}>

                            Votre Prenom

                        </Text>

                        <MowInput
                            iconColor={iconColor}
                            rightIcon={"check"}
                            containerStyle={inputStyle.inputContainer}
                            textInputStyle={inputStyle.inputText}
                            onChangeText={value => onChangeText("secondName", value)} />

                    </View>

                    {/* Phone view */}
                    <View
                        style={inputStyle.container}>

                        <Text
                            style={inputStyle.titleText}>

                            N° Téléphone

                        </Text>

                        <MowInput
                            iconColor={iconColor}
                            rightIcon={"check"}
                            containerStyle={inputStyle.inputContainer}
                            textInputStyle={inputStyle.inputText}
                            type = 'number'
                            onChangeText={value => onChangeText("phone", value)} />

                    </View>
                    {/* email view */}
                    <View
                        style={inputStyle.container}>

                        <Text
                            style={inputStyle.titleText}>

                            Email

                        </Text>

                        <MowInput
                            iconColor={iconColor}
                            rightIcon={"check"}
                            containerStyle={inputStyle.inputContainer}
                            textInputStyle={inputStyle.inputText}
                            onChangeText={value => onChangeText("email", value)} />

                    </View>
                    {/* Name Boutique view */}
                    <View
                        style={inputStyle.container}>

                        <Text
                            style={inputStyle.titleText}>

                            Nom de la Boutique

                        </Text>

                        <MowInput
                            iconColor={iconColor}
                            rightIcon={"check"}
                            containerStyle={inputStyle.inputContainer}
                            textInputStyle={inputStyle.inputText}
                            onChangeText={value => onChangeText("boutiqueName", value)} />

                    </View>
                    {/* Loacazion Boutique view */}
                    <View
                        style={inputStyle.container}>

                        <Text
                            style={inputStyle.titleText}>

                            Lieu de la Boutique

                        </Text>

                        <MowInput
                            iconColor={iconColor}
                            rightIcon={"check"}
                            containerStyle={inputStyle.inputContainer}
                            textInputStyle={inputStyle.inputText}
                            onChangeText={value => onChangeText("localization", value)} />

                    </View>
                    {/* Loacazion Boutique view */}
                    <View
                        style={inputStyle.container}>

                        <Text
                            style={inputStyle.titleText}>

                            N° Téléphone de la Boutique

                        </Text>

                        <MowInput
                            iconColor={iconColor}
                            rightIcon={"check"}
                            containerStyle={inputStyle.inputContainer}
                            textInputStyle={inputStyle.inputText}
                            onChangeText={value => onChangeText("boutiquePhone", value)} />

                    </View>

                    {/* password view */}
                    <View
                        style={inputStyle.container}>

                        {/* title regular */}
                        <Text
                            style={inputStyle.titleText}>

                            Mot de Passe

                        </Text>

                        <MowInput
                            containerStyle={inputStyle.inputContainer}
                            textInputStyle={inputStyle.inputText}
                            onChangeText={value => onChangeText("password", value)}
                            passwordInput={true}
                            iconColor={"white"}
                            rightIcon={"eye"} />

                    </View>
                    {/* confirm password view */}
                    <View
                        style={inputStyle.container}>

                        {/* title regular */}
                        <Text
                            style={inputStyle.titleText}>

                            mot de passe encore

                        </Text>

                        <MowInput
                            containerStyle={inputStyle.inputContainer}
                            textInputStyle={inputStyle.inputText}
                            onChangeText={value => onChangeText("confirmPassword", value)}
                            passwordInput={true}
                            iconColor={"white"}
                            rightIcon={"eye"} />

                    </View>

                </View>

                <MowButtonBasic
                    onPress={handlRegister}
                    style={{ marginTop: hp("5%") }}
                    containerStyle={{ marginTop: hp("5%") }}
                    textStyle={{ color: mowColors.mainColor, fontWeight: "normal", letterSpacing: 0 }}
                    type={"default"}>

                    { isLoading? <ActivityIndicator size= "large" color="#383838" />: ('créer votre Compte')}

                </MowButtonBasic>


            </KeyboardAwareScrollView>

        </MowContainer>
    )

}

export const inputStyle = ({
    container: {
        marginVertical: 5
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
        fontSize: hp("2%"),
        fontWeight: "500",
        fontStyle: "normal",
        letterSpacing: 0,
        textAlign: "left",
        color: "#ffffff",
        width: "85%"
    },
});

export default NormalRegister