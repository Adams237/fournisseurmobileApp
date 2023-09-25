import React, { useState } from "react";
import { Text, View } from "react-native";
import { mowStrings } from "../../../values/Strings/MowStrings";
import { cardStyle, fontFamily, pageContainerStyle } from "../../../values/Styles/MowStyles";
import { mowColors } from "../../../values/Colors/MowColors";
import MowContainer from "../../../components/ui/Core/Container/MowContainer";
import MowProductInfoView from "../../../components/ui/MowProductInfoView";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { MowInput } from "../../../components/ui/Common/Input/MowInput";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { MowButtonBasic } from "../../../components/ui/Common/Button/MowButton";
import { MowPicker } from "../../../components/ui/Common/Picker/MowPicker";
import ReturnReasons from "../../../sampleData/ReturnReasons";

const ReturnRequest = (props) => {

    const [value, setValue] = useState({
        requestText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        pickerVisible: false,
        pickerData: ReturnReasons,
        pickerSelectedId: 1,
        reason: "Cargo Damaged"
    })


    const onChangeText = (key, value) => {
        setValue({
            ...value,
            [key]: value,
        })
    };

   const  _onSelect = (selectedItem) =>{
        setValue({
            ...value,
            reason: selectedItem["title"], // selected item title/name
            pickerSelectedId: selectedItem["id"], // selected item id
            pickerVisible: false // to close picker
        })
    }


        const product = props.route.params.product;

        return (

            <MowContainer
                title={mowStrings.returnRequest.title}
                navigation={props.navigation}
                >

                <KeyboardAwareScrollView
                    showsVerticalScrollIndicator={false}
                    style={pageContainerStyle}>

                    {/* product summary view */}
                    <View
                        style={{ padding: 15, ...cardStyle, backgroundColor: mowColors.categoryBGColor }}>

                        {/* product summary */}
                        <MowProductInfoView
                            product={product} />

                    </View>

                    <View
                        style={{ marginTop: 15, backgroundColor: mowColors.categoryBGColor, padding: 10 }}>

                        {/* return request title */}
                        <Text
                            style={{
                                fontSize: hp("1.8%"),
                                fontWeight: "600",
                                fontStyle: "normal",
                                letterSpacing: 0,
                                textAlign: "left",
                                color: mowColors.titleTextColor,
                                fontFamily: fontFamily.medium
                            }}>

                            {mowStrings.returnRequest.returnReason}

                        </Text>

                        {/* return request type picker button */}
                        <MowButtonBasic
                            onPress={() => { setValue({ ...value, pickerVisible: true }) }}
                            rightIcon={"chevron-down"}
                            rightIconStyle={{ color: mowColors.mainColor }}
                            textStyle={{
                                width: "85%",
                                fontSize: hp("1.8%"),
                                fontWeight: "normal",
                                fontStyle: "normal",
                                letterSpacing: 0,
                                textAlign: "left",
                                fontFamily: fontFamily.regular,
                                color: "#aeaeae",
                                paddingLeft: 10
                            }}
                            containerStyle={{ marginVertical: 5, justifyContent: "flex-start" }}>

                            {value.reason}

                        </MowButtonBasic>

                    </View>

                    <View
                        style={{ marginTop: 15, backgroundColor: mowColors.categoryBGColor, padding: 10 }}>

                        {/* return reason text title */}
                        <Text
                            style={{
                                fontSize: hp("1.8%"),
                                fontWeight: "600",
                                fontStyle: "normal",
                                letterSpacing: 0,
                                textAlign: "left",
                                color: mowColors.titleTextColor,
                                fontFamily: fontFamily.medium
                            }}>

                            {mowStrings.returnRequest.returnTextTitle}

                        </Text>

                        {/* return reason input */}
                        <MowInput
                            type={"textarea"}
                            containerStyle={{
                                width: "100%",
                                height: hp("20%")
                            }}
                            textInputStyle={{
                                fontSize: hp("1.8%"),
                                fontWeight: "normal",
                                fontStyle: "normal",
                                letterSpacing: 0,
                                fontFamily: fontFamily.regular,
                                textAlign: "left",
                                color: "#aeaeae",
                                width: "100%",
                                paddingBottom: 10
                            }}
                            value={value.requestText}
                            onChangeText={value => onChangeText('requestText', value)} />

                    </View>

                </KeyboardAwareScrollView>

                {/* send button view */}
                <View
                    style={{ marginHorizontal: wp("3%") }}>

                    {/* send button */}
                    <MowButtonBasic
                        type={"success"}>

                        {mowStrings.button.createReturnRequest}

                    </MowButtonBasic>

                </View>

                <MowPicker
                    selectedValue={value.pickerSelectedId}
                    search={false}
                    data={value.pickerData}
                    onSelect={(obj) => { _onSelect(obj) }}
                    modalVisible={value.pickerVisible} />

            </MowContainer>

        )


}

export default ReturnRequest