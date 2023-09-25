import React, { useEffect, useState } from "react";
import { Text, View, Image, FlatList, TouchableOpacity, ScrollView, ActivityIndicator, RefreshControl } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import FAIcon from "react-native-vector-icons/FontAwesome";
import { useSelector } from "react-redux";
import axios from "axios";
import { useDispatch } from "react-redux";

import { mowColors } from "../../values/Colors/MowColors";
import MowContainer from "../../components/ui/Core/Container/MowContainer";
import { mowStrings } from "../../values/Strings/MowStrings";
import { MowTitleView } from "../../components/ui/MowTitleView";
import { categoryStyle, fontFamily, gPadding } from "../../values/Styles/MowStyles";
import { MowButtonBasic } from "../../components/ui/Common/Button/MowButton";
import { MowStarView } from "../../components/ui/Common/StarView/MowStarView";
import Advantages from "../../sampleData/Advantages";
import TrendBrands from "../../sampleData/TrendBrands";
import { getAllProduct, getCarts, getCategories, productOneCategory } from "../../utils/apiEcommerce";
import { addProduct } from "../../redurcer/productSlice";

const HomeScreen = (props) => {
    const dispatch = useDispatch()
    const [user, setUser] = useState({})
    const [showTabBar, setShowTabBar] = useState(false)
    const currentUSer = useSelector(state => state.currentUSer.value)
    const [categories, setCategories] = useState([])
    const [error, setError] = useState(false)
    const [scrollPosition, setScrollPosition] = useState(0);
    const [refreshing, setRefreshing] = useState(false);
    const [productList, setProductList] = useState([])
    const [tendanceProducts, setTendanceProduc] = useState([])
    const [produitsInformatiques, setProuitInformatique] = useState([])
    const [materielAgricol, setMaterielAgricol] = useState([])
    const [sprotProduct, setSportProduct] = useState([])
    const favoriteCategorie = [
        { name: "agriculture", },
        { name: "machinerie-agricole", },
        { name: "elevage" },
        { name: "agricultural-transformation" },
        { name: "aviculture" },
        { name: "porciculture" },
        { name: "materiel-industriel" },
        { name: "pisciculture" },
        { name: "materiel-informatique" },
        { name: "autres" },
        { name: "hot-promotions" },
        { name: "les-semences" },
        { name: "sport-et-divertissements" }
    ]

    const randomSort = () => {
        return Math.random() - 0.5
    }

 

    const getCart = async () => {
        try {
            const { data } = await axios.get(getCarts, {
                headers: {
                    Authorization: `Bearer ${currentUSer[0].token}`
                }
            })
            if (data.data.message !== 'empty') {
                dispatch(addProduct(data.data))
            }
        } catch (error) {

        }
    }
    useEffect(() => {
        getCart();
    }, [])
    const getSportProduct = async () => {
        try {
            const { data } = await axios.get(`${productOneCategory}/62`)
            setSportProduct(data.data.sort(randomSort))
        } catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        getSportProduct()
    }, [])
    const getMaterielAgricol = async () => {
        try {
            const { data } = await axios.get(`${productOneCategory}/2`)
            setMaterielAgricol(data.data.sort(randomSort))
        } catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        getMaterielAgricol()
    }, [])
    const setIformatiqueProduct = async () => {
        try {
            const { data } = await axios.get(`${productOneCategory}/61`)
            setProuitInformatique(data.data.sort(randomSort))
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        setIformatiqueProduct()
    }, [])

    const setAllCategories = async () => {
        setError(false)
        try {
            const { data } = await axios.get(getCategories);
            let newArray = []
            for (let index = 0; index < data.data.length; index++) {
                const element = favoriteCategorie.find(item => item.name === data.data[index].key)
                if (element) {
                    newArray.push(data.data[index])
                }

            }
            // favoriteCategorie.map(data => {
            //     const item = data.data.find(keycat => data.name === keycat.key)
            //     if (item) newArray.push(item)
            // })
            setCategories(newArray.sort(randomSort))

        } catch (error) {
            setError(true)
            console.log(error);
        }
    };
    const setProductTendance = async () => {
        try {
            const { data } = await axios.get(`${productOneCategory}/1`)
            setTendanceProduc(data.data.sort(randomSort))
        } catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        setProductTendance()
    }, [])
    const setAllProduct = async () => {
        // setIsLoading(true)
        console.log('ici');
        try {
            console.log('la');
            const { data } = await axios.get(getAllProduct)
            dispatch(addProduct(data.data))
            console.log('2la');

            setProductList(data.data.slice(0, 20).sort(randomSort))
            // setIsLoading(false)
        } catch (err) {
            // setIsLoading(false)
            console.log(err);
        }
    }
    useEffect(() => {
        setAllProduct()
    }, [])
    // useEffect(() => {
    //     setAllCategories()
    // }, []);

    const getCurrentUser = () => {
        setShowTabBar(false)
        if (currentUSer.length) {
            setUser(currentUSer)
            setShowTabBar(true)
        }
        return
    }
    useEffect(() => {
        getCurrentUser();
    }, [currentUSer]);

    const handleRefresh = () => {
        setAllCategories()
        setAllProduct()
        setIformatiqueProduct()
        setProductTendance()
        getSportProduct()
        getMaterielAgricol()
        setRefreshing(true)
        setScrollPosition(0)
        setRefreshing(false)
    }


    return (

        <MowContainer
            footerActiveIndex={1}
            navigation={props.navigation}
            navbar={false}
            user={user}
            footer={showTabBar}
        >

            {/* home screen navbar */}
            <View
                style={[{ paddingHorizontal: gPadding, paddingTop: 10, backgroundColor: mowColors.mainColor }]}>

                <View
                    style={{
                        width: "100%",
                        alignSelf: "center",
                        alignItems: "center",
                        justifyContent: "center",
                    }}>

                    {/* logo with text */}
                    <Image
                        source={require("../../assets/logo/logo_with_text.png")}
                        style={{ height: hp("3%") }}
                        resizeMode={"contain"} />

                </View>

            </View>

            {/* search view */}
            <View
                style={{ backgroundColor: mowColors.mainColor, paddingHorizontal: gPadding, alignItems: "center", flexDirection: "row", justifyContent: "space-between", paddingBottom: hp(1) }}>

                {/* search button */}
                <MowButtonBasic
                    onPress={() => { props.navigation.navigate("HomeFilter") }}
                    containerStyle={{ width: "85%", alignSelf: "flex-end", borderRadius: 30, height: hp("5%") }}
                    textStyle={{ padding: 0, margin: 0, color: "#aeaeae", fontSize: hp("1.6%"), fontFamily: fontFamily.light, fontStyle: "normal", letterSpacing: 0, textAlign: "left" }}
                    leftIconStyle={{ color: "#aeaeae" }}
                    leftIcon={"search"}>

                    {/* {mowStrings.search} */}
                    Rechercher un Produit
                </MowButtonBasic>

                {/* drawer button */}
                <TouchableOpacity
                    onPress={() => { props.navigation.openDrawer() }}
                    style={{ height: hp("3%"), width: hp("3%") }}>

                    <FAIcon
                        style={{ color: "white", fontSize: hp("3%") }}
                        name={"bars"} />

                </TouchableOpacity>

            </View>


            <ScrollView
                onScroll={event => {
                    const { y } = event.nativeEvent.contentOffset;
                    setScrollPosition(y);
                }}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={handleRefresh}
                    />
                }
            >

                {/* trend categories view */}
                {/* {
                    !categories.length ? (
                        !error ? <ActivityIndicator size="large" color="#0ba65a" />
                            : <View>
                                <Text style={{ color: 'red', textAlign: 'center', fontSize: 16, fontWeight: 'bold' }}>
                                    verifier votre connexioninternet puis réessayer !
                                </Text>
                            </View>

                    ) : (
                        <View
                            style={[categoryStyle, { paddingBottom: hp(2), backgroundColor: mowColors.categoryBGColor }]}>

                            trend categories title view
                            <MowTitleView
                                showButton={false}
                                title={mowStrings.homeScreen.trendCategories} />

                            trend categories horizontal list
                            <FlatList
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}
                                keyExtractor={(item, index) => index.toString()}
                                data={categories}
                                renderItem={({ item, index }) => (

                                    // category item touchable
                                    <TouchableOpacity
                                        onPress={() => { props.navigation.navigate("ProductList", { idCat: item.id, nameCart: item.name }) }}
                                        style={{ backgroundColor: mowColors.mainColor, borderRadius: 10, width: hp("18%"), height: hp("8%"), marginRight: 10, justifyContent: "center", alignItems: "center" }}
                                        key={index}>

                                        category text
                                        <Text
                                            style={{
                                                // marginTop: 5,
                                                fontSize: hp("2%"),
                                                fontWeight: "bold",
                                                fontStyle: "normal",
                                                letterSpacing: 0,
                                                textAlign: "center",
                                                color: "#ffffff"
                                            }}>

                                            {item.name}

                                        </Text>

                                    </TouchableOpacity>

                                )}
                            />

                        </View>
                    )
                } */}


                {/* trend campaign view */}
                {/* <View
                    style={[categoryStyle, { marginTop: 15, height: wp("75%"), backgroundColor: mowColors.categoryBGColor }]}>

                    trend campaign title view
                    <MowTitleView
                        buttonOnPress={() => { props.navigation.navigate("TrendCampaigns") }}
                        title={mowStrings.homeScreen.trendCampaign} />

                    trend campaign swiper
                    <Swiper
                        ref={isRef}
                        pagingEnabled={true}
                        showsPagination={true}
                        horizontal={true}
                        loop={false}
                        dotColor={mowColors.titleTextColor}
                        activeDotColor={mowColors.mainColor}
                        paginationStyle={{ bottom: 0 }}
                        autoplay={false}>

                        {
                            TrendCampaign.map((item, key) => {
                                return (

                                    <View
                                        key={key}
                                        style={{
                                            flexDirection: "row",
                                            width: "95%",
                                            alignSelf: "center",
                                            height: wp("53.5%"),
                                            borderRadius: 10,
                                            marginLeft: "-5%",
                                        }}>

                                        
                                        <Image
                                            style={{
                                                position: "absolute",
                                                alignSelf: "center",
                                                zIndex: -1,
                                                borderRadius: 10,
                                                width: "100%",
                                                height: "100%"
                                            }}
                                            resizeMode={"contain"}
                                            source={item["image"]}
                                        />

                                        <View
                                            style={{
                                                width: "100%",
                                                height: "100%",
                                                borderRadius: 10,
                                                backgroundColor: 'rgba(0, 0, 0, 0.2)',
                                                paddingBottom: 10,
                                                paddingHorizontal: 10
                                            }}>

                                            <View
                                                style={{
                                                    alignSelf: "flex-end",
                                                    marginTop: 10
                                                }}>

                                                time view
                                                <MowCountDown
                                                    size={12}
                                                    timeToLeft={item["timeToLeft"]} />

                                            </View>

                                            <View
                                                style={{ justifyContent: "flex-end", height: "100%", left: "3%", marginBottom: "-40%" }}>

                                                <TouchableOpacity
                                                    onPress={() => { props.navigation.navigate("TrendCampaigns") }}
                                                    style={{
                                                        height: hp("3%"),
                                                        backgroundColor: "black",
                                                        justifyContent: "center",
                                                        borderRadius: 5,
                                                        borderBottomLeftRadius: 0,
                                                        paddingLeft: 10,
                                                        width: wp(75),
                                                    }}>

                                                    product text
                                                    <Text
                                                        style={{
                                                            fontSize: hp("1.7%"),
                                                            fontWeight: "bold",
                                                            fontStyle: "normal",
                                                            letterSpacing: 0,
                                                            textAlign: "left",
                                                            color: "#ffffff"
                                                        }}>

                                                        {mowStrings.homeScreen.browseAmazingProduct}

                                                    </Text>

                                                </TouchableOpacity>

                                                <View
                                                    style={{
                                                        height: hp("3%"),
                                                        backgroundColor: mowColors.trendCampaign.buttonBG,
                                                        justifyContent: "center",
                                                        borderRadius: 5,
                                                        borderTopLeftRadius: 0,
                                                        borderTopRightRadius: 0,
                                                        paddingLeft: 10,
                                                        width: wp(50)
                                                    }}>

                                                    product text
                                                    <Text
                                                        style={{
                                                            fontSize: hp("1.7%"),
                                                            fontWeight: "bold",
                                                            fontStyle: "normal",
                                                            letterSpacing: 0,
                                                            textAlign: "left",
                                                            color: mowColors.trendCampaign.buttonText
                                                        }}>

                                                        {item["text"]}

                                                    </Text>

                                                </View>

                                            </View>

                                        </View>

                                    </View>

                                )
                            })
                        }

                    </Swiper>

                </View> */}

                 {/* advantages view */}
                 <View
                    style={[categoryStyle, { marginTop: 15, backgroundColor: mowColors.categoryBGColor }]}>

                    {/* advantages title view */}
                    <MowTitleView
                        showButton={false}
                        title={"Avantage à utiliser Leratel"} />

                    {/* advantages horizontal list */}
                    <FlatList
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item, index) => index.toString()}
                        data={Advantages}
                        renderItem={({ item, index }) => (

                            // advantage item view
                            <View
                                style={{
                                    width: hp("12%"),
                                    height: hp("15%"),
                                    marginRight: 10,
                                    justifyContent: "center",
                                    alignItems: "center"
                                }}>

                                {/* advantage view */}
                                <View
                                    style={{
                                        borderRadius: 10,
                                        backgroundColor: mowColors.mainColor,
                                        width: "100%",
                                        height: hp("8%"),
                                        justifyContent: "center",
                                        alignItems: "center"
                                    }}
                                    key={index}>

                                    {/* advantage image */}
                                    <Image
                                        style={{ width: hp("6%"), height: hp("6%") }}
                                        source={item["image"]}
                                        resizeMode={"contain"} />

                                </View>

                                {/* advantage text */}
                                <Text
                                    style={{
                                        marginTop: 5,
                                        fontSize: hp("1.4%"),
                                        fontWeight: "normal",
                                        fontStyle: "normal",
                                        letterSpacing: 0,
                                        textAlign: "center",
                                        color: mowColors.textColor
                                    }}>

                                    {item["title"]}

                                </Text>

                            </View>

                        )}
                    />

                </View>

                {/* Produit tendance */}
                <View
                    style={[categoryStyle, { marginTop: 15, backgroundColor: mowColors.categoryBGColor }]}>

                    {/* trend campaign title view */}
                    <MowTitleView
                        showButton={true}
                        buttonOnPress={() => {
                            props.navigation.navigate("ProductList", { idCat: 1, nameCart: "Promotion Tendance" })
                        }}
                        title={"Promotion Tendance"} />
                    {
                        tendanceProducts.length === 0 ? <ActivityIndicator size={"large"} color={"#0ba65a"} /> :
                            <FlatList
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}
                                keyExtractor={(item, index) => index.toString()}
                                data={tendanceProducts.slice(0, 20)}
                                renderItem={({ item, index }) => (

                                    //discount list item
                                    <View
                                        style={{
                                            width: wp("35%"),
                                            height: hp("33%"),
                                            marginHorizontal: 10,
                                        }}
                                        key={index}>
                                        <TouchableOpacity onPress={() => props.navigation.navigate('ProductDetail', { product: item })}>
                                            {/* image view */}
                                            <View
                                                style={{
                                                    height: "60%",
                                                    width: "100%",
                                                    borderRadius: 10,
                                                    borderStyle: "solid",
                                                    borderWidth: 1,
                                                    borderColor: "rgba(112, 112, 112, 0.16)"
                                                }}>

                                                {/* hearth icon touchable */}
                                                {/* <TouchableOpacity
                                                    style={{ position: "absolute", top: 5, right: 5, zIndex: 99 }}>

                                                    <FAIcon
                                                        style={{
                                                            color: mowColors.titleTextColor,
                                                            fontSize: hp("2%")
                                                        }}
                                                        name={"heart"} />

                                                </TouchableOpacity> */}

                                                <Image
                                                    style={{
                                                        height: "100%",
                                                        width: "100%",
                                                    }}
                                                    resizeMode={"contain"}
                                                    source={{ uri: `https://leratel.com/storage/${item?.image}` }} />
                                            </View>

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
                                                }}>

                                                {item?.name}

                                            </Text>

                                            {/* star view */}
                                            {/* <View
                                                style={{ flexDirection: "row", alignItems: "center", marginTop: 5 }}>

                                                stars
                                                <MowStarView
                                                    score={item["star"]} />

                                                vote count text
                                                <Text
                                                    style={{
                                                        fontSize: hp("1.4%"),
                                                        fontWeight: "normal",
                                                        fontStyle: "normal",
                                                        letterSpacing: 0,
                                                        textAlign: "left",
                                                        color: "#848484",
                                                    }}>

                                                    {"("}{item["voteCount"]}{")"}

                                                </Text>

                                            </View> */}

                                            {/* price & discount view */}
                                            <View
                                                style={{ flexDirection: "row", marginTop: 5, alignItems: "center" }}>

                                                {/* discount rate view
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

                                                        {item["discountRate"]}

                                                    </Text>

                                                </View> */}

                                                {/* price view */}
                                                <View
                                                    style={{ marginLeft: 10 }}>

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
                                                                color: "#c2c2c2"
                                                            }}>

                                                            {item["firstPrice"]}

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
                                                            marginTop: 1,
                                                            fontSize: hp("2%"),
                                                            fontWeight: "bold",
                                                            fontStyle: "normal",
                                                            letterSpacing: 0,
                                                            textAlign: "center",
                                                            color: mowColors.mainColor
                                                        }}>

                                                        {item?.price} FCFA

                                                    </Text>

                                                </View>

                                            </View>
                                        </TouchableOpacity>

                                    </View>

                                )}
                            />
                    }


                </View>

                {/* trend brands view */}
                <View
                    style={[categoryStyle, { marginTop: 15, backgroundColor: mowColors.categoryBGColor }]}>

                    {/* trend brands title view */}
                    <MowTitleView
                        showButton={false}
                        title={mowStrings.homeScreen.trendBrands} />

                    {/* trend brands horizontal list */}
                    <FlatList
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item, index) => index.toString()}
                        data={TrendBrands}
                        renderItem={({ item, index }) => (

                            // trend brands item touchable
                            <TouchableOpacity
                                style={{
                                    width: wp("30%"),
                                    height: hp("8%"),
                                    justifyContent: "center",
                                    backgroundColor: "transparent",
                                    borderStyle: "solid",
                                    borderWidth: 1,
                                    borderColor: "rgba(146, 146, 146, 0.41)",
                                    borderRadius: 5,
                                    marginHorizontal: 10,
                                    marginVertical: 5,
                                    alignItems: "center",
                                }}
                                key={index}>

                                {/* brand image */}
                                <Image
                                    style={{ width: wp("20%"), height: hp("6%") }}
                                    source={item["image"]}
                                    resizeMode={"contain"} />

                            </TouchableOpacity>

                        )}
                    />

                </View>

                {/* Rayon Informatique view */}
                <View
                    style={[categoryStyle, { marginTop: 15, backgroundColor: mowColors.categoryBGColor }]}>

                    {/* best seller title view */}
                    <MowTitleView
                        showButton={true}
                        buttonOnPress={() => {
                            props.navigation.navigate("ProductList", { idCat: 61, nameCart: "Rayon Informatique" })
                        }}
                        title={"Rayon Informatique"} />

                    {/* today's best discount list */}
                    {
                        produitsInformatiques.length === 0 ? <ActivityIndicator size={"large"} color={"#0ba65a"} /> :
                            <FlatList
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}
                                keyExtractor={(item, index) => index.toString()}
                                data={produitsInformatiques.slice(0, 20)}
                                renderItem={({ item, index }) => (

                                    //best seller list item
                                    <View
                                        style={{
                                            width: wp("35%"),
                                            height: hp("25%"),
                                            marginHorizontal: 10,
                                        }}
                                        key={index}>
                                        <TouchableOpacity onPress={() => props.navigation.navigate('ProductDetail', { product: item })}>
                                            {/* image view */}

                                            <View
                                                style={{
                                                    height: "60%",
                                                    width: "100%",
                                                    borderRadius: 10,
                                                    borderStyle: "solid",
                                                    borderWidth: 1,
                                                    borderColor: "rgba(112, 112, 112, 0.16)",
                                                    justifyContent: "center"
                                                }}>

                                                {/* hearth icon touchable */}
                                                {/* <TouchableOpacity
                                                    style={{ position: "absolute", top: 5, right: 5, zIndex: 99 }}>

                                                    <FAIcon
                                                        style={{
                                                            color: mowColors.titleTextColor,
                                                            fontSize: hp("2%")
                                                        }}
                                                        name={"heart"} />

                                                </TouchableOpacity> */}

                                                <Image
                                                    style={{
                                                        height: "100%",
                                                        width: "100%",
                                                    }}
                                                    resizeMode={"contain"}
                                                    source={{ uri: `https://leratel.com/storage/${item?.image}` }} />

                                                {/* {
                                                    !item?.quantity &&

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

                                                            Rupture de stock

                                                        </Text>

                                                    </View>

                                                } */}

                                                {
                                                    item?.new &&

                                                    <View
                                                        style={{
                                                            position: "absolute",
                                                            backgroundColor: mowColors.mainColor,
                                                            top: 5,
                                                            left: 5,
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

                                            </View>

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
                                                }}>

                                                {item?.name}

                                            </Text>

                                            {/* star view */}
                                            {/* <View
                                                style={{ flexDirection: "row", alignItems: "center", marginTop: 5, }}>

                                                stars
                                                <MowStarView
                                                    score={item["star"]} />

                                                vote count text
                                                <Text
                                                    style={{
                                                        marginLeft: 2,
                                                        fontSize: hp("1.4%"),
                                                        fontWeight: "normal",
                                                        fontStyle: "normal",
                                                        letterSpacing: 0,
                                                        textAlign: "left",
                                                        color: mowColors.textColor,
                                                    }}>

                                                    {"("}{item["voteCount"]}{")"}

                                                </Text>

                                            </View> */}

                                            {/* price text */}
                                            <Text
                                                style={{
                                                    fontSize: hp("2%"),
                                                    fontWeight: "bold",
                                                    fontStyle: "normal",
                                                    letterSpacing: 0,
                                                    textAlign: "left",
                                                    color: mowColors.titleTextColor,
                                                    marginTop: 5,
                                                }}>

                                                {item?.price} FCFA

                                            </Text>
                                        </TouchableOpacity>
                                    </View>

                                )}
                            />
                    }


                </View>

                {/* Rayon Agricole view */}
                <View
                    style={[categoryStyle, { marginTop: 15, paddingRight: gPadding, backgroundColor: mowColors.categoryBGColor }]}>

                    {/* Agricol title view */}
                    <MowTitleView
                        buttonOnPress={() => {
                            props.navigation.navigate("ProductList", { idCat: 2, nameCart: "Rayon Agricol" })
                        }}
                        title={"Rayon Agricol"} />

                    {/* Agricol list */}

                    {
                        materielAgricol.length === 0 ? <ActivityIndicator size={"large"} color={"#0ba65a"} /> :
                            <FlatList
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}
                                keyExtractor={(item, index) => index.toString()}
                                data={materielAgricol.slice(0, 20)}
                                renderItem={({ item, index }) => (

                                    //smart phone list item
                                    <View
                                        style={{
                                            height: hp("33%"),
                                            margin: 10,
                                            marginTop: 0,
                                            flex: 1,
                                        }}
                                        key={index}>
                                        <TouchableOpacity onPress={() => props.navigation.navigate('ProductDetail', { product: item })}>
                                            {/* image view */}
                                            <View
                                                style={{
                                                    height: "60%",
                                                    width: "100%",
                                                    borderRadius: 10,
                                                    borderStyle: "solid",
                                                    borderWidth: 1,
                                                    borderColor: "rgba(112, 112, 112, 0.16)",
                                                    justifyContent: "center"
                                                }}>

                                                {/* hearth icon touchable */}
                                                {/* <TouchableOpacity
                                                    style={{ position: "absolute", top: 5, right: 5, zIndex: 99 }}>

                                                    <FAIcon
                                                        style={{
                                                            color: mowColors.titleTextColor,
                                                            fontSize: hp("2%")
                                                        }}
                                                        name={"heart"} />

                                                </TouchableOpacity> */}

                                                <Image
                                                    style={{
                                                        height: "100%",
                                                        width: "100%",
                                                    }}
                                                    resizeMode={"contain"}
                                                    source={{ uri: `https://leratel.com/storage/${item?.image}` }} />

                                                {
                                                    item["new"] &&

                                                    <View
                                                        style={{
                                                            position: "absolute",
                                                            backgroundColor: mowColors.mainColor,
                                                            top: 5,
                                                            left: 5,
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

                                            </View>

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
                                                }}>

                                                {item.name}

                                            </Text>

                                            {/* star view */}
                                            {/* <View
                                        style={{ flexDirection: "row", alignItems: "center", marginTop: 5 }}>

                                        stars
                                        <MowStarView
                                            score={item["star"]} />

                                        vote count text
                                        <Text
                                            style={{
                                                marginLeft: 3,
                                                fontSize: hp("1.4%"),
                                                fontWeight: "normal",
                                                fontStyle: "normal",
                                                letterSpacing: 0,
                                                textAlign: "left",
                                                color: mowColors.textColor
                                            }}>

                                            {"("}{item["voteCount"]}{")"}

                                        </Text>

                                    </View> */}

                                            {/* price & discount view */}
                                            <View
                                                style={{ flexDirection: "row", marginTop: 5, alignItems: "center" }}>

                                                {/* discount rate view */}
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
                                                    style={{ marginLeft: 10 }}>

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
                                                        color: mowColors.textColor
                                                    }}>

                                                    {item["firstPrice"]}

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
                                                            marginTop: 1,
                                                            fontSize: hp("2%"),
                                                            fontWeight: "bold",
                                                            fontStyle: "normal",
                                                            letterSpacing: 0,
                                                            textAlign: "center",
                                                            color: mowColors.mainColor
                                                        }}>

                                                        {item.price} FCFA

                                                    </Text>

                                                </View>

                                            </View>
                                        </TouchableOpacity>
                                    </View>

                                )}
                            />
                    }



                </View>

                {/* Sport Prroduct view */}
                <View
                    style={[categoryStyle, { marginTop: 15, paddingRight: gPadding, backgroundColor: mowColors.categoryBGColor }]}>

                    {/* smart phones title view */}
                    <MowTitleView
                        buttonOnPress={() => {
                            props.navigation.navigate("ProductList", { idCat: 62, nameCart: "Rayon Sport" })
                        }}
                        title={"Rayon Sport"} />

                    {/* car accessories list */}
                    {
                        sprotProduct.length === 0 ? <ActivityIndicator size={"large"} color={"#0ba65a"} /> :
                            <FlatList
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}
                                keyExtractor={(item, index) => index.toString()}
                                data={sprotProduct.slice(0, 20)}
                                renderItem={({ item, index }) => (

                                    //car accessories list item
                                    <View
                                        style={{
                                            height: hp("33%"),
                                            margin: 10,
                                            marginTop: 0,
                                            flex: 1,
                                        }}
                                        key={index}>
                                        <TouchableOpacity onPress={() => props.navigation.navigate('ProductDetail', { product: item })} >
                                            {/* image view */}
                                            <View
                                                style={{
                                                    height: "70%",
                                                    width: "100%",
                                                    borderRadius: 10,
                                                    borderStyle: "solid",
                                                    borderWidth: 1,
                                                    borderColor: "rgba(112, 112, 112, 0.16)",
                                                    justifyContent: "center"
                                                }}>

                                                {/* hearth icon touchable */}
                                                {/* <TouchableOpacity
                                                    style={{ position: "absolute", top: 5, right: 5, zIndex: 99 }}>

                                                    <FAIcon
                                                        style={{
                                                            color: mowColors.titleTextColor,
                                                            fontSize: hp("2%")
                                                        }}
                                                        name={"heart"} />

                                                </TouchableOpacity> */}

                                                <Image
                                                    style={{
                                                        height: "100%",
                                                        width: "100%",
                                                    }}
                                                    resizeMode={"contain"}
                                                    source={{ uri: `https://leratel.com/storage/${item?.image}` }} />

                                                {
                                                    item["new"] &&

                                                    <View
                                                        style={{
                                                            position: "absolute",
                                                            backgroundColor: mowColors.mainColor,
                                                            top: 5,
                                                            left: 5,
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

                                            </View>

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
                                                    color: mowColors.titleTextColor
                                                }}>

                                                {item.name}

                                            </Text>

                                            {/* star view */}
                                            {/* <View
                                        style={{ flexDirection: "row", alignItems: "center", marginTop: 5 }}>

                                        stars
                                        <MowStarView
                                            score={item["star"]} />

                                        vote count text
                                        <Text
                                            style={{
                                                marginLeft: 2,
                                                fontSize: hp("1.4%"),
                                                fontWeight: "normal",
                                                fontStyle: "normal",
                                                letterSpacing: 0,
                                                textAlign: "left",
                                                color: mowColors.textColor
                                            }}>

                                            {"("}{item["voteCount"]}{")"}

                                        </Text>

                                    </View> */}

                                            {/* price text */}
                                            <Text
                                                style={{
                                                    marginTop: 5,
                                                    fontSize: hp("2%"),
                                                    fontWeight: "bold",
                                                    fontStyle: "normal",
                                                    letterSpacing: 0,
                                                    textAlign: "left",
                                                    color: mowColors.titleTextColor
                                                }}>

                                                {item.price} FCFA

                                            </Text>
                                        </TouchableOpacity>
                                    </View>

                                )}
                            />
                    }


                </View>

                <View
                    style={[categoryStyle, { marginTop: 15, paddingRight: gPadding, backgroundColor: mowColors.categoryBGColor }]}>

                    {/* smart phones title view */}
                    <MowTitleView
                        showButton={false}
                        title="quelques produits" />
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', flex: 1 }}>

                        {
                            !productList.length ? <ActivityIndicator size='large' color='#383838' /> :
                                productList.map((item, index) => {
                                    return (
                                        <View
                                            style={{
                                                height: hp("33%"),
                                                margin: 10,
                                                marginTop: 0,
                                                width: '42%'
                                            }}
                                            key={index}>
                                            <TouchableOpacity onPress={() =>
                                                props.navigation.navigate('ProductDetail', { product: item })
                                            } >
                                                {/* image view */}
                                                <View
                                                    style={{
                                                        height: "70%",
                                                        width: "100%",
                                                        borderRadius: 10,
                                                        borderStyle: "solid",
                                                        borderWidth: 1,
                                                        borderColor: "rgba(112, 112, 112, 0.16)",
                                                        justifyContent: "center"
                                                    }}>

                                                    {/* hearth icon touchable */}
                                                    {/* <TouchableOpacity
                                                        style={{ position: "absolute", top: 5, right: 5, zIndex: 99 }}>

                                                        <FAIcon
                                                            style={{
                                                                color: mowColors.titleTextColor,
                                                                fontSize: hp("2%")
                                                            }}
                                                            name={"heart"} />

                                                    </TouchableOpacity> */}

                                                    <Image
                                                        style={{
                                                            height: "100%",
                                                            width: "100%",
                                                        }}
                                                        resizeMode={"contain"}
                                                        source={{ uri: "https://leratel.com/storage/" + item?.image }} />

                                                    {
                                                        item["new"] &&

                                                        <View
                                                            style={{
                                                                position: "absolute",
                                                                backgroundColor: mowColors.mainColor,
                                                                top: 5,
                                                                left: 5,
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

                                                </View>

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
                                                        color: mowColors.titleTextColor
                                                    }}>

                                                    {item.name}

                                                </Text>

                                                {/* star view */}
                                                <View
                                                    style={{ flexDirection: "row", alignItems: "center", marginTop: 5 }}>

                                                    {/* stars*/}
                                                    <MowStarView
                                                        score={item["star"]} />

                                                    {/* vote count text */}
                                                    <Text
                                                        style={{
                                                            marginLeft: 2,
                                                            fontSize: hp("1.4%"),
                                                            fontWeight: "normal",
                                                            fontStyle: "normal",
                                                            letterSpacing: 0,
                                                            textAlign: "left",
                                                            color: mowColors.textColor
                                                        }}>

                                                        {/* {"("}{item["voteCount"]}{")"} */}

                                                    </Text>

                                                </View>

                                                {/* price text */}
                                                <Text
                                                    style={{
                                                        marginTop: 5,
                                                        fontSize: hp("2%"),
                                                        fontWeight: "bold",
                                                        fontStyle: "normal",
                                                        letterSpacing: 0,
                                                        textAlign: "left",
                                                        color: mowColors.titleTextColor
                                                    }}>

                                                    {item.sale_price}

                                                </Text>
                                            </TouchableOpacity>
                                        </View>
                                    )
                                })
                        }
                    </View>
                </View>
            </ScrollView>

        </MowContainer>

    );
}

export default HomeScreen
