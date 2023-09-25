import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, Text, FlatList, Image } from "react-native";
import FAIcon from "react-native-vector-icons/FontAwesome";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { useSelector, useDispatch } from "react-redux";

import { borderStyle, fontFamily, pageContainerStyle } from "../../../values/Styles/MowStyles";
import { mowColors } from "../../../values/Colors/MowColors";
import { _MF } from "../../../components/utils/MowFunctions/MowFunctions"
import MowContainer from "../../../components/ui/Core/Container/MowContainer";
import { navbarHeight, platform } from "../../../values/Constants/MowConstants";
import { MowInput } from "../../../components/ui/Common/Input/MowInput";
import { mowStrings } from "../../../values/Strings/MowStrings";
import PopularSearch from "../../../sampleData/PopularSearch";
import { MowButtonBasic } from "../../../components/ui/Common/Button/MowButton";
import { _showToast } from "../../../components/ui/Common/Toast/MowToast";
import { addProduct } from "../../../redurcer/cartSlice";


const HomeFilter = (props) => {
    const dispatch = useDispatch()
    const products = useSelector((state) => state.productList.value[0])
    const currentUSer = useSelector(state => state.currentUSer.value)
    const [productSearch, setProductSearch] = useState([])
    const [searcValue, setSearchValue] = useState({
        searchText: '',
        searchData: [],
        searchListKey: 0,
        activeSlide: []
    })
    const [user, setUser] = useState({})

    const updateUser = () => {
        if (currentUSer.length) {
            setUser(currentUSer)
        }
    }

    useEffect(() => {
        updateUser()
    }, [currentUSer])


    const getSearch = async () => {
        let searchArr = JSON.parse(await AsyncStorage.getItem("searchData"));

        if (searchArr != null && searchArr.length > 0) {
            setSearchValue({ searchData: searchArr });
        }
    }

    useEffect(() => {
        getSearch()
    }, [])

    // to store user input
    const onChangeText = (key, value) => {
        if (value.length > 0) {
            const resultSearch = products.filter(product => product.name.includes(value))
            setProductSearch(resultSearch)
            // setSearchValue({
            //     ...searcValue,
            //     [key]: value,
            // })
        }

    };

    const _clearSearchHistory = async () => {
        let searchArr = [];
        await AsyncStorage.removeItem('searchData');

        setSearchValue({ ...searcValue, searchData: searchArr, searchListKey: searcValue.searchListKey + 1 });
    }

    const _handleSearch = (value) => {
        if (value) {
            // handle searched word here

            // to save searched word
            _saveSearch(value);
        }
    }

    const _goToCategoryList = (searchData) => {
        props.navigation.navigate("ProductList")
    }

    // to save searched word
    const _saveSearch = async (value) => {
        let searchArr = await AsyncStorage.getItem("searchData");

        if (searchArr == null || searchArr.length === 0) {
            searchArr = [];
        }

        // to control search text searched before or not
        let isExist = _MF.mowInArray(searchArr, "searchText", value);

        if (!isExist) {
            // not searched, then push
            let obj = { searchText: value };
            searchArr.push(obj);
        }

        // to store search array
        AsyncStorage.setItem("searchData", searchArr);

        setSearchValue({ ...searcValue, searchData: searchArr, searchListKey: searcValue.searchListKey + 1 });
    }
    const _addToCart = (product) => {
        if (user.length) {
            if (_showToast.success(mowStrings.productAdded)) {
                dispatch(addProduct({ product: { ...product, quantity: 1 } }))
                _showToast.success(mowStrings.productAdded)
            } else {
                dispatch(addProduct({ product: { ...product, quantity: 1 } }))
                props.navigation.navigate('Cart')
            }


        } else {
            props.navigation.navigate('HomeLogin', { product: product })
        }

    }

    const _handleActiveSlide = (activeSlide, index) => {
        let activeSlideArr = searcValue.activeSlide;
        activeSlideArr[index] = activeSlide;
        setSearchValue({
            ...searcValue,
            activeSlide: activeSlideArr,
        });
    };

    const _renderImages = ({ item, index }) => {
        // console.log(item);
        return (
            <TouchableOpacity
                onPress={() => {
                    props.navigation.navigate("ProductDetail", { product: productSearch[index] })
                }}
                key={index}>

                <Image
                    style={{ height: "100%", width: "100%", borderRadius: 10 }}
                    resizeMode={"stretch"}
                    source={{ uri: "https://leratel.com/storage/" + item?.image }} />

            </TouchableOpacity>
        );
    }

    return (

        <MowContainer
            footer={false}
            navbar={false}
            navigation={props.navigation}
        >

            <View
                style={{ height: navbarHeight, flexDirection: "row", backgroundColor: mowColors.mainColor, alignItems: "center" }}>

                <TouchableOpacity
                    onPress={() => props.navigation.goBack(null)}
                    style={{
                        flex: 1,
                        justifyContent: "center",
                        flexDirection: "row",
                        alignItems: "center",
                        paddingVertical: 5,
                    }}>

                    <FAIcon
                        style={{ fontSize: hp("4%") }}
                        color={"white"}
                        name={'angle-left'} />

                </TouchableOpacity>

                <MowInput
                    onSubmitEditing={(event) => _handleSearch(event.nativeEvent.text)}
                    returnKeyType='search'
                    leftIcon={"search"}
                    containerStyle={{ flex: 6, borderWidth: 0, height: hp(4.5), marginHorizontal: 10, borderRadius: 100 }}
                    textInputStyle={{ ...titleStyle.title, width: "80%", padding: 0, margin: 0, color: "#aeaeae" }}
                    placeholder={"Rechercher un Produit"}
                    onChangeText={value => onChangeText("searchText", value)} />

            </View>

            <View
                style={pageContainerStyle}>

                {/* popular search view */}
                {/* <View>

                    popular search text
                    <Text
                        style={titleStyle.title}>

                        {mowStrings.filter.popularSearch}

                    </Text>

                    popular item view
                    <View
                        style={{ marginVertical: 5 }}>

                        popular item list
                        <FlatList
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            keyExtractor={(item, index) => index.toString()}
                            data={PopularSearch}
                            renderItem={({ item, index }) => (

                                <TouchableOpacity
                                    key={index}
                                    onPress={() => { _goToCategoryList(item) }}
                                    style={{
                                        marginRight: 10,
                                        flexDirection: "row",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        backgroundColor: mowColors.viewBGColor,
                                        paddingHorizontal: 10,
                                        borderRadius: 20,
                                        paddingVertical: 10,
                                        ...borderStyle
                                    }}>

                                    <FAIcon
                                        name={"search"}
                                        style={{ fontSize: hp("2"), color: mowColors.mainColor, marginRight: 5 }} />

                                    <Text
                                        style={{
                                            fontSize: hp("1.4"),
                                            fontFamily: fontFamily.regular,
                                            letterSpacing: 0.5,
                                            fontWeight: "normal",
                                            fontStyle: "normal",
                                            lineHeight: 18,
                                            textAlign: "left",
                                            color: mowColors.titleTextColor

                                        }}>

                                        {item["title"]}

                                    </Text>

                                </TouchableOpacity>

                            )} />

                    </View>

                </View> */}

                {/* search history view */}
                {
                    // (searcValue.searchData.length > 0) &&

                    // <View>

                    //     search history view
                    //     <View>

                    //         title view
                    //         <View
                    //             style={{ flexDirection: "row", justifyContent: "space-between", marginTop: hp("2%"), marginBottom: hp(1), margin: 5 }}>

                    //             search history text
                    //             <Text
                    //                 style={titleStyle.title}>

                    //                 {mowStrings.filter.searchHistory}

                    //             </Text>

                    //             clear search history button
                    //             <TouchableOpacity
                    //                 onPress={() => _clearSearchHistory()}>

                    //                 <Text
                    //                     style={{ ...titleStyle.title, fontWeight: "500" }}>

                    //                     {mowStrings.filter.clear}

                    //                 </Text>

                    //             </TouchableOpacity>

                    //         </View>

                    //     </View>

                    //     <View>

                    //         <FlatList
                    //             key={searcValue.searchListKey}
                    //             showsHorizontalScrollIndicator={false}
                    //             keyExtractor={(item, index) => index.toString()}
                    //             data={searcValue.searchData}
                    //             renderItem={({ item, index }) => (

                    //                 <TouchableOpacity
                    //                     key={index}
                    //                     onPress={() => { _goToCategoryList(item) }}
                    //                     style={{
                    //                         flexDirection: "row",
                    //                         alignItems: "center",
                    //                         backgroundColor: mowColors.viewBGColor,
                    //                         paddingHorizontal: 10,
                    //                         borderRadius: 5,
                    //                         borderBottomWidth: 0.3,
                    //                         borderBottomColor: "grey",
                    //                         paddingVertical: 10,
                    //                         ...borderStyle,
                    //                         marginVertical: 1
                    //                     }}>

                    //                     <Text
                    //                         style={{
                    //                             fontSize: hp("1.5"),
                    //                             fontFamily: fontFamily.regular,
                    //                             fontWeight: "500",
                    //                             fontStyle: "normal",
                    //                             lineHeight: 23,
                    //                             letterSpacing: 0,
                    //                             textAlign: "left",
                    //                             color: mowColors.textColor,
                    //                             paddingLeft: 5
                    //                         }}>

                    //                         {item["name"]}

                    //                     </Text>

                    //                 </TouchableOpacity>

                    //             )} />

                    //     </View>

                    // </View>
                }

                {/* result search */}
                {
                    productSearch.length > 0 ?
                        <View style={{ flex: 1 }}>

                            <FlatList
                                showsHorizontalScrollIndicator={false}
                                keyExtractor={(item, index) => index.toString()}
                                numColumns={2}
                                style={{ paddingHorizontal: wp("3%") }}
                                data={productSearch}
                                renderItem={({ item, index }) => (

                                    //product item
                                    <View
                                        key={index}
                                        style={{ margin: 5, flex: 1 }}>

                                        {/* image view */}
                                        <View
                                            style={{
                                                height: platform === "android" ? hp("25") : hp("21"),
                                                width: "100%",
                                                borderRadius: 10,
                                                justifyContent: "center",
                                                alignItems: "center"
                                            }}>

                                            {/* hearth icon touchable */}
                                            <TouchableOpacity
                                                style={{ position: "absolute", top: 10, right: 10, zIndex: 99 }}>

                                                <FAIcon
                                                    style={{
                                                        color: "grey",
                                                        fontSize: hp("2%")
                                                    }}
                                                    name={"heart"} />

                                            </TouchableOpacity>

                                            {/* didn't use swiper, because multiple swiper causes android ui problem */}
                                            {/* product image slider */}
                                            <Carousel
                                                removeClippedSubviews={false}
                                                ref={(c) => { this._carousel = c }}
                                                data={item["images"]}
                                                onSnapToItem={(activeSlide) => _handleActiveSlide(activeSlide, index)}
                                                sliderWidth={wp("45%")}
                                                itemWidth={wp("45%")}
                                                renderItem={() => _renderImages({ item, index })} />

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

                                            {
                                                !item["quantity"] &&

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

                                                        {/* {mowStrings.homeScreen.outOfStock} */}
                                                        Rupture de stock
                                                    </Text>

                                                </View>

                                            }

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

                                                {item.name}

                                            </Text>



                                            {/* price & discount view */}
                                            {

                                                <View>
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

                                                        {item.sale_price ? item.sale_price : item.original_price}FCFA

                                                    </Text>
                                                    {
                                                        (item.price !== item?.original_price) &&
                                                        <Text
                                                            style={{
                                                                fontSize: hp("2%"),
                                                                fontWeight: "bold",
                                                                fontStyle: "normal",
                                                                letterSpacing: 0,
                                                                textAlign: "left",
                                                                color: mowColors.textColor,
                                                                marginTop: 5,
                                                                fontFamily: fontFamily.bold,
                                                                textDecorationLine: 'line-through'
                                                            }}>

                                                            {item?.price}FCFA

                                                        </Text>
                                                    }

                                                </View>
                                            }

                                        </View>

                                        {/* add to cart button */}
                                        <MowButtonBasic
                                            onPress={() => { _addToCart(item) }}
                                            containerStyle={{ marginBottom: 0, marginTop: 10, borderColor: mowColors.textColor }}
                                            textStyle={{ color: mowColors.textColor }}
                                            type={"success"}
                                            size={"small"}
                                            filled={false}>

                                            {mowStrings.button.addToCart}

                                        </MowButtonBasic>

                                    </View>

                                )}
                            />

                        </View> :
                        <View style={{ flex:1, justifyContent:'center', alignItems:'center' }}>
                            <Text style={{ color:'red', fontSize:20, fontWeight:'bold', textAlign:'center' }} >Taper quelque chose dans la barre de recherche!</Text>
                        </View>
                }


            </View>

        </MowContainer>

    )


}

const titleStyle = ({
    title: {
        fontSize: hp(1.5),
        fontWeight: "bold",
        fontStyle: "normal",
        letterSpacing: 0,
        textAlign: "left",
        color: mowColors.titleTextColor
    }
});

export default HomeFilter