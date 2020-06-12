import { StyleSheet, PixelRatio, Dimensions } from 'react-native';
import Constants from 'expo-constants'

const widthDP = widthPercent => {
    const screenWidth = Dimensions.get('window').width;
    return PixelRatio.roundToNearestPixel(screenWidth * parseFloat(widthPercent) / 100);
};
const heightDP = heightPercent => {
    const screenHeight = Dimensions.get('window').height;
    return PixelRatio.roundToNearestPixel(screenHeight * parseFloat(heightPercent) / 100);
};


export default StyleSheet.create({
    
    //STRUCTURE
    container: {
        flex: 1,
        backgroundColor: '#FDFDFD',
    },
    header: {
        marginBottom: 24,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: widthDP('4%'),
        paddingTop: Constants.statusBarHeight + 20,
    },
    store: {
        flexDirection: 'row',
        marginBottom: 32,
        paddingHorizontal: widthDP('4%'),
    },
    storeAvatar: {
        backgroundColor: '#E2E2E2',
        width: widthDP('16%'),
        height: widthDP('16%'),
        borderRadius: 100,
    },
    row: {
        flexDirection: 'row',
        paddingHorizontal: widthDP('4%'),
        marginBottom: 16,
    },
    column: {
        flexDirection: 'column',
        paddingHorizontal: widthDP('4%'),
        marginBottom: 16,
    },
    alignCenterX: {
        justifyContent: 'center'
    },
    //NAVITEM
    action: {
        flexDirection: 'row',
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#DFDFDF',
        paddingVertical: 16
    },
    iconAction: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 48,
        borderTopLeftRadius: 8,
        borderBottomLeftRadius: 8,
    },
    arrowAction: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 48,
        borderTopRightRadius: 8,
        borderBottomRightRadius: 8,
    },
    textAction: {
        fontSize: widthDP('4%'),
        fontFamily: 'montserrat-semi-bold',
        color: '#333333',
    },
    subtitleTextAction: {
        fontFamily: 'montserrat-light',
        fontSize: widthDP('4%'),
        marginTop: -2,
        color: '#666666'
    },
    //BOX
    box: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 8,
        padding: 8,
        marginBottom: 8,
        backgroundColor: '#F9F9F9'
    },
    boxImage: {
        width: widthDP('24%'),
        height: '100%',
        borderRadius: 8
    },
    boxBody: {
        flexDirection: 'column',
        padding: 16,
        flexGrow: 1,
    },
    //IMAGE
    fullImage: {
        width: widthDP('100%'),
        height: widthDP('84%'),
    },
    uploadImage: {
        width: widthDP('100%'),
    },
    groupFloatButton: {
        flexDirection: 'row',
        position: 'absolute',
        justifyContent: 'center',
        width: '100%',
        paddingBottom: 24
    },
    boxFloatButton: {
        position: 'absolute',
        justifyContent: 'center',
        width: widthDP('16%'),
        height: widthDP('16%'),
        alignItems: 'center'
    },
    //TEXTS AND TITLES
    title: {
        fontFamily: 'montserrat-bold',
        fontSize: widthDP('8%'),
        color: '#333333',
    },
    grayTitle: {
        color: '#666666',
        fontSize: widthDP('6%'),
        fontFamily: 'montserrat-medium'
    },
    subtitle: {
        fontSize: widthDP('4%'),
        fontFamily: 'montserrat-bold',
        color: '#666666'
    },
    text: {
        fontSize: widthDP('4%'),
        fontFamily: 'montserrat-medium',
        color: '#333333'
    },
    textBold: {
        fontSize: widthDP('4%'),
        fontFamily: 'montserrat-bold',
        color: '#333333'
    },
    price: {
        color: '#666666',
        fontFamily: 'montserrat-semi-bold',
        fontSize: widthDP('4%'),
        marginTop: 5,
    },
    textWrap: {
        flex: 1,
        flexWrap: 'wrap',
    },
    textHide: {
        height: widthDP('4%'),
        backgroundColor: '#E2E2E2',
        borderRadius: 8
    },
    titleHide: {
        height: widthDP('8%'),
        flexGrow: 1,
        marginTop: widthDP('2%'),
        marginBottom: 8,
        backgroundColor: '#E2E2E2',
        borderRadius: 8
    }, 

    //BUTTONS
    button: {
        height: 48,
        borderRadius: 8,
        marginBottom: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
        buttonWhiteText: {
            fontFamily: 'montserrat-semi-bold',
            fontSize: 14,
            color: '#fff'
        },
    buttonTransparent: {
        height: 48,
        backgroundColor: 'transparent',
        marginBottom: 16,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
        buttonBlackText: {
            fontFamily: 'montserrat-semi-bold',
            fontSize: 14,
            color: '#585858'
        },
    buttonFloat: {
        backgroundColor: '#639DFF',
        width: 64,
        height: 64,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center'
    },
    actionButton: {
        backgroundColor: '#85B71B',
        height: 64,
        width: 64,
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center'
    },
    //INPUTS
    groupInput: {
        marginBottom: 20,
    },
    labelInput: {
        flexDirection: 'row'
    },
    labelText: {
        fontSize: widthDP('4%'),
        fontFamily: 'montserrat-semi-bold',
        color: '#333333',
        marginLeft: 8,
        marginBottom: -8,
        zIndex: 999,
        paddingHorizontal: 4,
        backgroundColor: '#FFFFFF',
    },
    iconInput: {
        paddingHorizontal: 16,
        paddingTop: 16
    },
    textInput: {
        height: 50,
        fontSize: widthDP('4%'),   
        fontFamily: 'montserrat-medium',
        flexGrow: 1,
        borderColor: '#E2E2E2',
        borderRadius: 8,
        borderWidth: 1,
        paddingLeft: 16,
        color: '#333333'
    },
    inputTextAlert: {
        fontFamily: 'montserrat-light',
        fontSize: widthDP('4%'),
        color: '#E63B2E',
        paddingLeft: 4,
        paddingTop: 4
    },
    textareaInput: {
        height: 100,
        textAlignVertical: 'top',
        borderColor: '#E2E2E2',
        borderRadius: 8,
        borderWidth: 1,
        padding: 16,
        fontSize: widthDP('4%'),  
        fontFamily: 'montserrat-medium',
        color: '#333333'   
    },
    //MORE
    illustration: {
        backgroundColor: '#FFFFFF',
        marginBottom: 60,
        maxHeight: '40%',
        resizeMode: 'contain',
        alignSelf: 'center'
    },
    boxFluid: {
        paddingHorizontal: widthDP('8%'),
        paddingTop: Constants.statusBarHeight + 20,
        width: widthDP('100%'),
    },
    map: {
        flex:1,
    },
    orderView: {
        height: heightDP('80%'),
        backgroundColor: '#FFFFFF',
        paddingHorizontal: widthDP('8%'),
        paddingTop: 20,
        paddingBottom: 80,
    },
    orderList: {
        padding: widthDP('4%'),
        borderRadius: 8,
        marginBottom: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#DFDFDF',
    },  
    orderCheckout: {
        height: 500,
        backgroundColor: '#FCFCFC',
        position: 'absolute',
        right: 0,
        left: 0,
        bottom: -430,
        shadowColor: "#000000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,

        elevation: 9,
    },
    deliveryInfo: {
        backgroundColor: '#639DFF',
        paddingVertical: 20
    },

})