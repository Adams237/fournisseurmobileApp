import React, { useState, useEffect } from "react";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { useSelector } from "react-redux";
import { FlatList, View, Text, TouchableOpacity, Modal, Alert, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";

import { mowStrings } from "../../../values/Strings/MowStrings";
import MowContainer from "../../../components/ui/Core/Container/MowContainer";
import MyOrders from "../../../sampleData/Orders/MyOrders";
import MowOrderViewItem from "../../../components/ui/MowOrderViewItem";
import { mowColors } from "../../../values/Colors/MowColors";
import CanceledOrders from "../../../sampleData/Orders/CanceledOrders";
import ReturnedOrders from "../../../sampleData/Orders/ReturnedOrders";
import { MowInput } from "../../../components/ui/Common/Input/MowInput";
import { validateLivraison } from "../../../redurcer/orderSlice";

const OrderList = (props) => {

    const userOrder = useSelector(state => state.userOrder.values)

    const [visibility, setModalVisible] = useState(false)

    const [value, setValue] = useState({
        showAll: true,
        Livre: false,
        Livraison: false,
        orderData: MyOrders
    })
    const [order, setOrder] = useState()
    const [orderchoice, setOrderChoice] = useState()

    const updateOrder = () => {
        if (userOrder) {
            setOrder(userOrder)
        }

    }

    useEffect(() => {
        updateOrder()
    }, [userOrder])


    const categoryButtonStyle = {
        parent: {
            flexDirection: "row",
        },
        container: {
            flex: 1,
            marginVertical: 10,
            marginHorizontal: 25,
        },
        button: {

        },
        activeButton: {
            borderBottomWidth: 2,
            borderBottomColor: mowColors.successColor,
            paddingBottom: 5
        },
        text: {
            textAlign: "center",
            fontSize: hp("1.7"),
            fontWeight: "normal",
            fontStyle: "normal",
            letterSpacing: 0,
            color: mowColors.titleTextColor
        },
        activeText: {
            textAlign: "center",
            fontSize: hp("1.7"),
            fontWeight: "bold",
            fontStyle: "normal",
            letterSpacing: 0,
            color: mowColors.titleTextColor,
        }
    };


    const _handleSelection = (showAll, Livre, Livraison) => {
        if (showAll) {
            setValue({ ...value, orderData: MyOrders });
            setOrder(userOrder)
        }
        else if (Livre) {
            setValue({ ...value, orderData: CanceledOrders });
            const newArray = userOrder.filter(order => order.delivered === true)
            setOrder(newArray)
        }
        else if (Livraison) {
            setValue({ ...value, orderData: ReturnedOrders });
            const newArray = userOrder.filter(order => order.delivered === false)
            setOrder(newArray)
        }
        setValue({ ...value, showAll: showAll, Livre: Livre, Livraison: Livraison });
    }

    const valider = (item) => {
        setModalVisible(true);
        setOrderChoice(item)
    }
    const annuler = () => {

    }


    return (

        <MowContainer
            footerActiveIndex={4}
            title={"Mes commandes"}
            navigation={props.navigation}
        >

            <View
                style={categoryButtonStyle.parent}>

                {/* show all button view */}
                <View
                    style={categoryButtonStyle.container}>

                    {/* show all button */}
                    <TouchableOpacity
                        onPress={() => { _handleSelection(true, false, false) }}
                        style={value.showAll ? categoryButtonStyle.activeButton : categoryButtonStyle.button}>

                        {/* show all text */}
                        <Text
                            style={categoryButtonStyle.text}>

                            {/* {mowStrings.orderList.showAll} */}
                            Tout AFficher

                        </Text>

                    </TouchableOpacity>

                </View>

                {/* Livré view */}
                <View
                    style={categoryButtonStyle.container}>

                    {/* Livré button */}
                    <TouchableOpacity
                        onPress={() => { _handleSelection(false, true, false) }}
                        style={value.Livre ? categoryButtonStyle.activeButton : categoryButtonStyle.button}>

                        {/* Livré text */}
                        <Text
                            style={categoryButtonStyle.text}>

                            Livré

                        </Text>

                    </TouchableOpacity>

                </View>

                {/* Livraison view */}
                <View
                    style={categoryButtonStyle.container}>

                    {/* Livraison button */}
                    <TouchableOpacity
                        onPress={() => { _handleSelection(false, false, true) }}
                        style={value.Livraison ? categoryButtonStyle.activeButton : categoryButtonStyle.button}>

                        {/* Livraison text */}
                        <Text
                            style={categoryButtonStyle.text}>

                            Livraison en cour..

                        </Text>

                    </TouchableOpacity>

                </View>

            </View>

            <FlatList
                showsVerticalScrollIndicator={false}
                keyExtractor={(item, index) => index.toString()}
                data={order}
                renderItem={({ item, index }) => (

                    <View
                        key={index}>

                        {/* title view */}
                        <View
                            style={{ backgroundColor: "#aeaeae" }}>

                            {/* title pice text */}
                            <View
                                style={{
                                    fontSize: hp("1.8%"),
                                    textAlign: "left",
                                    marginLeft: 20,
                                    paddingVertical: 10,
                                    justifyContent: 'space-between',
                                    flexDirection: 'row'
                                }}>
                                <Text style={{ color: 'white', marginTop: 5, fontWeight: "bold", fontStyle: "normal", letterSpacing: 0, }}>
                                    {item.price}$
                                </Text>

                                {
                                    item.delivered ? <Text style={{ color: 'white', marginRight: 20, fontWeight: "bold", fontStyle: "normal", letterSpacing: 0, }}>Livre</Text>
                                        : <Text style={{ color: 'white', marginRight: 20 }} > Livraison en cour</Text>
                                }
                                {/* {item.adress?.fullAddress}/{item.adress?.date} */}
                            </View>

                        </View>

                        {/* All products in the same Cart */}
                        {value.showAll && <View
                            style={{ marginVertical: hp("2%") }}>

                            {
                                Object.entries(item.products).map((value, key) => {
                                    return (

                                        // product item 
                                        <MowOrderViewItem
                                            opacity={value.canceled || value.returned}
                                            indice={Number(index + '' + key)}
                                            product={value[1]}
                                            adress = {item.adress}
                                            modelPay={item.modelPay}
                                            navigation={props.navigation}
                                        />

                                    )
                                })
                            }
                            {
                                !item.delivered &&
                                <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', }}>
                                    <TouchableOpacity style={{
                                        width: '80%',
                                        height: 40,
                                        marginBottom: 10,
                                        borderWidth: 1,
                                        borderColor: '#0ba65a',
                                        backgroundColor: '#0ba65a',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        borderRadius: 20
                                    }}
                                        onPress={() => valider(item)}
                                    >
                                        {item.paid ? <Text style={{ color: 'white', textAlign: 'center', }} >
                                            Confirmer la reception du colis
                                        </Text> : <Text style={{ color: 'white', textAlign: 'center', }} >
                                            Procéder au payement
                                        </Text>}
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{
                                        width: '80%',
                                        height: 40,
                                        borderWidth: 1,
                                        borderColor: '#383838',
                                        backgroundColor: 'gray',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        borderRadius: 20
                                    }}
                                        onPress={() => annuler(item)}
                                    >
                                        <Text style={{ color: 'white', textAlign: 'center', }} >
                                            Annuler
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            }


                        </View>}
                        {/*  products livre in the same Cart */}
                        {value.Livre && <View
                            style={{ marginVertical: hp("2%") }}>

                            {
                                Object.entries(item.products).map((value, key) => {
                                    return (

                                        // product item 
                                        <MowOrderViewItem
                                            opacity={value.canceled || value.returned}
                                            indice={Number(index + '' + key)}
                                            product={value[1]}
                                            navigation={props.navigation}
                                        />

                                    )
                                })
                            }

                        </View>}
                        {/*  products livraison in the same Cart */}
                        {value.Livraison && <View
                            style={{ marginVertical: hp("2%") }}>

                            {
                                Object.entries(item.products).map((value, key) => {
                                    return (

                                        // product item 
                                        <MowOrderViewItem
                                            opacity={value.canceled || value.returned}
                                            indice={Number(index + '' + key)}
                                            product={value[1]}
                                            navigation={props.navigation}
                                        />

                                    )
                                })
                            }
                            <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', }}>
                                <TouchableOpacity style={{
                                    width: '80%',
                                    height: 40,
                                    marginBottom: 10,
                                    borderWidth: 1,
                                    borderColor: '#0ba65a',
                                    backgroundColor: '#0ba65a',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderRadius: 20
                                }}
                                    onPress={() => valider(item)}
                                >
                                    {item.paid ? <Text style={{ color: 'white', textAlign: 'center', }} >
                                        Confirmer la reception du colis
                                    </Text> : <Text style={{ color: 'white', textAlign: 'center', }} >
                                        Procéder au payement
                                    </Text>}
                                </TouchableOpacity>
                                <TouchableOpacity style={{
                                    width: '80%',
                                    height: 40,
                                    borderWidth: 1,
                                    borderColor: '#383838',
                                    backgroundColor: 'gray',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderRadius: 20
                                }}
                                    onPress={() => annuler(item)}
                                >
                                    <Text style={{ color: 'white', textAlign: 'center', }} >
                                        Annuler
                                    </Text>
                                </TouchableOpacity>
                            </View>

                        </View>}

                    </View>

                )}

            />

            <ModalValidate modalVisible={visibility} setModalVisible={setModalVisible} orderchoice={orderchoice} />
        </MowContainer>

    )

}

const ModalValidate = ({ modalVisible, setModalVisible, orderchoice }) => {
    const dispatch = useDispatch()
    const valideLivraison = (item) => {
        setModalVisible(!modalVisible)
        dispatch(validateLivraison(item))
    }
    return (
        <View style={styles.centeredView}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    setModalVisible(!modalVisible);
                }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Entrer le code de validation</Text>
                        <MowInput
                            iconColor={'green'}
                            rightIcon={"check"}
                            value={orderchoice?.id}
                            containerStyle={styles.inputContainer}
                            textInputStyle={styles.inputText} />
                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity
                                style={[styles.button, styles.buttonValidate]}
                                onPress={() => valideLivraison(orderchoice?.id)}>
                                <Text style={styles.textStyle}>valider</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => setModalVisible(!modalVisible)}>
                                <Text style={styles.textStyle}>Annuler</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                </View>
            </Modal>
        </View>
    )
};
const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: '90%'
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        width: '40%',
        marginRight: 10,
    },
    buttonValidate: {
        backgroundColor: '#0ba65a',
    },
    buttonClose: {
        backgroundColor: '#383838',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
        color: '#0ba65a'
    },
    inputContainer: {
        backgroundColor: "transparent",
        orderStyle: "solid",
        borderWidth: 0,
        borderBottomWidth: 1,
        borderBottomColor: "#0ba65a",
        width: "100%"
    },
    inputText: {
        fontSize: hp("2.2%"),
        fontWeight: "500",
        fontStyle: "normal",
        letterSpacing: 0,
        textAlign: "left",
        color: "#0ba65a",
        width: "85%"
    },
});

export default OrderList