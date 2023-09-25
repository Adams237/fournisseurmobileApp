import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import FatherIcon from "react-native-vector-icons/Feather";
import PropTypes from 'prop-types';
import { Badge } from 'react-native-elements';
import { useSelector } from 'react-redux';
import axios from 'axios';

import { footerHeight } from "../../../../values/Constants/MowConstants";
import { mowStrings } from "../../../../values/Strings/MowStrings";
import { mowColors } from "../../../../values/Colors/MowColors";
import { getCategories } from '../../../../utils/apiEcommerce';


const MowFooter = (props) => {
    const userCart = useSelector(state => state.userCart)
    const userOrder = useSelector(state => state.userOrder.values)
    const [orderSize, setOderSize] = useState(0)
    // console.log(userOrder);
    const [quantity, setQuantity] = useState(0)
    const [categories, setCategories] = useState({})

    function SortArray(x, y) {
        if (x.name < y.name) { return -1; }
        if (x.name > y.name) { return 1; }
        return 0;
    }

    const setOrder = () => {
        const arraOrder = userOrder.filter((order) => order.delivered === false)
        setOderSize(arraOrder.length);
    }
    useEffect(() => {
        setOrder();
    }, [userOrder])

    const setAllCategories = async () => {
        try {
            const { data } = await axios.get(getCategories)
            setCategories(data.data.sort(SortArray))

        } catch (error) {

        }
    }

    useEffect(() => {
        setAllCategories()
    }, [])

    const updateQuantiy = () => {
        if (userCart) { setQuantity(userCart.quantity); }
    };
    useEffect(() => {
        updateQuantiy()
    }, [userCart])


    return (

        <View
            style={{
                height: footerHeight,
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                width: '100%',
                flexDirection: "row",
                backgroundColor: mowColors.footer,
                shadowColor: "rgba(0, 0, 0, 0.11)",
                shadowOffset: {
                    width: 0,
                    height: -3
                },
                shadowRadius: 4,
                shadowOpacity: 1,
                borderTopWidth: 0.5,
                borderTopColor: "#a1a1a1"
            }}>

            {/* explore button*/}
            <TouchableOpacity
                onPress={() => { props.navigation.navigate("Home") }}
                style={styles.buttonView}>

                <FatherIcon
                    name={"home"}
                    style={[styles.buttonIcon, { color: props.activeIndex === 1 ? mowColors.mainColor : "#a1a1a1" }]} />

                <Text
                    style={[styles.buttonText, { color: props.activeIndex === 1 ? mowColors.mainColor : "#a1a1a1" }]}>

                    {mowStrings.explore}

                </Text>

            </TouchableOpacity>

            {/* categories button*/}
            <TouchableOpacity
                onPress={() => { props.navigation.navigate("Categories", { categories: categories }) }}
                style={styles.buttonView}>

                <FatherIcon
                    name={"grid"}
                    style={[styles.buttonIcon, { color: props.activeIndex === 2 ? mowColors.mainColor : "#a1a1a1" }]} />

                <Text
                    style={[styles.buttonText, { color: props.activeIndex === 2 ? mowColors.mainColor : "#a1a1a1" }]}>

                    {mowStrings._categories}

                </Text>

            </TouchableOpacity>

            {/* cart button*/}
            <TouchableOpacity
                onPress={() => { props.navigation.navigate("Cart") }}
                style={styles.buttonView}>
                <View style={{ flexDirection: 'row' }}>
                    <FatherIcon
                        name={"shopping-bag"}
                        style={[styles.buttonIcon, { color: props.activeIndex === 3 ? mowColors.mainColor : "#a1a1a1", position: 'relative' }]} />
                    <Badge value={quantity} textStyle={{ color: 'white' }}>
                    </Badge>
                </View>
                <Text
                    style={[styles.buttonText, { color: props.activeIndex === 3 ? mowColors.mainColor : "#a1a1a1" }]}>

                    {/* {mowStrings.cart} */}
                    Mon Panier

                </Text>

            </TouchableOpacity>

            {/* orders button*/}
            <TouchableOpacity
                onPress={() => { props.navigation.navigate("OrderList") }}
                style={styles.buttonView}>
                <View style={{ flexDirection: 'row' }}>
                    <FatherIcon
                        name={"box"}
                        style={[styles.buttonIcon, { color: props.activeIndex === 4 ? mowColors.mainColor : "#a1a1a1" }]} />
                    <Badge value={orderSize} textStyle={{ color: 'white' }}>
                    </Badge>
                </View>
                <Text
                    style={[styles.buttonText, { color: props.activeIndex === 4 ? mowColors.mainColor : "#a1a1a1" }]}>

                    {/* {mowStrings.orders} */}
                    Commandes

                </Text>

            </TouchableOpacity>

        </View>
    )

}
MowFooter.propTypes = {
    activeIndex: PropTypes.number
};

export default MowFooter;

const styles = StyleSheet.create({
    buttonView: {
        flex: 1,
        alignItems: "center",
        height: "100%"
    },
    buttonIcon: {
        marginTop: hp("1%"),
        fontSize: wp("5.2%"),
    },
    buttonText: {
        fontSize: wp("3.5%"),
        marginTop: hp("0.5%")
    }
});