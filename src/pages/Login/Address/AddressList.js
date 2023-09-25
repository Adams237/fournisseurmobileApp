import React, { useEffect, useState } from 'react';
import {FlatList, Text, View, TouchableOpacity} from 'react-native';
import {mowColors} from '../../../values/Colors/MowColors';
import MowContainer from '../../../components/ui/Core/Container/MowContainer';
import Address from "../../../sampleData/Address";
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";
import {borderStyle, categoryStyleWithoutShadow} from "../../../values/Styles/MowStyles";
import {MowButtonBasic} from "../../../components/ui/Common/Button/MowButton";
import {MowInfoHeader} from "../../../components/ui/MowInfoHeader";
import {MowCheckBox} from "../../../components/ui/Common/CheckBox/MowCheckBox";
import { useSelector } from "react-redux";
import { _warningDialog } from '../../../components/ui/Common/Dialog/MowDialogFunctions';

const Settings =  (props)=> {

    const userCart = useSelector(state=>state.userCart);
    const currentUSer = useSelector(state=>state.currentUSer.value);
    const [ value, setValue ] = useState({
         checkBoxArr:[],
        addressSelected: false,
        addressListKey: 0,
    });
    const [myCart,setMyCart] = useState({});
    const [addressList, setAddressList] = useState({
        address:[],
        isChoice:false
    });
    const [adressChoice, setAdressChoise] = useState({});

    const [user, setUser] = useState({});
    const updateUer = ()=>{
        if (currentUSer.length){
            setUser(currentUSer);
            setAddressList({...addressList, address:currentUSer[0].address});
        }
    };
    const updateMyCart = ()=>{
        if (userCart.price){
            setMyCart(userCart);
        }
    };

    useEffect(()=>{
        updateMyCart();
    },[userCart]);

    useEffect(()=>{
        updateUer();
    },[currentUSer]);

     const _handleAddressSelection = (index, item) => {
        let checkBoxArr = value.checkBoxArr;

        let length = Address.length;
        setAdressChoise(item);

        for (let i = 0; i < length; i++) {
            if (i !== index) {
                // to set false all array values except selected index
                checkBoxArr[i] = false;
            }
        }

        // to update selected item as its opposite
        checkBoxArr[index] = !checkBoxArr[index];

        setValue({ ...value, checkBoxArr: checkBoxArr, addressSelected: checkBoxArr[index], addressListKey: value.addressListKey + 1});
    };

   const  _goToPayment = () =>{
        if (value.addressSelected) {
            const date  = new Date();
            const dateNow = date.toLocaleDateString();
            props.navigation.navigate('PaymentInformation',{myCart: props.route.params.myCart, adress: {...adressChoice, date:dateNow}});
        }
        else {

            _warningDialog('Warning', "S'il Vous plais, veiller séclectioner une address de livraison ou en créer une ");

        }
    };


        return (

            <MowContainer
                style={{backgroundColor: mowColors.pageBGDarkColor}}
                title={myCart ? 'information De Livraison' : 'Mon Address'}
                navigation={props.navigation}
                >

                {/* show the view if the navigation comes from cart */}
                {/* info header view */}
                {
                    myCart &&

                        <MowInfoHeader
                            activeIndex={1}/>
                }

                {/* add new address button view */}
                <View
                    style={{
                        width: wp("45%"),
                        marginLeft: 10,
                        marginTop: 10
                    }}>

                    {/* add new address button */}
                    <MowButtonBasic
                        containerStyle={{marginVertical: 0}}
                        onPress={() => props.navigation.navigate("NewAddress",{user:user[0],myCart: props.route.params.myCart})}
                        size={"xSmall"}
                        stickyIcon={true}
                        leftIcon={"plus"}
                        type={"success"}
                        navigation={props.navigation}
                        >

                        {/* {mowStrings.button.addNewAddress} */}
                        Nouvelle Address

                    </MowButtonBasic>

                </View>

                <FlatList
                    key={value.addressListKey}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item, index) => index.toString()}
                    data={addressList.address}
                    style={{marginTop: 10}}
                    renderItem={({ item, index }) => (

                        <TouchableOpacity
                            onPress={() => {_handleAddressSelection(index, item)}}
                            key={index}
                            style={[categoryStyleWithoutShadow, {margin: 10, marginVertical: 7, flexDirection: "row", ...borderStyle, backgroundColor: mowColors.viewBGColor}]}>

                            {
                                myCart &&

                                <MowCheckBox
                                    onPress={() => {_handleAddressSelection(index, item)}}
                                    checkedColor={mowColors.mainColor}
                                    checked={value.checkBoxArr[index]}
                                    containerStyle={{marginRight: wp(5), alignSelf: "center"}}/>
                            }

                            <View
                                style={{right: wp(2)}}>

                                {/* title view */}
                                <Text
                                    style={{
                                        fontSize: hp("2%"),
                                        fontWeight: "500",
                                        fontStyle: "normal",
                                        letterSpacing: -0.01,
                                        textAlign: "left",
                                        color: mowColors.titleTextColor,
                                        width: "95%"
                                    }}>

                                    {item["title"]}

                                </Text>
                                <Text
                                    style={{
                                        fontSize: hp("2%"),
                                        fontWeight: "500",
                                        fontStyle: "normal",
                                        letterSpacing: -0.01,
                                        textAlign: "left",
                                        color: mowColors.titleTextColor,
                                        width: "95%"
                                    }}>

                                    {item["city"]}

                                </Text>

                                {/* address view */}
                                <Text
                                    style={{
                                        marginVertical: 3,
                                        opacity: 0.72,
                                        fontSize: hp("1.8%"),
                                        fontWeight: "500",
                                        fontStyle: "normal",
                                        lineHeight: 20,
                                        letterSpacing: 0,
                                        textAlign: "left",
                                        color: mowColors.titleTextColor,
                                        width: "90%"
                                    }}>

                                    {item["fullAddress"]}

                                </Text>

                                <View
                                    style={{flexDirection: "row"}}>

                                    {/* name text */}
                                    <Text
                                        style={{
                                            fontSize: hp("1.7%"),
                                            opacity: 0.72,
                                            fontWeight: "500",
                                            fontStyle: "normal",
                                            letterSpacing: 0,
                                            textAlign: "left",
                                            color: mowColors.titleTextColor,
                                        }}>

                                        {user[0].username}

                                    </Text>

                                    {/* number text */}
                                    <Text
                                        style={{
                                            fontSize: hp("1.7%"),
                                            opacity: 0.72,
                                            fontWeight: "500",
                                            fontStyle: "normal",
                                            letterSpacing: 0,
                                            textAlign: "left",
                                            color: mowColors.titleTextColor,
                                            marginLeft: 20
                                        }}>

                                        {item["phone"]}

                                    </Text>

                                </View>

                            </View>

                        </TouchableOpacity>

                    )}
                />

                {/* show the view if the navigation comes from cart */}
                {
                    myCart &&

                        <View
                            style={{margin: 10}}>

                            <MowButtonBasic
                                onPress={() => {_goToPayment()}}
                                type={"success"}>

                                {/* {mowStrings.button.goToPayment} */}
                                Enregistrer l'Address

                            </MowButtonBasic>

                        </View>
                }

            </MowContainer>

        )


}

export default Settings
