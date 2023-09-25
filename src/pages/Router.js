import React from "react";
import { Text, View } from "react-native";
import Home from "./NotLogin/Home";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from '@react-navigation/native'
import { createDrawerNavigator } from '@react-navigation/drawer';

import HomeScreen from "./Login/HomeScreen";
import MowSidebar from "../components/ui/Core/Sidebar/MowSidebar";
import { deviceWidth } from "../values/Constants/MowConstants";
import Settings from "./Login/Settings/Settings";
import Categories from "./Login/Categories/Categories";
import CategoryDetail from "./Login/Categories/CategoryDetail";
import ProductList from "./Login/Product/ProductList";
import ProductDetail from "./Login/Product/ProductDetail";
import Cart from "./Login/CartOperations/Cart";
import AddressList from "./Login/Address/AddressList";
import NewAddress from "./Login/Address/NewAddress";
import PaymentInformation from "./Login/CartOperations/PaymentInformation";
import CompleteOrder from "./Login/CartOperations/CompleteOrder";
import { User } from "../components/utils/User/User";
import NormalLogin from "./NotLogin/NormalLogin";
import Register from "./NotLogin/Register/Register";
import NormalRegister from "./NotLogin/Register/NormalRegister";
import Verification from "./NotLogin/Register/Verification";
import OrderList from "./Login/Orders/OrderList";
import Profile from "./Login/User/Profile";
import Password from "./Login/User/Password";
import Favorites from "./Login/Favorites/Favorites";
import OrderDetail from "./Login/Orders/OrderDetail";
import CargoTracking from "./Login/Orders/CargoTracking";
import RateProduct from "./Login/Orders/RateProduct";
import ReturnRequest from "./Login/Orders/ReturnRequest";
import Feedback from "./Login/Feedback/Feedback";
import FAQ from "./Login/FAQ/FAQ";
import Filter from "./Login/Filter/Filter";
import HomeFilter from "./Login/Filter/HomeFilter";
import TrendCampaigns from "./Login/Campaign/TrendCampaigns";
import Notifications from "./Login/Notification/Notifications";
import AboutUs from "./Login/AboutUs/AboutUs";
import Privacy from "./Login/Privacy/Privacy";
import ContactUs from "./Login/ContactUs/ContactUs";
import ForgotPassword from "./NotLogin/Register/ForgotPassword/ForgotPassword";
import ExtraSecurity from "./NotLogin/Register/ForgotPassword/ExtraSecurity";
import ChangePassword from "./NotLogin/Register/ForgotPassword/ChangePassword";
import ProfileUser from "./Login/User/ProfileUser";


let _self;




const StackOptions = {

    initialRoute: "Home",
    headerShown: false,
    transparentCard: true,
    cardStyle: {
        backgroundColor: "transparent",
    },
    transitionConfig: () => ({
        containerStyle: {
            backgroundColor: "transparent",
        },
        transitionSpec: {
            duration: 0,
        },
    }),
    navigationOptions: ({ navigation }) => ({
        drawerLockMode: 'locked-closed'
    })

};

// stack navigation
const Stack = createNativeStackNavigator()

const StackNavigator = () => {
    return <React.Fragment>
        <Stack.Screen name='HomeLogin' component={Home} />
        <Stack.Screen name='NormalLogin' component={NormalLogin} />
        <Stack.Screen name='Register' component={Register} />
        <Stack.Screen name='NormalRegister' component={NormalRegister} />
        <Stack.Screen name='Verification' component={Verification} />
        <Stack.Screen name='ForgotPassword' component={ForgotPassword} />
        <Stack.Screen name='ExtraSecurity' component={ExtraSecurity} />
        <Stack.Screen name='ChangePassword' component={ChangePassword} />
    </React.Fragment>
}


// stack navigation
const AppStack = createNativeStackNavigator()
const AppContainer = () => {

    return (
        <AppStack.Navigator screenOptions={StackOptions}>
            <AppStack.Screen name="Home" component={HomeScreen} />
            <AppStack.Screen name="HomeFilter" component={HomeFilter} />
            <AppStack.Screen name="TrendCampaigns" component={TrendCampaigns} />
            <AppStack.Screen name="Settings" component={Settings} />
            <AppStack.Screen name="Categories" component={Categories} />
            <AppStack.Screen name="CategoryDetail" component={CategoryDetail} />
            <AppStack.Screen name="ProductList" component={ProductList} />
            <AppStack.Screen name="ProductDetail" component={ProductDetail} />
            <AppStack.Screen name="Cart" component={Cart} />
            <AppStack.Screen name="CompleteOrder" component={CompleteOrder} />
            <AppStack.Screen name="Filter" component={Filter} />
            <AppStack.Screen name="Notifications" component={Notifications} />
            <AppStack.Screen name="PaymentInformation" component={PaymentInformation} />
            <AppStack.Screen name="AddressList" component={AddressList} />
            <AppStack.Screen name="NewAddress" component={NewAddress} />
            <AppStack.Screen name="OrderList" component={OrderList} />
            <AppStack.Screen name="OrderDetail" component={OrderDetail} />
            <AppStack.Screen name="CargoTracking" component={CargoTracking} />
            <AppStack.Screen name="RateProduct" component={RateProduct} />
            <AppStack.Screen name="ReturnRequest" component={ReturnRequest} />
            <AppStack.Screen name="Profile" component={Profile} />
            <AppStack.Screen name="Password" component={Password} />
            <AppStack.Screen name="Favorites" component={Favorites} />
            <AppStack.Screen name="Feedback" component={Feedback} />
            <AppStack.Screen name="AboutUs" component={AboutUs} />
            <AppStack.Screen name="Privacy" component={Privacy} />
            <AppStack.Screen name="ContactUs" component={ContactUs} />
            <AppStack.Screen name="FAQ" component={FAQ} />
            <AppStack.Screen name="ProfileUser" component={ProfileUser}/>
        </AppStack.Navigator>
    )
}


// drawer navigation
const Drawer = createDrawerNavigator()
const DrawerNavigation = () => {

    return <Drawer.Navigator screenOptions={StackOptions} drawerContent={props => <MowSidebar {...props} />}>
        <Drawer.Screen name='HomeScreen' component={AppContainer} />
    </Drawer.Navigator>
}

let user = new User();


class Router extends React.Component {

    constructor(props) {
        super(props);

        _self = this;

        this.state = {
            login: false,
        };

        /**
         * changes all system regular component's fontFamily as 'Quicksand'
         * @type {(function(...[*]))|*}
         */
        let oldRender = Text.render;
        Text.render = function (...args) {
            let origin = oldRender.call(this, ...args);
            return React.cloneElement(origin, {
                style: [{ fontFamily: 'Poppins' }, origin.props.style]
            });
        };
    }

    async setUser() {
        this.setState({
            login: await user.getUser()
        })
    }

    render() {

        // can control here is user login or not, then return related navigator

        return (
            <NavigationContainer>
                <Stack.Navigator screenOptions={StackOptions}>
                {
                    !this.state.login?  <>
                        <Stack.Screen name='HomeLogin' component={Home} />
                        <Stack.Screen name='NormalLogin' component={NormalLogin} />
                        <Stack.Screen name='Register' component={Register} />
                        <Stack.Screen name='NormalRegister' component={NormalRegister} />
                        <Stack.Screen name='Verification' component={Verification} />
                        <Stack.Screen name='ForgotPassword' component={ForgotPassword} />
                        <Stack.Screen name='ExtraSecurity' component={ExtraSecurity} />
                        <Stack.Screen name='ChangePassword' component={ChangePassword} />
                        {/* <StackNavigator/> */}
                    </>: <Stack.Screen name="Home" component={DrawerNavigation}/> 
                }
                </Stack.Navigator>

            </NavigationContainer>

        )
    }
}

// to change user login situation from outside
export function setLogin(flag) {
    _self.setState({
        login: flag
    });
}

export default Router;
