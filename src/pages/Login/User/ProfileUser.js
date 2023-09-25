import { View, Text, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import Communcations from 'react-native-communications'

import MowListItem from '../../../components/ui/Common/ListItem/MowListItem'
import MowContainer from '../../../components/ui/Core/Container/MowContainer'
import { mowStrings } from '../../../values/Strings/MowStrings'
import { mowColors } from '../../../values/Colors/MowColors'
import { fontFamily, pageContainerStyle } from '../../../values/Styles/MowStyles'
import { User } from '../../../components/utils/User/User';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector } from 'react-redux';

const ProfileUser = (props) => {
    const [user, setUser] = useState({})
    const currentUSer = useSelector(state=>state.currentUSer.value)
    
    const getCurrentUser = async()=>{
        setUser( currentUSer)
    } 

    useEffect(()=>{
        getCurrentUser()
    },[currentUSer])
    
    const _handleCall = () => {
        Communcations.phonecall('694845441', true);
    }
    return (
        <MowContainer
            statusBar={true}
            title={mowStrings.profilePage.title}
            navigation={props.navigation}
        >
            <View style={[pageContainerStyle, { marginTop: hp("4%"), marginHorizontal: wp("7%") }]}>


                { user[0] && <View
                    style={{ flexDirection: "row" }}>

                    <Image
                        style={{ width: hp("8%"), height: hp("8%"), alignSelf: "center", borderRadius:50 }}
                        resizeMode={"contain"}
                        source={{uri: user[0]?.image ? user[0].image: "https://play-lh.googleusercontent.com/15OKLti0ofnjK4XK1bgRXgsoblPvMi3hCA5z2o9WAcjssFNt2dXxemp2Om9vB3A_jYAe"}} />

                    {/* name, email view */}
                    <View
                        style={{ justifyContent: "center", marginLeft: 20 }}>

                        <Text
                            style={{
                                fontSize: hp("2%"),
                                fontWeight: "600",
                                fontStyle: "normal",
                                letterSpacing: 0,
                                textAlign: "left",
                                color: mowColors.titleTextColor,
                                fontFamily: fontFamily.medium
                            }}>

                            {user[0].username}

                        </Text>

                        <Text
                            style={{
                                fontSize: hp("1.8%"),
                                fontWeight: "400",
                                fontStyle: "normal",
                                letterSpacing: 0,
                                textAlign: "left",
                                fontFamily: fontFamily.medium,
                                color: mowColors.titleTextColor
                            }}>

                            {user[0].email}

                        </Text>

                    </View>

                </View>}

                <View style={{ marginTop: hp('5%') }}>
                    <MowListItem
                        style={{ marginVertical: 5, borderRadius: 5, }}
                        onPress={() => { props.navigation.navigate("Profile",{user:user[0]}) }}
                        imagePath={ user[0]?.image? user[0].image:  "https://play-lh.googleusercontent.com/15OKLti0ofnjK4XK1bgRXgsoblPvMi3hCA5z2o9WAcjssFNt2dXxemp2Om9vB3A_jYAe"}
                        title="modifier le profile" />
                </View>
                <View style={{ marginTop: hp('1%') }} >
                    <MowListItem
                        style={{ marginVertical: 5, borderRadius: 5 }}
                        onPress={() => { props.navigation.navigate("Cart") }}
                        title="my Cart"
                        imagePath={require('../../../assets/image/myCart.png')}
                    />
                </View>
                <View style={{ marginTop: hp('1%') }}>
                    <MowListItem
                        style={{ marginVertical: 5, borderRadius: 5 }}
                        onPress={() => { props.navigation.navigate("OrderList") }}
                        title="Order"
                        imagePath={require('../../../assets/image/box.jpg')}
                    />
                </View>
                <View style={{ marginTop: hp('1%') }}>
                    <MowListItem
                        style={{ marginVertical: 5, borderRadius: 5 }}
                        onPress={() => { props.navigation.navigate("Notifications") }}
                        title="Notiffication"
                        imagePath={require('../../../assets/image/notiffication.png')}
                    />
                </View>
                <View style={{ marginTop: hp('1%') }}>
                    <MowListItem
                        style={{ marginVertical: 5, borderRadius: 5 }}
                        onPress={_handleCall}
                        title="Service client"
                        imagePath={require('../../../assets/image/call.png')}
                    />
                </View>
            </View>
        </MowContainer>
    )
}

export default ProfileUser