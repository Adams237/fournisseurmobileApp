import React, { useEffect, useState } from "react";
import { FlatList, View, Text, Image, TouchableOpacity, ActivityIndicator } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSelector } from "react-redux";
import axios from "axios";

import { mowStrings } from "../../../values/Strings/MowStrings";
import MowContainer from "../../../components/ui/Core/Container/MowContainer";
import MowListItem from "../../../components/ui/Common/ListItem/MowListItem";
import { cardStyle, pageContainerStyle } from "../../../values/Styles/MowStyles";
import { getCategories } from "../../../utils/apiEcommerce";


const Categories = (props) => {
    const [category, setCategory] = useState(2)
    const [showTabBar, setShowTabBar] = useState(false)
    const currentUSer = useSelector(state => state.currentUSer.value)
    const [categories, setCategories] = useState([])
    const [error, setError] = useState(false)
    const [step, setStep] = useState(0)
    const [end, setEnd] = useState(20)
    const [sizeProdutcs, setSizeProducts] = useState(0)

    const categorie = props.route.params.categories

    const setAllCategories = async () => {
        if (categorie.length) {
            setCategories(categorie)
            setSizeProducts(categorie.length)
        }
        else {
            try {
                const { data } = await axios.get(getCategories)
                setCategories(data.data)
                setSizeProducts(data.data.length)
            } catch (err) {
                setError(true)
                console.log(err);
            }

        }


    }

    useEffect(() => {
        setAllCategories()
    }, []);

    const updateShow = () => {
        setShowTabBar(false)
        if (currentUSer.length) {
            setShowTabBar(true)
        }
    }

    useEffect(() => {
        updateShow()
    }, [currentUSer])

    const getCategory = () => {
        props.navigation.addListener("willFocus", async () => {
            // to get category value that selected from settings
            let categori = await AsyncStorage.getItem("category");
            if (!categori) {
                // to set category value
                setCategory(1);
            }
            else {
                // to set category value
                setCategory({ category: category });
            }
        })
    }


    useEffect(() => {
        getCategory();
    }, [])
    const productPaginaton = (flag) => {
        if (flag) {
            if (sizeProdutcs - end < 20) {
                setStep(sizeProdutcs - end)
                setEnd(sizeProdutcs)
                // setCategories(categorie.slice(step, end))
            } else {
                setStep(end)
                setEnd(end + end)
                // setCategories(categorie.slice(step, end))
            }


        }
        else {
            if (step - 20 < 0) {
                setEnd(20)
                setStep(0)
                // setCategories(categorie.slice(step, end))
            } else {
                setEnd(step)
                setStep(step - 20)
                // setCategories(categorie.slice(step, end))
            }

        }
    }


    return (

        <MowContainer
            footerActiveIndex={2}
            statusBar={true}
            title={mowStrings.categories.title}
            navigation={props.navigation}
            footer={showTabBar}
        >

            {/* category list */}
            {
                category === 1 && (
                    categories.length ? (
                        <FlatList
                            showsVerticalScrollIndicator={false}
                            keyExtractor={(item, index) => index.toString()}
                            data={categories}
                            style={[pageContainerStyle]}
                            renderItem={({ item, index }) => (

                                // category item
                                <MowListItem
                                    key={index}
                                    style={{ marginVertical: 5, borderRadius: 5 }}
                                    onPress={() => { props.navigation.navigate("CategoryDetail") }}
                                    imagePath={"https://leratel.com/storage/" + item?.image}
                                    title={item.name} />

                            )}
                        />
                    ) : (<ActivityIndicator size="large" color="#0ba65a" />)
                )


            }

            {/* category list2 */}
            {
                category === 2 &&
                (
                    categories.length ? (
                        <FlatList
                            numColumns={2}
                            showsVerticalScrollIndicator={false}
                            keyExtractor={(item, index) => index.toString()}
                            data={categories.slice(step,end)}
                            style={[pageContainerStyle]}
                            renderItem={({ item, index }) => (

                                // category item
                                <TouchableOpacity
                                    onPress={() => { props.navigation.navigate("ProductList", { idCat: item['id'] }) }}
                                    key={index}
                                    style={{ flex: 1, margin: 10, marginHorizontal: 15, alignItems: "center", justifyContent: "flex-end", borderRadius: 5 }}>

                                    <Image
                                        style={{ width: "100%", height: hp(18), borderRadius: 5 }}
                                        source={{ uri: "https://leratel.com/storage/" + item?.image }}
                                        resizeMode={"stretch"} />

                                    <View
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                            position: "absolute",
                                            zIndex: 1,
                                            alignItems: "center",
                                            justifyContent: "center",
                                            opacity: 0.45,
                                            borderRadius: 5,
                                            backgroundColor: "#000000"
                                        }} />

                                    <Text
                                        style={{
                                            position: "absolute",
                                            color: "white",
                                            fontSize: hp(2),
                                            textAlign: "center",
                                            zIndex: 2,
                                            fontWeight: "bold",
                                            fontStyle: "normal",
                                            lineHeight: 27,
                                            letterSpacing: 0,
                                            bottom: 10,
                                        }}>

                                        {item.name}

                                    </Text>

                                </TouchableOpacity>

                            )}
                        />
                    ) : (
                        !error ? (<ActivityIndicator size="large" color="#0ba65a" />) : (
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ color: 'red', textAlign: 'center', fontSize: 16, fontWeight: 'bold' }}>
                                    Vérifier votre connexion internet
                                </Text>
                            </View>
                        )

                    )
                )


            }
            <View style={{ flexDirection: 'row', justifyContent: step !== 0 ? 'space-between' : 'flex-end', marginBottom: 5 }}>
                {step !== 0 && <TouchableOpacity
                    style={{
                        width: '30%',
                        borderRadius: 30,
                        borderWidth: 1,
                        borderColor: '#0ba65a',
                        height: hp(7),
                        justifyContent: 'center',
                        marginLeft: 5
                    }}
                    onPress={() => productPaginaton(false)}>
                    <Text style={{ textAlign: 'center', fontSize: hp(2) }}>Précédent</Text>
                </TouchableOpacity>}
                <TouchableOpacity
                    style={{
                        width: '30%',
                        borderRadius: 30,
                        borderWidth: 1,
                        borderColor: '#0ba65a',
                        height: hp(7),
                        justifyContent: 'center',
                        marginLeft: 5
                    }}
                    onPress={() => productPaginaton(true)}
                >
                    <Text style={{ textAlign: 'center', fontSize: hp(2) }}>Suivant</Text>
                </TouchableOpacity>
            </View>
        </MowContainer>

    )


}

export default Categories