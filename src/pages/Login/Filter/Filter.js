import React, { useState } from "react";
import {View, ScrollView} from "react-native";
import MowContainer from "../../../components/ui/Core/Container/MowContainer";
import MowListItem from "../../../components/ui/Common/ListItem/MowListItem";
import MowCheckListItem from "../../../components/ui/Common/ListItem/MowCheckListItem";
import {BodySize, Brands, Categories, Colors, RatingScore} from "../../../sampleData/FilterData";
import {MowModal} from "../../../components/ui/Common/Modal/MowModal";
import {MowInput} from "../../../components/ui/Common/Input/MowInput";
import {gPadding} from "../../../values/Styles/MowStyles";
import {mowStrings} from "../../../values/Strings/MowStrings";
import {MowButtonBasic} from "../../../components/ui/Common/Button/MowButton";
import {heightPercentageToDP as hp} from "react-native-responsive-screen";
import MowCheckStarListItem from "../../../components/ui/Common/ListItem/MowCheckStarListItem";
import MowCheckColorListItem from "../../../components/ui/Common/ListItem/MowCheckColorListItem";
import {mowColors} from "../../../values/Colors/MowColors";
import PriceRangeData from "../../../sampleData/PriceRangeData";

const Filter =(props) =>{

      // to initialize filter data
    const [values, setValues] = useState({
        categories: Categories,
        categoryModalVisible: false,
        categorySelected: "",
        categorySelectedItems: [],
        brands: Brands,
        brandsModalVisible: false,
        brandsSelected: "",
        brandsSelectedItems: [],
        priceRange: PriceRangeData,
        priceRangeModalVisible: false,
        priceRangeSelected: "",
        priceRangeSelectedItems: [],
        colorModalVisible: false,
        colors: Colors,
        colorSelected: "",
        colorSelectedItems: [],
        bodySizeModalVisible: false,
        bodySize: BodySize,
        bodySizeSelected: "",
        bodySizeSelectedItems: [],
        ratingScoreModalVisible: false,
        ratingScoreSelected: "",
        ratingScoreSelectedItems: [],
        ratingScore: RatingScore,
        startPrice: "",
        endPrice: ""
    })

  
  

    const modalView = {
        container: {
            backgroundColor: mowColors.viewBGColor,
            flex: 1
        },
        listTitle: {
            color: mowColors.titleTextColor
        },
        listSubTitle: {
            color: mowColors.textColor
        },
        button: {
            backgroundColor: mowColors.mainColor
        }
    };

    // to store user input
    const onChangeText = (key, value) => {
        setValues({
            ...values,
            [key]: value,
        })
    };

    const _setSelectedItems = (key, value) => {
        setValues({
            ...values,
            [key]: value,
        })
    };

    // if flag -> item selected, else -> item unselected
    const _categoryCallback = (data, flag) => {
        let arr = values.categorySelectedItems;
        _handleArrayOperations(arr, "categorySelectedItems", flag, data)
    };

    // if flag -> item selected, else -> item unselected
    const _brandCallback = (data, flag) => {
        let arr = values.brandsSelectedItems;
        _handleArrayOperations(arr, "brandsSelectedItems", flag, data)
    };

    // if flag -> item selected, else -> item unselected
    const _priceRangeCallback = (data, flag) => {
        let arr = values.priceRangeSelectedItems;
        _handleArrayOperations(arr, "priceRangeSelectedItems", flag, data)
    };

    // if flag -> item selected, else -> item unselected
    const _colorCallback = (data, flag) => {
        let arr = values.colorSelectedItems;
        _handleArrayOperations(arr, "colorSelectedItems", flag, data)
    };

    // if flag -> item selected, else -> item unselected
    const _bodySizeCallback = (data, flag) => {
        let arr = values.bodySizeSelectedItems;
        _handleArrayOperations(arr, "bodySizeSelectedItems", flag, data)
    };

    // if flag -> item selected, else -> item unselected
    const _ratingScoreCallback = (data, flag) => {
        let arr = values.ratingScoreSelectedItems;
        _handleArrayOperations(arr, "ratingScoreSelectedItems", flag, data)
    };

    const _handleArrayOperations = (arr, key, flag, data)=> {

        if (flag) {
            arr.push(data);
        }
        else {
            if (arr) {
                // to remove item when unselected from array
                arr.splice(arr.indexOf(data), 1);
            }
        }

        _setSelectedItems(key, arr);
    }

    // to get all selection and sum in one string value to show user what selected
    const _arrayToString = (arr, key) => {
        let title = "";

        for (let i in arr) {
            title += arr[i]["title"] + ((i != arr.length - 1) ? ", " : "");
        }

        setValues({...values,[key]: title});
    }

    // to control user selection, data is selected or not by user
   const  _checkSelected = (data, id) => {
        let arr = [];

        for (let i in data) {
            let row = data[i];
            arr.push(row.id);
        }

        return arr.indexOf(id) !== -1;
    }

        return(

            <MowContainer
                style={{backgroundColor: mowColors.viewBGColor}}
                title={mowStrings.filter.title}
                navigation={props.navigation}
                >

                <View
                    style={{flex: 1}}>

                    {/* category item list */}
                    <ScrollView>

                        {/* category item */}
                        <MowListItem
                            border={true}
                            style={listItemStyle.container}
                            subtitleTextStyle={listItemStyle.subtitle}
                            title={mowStrings.filter.category}
                            subtitle={values.categorySelected}
                            onPress={() =>{setValues({ ...values,categoryModalVisible: true})}}/>

                        {/* brands item */}
                        <MowListItem
                            border={true}
                            style={listItemStyle.container}
                            subtitleTextStyle={listItemStyle.subtitle}
                            title={mowStrings.filter.brand}
                            subtitle={values.brandsSelected}
                            onPress={() =>{setValues({...values,brandsModalVisible: true})}}/>

                        {/* price range item */}
                        <MowListItem
                            border={true}
                            style={listItemStyle.container}
                            subtitleTextStyle={listItemStyle.subtitle}
                            title={mowStrings.filter.priceRange}
                            subtitle={values.priceRangeSelected}
                            onPress={() =>{setValues({ ...values,priceRangeModalVisible: true})}}/>

                        {/* color item */}
                        <MowListItem
                            border={true}
                            style={listItemStyle.container}
                            subtitleTextStyle={listItemStyle.subtitle}
                            title={mowStrings.filter.color}
                            subtitle={values.colorSelected}
                            onPress={() =>{setValues({ ...values, colorModalVisible: true})}}/>

                        {/* body size item */}
                        <MowListItem
                            border={true}
                            style={listItemStyle.container}
                            subtitleTextStyle={listItemStyle.subtitle}
                            title={mowStrings.filter.bodySize}
                            subtitle={values.bodySizeSelected}
                            onPress={() =>{setValues({ ...values, bodySizeModalVisible: true})}}/>

                        {/* rating score item */}
                        <MowListItem
                            border={true}
                            style={listItemStyle.container}
                            subtitleTextStyle={listItemStyle.subtitle}
                            title={mowStrings.filter.ratingScore}
                            subtitle={values.ratingScoreSelected}
                            onPress={() =>{setValues({ ...values, ratingScoreModalVisible: true})}}/>

                    </ScrollView>

                    {/* category modal */}
                    <MowModal
                        title={mowStrings.filter.category}
                        onClosed={() =>{ setValues({ ...values, categoryModalVisible: false})}}
                        modalVisible={values.categoryModalVisible}>

                        <View
                            style={modalView.container}>

                            {
                                values.categories.map((value, index) =>{

                                    return (
                                        <MowCheckListItem
                                            selected={_checkSelected(values.categorySelectedItems, value["id"])}
                                            key={index}
                                            item={value}
                                            titleTextStyle={modalView.listTitle}
                                            subtitleTextStyle={modalView.listSubTitle}
                                            title={value.title}
                                            onPress={_categoryCallback}/>
                                    )
                                })
                            }

                            {/* button view */}
                            <View
                                style={modalStyle.buttonView}>

                                {/* apply button */}
                                <MowButtonBasic
                                    onPress={() => {
                                        _arrayToString(values.categorySelectedItems, "categorySelected");
                                        setValues({ ...values, categoryModalVisible: false});
                                    }}
                                    stickyIcon={true}
                                    leftIcon={"check"}
                                    containerStyle={modalView.button}
                                    type={"success"}>

                                    {mowStrings.button.apply}

                                </MowButtonBasic>

                            </View>

                        </View>

                    </MowModal>

                    {/* brand modal */}
                    <MowModal
                        title={mowStrings.filter.brand}
                        onClosed={() =>{ setValues({ ...values, brandsModalVisible: false})}}
                        modalVisible={values.brandsModalVisible}>

                        <View
                            style={modalView.container}>

                            {
                                values.brands.map((value, index) =>{

                                    return (
                                        <MowCheckListItem
                                            selected={_checkSelected(values.brandsSelectedItems, value["id"])}
                                            titleTextStyle={modalView.listTitle}
                                            subtitleTextStyle={modalView.listSubTitle}
                                            key={index}
                                            item={value}
                                            title={value.title}
                                            onPress={_brandCallback}/>
                                    )
                                })
                            }

                            {/* button view */}
                            <View
                                style={modalStyle.buttonView}>

                                {/* apply button */}
                                <MowButtonBasic
                                    onPress={() => {
                                        _arrayToString(values.brandsSelectedItems, "brandsSelected");
                                        setValues({ ...values, brandsModalVisible: false});
                                    }}
                                    containerStyle={modalView.button}
                                    stickyIcon={true}
                                    leftIcon={"check"}
                                    type={"success"}>

                                    {mowStrings.button.apply}

                                </MowButtonBasic>

                            </View>

                        </View>

                    </MowModal>

                    {/* price range modal */}
                    <MowModal
                        title={mowStrings.filter.priceRange}
                        onClosed={() =>{ setValues({ ...values, priceRangeModalVisible: false})}}
                        modalVisible={values.priceRangeModalVisible}>

                        <View
                            style={{padding:gPadding, ...modalView.container}}>

                            <View
                                style={{flexDirection: "row"}}>

                                <MowInput
                                    containerStyle={{flex: 1, marginRight: 5}}
                                    type={"number"}
                                    value={values.startPrice}
                                    onChangeText={value => onChangeText('startPrice', value)}
                                    placeholder={mowStrings.filter.startPrice}/>

                                <MowInput
                                    containerStyle={{flex: 1, marginLeft: 5}}
                                    type={"number"}
                                    value={values.endPrice}
                                    onChangeText={value => onChangeText('endPrice', value)}
                                    placeholder={mowStrings.filter.endPrice}/>

                            </View>

                            {
                                values.priceRange.map((value, index) =>{

                                    return (
                                        <MowCheckListItem
                                            style={{marginHorizontal: 0}}
                                            selected={_checkSelected(values.priceRangeSelectedItems, value["id"])}
                                            key={index}
                                            item={value}
                                            title={value.title}
                                            titleTextStyle={modalView.listTitle}
                                            subtitleTextStyle={modalView.listSubTitle}
                                            onPress={_priceRangeCallback}/>
                                    )
                                })
                            }

                            {/* button view */}
                            <View
                                style={modalStyle.buttonView}>

                                {/* apply button */}
                                <MowButtonBasic
                                    onPress={() => {
                                        _arrayToString(values.priceRangeSelectedItems, "priceRangeSelected");
                                        setValues({ ...values, priceRangeModalVisible: false});
                                    }}
                                    stickyIcon={true}
                                    containerStyle={modalView.button}
                                    leftIcon={"check"}
                                    type={"success"}>

                                    {mowStrings.button.apply}

                                </MowButtonBasic>

                            </View>

                        </View>

                    </MowModal>

                    {/* color modal */}
                    <MowModal
                        title={mowStrings.filter.color}
                        onClosed={() =>{ setValues({ ...values, colorModalVisible: false})}}
                        modalVisible={values.colorModalVisible}>

                        <View
                            style={modalView.container}>

                            {
                                values.colors.map((value, index) =>{

                                    return (
                                        <MowCheckColorListItem
                                            selected={_checkSelected(values.colorSelectedItems, value["id"])}
                                            key={index}
                                            item={value}
                                            titleTextStyle={modalView.listTitle}
                                            subtitleTextStyle={modalView.listSubTitle}
                                            color={value["color"]}
                                            onPress={_colorCallback}/>
                                    )
                                })
                            }

                            {/* button view */}
                            <View
                                style={modalStyle.buttonView}>

                                {/* apply button */}
                                <MowButtonBasic
                                    onPress={() => {
                                        _arrayToString(values.colorSelectedItems, "colorSelected");
                                        setValues({ ...values, colorModalVisible: false});
                                    }}
                                    stickyIcon={true}
                                    leftIcon={"check"}
                                    containerStyle={modalView.button}
                                    type={"success"}>

                                    {mowStrings.button.apply}

                                </MowButtonBasic>

                            </View>

                        </View>

                    </MowModal>

                    {/* body size modal */}
                    <MowModal
                        title={mowStrings.filter.bodySize}
                        onClosed={() =>{ setValues({ ...values, bodySizeModalVisible: false})}}
                        modalVisible={values.bodySizeModalVisible}>

                        <View
                            style={modalView.container}>

                            {
                                values.bodySize.map((value, index) =>{

                                    return (
                                        <MowCheckListItem
                                            selected={_checkSelected(values.bodySizeSelectedItems, value["id"])}
                                            key={index}
                                            item={value}
                                            titleTextStyle={modalView.listTitle}
                                            subtitleTextStyle={modalView.listSubTitle}
                                            title={value.title}
                                            onPress={_bodySizeCallback}/>
                                    )
                                })
                            }

                            {/* button view */}
                            <View
                                style={modalStyle.buttonView}>

                                {/* apply button */}
                                <MowButtonBasic
                                    onPress={() => {
                                        _arrayToString(values.bodySizeSelectedItems, "bodySizeSelected");
                                        setValues({ ...values, bodySizeModalVisible: false});
                                    }}
                                    stickyIcon={true}
                                    containerStyle={modalView.button}
                                    leftIcon={"check"}
                                    type={"success"}>

                                    {mowStrings.button.apply}

                                </MowButtonBasic>

                            </View>

                        </View>

                    </MowModal>

                    {/* rating score modal */}
                    <MowModal
                        title={mowStrings.filter.ratingScore}
                        onClosed={() =>{ setValues({ ...values, ratingScoreModalVisible: false})}}
                        modalVisible={values.ratingScoreModalVisible}>

                        <View
                            style={modalView.container}>

                            {
                                values.ratingScore.map((value, index) =>{
                                    console.log(_checkSelected(values.ratingScoreSelectedItems, value["id"]));

                                    return (
                                        <MowCheckStarListItem
                                            score={value["title"]}
                                            selected={_checkSelected(values.ratingScoreSelectedItems, value["id"])}
                                            key={index}
                                            titleTextStyle={modalView.listTitle}
                                            subtitleTextStyle={modalView.listSubTitle}
                                            item={value}
                                            onPress={_ratingScoreCallback}/>
                                    )
                                })
                            }

                            {/* button view */}
                            <View
                                style={modalStyle.buttonView}>

                                {/* apply button */}
                                <MowButtonBasic
                                    onPress={() => {
                                        _arrayToString(values.ratingScoreSelectedItems, "ratingScoreSelected");
                                        setValues({ ...values, ratingScoreModalVisible: false});
                                    }}
                                    containerStyle={modalView.button}
                                    stickyIcon={true}
                                    leftIcon={"check"}
                                    type={"success"}>

                                    {mowStrings.button.apply}

                                </MowButtonBasic>

                            </View>

                        </View>

                    </MowModal>

                </View>

                {/* button view */}
                <View
                    style={{...modalStyle.buttonView, bottom: 0}}>

                    {/* apply button */}
                    <MowButtonBasic
                        onPress={() => {props.navigation.navigate("ProductList")}} // send here filter data, then request server with filter data for filtered products
                        stickyIcon={true}
                        containerStyle={{backgroundColor: mowColors.mainColor}}
                        leftIcon={"check"}
                        type={"success"}>

                        {mowStrings.button.apply}

                    </MowButtonBasic>

                </View>

            </MowContainer>

        )


}

const listItemStyle = ({
    container: {
        marginVertical: 5,
        marginHorizontal: 10,
        height: hp(8)
    },
    subtitle: {
        color: mowColors.mainColor
    }
});

const modalStyle = ({
    buttonView: {
        position: "absolute",
        bottom: 20,
        width: "90%",
        alignSelf: "center",
    }
});

export default Filter
