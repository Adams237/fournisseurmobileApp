import React from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";
import FeatherIcon from "react-native-vector-icons/Feather";
import { mowStrings } from "../../../values/Strings/MowStrings";
import { cardStyle, pageContainerStyle } from "../../../values/Styles/MowStyles";
import { mowColors } from "../../../values/Colors/MowColors";
import MowContainer from "../../../components/ui/Core/Container/MowContainer";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import MowProductInfoView from "../../../components/ui/MowProductInfoView";

const OrderDetail = (props) => {

    const orderOperationsStyle = {
        container: {
            flexDirection: "row",
            marginTop: hp("2.5%"),
            alignItems: "center"
        },
        containerInfo: {
            flexDirection: "row",
            alignItems: "center",
            width: "100%",
        },
        icon: {
            color: mowColors.mainColor,
            fontSize: hp("3")
        },
        title: {
            marginLeft: 10,
            fontSize: hp("1.5"),
            fontWeight: "normal",
            fontStyle: "normal",
            letterSpacing: 0,
            textAlign: "center",
            color: mowColors.titleTextColor
        },
        sectionTitle: {
            marginLeft: 10,
            fontSize: hp("1.8"),
            fontWeight: "600",
            fontStyle: "normal",
            letterSpacing: 0,
            textAlign: "center",
            color: mowColors.titleTextColor
        },
    };


    // product info
    const product = props.route.params.product;
    const adress = props.route.params.adress

    // to control the product has returned or canceled
    const cancelReturn = product["cancel"] || product["return"];

    return (

        <MowContainer
            title={"Detail"}
            navigation={props.navigation}
        >

            <View
                style={pageContainerStyle}>

                {/* product summary view */}
                <View
                    style={{ padding: 15, ...cardStyle, backgroundColor: mowColors.categoryBGColor }}>

                    {/* product summary */}
                    <MowProductInfoView
                        opacity={cancelReturn}
                        product={product} />

                    {
                        !cancelReturn &&

                        <View
                            style={{ width: "100%" }}>

                            {/* cargo tracking button*/}
                            {/* <TouchableOpacity
                                        onPress={() => {props.navigation.navigate("CargoTracking", {product: product})}}
                                        style={orderOperationsStyle.container}>

                                        <FeatherIcon
                                            name={"box"}
                                            style={orderOperationsStyle.icon}/>

                                        <Text
                                            style={orderOperationsStyle.title}>

                                            {mowStrings.orderDetail.cargoTracking}

                                        </Text>

                                    </TouchableOpacity> */}

                            {/* rate product button*/}
                            {/* <TouchableOpacity
                                        onPress={() => {props.navigation.navigate("RateProduct", {product: product})}}
                                        style={orderOperationsStyle.container}>

                                        <FeatherIcon
                                            name={"message-square"}
                                            style={orderOperationsStyle.icon}/>

                                        <Text
                                            style={orderOperationsStyle.title}>

                                            {mowStrings.orderDetail.rateProduct}

                                        </Text>

                                    </TouchableOpacity> */}

                            {/* cancel request button*/}
                            {/* <TouchableOpacity
                                        onPress={() => {props.navigation.navigate("ReturnRequest", {product: product})}}
                                        style={orderOperationsStyle.container}>

                                        <FeatherIcon
                                            name={"x-circle"}
                                            style={orderOperationsStyle.icon}/>

                                        <Text
                                            style={orderOperationsStyle.title}>

                                            {mowStrings.orderDetail.cancelRequest}

                                        </Text>

                                    </TouchableOpacity> */}

                        </View>
                    }

                </View>

                {/* address & payment view */}
                {
                    !cancelReturn &&

                    <View>

                        {/* product address view */}
                        <View
                            style={{ padding: 15, ...cardStyle, marginTop: 15, backgroundColor: mowColors.categoryBGColor }}>

                            {/* address title view */}
                            <View
                                style={orderOperationsStyle.containerInfo}>

                                <FeatherIcon
                                    name={"box"}
                                    style={orderOperationsStyle.icon} />

                                <Text
                                    style={orderOperationsStyle.sectionTitle}>

                                    {mowStrings.orderDetail.addressInfo}

                                </Text>

                            </View>

                            {/* address text */}
                            <View
                                style={{
                                    width: "100%",
                                    fontSize: hp("1.6"),
                                    fontWeight: "normal",
                                    fontStyle: "normal",
                                    letterSpacing: 0,
                                    lineHeight: 25,
                                    textAlign: "left",
                                    color: mowColors.titleTextColor,
                                    marginTop: 10,
                                    marginLeft: 5,
                                    flexDirection: 'column'
                                }}>
                                <View style={{flexDirection:'row', marginBottom:10}}>
                                    <Text style={{ color: 'black', fontWeight: 'bold' }}>Pays:</Text><Text style={{ color: 'black' }}>  {adress.country}</Text>
                                </View>
                                <View style={{flexDirection:'row', marginBottom:10}}>
                                    <Text style={{ color: 'black', fontWeight: 'bold' }}>Ville:</Text><Text style={{ color: 'black' }}>   {adress.city}</Text>
                                </View>
                                <View style={{flexDirection:'row', marginBottom:10}}>
                                    <Text style={{ color: 'black', fontWeight: 'bold' }}>Quartier:</Text><Text style={{ color: 'black' }}>   {adress.town}</Text>
                                </View>
                                <View style={{flexDirection:'row',  marginBottom:10}}>
                                    <Text style={{ color: 'black', fontWeight: 'bold' }}>Quartier</Text><Text style={{ color: 'black' }}> :  {adress.fullAddress}</Text>
                                </View>
                                <View style={{flexDirection:'row', marginBottom:10}}>
                                    <Text style={{ color: 'black', fontWeight: 'bold' }}>N°:</Text><Text style={{ color: 'black' }}>   {adress.phone}</Text>
                                </View>

                            </View>

                        </View>

                        {/* product payment view */}
                        {/* <View
                                    style={{padding: 15, ...cardStyle, marginTop: 15, backgroundColor: mowColors.categoryBGColor}}>

                                    payment title view
                                    <View
                                        style={orderOperationsStyle.containerInfo}>

                                        <FeatherIcon
                                            name={"box"}
                                            style={orderOperationsStyle.icon}/>

                                        <Text
                                            style={orderOperationsStyle.sectionTitle}>

                                            {mowStrings.orderDetail.paymentInfo}

                                        </Text>

                                    </View>

                                    <View
                                        style={{flexDirection: "row", width: "100%", marginTop: 10, alignItems: "center"}}>

                                        <Image
                                            resizeMode={"contain"}
                                            style={{width: wp("15%"), height: hp("5%")}}
                                            source={require("../../../assets/logo/visa.png")}/>

                                        credit card text
                                        <Text
                                            style={{
                                                fontSize: hp("1.6"),
                                                fontWeight: "normal",
                                                fontStyle: "normal",
                                                letterSpacing: 0,
                                                lineHeight: 25,
                                                textAlign: "left",
                                                color: mowColors.titleTextColor,
                                                marginLeft: 10
                                            }}>

                                            {product["creditCard"]}

                                        </Text>

                                        payment information
                                        <Text
                                            style={{
                                                fontSize: hp("1.5"),
                                                fontWeight: "normal",
                                                fontStyle: "normal",
                                                letterSpacing: 0,
                                                lineHeight: 25,
                                                textAlign: "left",
                                                color: "#48bb20",
                                                marginLeft: 5
                                            }}>

                                            {product["paymentInformation"]}

                                        </Text>

                                    </View>

                                </View> */}

                    </View>
                }

                {/* cancel || return reason view */}
                {
                    cancelReturn &&

                    <View
                        style={{ padding: 15, ...cardStyle, marginTop: 15, backgroundColor: mowColors.categoryBGColor }}>

                        {/* cancel || return title view */}
                        <View
                            style={orderOperationsStyle.containerInfo}>

                            <FeatherIcon
                                name={"message-square"}
                                style={orderOperationsStyle.icon} />

                            <Text
                                style={orderOperationsStyle.sectionTitle}>

                                {product["cancel"] ? mowStrings.orderDetail.cancelReason : mowStrings.orderDetail.returnReason}

                            </Text>

                        </View>

                        {/* description text */}
                        <Text
                            style={{
                                padding: 10,
                                fontSize: hp("1.8"),
                                fontWeight: "normal",
                                fontStyle: "normal",
                                letterSpacing: 0,
                                textAlign: "left",
                                color: mowColors.textColor
                            }}>

                            {product["reasonText"]}

                        </Text>

                    </View>
                }

            </View>

        </MowContainer>

    )

}
export default OrderDetail