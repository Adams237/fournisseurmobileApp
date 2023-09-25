import React, { useState } from "react";
import { View, Text, Image } from "react-native";
import { mowStrings } from "../../../values/Strings/MowStrings";
import { mowColors } from "../../../values/Colors/MowColors";
import MowContainer from "../../../components/ui/Core/Container/MowContainer";
import { MowInfoHeader } from "../../../components/ui/MowInfoHeader";
import { borderStyle, pageContainerStyle } from "../../../values/Styles/MowStyles";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { MowInput } from "../../../components/ui/Common/Input/MowInput";
import { MowButtonBasic } from "../../../components/ui/Common/Button/MowButton";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { MowCheckBox } from "../../../components/ui/Common/CheckBox/MowCheckBox";
import { useDispatch } from "react-redux";
import { addOrder } from "../../../redurcer/orderSlice";
import { deleteCart } from "../../../redurcer/cartSlice";

const PaymentInformation = (props) => {

    const dispatch = useDispatch()
    const [value, setValue] = useState({
        creditCard: true,
        paypal: false,
        payLivraison: false,
        orangeMonai: false,
        mtnMonai: false,
        cardNumber: "",
        cardOwnerName: "",
        expiryDate: "",
        cvc: "",
        modelPay:""
    })

    const adress = props.route.params.adress
    const handlePayment = () => {
        let myCart = props.route.params.myCart;
        myCart = { ...myCart, adress: { ...adress }, modelPay:value.modelPay };
        let arrAyProducts = []
        if (value.payLivraison) {
            myCart.paid = false;
            myCart.products.map(product=>{
                product.paid = false;
                arrAyProducts.push(product)
            })
           
        }
        else {
            myCart.paid = true;
            myCart.products.map(product=>{
                product.paid = true;
                arrAyProducts.push(product)
            })
        }
        myCart.products = [...arrAyProducts]
        dispatch(addOrder(myCart))
        dispatch(deleteCart(props.route.params.myCart))
        props.navigation.navigate("CompleteOrder")

    }


    // to store entered regular from user
    const onChangeText = (key, value) => {
        setValue({
            ...value,
            [key]: value,
        })
    };


    return (

        <MowContainer
            style={{ backgroundColor: mowColors.pageBGDarkColor }}
            title={mowStrings.paymentInformation.title}
            navigation={props.navigation}
        >

            <MowInfoHeader
                activeIndex={2} />

            <KeyboardAwareScrollView
                style={[pageContainerStyle, { marginTop: 20 }]}>

                {/* credit card view */}
                <View
                    style={[paymentStyle.container, { backgroundColor: mowColors.viewBGColor }]}>

                    {/* header view */}
                    <View
                        style={{ flexDirection: "row", paddingRight: wp("3%"), alignItems: "center", ...borderStyle, borderWidth: 0, borderBottomWidth: 1 }}>

                        <View
                            style={{ flexDirection: "row", flex: 1, justifyContent: "flex-start", alignItems: "center" }}>

                            <MowCheckBox
                                onPress={() => { setValue({ ...value, modelPay:'creditCard', creditCard: true, paypal: false, payLivraison: false, mtnMonai: false, orangeMonai: false, }) }}
                                checkedColor={mowColors.mainColor}
                                checked={value.creditCard}
                                containerStyle={checkBoxStyle.container} />

                            <Text
                                style={{
                                    fontSize: hp("1.8%"),
                                    fontWeight: "normal",
                                    fontStyle: "normal",
                                    letterSpacing: 0,
                                    textAlign: "left",
                                    color: mowColors.titleTextColor
                                }}>

                                {/* {mowStrings.paymentInformation.creditCard} */}
                                Carte De Crédit

                            </Text>

                        </View>

                        <View
                            style={{ flexDirection: "row", flex: 1, justifyContent: "flex-end" }}>

                            <View
                                style={paymentStyle.logoView}>

                                {/* visa logo image */}
                                <Image
                                    style={paymentStyle.logo}
                                    source={require("../../../assets/logo/visa.png")}
                                    resizeMode={"contain"} />

                            </View>

                            <View
                                style={[paymentStyle.logoView, { marginLeft: 10 }]}>

                                {/* mastercard logo image */}
                                <Image
                                    style={[paymentStyle.logo]}
                                    source={require("../../../assets/logo/mastercard.png")}
                                    resizeMode={"contain"} />

                            </View>

                        </View>

                    </View>

                    {/* content view */}
                    {
                        value.creditCard &&

                        <View
                            style={{ paddingHorizontal: wp("3%") }}>

                            {/* card number input */}
                            <MowInput
                                iconColor={"#0ba65a"}
                                rightIcon={"lock"}
                                onChangeText={value => onChangeText('cardNumber', value)}
                                placeholder={mowStrings.placeholder.cardNumber}
                                type={"number"} />

                            {/* card owner name input */}
                            <MowInput
                                onChangeText={value => onChangeText('cardOwnerName', value)}
                                placeholder={mowStrings.placeholder.cardOwnerName}
                                type={"text"} />

                            <View
                                style={{ flexDirection: "row" }}>

                                {/* expiry date input */}
                                <MowInput
                                    containerStyle={{ flex: 1, marginRight: wp("5%") }}
                                    onChangeText={value => onChangeText('expiryDate', value)}
                                    placeholder={mowStrings.placeholder.expiryDate}
                                    type={"number"} />

                                {/* cvc input */}
                                <MowInput
                                    rightIconOnPress={() => { }}
                                    rightIcon={"help-circle"}
                                    containerStyle={{ flex: 1, marginLeft: wp("5%"), paddingRight: wp("4%") }}
                                    iconColor={"#0ba65a"}
                                    onChangeText={value => onChangeText('cvc', value)}
                                    placeholder={mowStrings.placeholder.cvc}
                                    type={"number"} />

                            </View>

                        </View>
                    }

                </View>

                {/* OM view */}
                <View
                    style={[paymentStyle.container, { flexDirection: "row", marginTop: 10, paddingVertical: 10, backgroundColor: mowColors.viewBGColor }]}>

                    <MowCheckBox
                        onPress={() => { setValue({ ...value,modelPay:'OM', creditCard: false, paypal: false, orangeMonai: true, payLivraison: false, mtnMonai: false }) }}
                        checkedColor={mowColors.mainColor}
                        checked={value.orangeMonai}
                        containerStyle={checkBoxStyle.container} />

                    {/* paypal logo image */}
                    <Image
                        style={[paymentStyle.logo, { width: wp("15%") }]}
                        source={require("../../../assets/logo/Orange_Money.jpg")}
                        resizeMode={"contain"} />

                </View>
                {/* MOM view */}
                <View
                    style={[paymentStyle.container, { flexDirection: "row", marginTop: 10, paddingVertical: 10, backgroundColor: mowColors.viewBGColor }]}>

                    <MowCheckBox
                        onPress={() => { setValue({ ...value, modelPay:'MOMO', creditCard: false, paypal: false, orangeMonai: false, mtnMonai: true, payLivraison: false }) }}
                        checkedColor={mowColors.mainColor}
                        checked={value.mtnMonai}
                        containerStyle={checkBoxStyle.container} />

                    {/* paypal logo image */}
                    <Image
                        style={[paymentStyle.logo, { width: wp("15%") }]}
                        source={require("../../../assets/logo/momo.png")}
                        resizeMode={"contain"} />

                </View>
                {/* payement à la livraison view */}
                {/* <View
                    style={[paymentStyle.container, { flexDirection: "row", marginTop: 10, paddingVertical: 10, backgroundColor: mowColors.viewBGColor }]}>

                    <MowCheckBox
                        onPress={() => { setValue({ ...value, creditCard: false, paypal: false, payLivraison: true, orangeMonai: false, mtnMonai: false }) }}
                        checkedColor={mowColors.mainColor}
                        checked={value.payLivraison}
                        containerStyle={checkBoxStyle.container} />

                 

                </View> */}

                {/* adressChoice view */}
                <View
                    style={[paymentStyle.container, { backgroundColor: mowColors.viewBGColor, marginTop: 30 }]}>

                    {/* header view */}
                    <View
                        style={{ flexDirection: "row", paddingRight: wp("3%"), alignItems: "center", ...borderStyle, borderWidth: 0, borderBottomWidth: 1 }}>

                        <View
                            style={{ flexDirection: "row", flex: 1, justifyContent: "flex-start", alignItems: "center" }}>


                            <Text
                                style={{
                                    fontSize: hp("1.8%"),
                                    fontWeight: "normal",
                                    fontStyle: "normal",
                                    letterSpacing: 0,
                                    textAlign: "left",
                                    color: mowColors.titleTextColor,
                                    marginLeft: 10
                                }}>

                                Address de livraison

                            </Text>

                        </View>

                        <View
                            style={{ flexDirection: "row", flex: 1, justifyContent: "flex-end" }}>



                            <View
                                style={[paymentStyle.logoView, { marginLeft: 10 }]}>

                                {/* mastercard logo image */}
                                <Image
                                    style={[paymentStyle.logo]}
                                    source={require("../../../assets/image/map.png")}
                                    resizeMode={"contain"} />

                            </View>

                        </View>

                    </View>

                    {/* content view */}
                    {
                        adress &&

                        <View
                            style={{ paddingHorizontal: wp("3%") }}>

                            {/* adress number input */}
                            <MowInput
                                iconColor={"#0ba65a"}
                                rightIcon={"phone"}
                                value={adress.phone}
                                type={"number"} />

                            {/* country */}
                            <MowInput
                                iconColor={"#0ba65a"}
                                rightIcon={"globe"}
                                value={adress.country}
                                type={"text"} />

                            {/* City */}
                            <MowInput
                                iconColor={"#0ba65a"}
                                rightIcon={"globe"}
                                value={adress.city}
                                type={"text"} />

                            {/* Town */}
                            <MowInput
                                iconColor={"#0ba65a"}
                                rightIcon={"globe"}
                                value={adress.town}
                                type={"text"} />

                            {/* fullAddress */}
                            <MowInput
                                value={adress.fullAddress}
                                type={"textarea"} />


                        </View>
                    }

                </View>

            </KeyboardAwareScrollView>

            <View
                style={{ width: "90%", alignSelf: "center" }}>

                {/* complete payment button */}
                <MowButtonBasic
                    onPress={handlePayment}
                    size={"medium"}
                    type={"success"}>

                    {/* {mowStrings.button.completePayment} */}
                    COMPLETER PAIEMENT

                </MowButtonBasic>

            </View>

        </MowContainer>

    )


}

const paymentStyle = ({
    container: {
        width: "100%",
        ...borderStyle,
        alignItems: "center",
    },
    titleText: {
        color: mowColors.titleTextColor
    },
    logoView: {
        backgroundColor: "#ffffff",
        ...borderStyle,
        padding: 5,
        marginVertical: 5
    },
    logo: {
        width: wp("10%"),
        height: hp("3%")
    }
});

const checkBoxStyle = ({
    container: {
        alignSelf: "center",
        marginHorizontal: wp("3%")
    }
});

export default PaymentInformation