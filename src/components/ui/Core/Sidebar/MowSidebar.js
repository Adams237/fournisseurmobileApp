import React, { useEffect, useState } from "react";
import { View, StyleSheet, TouchableOpacity, Text, ScrollView, Image, ActivityIndicator } from "react-native";
import FeatherIcon from "react-native-vector-icons/Feather";
import FAIcon from "react-native-vector-icons/FontAwesome";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Communcations from 'react-native-communications'
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";


import { mowStrings } from "../../../../values/Strings/MowStrings";
import { mowColors } from "../../../../values/Colors/MowColors";
import { User } from "../../../utils/User/User";
import { setLogin } from "../../../../pages/Router";
import MowStatusBar from "../StatusBar/MowStatusBar";
import { fontFamily } from "../../../../values/Styles/MowStyles";
import { signOut } from "../../../../redurcer/userSlice";
import { deletOrder } from "../../../../redurcer/orderSlice";
import { deleteCart } from "../../../../redurcer/cartSlice";
import { logoutUser } from "../../../../utils/apiEcommerce";
import { destroyListFavorite } from "../../../../redurcer/favoritesSlice";

const MowSidebar = (props) => {

    const [currentUSer, setCurrentUser] = useState({})
    const dispatch = useDispatch()
    const user = useSelector(state => state.currentUSer.value)
    const [isLogout, setIsLogout] = useState(false)

    const verifyCurrentUser = () => {
        if (user) {
            setCurrentUser(user)
        }
        return
    }

    useEffect(() => {
        verifyCurrentUser();
    }, [user]);

    const _handleLogout = async () => {
        // to update user login situation
        // await new User().removeUser();
        // to change router
        setIsLogout(true)
        console.log(user[0].token);
        try {
            await axios.get(logoutUser, {
                headers: {
                    Authorization: `Bearer ${user[0].token}`
                }
            })
            dispatch(signOut())
            dispatch(deletOrder())
            dispatch(deleteCart())
            dispatch(destroyListFavorite())
            setLogin(false)
            setCurrentUser({})
            setIsLogout(false)
            props.navigation.navigate('Home')
        } catch (error) {
            setIsLogout(false)
            console.log(error);
        }


    }

    const _handleCall = () => {
        Communcations.phonecall('694845441', true);
    }


    let nav = props.navigation;

    return (

        <View
            style={{ flex: 1, backgroundColor: mowColors.mainColor }}>

            <MowStatusBar />

            <View
                style={{
                    height: hp("11%"),
                    paddingTop: 20,
                    width: '100%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    alignSelf: 'center',
                    flexDirection: 'row',
                    paddingHorizontal: wp("5%")
                }}>

                {
                    currentUSer[0] ? (
                        <>
                            <TouchableOpacity
                                onPress={() => nav.navigate('ProfileUser', { user: currentUSer })}
                                style={{
                                    flex: 1,
                                    paddingLeft: 10,
                                }}>

                                <Image
                                    resizeMode={'contain'}
                                    source={{ uri: user[0]?.image ? user[0].image : "https://play-lh.googleusercontent.com/15OKLti0ofnjK4XK1bgRXgsoblPvMi3hCA5z2o9WAcjssFNt2dXxemp2Om9vB3A_jYAe" }}
                                    style={{
                                        width: hp("8%"),
                                        height: hp("8%"),
                                        borderRadius: 50
                                    }} />

                            </TouchableOpacity>
                            <View
                                style={{ flex: 3 }}>

                                <Text
                                    style={{
                                        color: 'white',
                                        fontWeight: '600',
                                        fontSize: hp("2%"),
                                        fontFamily: fontFamily.medium
                                    }}>

                                    {currentUSer[0].username}

                                </Text>

                                <Text
                                    style={{
                                        color: 'white',
                                        fontSize: hp("1.8%"),
                                        padding: 3,
                                        fontFamily: fontFamily.medium
                                    }}>

                                    {currentUSer[0].email}

                                </Text>

                            </View>
                        </>
                    ) : (
                        <View>
                            <TouchableOpacity onPress={() => nav.navigate('HomeLogin')}>
                                <Text style={{ fontSize: 20, fontWeight: 'bold' }} >Connecte toi</Text>
                            </TouchableOpacity>
                        </View>
                    )
                }





                <TouchableOpacity
                    onPress={() => { props.navigation.closeDrawer() }}
                    style={{ position: "absolute", top: 20, right: 15 }}>

                    <FAIcon
                        style={{ color: "white", fontSize: hp("3%") }}
                        name={"times"} />

                </TouchableOpacity>

            </View>

            <ScrollView
                style={{ marginTop: hp("3%"), marginBottom: hp("1%") }}>

                {/* settings button*/}
                {/* <TouchableOpacity
                    style={styles.drawerItemView}
                    onPress={() => nav.navigate('Settings')}>

                    <FeatherIcon
                        name={"settings"}
                        style={styles.drawerIcon} />

                    <Text
                        style={styles.drawerText}>

                        {mowStrings.drawerMenu.settings}

                    </Text>

                </TouchableOpacity> */}


                {
                    currentUSer[0] && (
                        <>
                            {/* profile button */}
                            <TouchableOpacity
                                style={styles.drawerItemView}
                                onPress={() => nav.navigate('ProfileUser', { user: currentUSer })}>

                                <FeatherIcon
                                    style={styles.drawerIcon}
                                    name={"user"} />

                                <Text
                                    style={styles.drawerText}>

                                    {mowStrings.drawerMenu.profile}

                                </Text>

                            </TouchableOpacity>
                            {/* password button */}
                            <TouchableOpacity
                                style={styles.drawerItemView}
                                onPress={() => nav.navigate('Password')}>

                                <FeatherIcon
                                    style={styles.drawerIcon}
                                    name={"lock"} />

                                <Text
                                    style={styles.drawerText}>

                                    {/* {mowStrings.drawerMenu.password} */}
                                    Mot De Passe
                                </Text>

                            </TouchableOpacity>
                            {/* favorites button */}
                            <TouchableOpacity
                                style={styles.drawerItemView}
                                onPress={() => nav.navigate('Favorites')}>

                                <FeatherIcon
                                    style={styles.drawerIcon}
                                    name={"heart"} />

                                <Text
                                    style={styles.drawerText}>

                                    Mes Favories

                                </Text>

                            </TouchableOpacity>
                            {/* notification button */}
                            <TouchableOpacity
                                style={styles.drawerItemView}
                                onPress={() => nav.navigate('Notifications')}>

                                <FeatherIcon
                                    style={styles.drawerIcon}
                                    name={"bell"} />

                                <Text
                                    style={styles.drawerText}>

                                    {mowStrings.drawerMenu.notification}

                                </Text>

                            </TouchableOpacity>
                            {/* cart button */}
                            <TouchableOpacity
                                style={styles.drawerItemView}
                                onPress={() => nav.navigate('Cart')}>

                                <FeatherIcon
                                    style={styles.drawerIcon}
                                    name={"shopping-bag"} />

                                <Text
                                    style={styles.drawerText}>

                                    Mon Panier

                                </Text>

                            </TouchableOpacity>
                            {/* feedback button */}
                            <TouchableOpacity
                                style={styles.drawerItemView}
                                onPress={() => nav.navigate('Feedback')}>

                                <FeatherIcon
                                    style={styles.drawerIcon}
                                    name={"message-circle"} />

                                <Text
                                    style={styles.drawerText}>

                                    {/* {mowStrings.drawerMenu.feedback} */}
                                    Envoyez un mail 

                                </Text>

                            </TouchableOpacity>
                        </>
                    )
                }

                {/* faq button */}
                {/* <TouchableOpacity
                    style={styles.drawerItemView}
                    onPress={() => nav.navigate('FAQ')}>

                    <FeatherIcon
                        style={styles.drawerIcon}
                        name={"message-square"} />

                    <Text
                        style={styles.drawerText}>

                        {mowStrings.drawerMenu.faq}

                    </Text>

                </TouchableOpacity> */}
                {/* Product List button */}
                <TouchableOpacity
                    style={styles.drawerItemView}
                    onPress={() => nav.navigate('ProductList')}>

                    <FeatherIcon
                        style={styles.drawerIcon}
                        name={"truck"} />

                    <Text
                        style={styles.drawerText}>

                       Liste de Produits 

                    </Text>

                </TouchableOpacity>

                {/* customer service button */}
                <TouchableOpacity
                    style={styles.drawerItemView}
                    onPress={_handleCall}>

                    <FeatherIcon
                        style={styles.drawerIcon}
                        name={"phone-call"} />

                    <Text
                        style={styles.drawerText}>

                        {/* {mowStrings.drawerMenu.customerService} */}
                        Service Client

                    </Text>

                </TouchableOpacity>

                {/* privacy button */}
                <TouchableOpacity
                    style={styles.drawerItemView}
                    onPress={() => nav.navigate('Privacy')}>

                    <FeatherIcon
                        style={styles.drawerIcon}
                        name={"shield"} />

                    <Text
                        style={styles.drawerText}>

                        {/* {mowStrings.drawerMenu.privacy} */}
                        Politique d'utilisation

                    </Text>

                </TouchableOpacity>

                {/* about us button */}
                <TouchableOpacity
                    style={styles.drawerItemView}
                    onPress={() => nav.navigate('AboutUs')}>

                    <FeatherIcon
                        style={styles.drawerIcon}
                        name={"info"} />

                    <Text
                        style={styles.drawerText}>

                        {/* {mowStrings.drawerMenu.aboutUs} */}
                        A Propos De Nous

                    </Text>

                </TouchableOpacity>

                {/* contact us button */}
                {/* <TouchableOpacity
                    style={styles.drawerItemView}
                    onPress={() => nav.navigate('ContactUs')}>

                    <FeatherIcon
                        style={styles.drawerIcon}
                        name={"command"} />

                    <Text
                        style={styles.drawerText}>

                        {mowStrings.drawerMenu.contactUs}

                    </Text>

                </TouchableOpacity> */}

                {/* logout button */}

                {
                    currentUSer[0] && <TouchableOpacity
                        style={styles.drawerItemView}
                        onPress={() => { _handleLogout() }}>

                        <FeatherIcon
                            style={styles.drawerIcon}
                            name={"log-out"} />

                        {
                            isLogout ? <ActivityIndicator size="large" color="#383838" /> : <Text
                                style={styles.drawerText}>

                                {/* {mowStrings.drawerMenu.logout} */}
                                Déconnecter

                            </Text>
                        }

                    </TouchableOpacity>
                }


            </ScrollView>

            <Image
                source={require("../../../../assets/logo/logo_with_text.png")}
                resizeMode={"contain"}
                style={{
                    marginBottom: hp("3%"),
                    alignSelf: "center",
                    width: wp("40%"),
                    height: hp("5%")
                }} />

        </View>
    );
}

const styles = StyleSheet.create({
    drawerIcon: {
        flex: 2,
        fontSize: hp("2.5%"),
        color: 'white',
        textAlign: "center"
    },
    drawerText: {
        flex: 8,
        fontSize: hp("2%"),
        color: 'white',
        marginLeft: 5,
        fontWeight: "500",
        fontStyle: "normal",
        letterSpacing: 0,
        fontFamily: fontFamily.medium
    },
    drawerItemView: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: hp("1.5%"),
        marginVertical: hp("2%"),
        marginLeft: wp("5%"),
    }
});

export default MowSidebar