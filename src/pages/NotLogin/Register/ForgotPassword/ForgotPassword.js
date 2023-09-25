import React, { useState } from "react";
import axios from "axios";
import {Text, View, ActivityIndicator} from "react-native";
import MowForwardBack from "../../../../components/ui/Core/Navbar/MowForwardBack";
import {pageContainerStyle} from "../../../../values/Styles/MowStyles";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {mowColors} from "../../../../values/Colors/MowColors";
import MowContainer from "../../../../components/ui/Core/Container/MowContainer";
import {mowStrings} from "../../../../values/Strings/MowStrings";
import {heightPercentageToDP as hp} from "react-native-responsive-screen";
import {MowInput} from "../../../../components/ui/Common/Input/MowInput";
import {MowButtonBasic} from "../../../../components/ui/Common/Button/MowButton";
import { forgotPassword } from "../../../../utils/apiEcommerce";

const ForgotPassword =(props) => {
    const product = props.route.params?.product
    const [email, setEmail] = useState('')
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)

  

    // to store entered regular from user
    const onChangeText = ( value) => {
        setEmail( value,)
    };
    const handleChange = async ()=>{
        setError('')
        setIsLoading(true)
        try {
            const {data} = await axios.post(forgotPassword,{
                email:email
            })
            if(product){
                props.navigation.navigate("ExtraSecurity",{message:data.message,email:email, product:product})
            }
            else{
                 props.navigation.navigate("ExtraSecurity",{message:data.message,email:email})
            }
            setIsLoading(false)
            console.log(data);
        } catch (error) {
            setError('email introuvable ou incorrect')
            setIsLoading(false)
            console.log(error);
        }
    }


        return (

            <MowContainer
                footer={false}
                hideStatusBar={true}
                navbar={false}
                style={{backgroundColor: mowColors.mainColor}}
                navigation={props.navigation}
                >

                <KeyboardAwareScrollView
                    showsVerticalScrollIndicator={false}
                    style={pageContainerStyle}>

                    {/* top navigation button area */}
                    <MowForwardBack
                        leftOnPress={() => props.navigation.goBack()}
                        left={true}/>

                    <View
                        style={{...pageContainerStyle, marginTop: hp("3%")}}>

                        <Text
                            style={{
                                fontSize: hp(3),
                                fontWeight: "600",
                                fontStyle: "normal",
                                textAlign: "center",
                                color: "#ffffff",
                                marginBottom: hp(5)
                            }}>

                            {mowStrings.forgotPasswordScreen.title}

                        </Text>

                        {/* email view */}
                        <View>
                            <Text style={{
                                color:'red',
                                fontSize:20,
                                fontWeight:'bold',
                                textAlign:'center'
                            }} >{error}</Text>
                        </View>
                        <View
                            style={{...pageContainerStyle, marginVertical: 10}}>

                            {/* email title text */}
                            <Text
                                style={{
                                    fontSize: hp("2%"),
                                    fontWeight: "normal",
                                    fontStyle: "normal",
                                    letterSpacing: 0,
                                    textAlign: "left",
                                    color: "#ffffff"
                                }}>

                                {mowStrings.placeholder.email}*

                            </Text>

                            {/* email input */}
                            <MowInput
                                containerStyle={{
                                    backgroundColor: "transparent",
                                    orderStyle: "solid",
                                    borderWidth: 0,
                                    borderBottomWidth: 1,
                                    borderBottomColor: "#ffffff",
                                    width: "100%"
                                }}
                                textInputStyle={{
                                    fontSize: hp("2.2%"),
                                    fontWeight: "500",
                                    fontStyle: "normal",
                                    letterSpacing: 0,
                                    textAlign: "left",
                                    color: "#ffffff",
                                    width: "85%"
                                }}
                                onChangeText={value => onChangeText(value)}/>

                        </View>

                        <MowButtonBasic
                            onPress={handleChange}
                            disabled={isLoading}
                            style={{marginTop: hp("3%")}}
                            containerStyle={{marginTop: hp("5%")}}
                            textStyle={{color: mowColors.mainColor, fontWeight: "normal", letterSpacing: 0}}
                            type={"default"}>

                            {isLoading?<ActivityIndicator size='large' color='#383838' />: mowStrings.button.submit}

                        </MowButtonBasic>

                    </View>

                </KeyboardAwareScrollView>

            </MowContainer>
        )

}

export default ForgotPassword