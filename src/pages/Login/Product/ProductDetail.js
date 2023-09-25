import React, { useEffect, useRef, useState } from "react";
import { View, Text, Image, ScrollView, TouchableOpacity, FlatList, useWindowDimensions } from "react-native";
import RenderHtml from 'react-native-render-html';

import FAIcon from "react-native-vector-icons/FontAwesome";
import { mowStrings } from "../../../values/Strings/MowStrings";
import { mowColors } from "../../../values/Colors/MowColors";
import MowContainer from "../../../components/ui/Core/Container/MowContainer";
import { borderStyle, categoryStyleWithoutShadow } from "../../../values/Styles/MowStyles";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import Swiper from "react-native-swiper";
import { MowButtonBasic } from "../../../components/ui/Common/Button/MowButton";
import Colors from "../../../sampleData/Colors";
import { MowStarView } from "../../../components/ui/Common/StarView/MowStarView";
import CustomerComments from "../../../sampleData/CustomerComments";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../../../redurcer/cartSlice";
import { addProductToFavorite, deleteProductToFavorite } from "../../../redurcer/favoritesSlice";

const ProductDetail = (props) => {
    const { width } = useWindowDimensions();
    const currentUSer = useSelector(state => state.currentUSer.value)
    const favoritesProduct = useSelector(state => state.favorites.value)
    const dispatch = useDispatch()
    const [user, setUser] = useState({})
    const [showTabBar, setShowTabBar] = useState(false)
    const [size, setSize] = useState(0)
    const swiperRef = useRef()
    const [error, setError] = useState('')
    const [isFavorite, setIsFavorite] = useState(false)
    const [value, setValue] = useState({
        product: props.route.params.product,
        colorArr: [],
        colorListKey: 0,
        sizeArr: [],
        sizeListKey: 0,
        showMore: false,
        commentListKey: 0,
        sizeSelected: false
    })

    const _checkIsFavorite = () => {
        const isFavoriteProduct = favoritesProduct.find(product => product.id === props.route.params.product.id)
        if (isFavoriteProduct) {
            setIsFavorite(true)
        }
    }
    useEffect(() => {
        _checkIsFavorite()
    }, [])

    const updateUser = () => {
        if (currentUSer.length) {
            setUser(currentUSer)
            setShowTabBar(true)
        }
    }

    useEffect(() => {
        updateUser()
    }, [currentUSer])

    const ratingView = {
        row: {
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
        },
        icon: {
            color: isFavorite ? '#0ba65a' : '#383838',
            fontSize: hp("3%")
        },
        text: {
            marginTop: 3,
            fontSize: hp("1.8%"),
            fontWeight: "500",
            fontStyle: "normal",
            letterSpacing: 0,
            textAlign: "center",
            color: mowColors.titleTextColor
        }
    };

    const addToFavorite = () => {
        if (!isFavorite) {
            dispatch(addProductToFavorite(value.product))
            setIsFavorite(true)
        } else {
            dispatch(deleteProductToFavorite(value.product))
            setIsFavorite(false)
        }
    }


    const _handleSizeSelection = (index, item) => {
        setError('')
        let sizeArr = value.sizeArr;
        let length = value.product.size.length;
        setSize(item)

        for (let i = 0; i < length; i++) {
            if (i !== index) {
                // to set false all array values except selected index
                sizeArr[i] = false;
            }
        }

        // to update selected item as its opposite
        sizeArr[index] = !sizeArr[index];

        setValue({ ...value, sizeArr: sizeArr, sizeListKey: value.sizeListKey + 1 })
    }

    const _handleColorSelection = (index) => {
        let colorArr = value.colorArr;

        let length = Colors.length;

        for (let i = 0; i < length; i++) {
            if (i != index) {
                // to set false all array values except selected index
                colorArr[i] = false;
            }
        }

        // to update selected item as its opposite
        colorArr[index] = !colorArr[index];

        setValue({ ...value, colorArr: colorArr, colorListKey: value.colorListKey + 1 })
    }

    const _addProduct = (product) => {
        if (user.length) {
            if (value.product.size && size === 0) {
                setError('choisire une taille')
                return
            }
            else {
                product.size = size
            }

            dispatch(addProduct({ product: { ...product, quantity: 1 } }))
            props.navigation.navigate('Cart')


        } else {
            props.navigation.navigate('HomeLogin', { product: product })
        }

    }

    const _byNow = (product) => {
        if (user.length) {
            if (value.product.size && size === 0) {
                setError('choisire une taille')
                return
            }
            else {
                product.size = size
            }

            dispatch(addProduct({ product: { ...product, quantity: 1 } }))
            props.navigation.navigate('Cart')


        } else {
            props.navigation.navigate('HomeLogin', { product: product })
        }
    }

    const _commentRow = (item) => {

        return (

            <View
                style={{
                    marginVertical: 5,
                    borderRadius: 5,
                    borderStyle: "solid",
                    borderWidth: 1,
                    borderColor: "rgba(146, 146, 146, 0.41)",
                    padding: 5
                }}>

                <View
                    style={{ flexDirection: "row" }}>

                    {/* image view */}
                    <Image
                        style={{
                            width: hp("5%"),
                            height: hp("5%"),
                        }}
                        resizeMode={"contain"}
                        source={item["image"]} />

                    <View
                        style={{ marginLeft: 10 }}>

                        {/* name text */}
                        <Text
                            style={{
                                fontSize: hp("1.8%"),
                                fontWeight: "normal",
                                fontStyle: "normal",
                                letterSpacing: 0,
                                textAlign: "left",
                                color: mowColors.titleTextColor
                            }}>

                            {item["name"]}

                        </Text>

                        {/* date text */}
                        <Text
                            style={{
                                fontSize: hp("1.4%"),
                                fontWeight: "normal",
                                fontStyle: "normal",
                                letterSpacing: 0,
                                textAlign: "left",
                                color: mowColors.textColor
                            }}>

                            {item["updated_at"]}

                        </Text>

                    </View>

                    <View
                        style={{ marginLeft: 10, justifyContent: "center" }}>

                        {/* star view */}
                        <MowStarView
                            score={item["score"]} />

                    </View>

                </View>

                {/* description text */}
                <Text
                    style={{
                        marginTop: 5,
                        fontSize: hp("1.5%"),
                        fontWeight: "300",
                        fontStyle: "normal",
                        letterSpacing: 0,
                        textAlign: "left",
                        color: mowColors.textColor
                    }}>

                    {item["description"]}

                </Text>

            </View>

        )

    }

    const product = value.product;

    return (


        <MowContainer
            style={{ backgroundColor: mowColors.pageBGDarkColor }}
            title={mowStrings.productDetail.title}
            navigation={props.navigation}
            footer={showTabBar}
        >

            <ScrollView>

                {/* product info view */}
                <View
                    style={[categoryStyleWithoutShadow, { backgroundColor: mowColors.categoryBGColor }]}>

                    {/* product name text */}
                    <Text
                        style={{
                            marginVertical: 10,
                            width: "100%",
                            textAlign: "center",
                            fontSize: hp("2.2%"),
                            fontWeight: "600",
                            fontStyle: "normal",
                            letterSpacing: 0,
                            color: mowColors.titleTextColor

                        }}>

                        {product.name}

                    </Text>

                    {/* shipping info text */}
                    <Text
                        style={{
                            marginBottom: 10,
                            width: "100%",
                            textAlign: "center",
                            fontSize: hp("1.6%"),
                            fontWeight: "600",
                            fontStyle: "normal",
                            letterSpacing: 0,
                            color: "#48b500"
                        }}>

                        {/* {mowStrings.productDetail.freeShippingInfo} */}

                    </Text>

                    {/* image swiper view */}
                    <View
                        style={{ height: hp("42%") }}>

                        {/* product image swiper */}
                        <Swiper
                            ref={swiperRef}
                            pagingEnabled={true}
                            showsPagination={true}
                            horizontal={true}
                            loop={false}
                            dotColor={"grey"}
                            activeDotColor={mowColors.mainColor}
                            paginationStyle={{ bottom: hp("1%") }}
                            autoplay={false}>

                            {
                                product.images.map((item, key) => {

                                    return (

                                        <Image
                                            key={key}
                                            style={{
                                                height: hp("38%"),
                                                width: "100%",
                                            }}
                                            resizeMode={"contain"}
                                            source={{ uri: "https://leratel.com/storage/" + item }} />

                                    )

                                })
                            }

                        </Swiper>

                    </View>

                </View>

                {/* content view */}
                <View>

                    {/* body size view */}
                    {
                        product.size && <View
                            style={[categoryStyleWithoutShadow, { marginTop: 15, backgroundColor: mowColors.categoryBGColor }]}>

                            {/* body size text */}
                            <Text style={{ color: 'red', textAlign: 'center' }} >{error}</Text>
                            <Text
                                style={{
                                    marginBottom: 10,
                                    fontSize: hp("1.8%"),
                                    fontWeight: "600",
                                    fontStyle: "normal",
                                    letterSpacing: 0,
                                    textAlign: "left",
                                    color: mowColors.titleTextColor
                                }}>

                                {mowStrings.productDetail.bodySize}

                            </Text>

                            {/* body size list view */}
                            <FlatList
                                key={value.sizeListKey}
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}
                                keyExtractor={(item, index) => index.toString()}
                                data={value.product.size}
                                renderItem={({ item, index }) => (

                                    <TouchableOpacity
                                        onPress={() => { _handleSizeSelection(index, item) }}
                                        style={{
                                            width: hp("4%"),
                                            height: hp("4%"),
                                            borderRadius: 3,
                                            marginLeft: index != 0 ? 10 : 0,
                                            justifyContent: "center",
                                            alignItems: "center",
                                            backgroundColor: value.sizeArr[index] ? mowColors.mainColor : "#ffffff",
                                            ...value.product.size,
                                            marginRight: 1
                                        }}
                                        key={index}>

                                        <Text
                                            style={{
                                                color: value.sizeArr[index] ? "white" : mowColors.mainColor,
                                                fontSize: hp("1.5%"),
                                                fontWeight: "600",
                                                fontStyle: "normal",
                                                letterSpacing: 0,
                                                textAlign: "center",
                                            }}>

                                            {item}

                                        </Text>

                                    </TouchableOpacity>

                                )}
                            />

                        </View>
                    }


                    {/* color view */}
                    {product.color && <View
                        style={[categoryStyleWithoutShadow, { marginTop: 15, backgroundColor: mowColors.categoryBGColor }]}>

                        {/* color text */}
                        <Text
                            style={{
                                marginBottom: 10,
                                fontSize: hp("1.8%"),
                                fontWeight: "600",
                                fontStyle: "normal",
                                letterSpacing: 0,
                                textAlign: "left",
                                color: mowColors.titleTextColor
                            }}>

                            {mowStrings.productDetail.color}

                        </Text>

                        {/* color list */}
                        <FlatList
                            key={value.colorListKey}
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            keyExtractor={(item, index) => index.toString()}
                            data={product.color}
                            renderItem={({ item, index }) => (

                                <TouchableOpacity
                                    onPress={() => { _handleColorSelection(index) }}
                                    style={{
                                        width: hp("4%"),
                                        height: hp("4%"),
                                        borderRadius: 3,
                                        backgroundColor: item["color"],
                                        marginLeft: index != 0 ? 10 : 0,
                                        justifyContent: "center",
                                        alignItems: "center",
                                        marginRight: 1
                                    }}
                                    key={index}>

                                    {
                                        value.colorArr[index] &&

                                        <FAIcon
                                            style={{ color: "white", fontSize: hp("2.5%") }}
                                            name={"check"} />
                                    }

                                </TouchableOpacity>

                            )}
                        />

                    </View>}

                    {/* description view */}
                    {product.description && <View style={[categoryStyleWithoutShadow, { marginTop: 15, backgroundColor: 'black' }]}>
                        <Text style={{ textAlign: 'center', color: 'red', fontSize: 20, textDecorationLine: 'underline' }} >Description</Text>

                        <RenderHtml
                            contentWidth={width}
                            source={{ html: product.description }}
                        />
                    </View>}

                    {/* discount rate & price & add to cart button */}
                    <View
                        style={[categoryStyleWithoutShadow, { flexDirection: "row", alignItems: "center", marginTop: 15, backgroundColor: mowColors.categoryBGColor }]}>

                        {
                            product["discountRate"]

                                ?

                                //price & discount view
                                <View
                                    style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>

                                    {/* discount rate view */}
                                    <View
                                        style={{
                                            backgroundColor: mowColors.mainColor,
                                            borderRadius: 5,
                                            justifyContent: "center",
                                            alignItems: "center",
                                            width: hp("5%"),
                                            height: hp("5%")
                                        }}>

                                        <Text
                                            style={{
                                                fontSize: hp("2%"),
                                                fontWeight: "bold",
                                                fontStyle: "normal",
                                                letterSpacing: 0,
                                                textAlign: "left",
                                                color: "#ffffff"
                                            }}>

                                            {product["discountRate"]}

                                        </Text>

                                    </View>

                                    {/* price view */}
                                    <View
                                        style={{ marginLeft: 10 }}>

                                        {/* first price text view  */}
                                        <View
                                            style={{ alignItems: "center", justifyContent: "center" }}>

                                            {/* first price text */}
                                            <Text
                                                style={{
                                                    fontSize: hp("1.8%"),
                                                    fontWeight: "300",
                                                    fontStyle: "normal",
                                                    letterSpacing: 0,
                                                    textAlign: "center",
                                                    color: "#c2c2c2"
                                                }}>

                                                {product.sale_price ? product.sale_price : product.price}FCFA

                                            </Text>

                                            <View
                                                style={{
                                                    backgroundColor: mowColors.mainColor,
                                                    width: "100%",
                                                    height: hp("0.1%"),
                                                    position: "absolute",
                                                }} />

                                        </View>

                                        {/* last price text */}
                                        <Text
                                            style={{
                                                marginTop: 1,
                                                fontSize: hp("2%"),
                                                fontWeight: "bold",
                                                fontStyle: "normal",
                                                letterSpacing: 0,
                                                textAlign: "center",
                                                color: mowColors.mainColor
                                            }}>

                                            {product.sale_price}

                                        </Text>

                                    </View>

                                </View>

                                :

                                //price text
                                <Text
                                    style={{
                                        flex: 1,
                                        fontSize: hp("2.5%"),
                                        fontWeight: "bold",
                                        fontStyle: "normal",
                                        letterSpacing: 0,
                                        textAlign: "left",
                                        color: "#575757"
                                    }}>

                                    {product.sale_price ? product.sale_price : product.price}

                                </Text>
                        }


                        {/* button view */}
                        <View>
                            <View
                                style={{ flex: 1 }}>

                                <MowButtonBasic
                                    containerStyle={{ margin: 0, height: hp(5), backgroundColor: '#0ba65a', borderColor: '#0ba65a' }}
                                    onPress={() => _addProduct(product)}
                                    leftIconStyle={{ fontSize: hp("2.5%") }}
                                    textStyle={{ fontSize: hp("1.5%") }}
                                    stickyIcon={true}
                                    leftIcon={"shopping-cart"}
                                    size={"small"}
                                    type={"success"}>

                                    {/* {mowStrings.button.addToCart} */}
                                    Ajouter Au Panier
                                </MowButtonBasic>

                            </View>
                            <View
                                style={{ flex: 1, marginTop: 10 }}>

                                <MowButtonBasic
                                    containerStyle={{ margin: 0, height: hp(5) }}
                                    onPress={() => _addProduct(product)}
                                    leftIconStyle={{ fontSize: hp("2.5%") }}
                                    textStyle={{ fontSize: hp("1.5%") }}
                                    stickyIcon={true}
                                    leftIcon={"dollar-sign"}
                                    size={"small"}
                                    type={"success"}>

                                    {/* {mowStrings.button.addToCart} */}
                                    Acheter Maintenant
                                </MowButtonBasic>

                            </View>
                        </View>
                    </View>

                    {/* product feature view */}
                    {/* <View
                        style={[categoryStyleWithoutShadow, { marginTop: 15, backgroundColor: mowColors.categoryBGColor }]}>

                        <Text
                            style={{
                                fontSize: hp("1.8%"),
                                fontWeight: "600",
                                fontStyle: "normal",
                                letterSpacing: 0,
                                textAlign: "left",
                                color: mowColors.titleTextColor
                            }}>

                            {mowStrings.productDetail.productFeature}

                        </Text>

                        product feature text
                        <Text
                            style={{
                                marginTop: 2,
                                fontSize: hp("1.6%"),
                                fontWeight: "300",
                                fontStyle: "normal",
                                letterSpacing: 0,
                                textAlign: "left",
                                color: mowColors.textColor
                            }}>

                            {product["productFeature"]}

                        </Text>

                    </View> */}

                    {/* like report share view */}
                    {
                        user.length &&
                        <View
                            style={[categoryStyleWithoutShadow, { marginTop: 15, flexDirection: "row", backgroundColor: mowColors.categoryBGColor }]}>

                            {/* like button */}
                            <TouchableOpacity
                                onPress={addToFavorite}
                                style={ratingView.row}>

                                {/* like icon */}
                                <FAIcon
                                    name={"heart"}
                                    style={ratingView.icon} />

                                {/* like text */}
                                <Text
                                    style={ratingView.text}>

                                    {/* {mowStrings.productDetail.like} */}
                                    Ajouter aux Favorites

                                </Text>

                            </TouchableOpacity>

                            {/* report button */}
                            {/* <TouchableOpacity
                            style={ratingView.row}>

                            report icon
                            <FAIcon
                                name={"info-circle"}
                                style={ratingView.icon} />

                            report text
                            <Text
                                style={ratingView.text}>

                                {mowStrings.productDetail.report}

                            </Text>

                        </TouchableOpacity> */}

                            {/* share button */}
                            {/* <TouchableOpacity
                            style={ratingView.row}>

                            share icon
                            <FAIcon
                                name={"share"}
                                style={ratingView.icon} />

                            share text
                            <Text
                                style={ratingView.text}>

                                {mowStrings.productDetail.share}

                            </Text>

                        </TouchableOpacity> */}

                        </View>
                    }


                    {/* comment list view */}
                    {/* <View
                        style={[categoryStyleWithoutShadow, { marginTop: 15, backgroundColor: mowColors.categoryBGColor }]}>

                        title text 
                        <Text
                            style={{
                                fontSize: hp("1.8%"),
                                fontWeight: "600",
                                fontStyle: "normal",
                                letterSpacing: 0,
                                textAlign: "left",
                                color: mowColors.titleTextColor
                            }}>

                            {mowStrings.productDetail.customerComments} (1681)

                        </Text>

                        comment list
                        {
                            CustomerComments.map((item, index) => {
                                <View>

                                    {
                                        index === 0 &&

                                        <View
                                            key={index}>

                                            {_commentRow(item, index)}

                                        </View>
                                    }

                                    {
                                        (index !== 0 && value.showMore) &&

                                        <View
                                            key={index}>

                                            {_commentRow(item, index)}

                                        </View>
                                    }

                                </View>
                            })
                        }


                        show more button
                        <TouchableOpacity
                            onPress={() => setValue({ ...value, showMore: true, commentListKey: value.commentListKey + 1 })}
                            style={{ alignSelf: "center", marginTop: 5, alignItems: "center", justifyContent: "center" }}>

                            <Text
                                style={{
                                    fontSize: hp("1.7%"),
                                    color: mowColors.mainColor,
                                    fontWeight: "500",
                                    fontStyle: "normal",
                                    letterSpacing: 0,
                                }}>

                                {mowStrings.productDetail.showMore}

                            </Text>

                            <FAIcon
                                name={"chevron-down"}
                                style={{
                                    color: mowColors.mainColor,
                                    fontSize: hp("2%")
                                }} />

                        </TouchableOpacity>

                    </View> */}

                </View>

            </ScrollView>

        </MowContainer>

    )


}
export default ProductDetail