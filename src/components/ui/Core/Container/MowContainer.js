import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import { MowLoadingBall } from "../../Common/Loading/MowLoadingBall";
import MowStatusBar from "../StatusBar/MowStatusBar";
import MowDialog from "../../Common/Dialog/MowDialog";
import { MowToast } from "../../Common/Toast/MowToast";
import MowNavbar from "../Navbar/MowNavbar";
import MowFooter from "../Footer/MowFooter";
import { footerHeight } from "../../../../values/Constants/MowConstants";
import { mowColors } from "../../../../values/Colors/MowColors";

/**
 * here is our container class that can call all pages
 */

const MowContainer = ({ navigation, navbar, footer, title, statusBar, footerActiveIndex, children, style }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        const focusListener = navigation.addListener('didFocus', () => {
            setCount(count + 1);
        });
        return () => {
            // focusListener.remove()
        }
    }, [count]);
    return (
        <View
            style={{
                backgroundColor: mowColors.pageBGColor,
                flex: 1,
                paddingBottom: footer ? footerHeight : 0,
                ...style
            }}>
            {/* statusbar */}
            {statusBar && <MowStatusBar />}

            {/* navbar */}
            {navbar && <MowNavbar navigation={navigation} title={title} />}

            {/* children ui that comes from page */}
            <View style={{ flex: 1 }}>
                {children}
            </View>

            {/* loading */}
            <MowLoadingBall count={count} />

            {/* footer */}
            {footer &&  <MowFooter navigation={navigation} activeIndex={footerActiveIndex} />}

            {/* alert dialog */}
            <MowDialog count={count} />

            {/* toast */}
            <MowToast count={count} />
        </View>
    );
};
MowContainer.propTypes = {
    navbar: PropTypes.bool,
    footer: PropTypes.bool,
    title: PropTypes.string,
    statusBar: PropTypes.bool,
    footerActiveIndex: PropTypes.oneOf([1, 2, 3, 4]),
};

MowContainer.defaultProps = {
    statusBar: true,
    navbar: true,
    footer: true,
    title: "",
};


export default MowContainer;
