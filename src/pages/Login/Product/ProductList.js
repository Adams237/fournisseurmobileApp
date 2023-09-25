import React, { useEffect, useState } from "react";
import { FlatList, Image, Text, TouchableOpacity, View, ActivityIndicator } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import { mowStrings } from "../../../values/Strings/MowStrings";
import { mowColors } from "../../../values/Colors/MowColors";
import MowContainer from "../../../components/ui/Core/Container/MowContainer";
import WomanClothing from "../../../sampleData/WomanClothing";
import FAIcon from "react-native-vector-icons/FontAwesome";
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { MowPicker } from "../../../components/ui/Common/Picker/MowPicker";
import { platform } from "../../../values/Constants/MowConstants";
import { borderStyle, fontFamily, paginationStyle } from "../../../values/Styles/MowStyles";
import { MowButtonBasic } from "../../../components/ui/Common/Button/MowButton";
import { _showToast } from "../../../components/ui/Common/Toast/MowToast";
import { addProduct } from "../../../redurcer/cartSlice";
import { productOneCategory } from "../../../utils/apiEcommerce";

let pickerSortData = [
    { id: 4, title: 'Prix Croissant' },
    { id: 5, title: 'Prix Décroissant' },
    { id: 6, title: 'Ordre Alphabétique Croissant' },
    { id: 7, title: 'Ordre Alphabétique Décroissant' }
];


const ProductList = (props) => {
    const dispatch = useDispatch()
    const currentUSer = useSelector(state => state.currentUSer.value)
    const [step, setStep] = useState(0)
    const [end, setEnd] = useState(20)
    const products = useSelector(state => state.productList.value[0])
    const [showTabBar, setShowTabBar] = useState(false)
    const [value, setValue] = useState({
        pickerVisible: false,
        pickerSelectedId: null,
        productList: props.route.params?.idCat ? [] : products,
        productListKey: 0,
        boxView: true,
        activeIndex: 0,
        activeSlide: []
    })
    const [user, setUser] = useState({})


    const updateShow = () => {
        setShowTabBar(false)
        if (currentUSer.length) {
            setShowTabBar(true)
        }
    }
    const setStateProduct = async () => {
        if (props.route.params?.idCat) {
            try {
                const { data } = await axios.get(`${productOneCategory}/${props.route.params.idCat}`)
                setValue({
                    ...value,
                    productList: data.data
                })
            } catch (error) {
                console.log(error);
            }
        } else {
            setValue({
                ...value,
                productList: { ...products }
            })
        }

    }
    useEffect(() => {
        setStateProduct()
    }, [])

    useEffect(() => {
        updateShow()
    }, [currentUSer])

    const updateUser = () => {
        if (currentUSer.length) {
            setUser(currentUSer)
        }
    }

    useEffect(() => {
        updateUser()
    }, [currentUSer])

    const setSlide = () => {
        // to set all active index as 0
        let arr = [];
        let length = WomanClothing.length;
        for (let i = 0; i < length; i++) {
            arr[i] = 0;
        }
        setValue({ ...value, activeSlide: arr });
    }

    useEffect(() => {
        setSlide()
    }, [])

    // to handle (sort) picker selection
    const _onSelect = (selectedItem) => {
        console.log(selectedItem);

        /**
         * id --> selected item id for sorting
         *
         *      1 --> according to the smart sorting
         *      2 --> according to the best seller
         *      3 --> according to the newest value
         *      4 --> according to the price (lowest -> highest)
         *      5 --> according to the price (highest -> lowest)
         *      6 --> according to the top rate
         *      7 --> according to the score (highest -> lowest)
         *      8 --> according to the score (lowest -> highest)
         *
         * */

        let id = selectedItem["id"];

        // selected id control
        switch (id) {
            case 1:
                break;
            case 2:
                break;
            case 3:
                break;
            case 4:
                _OrderProduct(id);
                break;
            case 5:
                _OrderProduct(id);
                break;
            case 6:
                _OrderProduct(id);
                break;
            case 7:
                _OrderProduct(id);
                break;

        }

        // to update selected id & picker visibility
        setValue({
            ...value,
            pickerSelectedId: id,
            pickerVisible: false
        })

    }

    const _OrderProduct = (orderId) => {
        let productsOrder = value.productList
        if (orderId === 4) {
            productsOrder = productsOrder.sort(function (a, b) {
                return a.price - b.price
            })
        }
        if (orderId === 5) {
            productsOrder = productsOrder.sort(function (a, b) {
                return b.price - a.price
            })
        }
        if (orderId === 6) {
            productsOrder = productsOrder.sort(function (a, b) {
                return a.name - b.name
            })
        }

        if (orderId === 7) {
            productsOrder = productsOrder.sort(function (a, b) {
                return b.name - a.name
            })
        }

        setValue({
            ...value,
            productList: productsOrder
        })
    }

    // ascending order according to the key
    const _increaseSort = (productKey) => {
        let products = value.productList

        // to sort and update the product array
        products = products.sort((a, b) => parseFloat(a[productKey]) - parseFloat(b[productKey]));

        // to update list
        setValue({ ...value, productList: products, productListKey: value.productListKey });
    }

    // descending order according to the key
    const _decreaseSort = (productKey) => {
        let products = value.productList;

        // to sort and update the product array
        products = products.sort((a, b) => parseFloat(b[productKey]) - parseFloat(a[productKey]));

        // to update list
        setValue({ ...value, productList: products, productListKey: value.productListKey });
    }

    const _renderImages = ({ item, index }) => {
        const image = item.image
        const productSend = value.productList[index + step]
        return (
            <TouchableOpacity
                onPress={() => {
                    props.navigation.navigate("ProductDetail", { product: productSend })
                }}
                key={index}>

                <Image
                    style={{ height: "100%", width: "100%", borderRadius: 10 }}
                    resizeMode={"stretch"}
                    source={{ uri: "https://leratel.com/storage/" + image }} />

            </TouchableOpacity>
        );
    }

    const _addToCart = (product) => {
        if (user.length) {
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



        } else {
            props.navigation.navigate('HomeLogin', { product: product })
        }

    }

    // image pagination style
    const pagination = (data, index) => {
        return (
            <Pagination
                dotsLength={data.length}
                activeDotIndex={value.activeSlide[index] ? value.activeSlide[index] : 1}
                containerStyle={paginationStyle.container}
                dotStyle={[paginationStyle.activeDot, { backgroundColor: mowColors.pagination.activeDot }]}
                inactiveDotStyle={[paginationStyle.passiveDot, { backgroundColor: mowColors.pagination.passiveDot }]}
                inactiveDotOpacity={paginationStyle.inactiveDotOpacity}
                inactiveDotScale={paginationStyle.inactiveDotScale} />
        );
    }

    // to handle active slide for all items
    const _handleActiveSlide = (activeSlide, index) => {
        let activeSlideArr = value.activeSlide;
        activeSlideArr[index] = activeSlide;
        setValue({
            ...value,
            activeSlide: activeSlideArr,
        });
    }

    // products pagination
    const productPaginaton = (flag) => {
        if (flag) {
            if (value.productList.length - end < 20) {
                setStep(value.productList.length - end)
                setEnd(value.productList.length)
                // setValue({
                //     ...value,
                //     productList: products
                // })
            } else {
                setStep(end)
                setEnd(end + end)
                // setValue({
                //     ...value,
                //     productList: products
                // })
            }


        }
        else {
            if (step - 20 < 0) {
                setEnd(20)
                setStep(0)
                // setValue({
                //     ...value,
                //     productList: products
                // })
            } else {
                setEnd(step)
                setStep(step - 20)
                //     setValue({
                //         ...value,
                //         productList: products
                //     })
            }

        }
    }

    return (

        <MowContainer
            title={props.route.params?.nameCart ? props.route.params.nameCart : 'Produits'}
            navigation={props.navigation}
            footer={showTabBar}
        >
            {/* filter view */}
            <View
                style={{
                    marginVertical: hp("2%"),
                    marginHorizontal: wp("3%"),
                    borderRadius: 5,
                    backgroundColor: mowColors.filterHeaderBG,
                    padding: 10,
                    flexDirection: "row",
                }}>

                {/* icon view */}
                <TouchableOpacity
                    onPress={() => {
                        setValue({ ...value, boxView: !value.boxView, productListKey: value.productListKey + 1 });

                    }}
                    style={{ justifyContent: "center", alignItems: "center", flex: 2 }}>

                    <FAIcon
                        style={{
                            color: mowColors.textColor,
                            fontSize: hp("3%"),
                            flex: 1,
                            height: "100%",
                        }}
                        name={!value.boxView ? "th-large" : "list"} />

                </TouchableOpacity>

                {/* vertical line view */}
                <View
                    style={{
                        width: 1,
                        height: "100%",
                        backgroundColor: "#a4a4a4",
                    }} />

                {/* order by view */}
                <TouchableOpacity
                    onPress={() => { setValue({ ...value, pickerVisible: true }) }}
                    style={{ flexDirection: "row", flex: 5, alignItems: "center", justifyContent: "center" }}>

                    {/* order icon */}
                    <FAIcon
                        style={{
                            color: mowColors.textColor,
                            fontSize: hp("3%"),
                        }}
                        name={"sort"} />

                    {/* order text */}
                    <Text
                        style={{
                            fontSize: hp("1.8%"),
                            fontWeight: "500",
                            fontStyle: "normal",
                            letterSpacing: 0,
                            textAlign: "center",
                            color: mowColors.textColor,
                            marginLeft: 5,
                            fontFamily: fontFamily.light
                        }}>

                        {/* {mowStrings.products.orderBy} */}
                        Trier par

                    </Text>

                </TouchableOpacity>

                {/* vertical line view */}
                <View
                    style={{
                        width: 1,
                        height: "90%",
                        backgroundColor: "#a4a4a4",
                    }} />

                {/* filter view */}
                <TouchableOpacity
                    style={{ flexDirection: "row", flex: 5, alignItems: "center", justifyContent: "center" }}
                    onPress={() => { props.navigation.navigate("Filter"); }}>

                    {/* order icon */}
                    <FAIcon
                        style={{
                            color: mowColors.textColor,
                            fontSize: hp("3%"),
                        }}
                        name={"filter"} />

                    {/* order text */}
                    <Text
                        style={{
                            fontSize: hp("1.8%"),
                            fontWeight: "500",
                            fontStyle: "normal",
                            letterSpacing: 0,
                            textAlign: "center",
                            color: mowColors.textColor,
                            marginLeft: 5,
                            fontFamily: fontFamily.light
                        }}>

                        {mowStrings.products.filter}

                    </Text>

                </TouchableOpacity>

                {/* vertical line view */}
                <View
                    style={{
                        width: 1,
                        height: "90%",
                        backgroundColor: "#a4a4a4",
                    }} />

                {/* bac view */}
                {
                    step !== 0 && <TouchableOpacity
                        style={{ flexDirection: "row", flex: 5, alignItems: "center", justifyContent: "center" }}
                        onPress={() => productPaginaton(false)}>

                        {/* order icon */}
                        <FAIcon
                            style={{
                                color: mowColors.textColor,
                                fontSize: hp("3%"),
                            }}
                            name={"arrow-left"} />

                        {/* order text */}
                        <Text
                            style={{
                                fontSize: hp("1.8%"),
                                fontWeight: "500",
                                fontStyle: "normal",
                                letterSpacing: 0,
                                textAlign: "center",
                                color: mowColors.textColor,
                                marginLeft: 5,
                                fontFamily: fontFamily.light
                            }}>

                            {/* {mowStrings.products.changePage} */}
                            retour

                        </Text>

                    </TouchableOpacity>
                }

                {/* vertical line view */}
                <View
                    style={{
                        width: 1,
                        height: "90%",
                        backgroundColor: "#a4a4a4",
                    }} />
                {/* suivant view */}
                {(end < value.productList.length) && <TouchableOpacity
                    style={{ flexDirection: "row", flex: 5, alignItems: "center", justifyContent: "center" }}
                    onPress={() => productPaginaton(true)}>


                    {/* order text */}
                    <Text
                        style={{
                            fontSize: hp("1.8%"),
                            fontWeight: "500",
                            fontStyle: "normal",
                            letterSpacing: 0,
                            textAlign: "center",
                            color: mowColors.textColor,
                            marginLeft: 5,
                            fontFamily: fontFamily.light
                        }}>

                        {/* {mowStrings.products.changePage} */}
                        suivant

                    </Text>
                    {/* order icon */}
                    <FAIcon
                        style={{
                            color: mowColors.textColor,
                            fontSize: hp("3%"),
                        }}
                        name={"arrow-right"} />

                </TouchableOpacity>}


            </View>
            {/* product list */}
            {
                value.productList.length === 0 ? <ActivityIndicator size={"large"} color={"#0ba65a"} /> :

                    value.boxView

                        ?

                        // box view
                        <View
                            style={{ flex: 1 }}>

                            <FlatList
                                key={value.productListKey}
                                showsHorizontalScrollIndicator={false}
                                keyExtractor={(item, index) => index.toString()}
                                numColumns={2}
                                style={{ paddingHorizontal: wp("3%") }}
                                data={value.productList.slice(step, end)}
                                renderItem={({ item, index }) => (

                                    //product item
                                    <View
                                        key={index}
                                        style={{ margin: 5, marginBottom:0, flex: 1 }}>

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
                                            {/* <TouchableOpacity
                                                style={{ position: "absolute", top: 10, right: 10, zIndex: 99 }}>

                                                <FAIcon
                                                    style={{
                                                        color: "grey",
                                                        fontSize: hp("2%")
                                                    }}
                                                    name={"heart"} />

                                            </TouchableOpacity> */}

                                            {/* didn't use swiper, because multiple swiper causes android ui problem */}
                                            {/* product image slider */}
                                            <Carousel
                                                removeClippedSubviews={false}
                                                ref={(c) => { this._carousel = c }}
                                                data={item?.images ? item?.images : item.images}
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

                                            {/* {
                                                !( item["quantity"]) &&

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

                                                {item?.name ? item.name : item.name}

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
                                                // item["discountRate"]

                                                //     ?

                                                //     // <View
                                                //     //     style={{ flexDirection: "row", marginTop: 3, alignItems: "center" }}>

                                                //     //     {/* discount rate view */}
                                                //     //     {/* <View
                                                //     //         style={{
                                                //     //             backgroundColor: mowColors.successColor,
                                                //     //             borderRadius: 5,
                                                //     //             justifyContent: "center",
                                                //     //             alignItems: "center",
                                                //     //             width: hp("5%"),
                                                //     //             height: hp("5%")
                                                //     //         }}>

                                                //     //         <Text
                                                //     //             style={{
                                                //     //                 fontSize: hp("2%"),
                                                //     //                 fontWeight: "bold",
                                                //     //                 fontStyle: "normal",
                                                //     //                 letterSpacing: 0,
                                                //     //                 textAlign: "left",
                                                //     //                 color: "#ffffff"
                                                //     //             }}>

                                                //     //             {item["discountRate"]}

                                                //     //         </Text>

                                                //     //     </View> */}

                                                //     //     {/* price view */}
                                                //     //     <View
                                                //     //         style={{ marginLeft: 10, marginTop: 3 }}>

                                                //     //         {/* first price text view  */}
                                                //     //         <View
                                                //     //             style={{ alignItems: "center", justifyContent: "center" }}>

                                                //     //             {/* first price text */}
                                                //     //             <Text
                                                //     //                 style={{
                                                //     //                     fontSize: hp("1.8%"),
                                                //     //                     fontWeight: "300",
                                                //     //                     fontStyle: "normal",
                                                //     //                     letterSpacing: 0,
                                                //     //                     textAlign: "center",
                                                //     //                     color: mowColors.textColor,
                                                //     //                     fontFamily: fontFamily.light
                                                //     //                 }}>

                                                //     //                 {item.sale_price}FCFA

                                                //     //             </Text>

                                                //     //             <View
                                                //     //                 style={{
                                                //     //                     backgroundColor: mowColors.mainColor,
                                                //     //                     width: "100%",
                                                //     //                     height: hp("0.1%"),
                                                //     //                     position: "absolute",
                                                //     //                 }} />

                                                //     //         </View>

                                                //     //         {/* last price text */}
                                                //     //         <Text
                                                //     //             style={{
                                                //     //                 fontSize: hp("2%"),
                                                //     //                 fontWeight: "bold",
                                                //     //                 fontStyle: "normal",
                                                //     //                 letterSpacing: 0,
                                                //     //                 textAlign: "center",
                                                //     //                 color: mowColors.titleTextColor,
                                                //     //                 fontFamily: fontFamily.bold
                                                //     //             }}>

                                                //     //             {item["currency"]}{item["lastPrice"]}

                                                //     //         </Text>

                                                //     //     </View>

                                                //     // </View>

                                                //     :

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

                                                    {(item.price)}FCFA

                                                </Text>
                                            }

                                        </View>

                                        {/* add to cart button */}
                                        <MowButtonBasic
                                            onPress={() => { _addToCart(item) }}
                                            containerStyle={{ marginBottom: 0, backgroundColor:'#0ba65a', borderColor: '#0ba65a' }}
                                            textStyle={{ color: 'white' }}
                                            type={"success"}
                                            size={"small"}
                                            filled={false}>

                                            {/* {mowStrings.button.addToCart} */}
                                            Ajouter Au Panier

                                        </MowButtonBasic>
                                        {/* By button */}
                                        <MowButtonBasic
                                            onPress={() => { _addToCart(item) }}
                                            containerStyle={{ marginBottom: 10, backgroundColor:'black', marginTop: 10, borderColor: 'black' }}
                                            textStyle={{ color: 'white' }}
                                            type={"success"}
                                            size={"small"}
                                            filled={false}>

                                            {/* {mowStrings.button.addToCart} */}
                                            Acheter Maintenant

                                        </MowButtonBasic>

                                    </View>

                                )}
                            />

                        </View>

                        :

                        // list view
                        <View
                            style={{ flex: 1 }}>

                            <FlatList
                                key={value.productListKey}
                                keyExtractor={(item, index) => index.toString()}
                                style={{ paddingHorizontal: wp("3%") }}
                                data={value.productList.slice(step, end)}
                                renderItem={({ item, index }) => (

                                    //product item
                                    <View
                                        key={index}
                                        style={{ margin: 5, marginVertical: 8, flex: 1, flexDirection: "row", ...borderStyle, height: hp(14), width: "98%", borderRadius: 10 }}>

                                        {/* image view */}
                                        <View
                                            style={{
                                                marginRight: 10,
                                                borderRadius: 10,
                                                alignItems: "center",
                                                justifyContent: "center"
                                            }}>

                                            {/* hearth icon touchable */}
                                            <TouchableOpacity
                                                style={{ position: "absolute", top: 5, right: 5, zIndex: 99 }}>

                                                <FAIcon
                                                    style={{ color: "grey", fontSize: hp("1.5%") }}
                                                    name={"heart"} />

                                            </TouchableOpacity>

                                            {/* product image slider */}
                                            <Carousel
                                                removeClippedSubviews={false}
                                                ref={(c) => { this._carousel = c }}
                                                data={item?.images ? item?.images : item.images}
                                                sliderWidth={wp("30%")}
                                                itemWidth={wp("30%")}
                                                renderItem={() => _renderImages({ item, index })} />

                                            {
                                                item["new"] &&

                                                <View
                                                    style={{
                                                        position: "absolute",
                                                        backgroundColor: mowColors.mainColor,
                                                        top: 5,
                                                        left: 5,
                                                        borderRadius: 200,
                                                        width: hp("3.2%"),
                                                        height: hp("3.2%"),
                                                        justifyContent: "center"
                                                    }}>

                                                    <Text
                                                        style={{
                                                            fontWeight: "bold",
                                                            textAlign: "center",
                                                            color: "#ffffff",
                                                            fontSize: hp(1.3)
                                                        }}>

                                                        {mowStrings.homeScreen.new}

                                                    </Text>

                                                </View>
                                            }

                                            {
                                                !(item?.duantity ? item?.quantity : item["quantity"]) &&

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

                                            }

                                        </View>

                                        {/* info view */}
                                        <View>

                                            <View
                                                style={{ height: hp(8) }}>

                                                {/* title text */}
                                                <Text
                                                    numberOfLines={1}
                                                    style={{
                                                        marginTop: 1,
                                                        fontSize: hp("1.6%"),
                                                        fontWeight: "normal",
                                                        fontStyle: "normal",
                                                        letterSpacing: 0,
                                                        textAlign: "left",
                                                        color: mowColors.titleTextColor,
                                                        fontFamily: fontFamily.regular
                                                    }}>

                                                    {item?.name ? item.name : item["name"]}

                                                </Text>



                                                {/* price & discount view */}
                                                {
                                                    item["discountRate"]

                                                        ?

                                                        <View
                                                            style={{ flexDirection: "row", marginTop: 1, alignItems: "center" }}>

                                                            {/* discount rate view */}
                                                            <View
                                                                style={{
                                                                    backgroundColor: mowColors.successColor,
                                                                    borderRadius: 5,
                                                                    justifyContent: "center",
                                                                    alignItems: "center",
                                                                    width: wp("9%"),
                                                                    height: hp("3.5%")
                                                                }}>

                                                                <Text
                                                                    style={{
                                                                        fontSize: hp("1.6%"),
                                                                        fontWeight: "bold",
                                                                        fontStyle: "normal",
                                                                        letterSpacing: 0,
                                                                        textAlign: "left",
                                                                        color: "#ffffff",
                                                                        fontFamily: fontFamily.bold
                                                                    }}>

                                                                    {item?.discountRate || item["discountRate"]}

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
                                                                            fontSize: hp("1.5%"),
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
                                                                            backgroundColor: mowColors.textColor,
                                                                            width: "100%",
                                                                            height: hp("0.1%"),
                                                                            position: "absolute",
                                                                        }} />

                                                                </View>

                                                                {/* last price text */}
                                                                <Text
                                                                    style={{
                                                                        fontSize: hp("1.7%"),
                                                                        fontWeight: "bold",
                                                                        fontStyle: "normal",
                                                                        letterSpacing: 0,
                                                                        textAlign: "center",
                                                                        color: mowColors.titleTextColor,
                                                                        fontFamily: fontFamily.bold
                                                                    }}>

                                                                    {item["currency"]}{item["lastPrice"]}

                                                                </Text>

                                                            </View>

                                                        </View>

                                                        :

                                                        <Text
                                                            style={{
                                                                fontSize: hp("1.8%"),
                                                                fontWeight: "bold",
                                                                fontStyle: "normal",
                                                                textAlign: "left",
                                                                color: mowColors.titleTextColor,
                                                                marginTop: 5,
                                                                fontFamily: fontFamily.bold
                                                            }}>

                                                            {item.sale_price ? item.sale_price : item.original_price ||
                                                                item.sale_price ? item.sale_price : item.original_price}

                                                        </Text>
                                                }

                                            </View>

                                            <View
                                                style={{ width: wp(25), marginTop: hp(0.5) }}>

                                                {/* add to cart button */}
                                                <MowButtonBasic
                                                    containerStyle={{ marginBottom: 0, marginTop: 10, borderColor: mowColors.textColor }}
                                                    textStyle={{ color: mowColors.textColor }}
                                                    onPress={() => { _addToCart(item) }}
                                                    type={"success"}
                                                    size={"xSmall"}
                                                    filled={false}>

                                                    {/* {mowStrings.button.addToCart} */}
                                                    Ajouter Au Panier
                                                </MowButtonBasic>

                                            </View>

                                        </View>

                                    </View>

                                )}
                            />
                        </View>

            }

            <MowPicker
                indice={2}
                pickerTitle={mowStrings.products.orderBy}
                selectedValue={value.pickerSelectedId}
                onSelect={(obj) => { _onSelect(obj) }}
                title={mowStrings.picker.sort.title}
                search={false}
                modalVisible={value.pickerVisible}
                onClosed={() => { setValue({ ...value, pickerVisible: false }) }}
                data={pickerSortData} />

        </MowContainer>

    )


}

export default ProductList