import React, { useEffect, useState } from "react";
import {View, Image, Text} from "react-native";
import FeatherIcon from "react-native-vector-icons/Feather";
import {mowStrings} from "../../../values/Strings/MowStrings";
import {shadowStyle} from "../../../values/Styles/MowStyles";
import {mowColors} from "../../../values/Colors/MowColors";
import MowContainer from "../../../components/ui/Core/Container/MowContainer";
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";
import { useSelector } from "react-redux";

const ContactUst =(props)=> {
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


    const infoStyle = {
        container: {
            flexDirection: "row",
            alignItems: "center",
            marginLeft: 25,
            marginVertical: 10
        },
        icon: {
            color: mowColors.mainColor,
            fontSize: hp(3)
        },
        content: {
            color: mowColors.textColor,
            fontSize: hp(1.7),
            marginLeft: 10
        }
    };


        return(

            <MowContainer
                title={mowStrings.drawerMenu.contactUs}
                navigation={props.navigation}
                footer={showTabBar}
                >

                <View
                    style={{
                        backgroundColor: mowColors.viewBGColor,
                        paddingVertical: 20,
                        ...shadowStyle,
                        borderBottomRightRadius: 20,
                        borderBottomLeftRadius: 20,
                    }}>

                    {/* info row view */}
                    <View
                        style={infoStyle.container}>

                        {/* info icon */}
                        <FeatherIcon
                            style={infoStyle.icon}
                            name={"mail"}/>

                        {/* content text */}
                        <Text
                            style={infoStyle.content}>

                            contact@leratel.com

                        </Text>

                    </View>

                    {/* info row view */}
                    <View
                        style={infoStyle.container}>

                        {/* info icon */}
                        <FeatherIcon
                            style={infoStyle.icon}
                            name={"phone"}/>

                        {/* content text */}
                        <Text
                            style={infoStyle.content}>

                            +237 650 811 998

                        </Text>

                    </View>

                    {/* info row view */}
                    <View
                        style={infoStyle.container}>

                        {/* info icon */}
                        <FeatherIcon
                            style={infoStyle.icon}
                            name={"map"}/>

                        {/* content text */}
                        <Text
                            style={infoStyle.content}>

                            Cameroun Yaounde - Etoukebe

                        </Text>

                    </View>

                    {/* logo */}
                    <Image
                        style={{
                            position: "absolute",
                            top: "20%",
                            right: "2%",
                            width: wp(50),
                            height: hp(10),
                        }}
                        source={require("../../../assets/logo/logo_with_text.png")}
                        resizeMode={"contain"}/>

                </View>

                <Image
                    style={{top: -10, zIndex: -1}}
                    source={require("../../../assets/image/map.png")}
                    resizeMode={"stretch"}/>

            </MowContainer>

        )


}

export default ContactUst;
