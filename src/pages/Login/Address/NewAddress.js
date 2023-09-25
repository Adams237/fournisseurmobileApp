import React, { useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { mowStrings } from "../../../values/Strings/MowStrings";
import { mowColors } from "../../../values/Colors/MowColors";
import MowContainer from "../../../components/ui/Core/Container/MowContainer";
import { MowInput } from "../../../components/ui/Common/Input/MowInput";
import { MowButtonBasic } from "../../../components/ui/Common/Button/MowButton";
import { borderStyle, fontFamily, pageContainerStyle } from "../../../values/Styles/MowStyles";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { View } from "react-native";
import { MowPicker } from "../../../components/ui/Common/Picker/MowPicker";
import { useDispatch } from "react-redux";
import { auth } from "../../../redurcer/userSlice";

const NewAddress = (props) => {

    const dispatch = useDispatch()

    const [value, setValue] = useState({
        phone: "",
        country: "",
        city: "",
        town: "",
        fullAddress: "",
        title: "",
        // pickerData: [],
        // pickerType: 0,
        // pickerVisible: false,
        // pickerTitle: ""
    })

    /**
     *  these style values are here because of the color change.
     *  when changed the color, styles that are outside the class, are not re-rendered!
     */
    const iconColor = mowColors.mainColor;

    // const pickerStyle = {
    //     container: {
    //         marginVertical: 5,
    //     },
    //     button: {
    //         ...borderStyle,
    //         backgroundColor: mowColors.viewBGColor
    //     },
    //     buttonText: {
    //         width: "63%",
    //         fontSize: hp("1.8%"),
    //         fontWeight: "normal",
    //         fontStyle: "normal",
    //         letterSpacing: 0,
    //         textAlign: "left",
    //         fontFamily: fontFamily.regular,
    //         color: "#aeaeae"
    //     },
    //     buttonIcon: {
    //         color: mowColors.mainColor
    //     }
    // };

    const inputStyle = {
        container: {
            backgroundColor: mowColors.viewBGColor
        }
    };



    // to store entered regular from user
    const onChangeText = (key, text) => {
        setValue({
            ...value,
            [key]: text,
        })
    };

    /**
     *      type -->
     *              1: country
     *              2: city
     *              2: town
     * */
    const _handleSaveAdrress = () => {
        if (!value.title || !value.city || !value.country || !value.fullAddress || !value.phone || !value.town) {
            props.navigation.navigate('AddressList',{myCart: props.route.params.myCart})
        } else {
            let newArray = { ...props.route.params.user }
            if (newArray.address) {
                newArray.address = Object.keys(newArray.address).map(function (cle) {
                    return newArray.address[cle];
                });
                if (newArray.address.length >= 3) {
                    newArray.address[0] = value
                    dispatch(auth(newArray))
                    props.navigation.navigate('AddressList',{myCart: props.route.params.myCart})
                } else {
                    newArray.address.push(value)
                    dispatch(auth(newArray))
                    props.navigation.navigate('AddressList',{myCart: props.route.params.myCart})
                }

            } else {
                newArray = { ...newArray, address: [] }
                newArray.address.push(value)
                dispatch(auth(newArray))
                props.navigation.navigate('AddressList',{myCart: props.route.params.myCart})
            }

        }

    }
    const _onSelect = (selectedItem) => {

        setValue({ ...value, pickerVisible: false });

        let type = value.pickerType;

        if (type === 1) {
            setValue({ ...value, country: selectedItem["title"] })
        }
        else if (type === 2) {
            setValue({ ...value, city: selectedItem["title"] })
        }
        else if (type === 3) {
            setValue({ ...value, town: selectedItem["title"] })
        }

    }

    return (

        <MowContainer
            title={'Ajouter une Nouvelle Address'}
            navigation={props.navigation}
        >

            <KeyboardAwareScrollView
                style={pageContainerStyle}
                showsVerticalScrollIndicator={false}>



                {/* phone input */}
                <MowInput
                    containerStyle={inputStyle.container}
                    onChangeText={text => onChangeText('phone', text)}
                    placeholder={'Numéro de téléphone'}
                    iconColor={iconColor}
                    leftIcon={"phone"}
                    type={"number"} />

                {/* address title input */}
                <MowInput
                    containerStyle={inputStyle.container}
                    onChangeText={text => onChangeText('title', text)}
                    placeholder={"Titre de l'Address"}
                    iconColor={iconColor}
                    leftIcon={"navigation"}
                    type={"text"} />

                {/* country picker */}
                <MowInput
                    containerStyle={inputStyle.container}
                    onChangeText={text => onChangeText('country', text)}
                    placeholder={'Pays'}
                    iconColor={iconColor}
                    leftIcon={"globe"}
                    type={"text"} />
                {/* <View
                        style={pickerStyle.container}>

                        <MowButtonBasic
                            onPress={() => { setValue({ ...value, pickerData: CountryList, pickerVisible: true, pickerType: 1, pickerTitle: mowStrings.placeholder.country }) }}
                            leftIcon={"globe"}
                            leftIconStyle={pickerStyle.buttonIcon}
                            textStyle={pickerStyle.buttonText}
                            containerStyle={pickerStyle.button}>

                            {value.country}

                        </MowButtonBasic>

                    </View> */}

                {/* city picker */}
                <MowInput
                    containerStyle={inputStyle.container}
                    onChangeText={text => onChangeText('city', text)}
                    placeholder={'Ville'}
                    iconColor={iconColor}
                    leftIcon={"globe"}
                    type={"text"} />
                {/* <View
                        style={pickerStyle.container}>


                        <MowButtonBasic
                            onPress={() => { setValue({ ...value, pickerData: CityList, pickerVisible: true, pickerType: 2, pickerTitle: mowStrings.placeholder.city }) }}
                            leftIcon={"globe"}
                            leftIconStyle={pickerStyle.buttonIcon}
                            textStyle={pickerStyle.buttonText}
                            containerStyle={pickerStyle.button}>

                            {value.city}

                        </MowButtonBasic>

                    </View> */}

                {/* town picker */}
                <MowInput
                    containerStyle={inputStyle.container}
                    onChangeText={text => onChangeText('town', text)}
                    placeholder={'Quartier'}
                    iconColor={iconColor}
                    leftIcon={"globe"}
                    type={"text"} />
                {/* <View
                        style={pickerStyle.container}>

                        <MowButtonBasic
                            onPress={() => { setValue({ ...value, pickerData: TownList, pickerVisible: true, pickerType: 3, pickerTitle: mowStrings.placeholder.town }) }}
                            leftIcon={"globe"}
                            leftIconStyle={pickerStyle.buttonIcon}
                            textStyle={pickerStyle.buttonText}
                            containerStyle={pickerStyle.button}>

                            {value.town}

                        </MowButtonBasic>

                    </View> */}

                <MowInput
                    containerStyle={inputStyle.container}
                    onChangeText={text => onChangeText('fullAddress', text)}
                    placeholder={'description du lieu de livraison'}
                    iconColor={iconColor}
                    leftIcon={"navigation"}
                    type={"textarea"} />

            </KeyboardAwareScrollView>

            <View
                style={{ marginHorizontal: wp("3%") }}>

                {/* save address button */}
                <MowButtonBasic
                    onPress={_handleSaveAdrress}
                    size={"medium"}
                    type={"success"}>

                    {/* {mowStrings.button.saveAddress} */}
                    Sauvegarder L'address

                </MowButtonBasic>

            </View>

            <MowPicker
                pickerTitle={value.pickerTitle}
                search={false}
                data={value.pickerData}
                onSelect={(obj) => { _onSelect(obj) }}
                modalVisible={value.pickerVisible} />

        </MowContainer>

    )


}

export default NewAddress