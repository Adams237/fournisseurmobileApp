import React, { useEffect, useState } from "react";
import {Text, View, FlatList} from "react-native";
import {mowStrings} from "../../../values/Strings/MowStrings";
import {pageContainerStyle} from "../../../values/Styles/MowStyles";
import {mowColors} from "../../../values/Colors/MowColors";
import MowContainer from "../../../components/ui/Core/Container/MowContainer";
import PrivacyData from "../../../sampleData/PrivacyData";
import {heightPercentageToDP as hp} from "react-native-responsive-screen";
import { useSelector } from "react-redux";

const Privacy = (props) => {
    const currentUSer = useSelector(state => state.currentUSer.value)
    const [showTabBar, setShowTabBar] = useState(false)
    const setVisibiliTyTabBar = ()=>{
        if (currentUSer.length){
            setShowTabBar(true)
        }
    }

    useEffect(()=>{
        setVisibiliTyTabBar()
    },[currentUSer])


        return(

            <MowContainer
                style={{backgroundColor: mowColors.viewBGColor}}
                title={mowStrings.drawerMenu.privacy}
                navigation={props.navigation}
                footer={showTabBar}
                >

                <View
                    style={pageContainerStyle}>

                    <FlatList
                        showsVerticalScrollIndicator={false}
                        keyExtractor={(item, index) => index.toString()}
                        data={PrivacyData}
                        renderItem={({ item, index }) => (

                            <View
                                style={{marginVertical: 10}}>

                                {/* title text */}
                                <Text
                                    style={{
                                        color: mowColors.titleTextColor,
                                        fontSize: hp(1.8),
                                        fontWeight: "600"
                                    }}>

                                    {item["id"]}. {item["title"]}

                                </Text>

                                {/* content text */}
                                <Text
                                    style={{
                                        marginTop: 5,
                                        color: mowColors.textColor,
                                        fontSize: hp(1.6),
                                        fontWeight: "normal"
                                    }}>

                                    {item["content"]}

                                </Text>

                            </View>

                        )}/>

                </View>

            </MowContainer>

        )


}

export default Privacy