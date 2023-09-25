import React, { useState, useEffect } from "react";
import { View, FlatList, Image, Text, TouchableOpacity } from "react-native";
import FeatherIcon from "react-native-vector-icons/Feather";
import { mowStrings } from "../../../values/Strings/MowStrings";
import { mowColors } from "../../../values/Colors/MowColors";
import MowContainer from "../../../components/ui/Core/Container/MowContainer";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import {
    borderStyle,
    categoryStyleWithoutShadow,
    fontFamily,
} from "../../../values/Styles/MowStyles";
import { MowButtonBasic } from "../../../components/ui/Common/Button/MowButton";
import { MowInput } from "../../../components/ui/Common/Input/MowInput";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useDispatch, useSelector } from "react-redux";
import { removeProduct } from "../../../redurcer/cartSlice";

const Cart = (props) => {

    const userCart = useSelector(state => state.userCart)
    const dispatch = useDispatch()

    const [myCard, setMyCard] = useState({})
    const [totalPrice, setTotalPrice] = useState(userCart.price)
    const [productDelete, setProductDelete] = useState()
    const [error, setError] = useState('')

    const cartTotalStyle = {
        rowView: {
            flexDirection: "row",
            justifyContent: "space-between"
        },
        title: {
            color: mowColors.titleTextColor,
            marginRight: 10,
            fontSize: hp(2),
            letterSpacing: 0
        },
        content: {
            color: mowColors.textColor,
            marginRight: 10,
            fontSize: hp(1.5),
            fontWeight: "600",
            letterSpacing: 1
        }
    };


    const updateMyCart = () => {
        setMyCard(userCart)
        setTotalPrice(userCart.price)
    }
    useEffect(() => {
        updateMyCart()
    }, [userCart])


    const _deleteItemFromCart = (item) => {
        dispatch(removeProduct(item))
        setProductDelete(item)
    }

    const _calculateTotalPrice = (flag, index) => {
        let count = myCard.products[index].quantity;
        // +1 product
        if (flag) {
            const newArray = myCard
            newArray.products[index].quantity += 1
            const price = newArray.products[index].sale_price ? newArray.products[index].sale_price : newArray.products[index].original_price
            newArray.price += price
            setMyCard(newArray)
            setTotalPrice(newArray.price)

        }
        // -1 product
        else {
            if (count !== 1) {
                const newArray = myCard
                newArray.products[index].quantity -= 1
                const price = newArray.products[index].sale_price ? newArray.products[index].sale_price : newArray.products[index].original_price
                newArray.price -= price
                setMyCard(newArray)
                setTotalPrice(newArray.price)

            }
        }
    }

    const completeShopping = () =>{
        if(totalPrice === 0){
            setError('votre pagnier est vide')
        }else{
            props.navigation.navigate("AddressList", { cart: true, myCart:myCard })
        }
    }






    return (

        <MowContainer
            footerActiveIndex={3}
            title={'Mon panier'}
            style={{ backgroundColor: mowColors.pageBGDarkColor }}
            navigation={props.navigation}
        >

            <KeyboardAwareScrollView
                style={{ marginBottom: hp("7%") }}>
                    <Text style={{color:'red', textAlign:'center'}} >{error}</Text>
                <View style={{ marginTop: -5 }}>
                    {
                        myCard.products && myCard.products.map((item, index) => {
                            return (
                                <View
                                    key={index}
                                    style={[categoryStyleWithoutShadow, {
                                        flexDirection: "row",
                                        marginVertical: 5,
                                        backgroundColor: mowColors.viewBGColor,
                                        padding: 10
                                    }]}>

                                    <View
                                        style={{
                                            flex: 1.5,
                                            alignItems: "center",
                                            justifyContent: "center"
                                        }}>

                                        <Image
                                            resizeMode={"contain"}
                                            style={{ width: hp("10%"), height: hp("10%") }}
                                            source={{uri: "https://leratel.com/storage/" +item?.image}} />

                                    </View>

                                    <View
                                        style={{ flex: 4, marginLeft: 10 }}>

                                        {/* product title text */}
                                        <Text
                                            style={{
                                                fontSize: hp("1.8%"),
                                                fontWeight: "600",
                                                fontStyle: "normal",
                                                textAlign: "left",
                                                color: mowColors.titleTextColor,
                                                marginBottom: 10,
                                                paddingRight: 5,
                                                fontFamily: fontFamily.semiBold
                                            }}>

                                            {item["name"]}

                                        </Text>

                                        <View
                                            style={{ alignItems: "center", flexDirection: "row" }}>

                                            {/* price view */}
                                            <View
                                                style={{ flex: 1.5 }}>

                                                <Text
                                                    style={{
                                                        fontSize: hp("2%"),
                                                        fontWeight: "bold",
                                                        fontStyle: "normal",
                                                        letterSpacing: 0,
                                                        textAlign: "left",
                                                        color: mowColors.titleTextColor,
                                                        fontFamily: fontFamily.bold
                                                    }}>

                                                    {Number(item.price) * item['quantity']}FCFA

                                                </Text>

                                            </View>

                                            <View
                                                style={{ flex: 3, flexDirection: "row", alignItems: "center", alignSelf: "center", justifyContent: "center" }}>

                                                {/* minus button view */}
                                                <TouchableOpacity
                                                    onPress={() => { _calculateTotalPrice(false, index) }}
                                                    style={minusPlusStyle.container}>

                                                    <Text
                                                        style={minusPlusStyle.text}>

                                                        -

                                                    </Text>

                                                </TouchableOpacity>

                                                {/* product count text */}
                                                <Text
                                                    style={{
                                                        fontSize: hp("2%"),
                                                        fontWeight: "600",
                                                        fontStyle: "normal",
                                                        letterSpacing: 0,
                                                        textAlign: "center",
                                                        color: mowColors.titleTextColor,
                                                        marginHorizontal: 15,
                                                        fontFamily: fontFamily.semiBold
                                                    }}>

                                                    {item.quantity}

                                                </Text>

                                                {/* plus button view*/}
                                                <TouchableOpacity
                                                    onPress={() => { _calculateTotalPrice(true, index) }}
                                                    style={minusPlusStyle.container}>

                                                    <Text
                                                        style={minusPlusStyle.text}>

                                                        +

                                                    </Text>

                                                </TouchableOpacity>

                                            </View>

                                            <TouchableOpacity
                                                onPress={() => { _deleteItemFromCart(item) }}
                                                style={{ flex: 1 }}>

                                                <FeatherIcon
                                                    style={{
                                                        textAlign: "center",
                                                        color: mowColors.mainColor,
                                                        fontSize: hp("2.5%")
                                                    }}
                                                    name={"trash-2"} />

                                            </TouchableOpacity>

                                        </View>

                                    </View>

                                </View>
                            )
                        })
                    }
                </View>




                {/* coupon view */}
                {/* <View
                    style={{
                        flexDirection: "row",
                        backgroundColor: mowColors.viewBGColor,
                        borderRadius: 5,
                        alignSelf: "center",
                        height: hp("5.5%"),
                        marginVertical: hp("1%"),
                        width: "90%"
                    }}>

                    <MowInput
                        containerStyle={{ flex: 3, borderWidth: 0, backgroundColor: "transparent" }}
                        iconColor={"#b6babe"}
                        textInputStyle={{ fontFamily: fontFamily.regular }}
                        placeholder={mowStrings.placeholder.couponCode}
                        leftIcon={"percent"} />

                    <MowButtonBasic
                        containerStyle={{ flex: 1, backgroundColor: mowColors.mainColor }}
                        size={"small"}
                        type={"success"}>

                        {mowStrings.button.apply}

                    </MowButtonBasic>

                </View> */}

            </KeyboardAwareScrollView>

            <View
                style={{ width: "90%", alignSelf: "center", alignItems: "center" }}>

                {/* cart total ui */}
                <View
                    style={{
                        backgroundColor: mowColors.viewBGColor,
                        flexDirection: "row",
                        width: "100%",
                        borderRadius: 5,
                        padding: 10
                    }}>

                    <View
                        style={{ flex: 1 }}>

                        {/* sub-total row view */}
                        <View
                            style={cartTotalStyle.rowView}>

                            {/* sub-total text */}
                            <Text
                                style={cartTotalStyle.title}>

                                {/* {mowStrings.cartScreen.subtotal}: */}
                                Prix à Payer

                            </Text>

                            {/* sub-total amount text */}
                            <Text
                                style={cartTotalStyle.content}>

                                {/* {totalPrice} */}

                            </Text>

                        </View>

                        {/* coupon row view */}
                        {/* <View
                            style={cartTotalStyle.rowView}>

                            coupon text
                            <Text
                                style={cartTotalStyle.title}>

                                {mowStrings.cartScreen.coupon}:

                            </Text>

                            coupon amount text
                            <Text
                                style={cartTotalStyle.content}>

                                $0

                            </Text>

                        </View> */}

                        {/* shipping row view */}
                        {/* <View
                            style={cartTotalStyle.rowView}>

                            sub total text
                            <Text
                                style={cartTotalStyle.title}>

                                {mowStrings.cartScreen.shipping}:

                            </Text>

                            sub total amount text
                            <Text
                                style={cartTotalStyle.content}>

                                $0

                            </Text>

                        </View> */}

                    </View>

                    {/* total price view */}
                    <View
                        style={{ flex: 1, alignItems: "flex-end", justifyContent: "center" }}>

                        <Text
                            style={{
                                color: mowColors.mainColor,
                                marginRight: 10,
                                fontSize: hp(2),
                                fontWeight: "bold",
                                letterSpacing: 1
                            }}>

                            {totalPrice}  FCFA

                        </Text>

                    </View>

                </View>

                <MowButtonBasic
                    onPress={completeShopping}
                    type={"success"}>

                    {/* {mowStrings.button.completeShopping} */}
                    Finaliser l'Achat

                </MowButtonBasic>

            </View>

        </MowContainer>

    )


}

const minusPlusStyle = ({
    container: {
        borderRadius: 3,
        backgroundColor: "#ffffff",
        ...borderStyle,
        alignItems: "center",
        justifyContent: "center",
        width: hp("3%"),
        height: hp("3%"),
    },
    text: {
        fontSize: hp("2%"),
        fontWeight: "600",
        fontStyle: "normal",
        letterSpacing: 0,
        textAlign: "center",
        color: "#707070",
    }
});
export default Cart