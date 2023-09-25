import React, { useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import { mowStrings } from "../../../values/Strings/MowStrings";
import MowContainer from "../../../components/ui/Core/Container/MowContainer";
import Fashion from "../../../sampleData/Fashion";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import MowListItem from "../../../components/ui/Common/ListItem/MowListItem";
import { fontFamily, pageContainerStyle } from "../../../values/Styles/MowStyles";
import { mowColors } from "../../../values/Colors/MowColors";
import { useSelector } from "react-redux";

const CategoryDetail = (props) => {
    const [showTabBar, setShowTabBar] = useState(false)
    const currentUSer = useSelector(state=>state.currentUSer.value)

    const updateShow = ()=>{
        setShowTabBar(false)
        if(currentUSer.length){
            setShowTabBar(true)
        }
    }

    useEffect(()=>{
        updateShow()
    },[currentUSer])

    const [itemArr, setItemArr] = useState({
        selectedItemArr: [],
        listKey: 0
    })

    // to handle category selection
    const _handleCategorySelection = (index) => {
        let selectedArr = itemArr.selectedItemArr;

        let length = Fashion.length;

        for (let i = 0; i < length; i++) {
            if (i !== index) {
                // to set false all array values except selected index
                selectedArr[i] = false;
            }
        }

        // to update selected item as its opposite
        selectedArr[index] = !selectedArr[index];

        setItemArr({ selectedItemArr: selectedArr, listKey: itemArr.listKey + 1 })
    };


    return (

        <MowContainer
            title={mowStrings.categoryDetail.title}
            navigation={props.navigation}
            footer={showTabBar}
        >

            {/* category list */}
            <FlatList
                key={itemArr.listKey} // to refresh list when selection is changed by user
                showsVerticalScrollIndicator={false}
                keyExtractor={(item, index) => index.toString()}
                data={Fashion}
                style={[pageContainerStyle, { marginTop: 20 }]}
                renderItem={({ item, index }) => (

                    // category item view
                    <View
                        key={index}
                        style={{ marginVertical: 7 }}>

                        {/* category item */}
                        <MowListItem
                            border={true}
                            style={{ height: hp("5%") }}
                            iconName={itemArr.selectedItemArr[index] ? "minus" : "plus"}
                            onPress={() => { _handleCategorySelection(index) }}
                            title={item["title"]} />

                        {/* subcategory list */}
                        {
                            itemArr.selectedItemArr[index] &&

                            <FlatList
                                key={itemArr.listKey} // to refresh list when value change
                                showsVerticalScrollIndicator={false}
                                keyExtractor={(item, index) => index.toString()}
                                data={item["subCategory"]}
                                style={{ marginTop: 10 }}
                                renderItem={({ item, index }) => (

                                    // sub category item view
                                    <View
                                        key={index}
                                        style={{ width: "80%", marginLeft: "10%", marginRight: "5%", marginVertical: 10 }}>
                                            {console.log('pos2', props.route.params.idCat)}
                                        {/* sub category item */}
                                        <MowListItem
                                            onPress={() => { props.navigation.navigate("ProductList", {idCat:props.route.params.idCat}) }}
                                            style={{ height: hp("5%"), backgroundColor: "white " }}
                                            titleTextStyle={{ fontSize: hp("1.8%"), fontWeight: "normal", fontFamily: fontFamily.regular }}
                                            title={item["title"]} />

                                    </View>

                                )} />
                        }


                    </View>

                )}
            />

        </MowContainer>

    )


}
export default CategoryDetail;
