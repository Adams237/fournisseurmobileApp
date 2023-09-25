import AsyncStorage from '@react-native-async-storage/async-storage';

export class User {

    async setUser(user){
        await AsyncStorage.setItem('leratelUser',JSON.stringify(user));
    }

    async getUser(){
        const currentUSer =  await AsyncStorage.getItem('leratelUser')
        if (currentUSer) {
            return JSON.parse(currentUSer)
        }
        else { 
            return false
        }
    };

    async removeUser (){
        await AsyncStorage.removeItem('leratelUser')
    }

    setUsername(name) {
        AsyncStorage.setItem("username", name);
    }

    getUsername() {
        return AsyncStorage.getItem("username");
    }

    setName(name) {
        AsyncStorage.setItem("name", name);
    }

    getName() {
        return AsyncStorage.getItem("name");
    }

    setType(type) {
        AsyncStorage.setItem("type", type);
    }

    getType() {
        return AsyncStorage.getItem("type");
    }

    setId(id) {
        AsyncStorage.setItem("id", id);
    }

    getId() {
        return AsyncStorage.getItem("id");
    }

    setMail(mail) {
        AsyncStorage.setItem("mail", mail);
    }

    getMail() {
        return AsyncStorage.getItem("mail");
    }

    setNumber(number) {
        AsyncStorage.setItem("number", number);
    }

    getNumber() {
        return AsyncStorage.getItem("number");
    }

    setDealerId(id) {
        AsyncStorage.setItem("dealer_id", id)
    }

    getDealerId() {
        return AsyncStorage.getItem("dealer_id");
    }

    setUserId(id) {
        AsyncStorage.setItem("user_id", id)
    }

    getUserId() {
        return AsyncStorage.getItem("user_id");
    }

    setIsActive(flag) {
        AsyncStorage.setItem("is_active", flag)
    }

    getIsActive() {
        return AsyncStorage.getItem("is_active");
    }

    setSmsVerification(flag) {
        AsyncStorage.setItem("sms_verification", flag)
    }

    getSmsVerification() {
        return AsyncStorage.getItem("sms_verification");
    }

    async isLogin() {
        const login = await AsyncStorage.getItem('isLogin')
        if (login === true) {
            return true
        }
        else {
            return false
        }
    }

    async setLogin(flag) {
        await AsyncStorage.setItem("isLogin", JSON.stringify(flag));
    }
}