import React, { useEffect, useState } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import FAIcon from "react-native-vector-icons/FontAwesome";
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { useSelector, useDispatch } from "react-redux";

import { mowStrings } from "../../../values/Strings/MowStrings";
import MowContainer from "../../../components/ui/Core/Container/MowContainer";
import { platform } from "../../../values/Constants/MowConstants";
import { mowColors } from "../../../values/Colors/MowColors";
import { MowStarView } from "../../../components/ui/Common/StarView/MowStarView";
import FavoriteData from "../../../sampleData/FavoriteData";
import { fontFamily, paginationStyle } from "../../../values/Styles/MowStyles";
import { MowButtonBasic } from "../../../components/ui/Common/Button/MowButton";
import { _warningDialog } from "../../../components/ui/Common/Dialog/MowDialogFunctions";
import { deleteProductToFavorite } from "../../../redurcer/favoritesSlice";
import { addProduct } from "../../../redurcer/cartSlice";
import { _showToast } from "../../../components/ui/Common/Toast/MowToast";

const Favorites = (props) => {

    const favoriteProducts = useSelector(state => state.favorites.value)
    const dispatch = useDispatch()

    const [values, setValues] = useState({
        favoriteData: favoriteProducts,
        favoriteDataListKey: 0,
        activeIndex: 0,
        activeSlide: []
    })



    const componentDidMount = () => {
        // to set all active index as 0
        let arr = [];
        let length = FavoriteData.length;
        for (let i = 0; i < length; i++) {
            arr[i] = 0;
        }
        setValues({ ...values, activeSlide: arr });
    }
    useEffect(() => {
        componentDidMount();
    }, [])

    const _deleteItemFromFavoriteList = (index) => {
        // warning dialog to confirm user selection
        _warningDialog("Leratel", 'Etes-vous sur de vouloir supprimer ce produit de vos favories?', 'OUI', 'NON', true)
            .then(() => {
                let favoriteData = values.favoriteData;

                // favoriteData.splice(index, 1);
                dispatch(deleteProductToFavorite(favoriteProducts[index]))


                setValues({ ...values, favoriteData: favoriteData, favoriteDataListKey: values.favoriteDataListKey + 1 });
            });
    }

    const _renderImages = ({ item, index }) => {
        return (
            <TouchableOpacity
                onPress={() => {
                    props.navigation.navigate("ProductDetail", { product: favoriteProducts[index] })
                }}
                key={index}>

                <Image
                    style={{ height: "100%", width: "100%", borderRadius: 10 }}
                    resizeMode={"stretch"}
                    source={{ uri: "https://leratel.com/storage/" + item[0] }} />

            </TouchableOpacity>
        );
    }

    const _addToCart = (product) => {
            if (product.name) {
                if (_showToast.success(mowStrings.productAdded)) {
                    dispatch(addProduct({ product: { ...product, quantity: 1 } }))
                    _showToast.success(mowStrings.productAdded)
                } else {
                    dispatch(addProduct({ product: { ...product, quantity: 1 } }))
                    props.navigation.navigate('Cart')
                }

            }
            else {
                if (_showToast.success(mowStrings.productAdded)) {
                    dispatch(addProduct({ product: { ...product, quantity: 1 } }))
                    _showToast.success(mowStrings.productAdded)
                } else {
                    dispatch(addProduct({ product: { ...product, quantity: 1 } }))
                    props.navigation.navigate('Cart')
                }
            }



        

    }
    // to handle active slide for all items
    const _handleActiveSlide = (activeSlide, index) => {
        let activeSlideArr = values.activeSlide;
        activeSlideArr[index] = activeSlide;
        setValues({
            ...values,
            activeSlide: activeSlideArr,
        });
    }


    return (

        <MowContainer
            title={mowStrings.favoritesPage.title}
            navigation={props.navigation}
        >

            {/* product list */}
            {
                values.favoriteData !== 0 ?
                    <FlatList
                        key={values.favoriteDataListKey}
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item, index) => index.toString()}
                        numColumns={2}
                        style={{ paddingHorizontal: wp("3%") }}
                        data={favoriteProducts}
                        renderItem={({ item, index }) => (


                            //product item
                            <View
                                key={index}
                                style={{
                                    margin: 5,
                                    width: wp("45%"),
                                }}>

                                {/* image view */}
                                <View
                                    style={{
                                        height: platform === "android" ? hp("25") : hp("21"),
                                        width: "100%",
                                        borderRadius: 10,
                                        justifyContent: "center"
                                    }}>

                                    {/* hearth icon touchable */}
                                    <TouchableOpacity
                                        onPress={() => { _deleteItemFromFavoriteList(index) }}
                                        style={{ position: "absolute", top: 10, right: 10, zIndex: 99 }}>

                                        <FAIcon
                                            style={{
                                                fontSize: hp("2%"),
                                                color: mowColors.mainColor
                                            }}
                                            name={"heart"} />

                                    </TouchableOpacity>

                                    {/* favorite item image slider */}
                                    <Carousel
                                        removeClippedSubviews={false}
                                        ref={(c) => { this._carousel = c }}
                                        data={item["images"]}
                                        onSnapToItem={(activeSlide) => _handleActiveSlide(activeSlide, index)}
                                        sliderWidth={wp("45%")}
                                        itemWidth={wp("45%")}
                                        renderItem={() => _renderImages({ item: item.images, index })} />

                                    {/* image pagination */}
                                    {/* {pagination(item["images"], index)} */}

                                    {
                                        item["new"] &&

                                        <View
                                            style={{
                                                position: "absolute",
                                                backgroundColor: mowColors.mainColor,
                                                top: 10,
                                                left: 10,
                                                borderRadius: 200,
                                                width: hp("5%"),
                                                height: hp("5%"),
                                                justifyContent: "center"
                                            }}>

                                            <Text
                                                style={{
                                                    fontWeight: "bold",
                                                    textAlign: "center",
                                                    color: "#ffffff"
                                                }}>

                                                {mowStrings.homeScreen.new}

                                            </Text>

                                        </View>
                                    }

                                    {/* {
                                        !item.quantity &&

                                        // out of stock view
                                        <View
                                            style={{
                                                position: "absolute",
                                                opacity: 0.8,
                                                backgroundColor: "#848484",
                                                width: "100%"
                                            }}>

                                            <Text
                                                style={{
                                                    fontSize: hp("1.8%"),
                                                    fontWeight: "normal",
                                                    fontStyle: "normal",
                                                    letterSpacing: 0,
                                                    textAlign: "center",
                                                    color: "#ffffff"
                                                }}>

                                                {mowStrings.homeScreen.outOfStock}

                                            </Text>

                                        </View>

                                    } */}

                                </View>

                                <View
                                    style={{ height: hp(11.5) }}>

                                    {/* title text */}
                                    <Text
                                        numberOfLines={1}
                                        style={{
                                            marginTop: 5,
                                            fontSize: hp("1.8%"),
                                            fontWeight: "normal",
                                            fontStyle: "normal",
                                            letterSpacing: 0,
                                            textAlign: "left",
                                            color: mowColors.titleTextColor,
                                            fontFamily: fontFamily.regular
                                        }}>

                                        {item["name"]}

                                    </Text>

                                    {/* star view */}
                                    {/* <View
                                    style={{ flexDirection: "row", alignItems: "center", marginTop: 1 }}>

                                    stars
                                    <MowStarView
                                        score={item["star"]} />

                                    vote count text
                                    <Text
                                        style={{
                                            marginLeft: 3,
                                            fontSize: hp("1.5%"),
                                            letterSpacing: 0,
                                            textAlign: "left",
                                            color: mowColors.textColor,
                                            fontFamily: fontFamily.regular,
                                        }}>

                                        {"("}{item["voteCount"]}{")"}

                                    </Text>

                                </View> */}

                                    {/* price & discount view */}
                                    {
                                        item["discountRate"]

                                            ?

                                            <View
                                                style={{ flexDirection: "row", marginTop: 3, alignItems: "center" }}>

                                                discount rate view
                                                {/* <View
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

                                                    {item["discountRate"]}

                                                </Text>

                                            </View> */}

                                                {/* price view */}
                                                <View
                                                    style={{ marginLeft: 10, marginTop: 3 }}>

                                                    {/* first price text view  */}
                                                    {/* <View
                                                    style={{ alignItems: "center", justifyContent: "center" }}>

                                                    first price text
                                                    <Text
                                                        style={{
                                                            fontSize: hp("1.8%"),
                                                            fontWeight: "300",
                                                            fontStyle: "normal",
                                                            letterSpacing: 0,
                                                            textAlign: "center",
                                                            color: mowColors.textColor,
                                                            fontFamily: fontFamily.light
                                                        }}>

                                                        {item["currency"]}{item["firstPrice"]}

                                                    </Text>

                                                    <View
                                                        style={{
                                                            backgroundColor: mowColors.mainColor,
                                                            width: "100%",
                                                            height: hp("0.1%"),
                                                            position: "absolute",
                                                        }} />

                                                </View> */}

                                                    {/* last price text */}
                                                    <Text
                                                        style={{
                                                            fontSize: hp("2%"),
                                                            fontWeight: "bold",
                                                            fontStyle: "normal",
                                                            letterSpacing: 0,
                                                            textAlign: "center",
                                                            color: mowColors.mainColor,
                                                            fontFamily: fontFamily.bold
                                                        }}>

                                                        {item.price} FCFA

                                                    </Text>

                                                </View>

                                            </View>

                                            :

                                            <Text
                                                style={{
                                                    fontSize: hp("2%"),
                                                    fontWeight: "bold",
                                                    fontStyle: "normal",
                                                    letterSpacing: 0,
                                                    textAlign: "left",
                                                    color: mowColors.titleTextColor,
                                                    marginTop: 5,
                                                    fontFamily: fontFamily.bold
                                                }}>

                                                {item.price}

                                            </Text>
                                    }

                                </View>

                                {/* add to cart button */}
                                <MowButtonBasic
                                    onPress={() => { _addToCart(item) }}
                                    textStyle={{ color: '#0ba65a' }}
                                    containerStyle={{ marginBottom: 5, borderColor: '#0ba65a' }}
                                    type={"success"}
                                    size={"small"}
                                    filled={false}>

                                    {/* {mowStrings.button.addToCart} */}
                                    Ajouter AU Panier

                                </MowButtonBasic>

                            </View>

                        )}
                    /> :
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ color: 'red', textAlign: 'center' }}>Vous N'avez de produits Favories</Text>
                    </View>
            }


        </MowContainer>

    )


}

export default Favorites