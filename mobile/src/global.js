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
        marginBottom: widthDP('4%'),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: widthDP('4%'),
        paddingTop: Constants.statusBarHeight + widthDP('4%'),
    },
    store: {
        flexDirection: 'row',
        paddingVertical: widthDP('4%'),
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
    },
    column: {
        flexDirection: 'column',
        paddingHorizontal: widthDP('4%'),
    },
    scrollHorizontal: {
        paddingLeft: widthDP('4%'),
    },
    alignCenterX: {
        justifyContent: 'center'
    },
    absoluteBottomRight: {
        position: 'absolute',
        right: widthDP('4%'),
        bottom: widthDP('4%'),
    },
    absoluteBottomLeft: {
        position: 'absolute',
        left: widthDP('4%'),
        bottom: widthDP('4%'),
    },
    //NAVITEM
    action: {
        flexDirection: 'row',
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#DFDFDF',
        paddingVertical: widthDP('4%')
    },
    iconAction: {
        alignItems: 'center',
        justifyContent: 'center',
        width: widthDP('12%'),
        borderTopLeftRadius: widthDP('2%'),
        borderBottomLeftRadius: widthDP('2%'),
    },
    arrowAction: {
        alignItems: 'center',
        justifyContent: 'center',
        width: widthDP('12%'),
        borderTopRightRadius: widthDP('2%'),
        borderBottomRightRadius: widthDP('2%'),
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
        borderRadius: widthDP('2%'),
        padding: widthDP('2%'),
        marginBottom: widthDP('2%'),
        minHeight: widthDP('24%'),
        backgroundColor: '#F9F9F9',
    },
    boxImage: {
        width: widthDP('24%'),
        height: '100%',
        borderRadius: widthDP('2%')
    },
    boxBody: {
        flexDirection: 'column',
        padding: widthDP('4%'),
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
        borderRadius: widthDP('2%'),
    },
    titleHide: {
        height: widthDP('8%'),
        flexGrow: 1,
        marginTop: widthDP('2%'),
        borderRadius: widthDP('2%'),
        backgroundColor: '#E2E2E2',
        borderRadius: widthDP('2%'),
    }, 

    //BUTTONS
    button: {
        height: widthDP('12%'),
        borderRadius: widthDP('2%'),
        marginBottom: widthDP('4%'),
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: widthDP('4%')
    },
        buttonWhiteText: {
            fontFamily: 'montserrat-semi-bold',
            fontSize: widthDP('4%'),
            color: '#fff'
        },
    buttonTransparent: {
        height: widthDP('12%'),
        backgroundColor: 'transparent',
        marginBottom: widthDP('4%'),
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
        buttonBlackText: {
            fontFamily: 'montserrat-semi-bold',
            fontSize: widthDP('4%'),
            color: '#585858'
        },
    buttonTag: {
        height: widthDP('8%'),
        minWidth: 80,
        borderRadius: widthDP('2%'),
        marginBottom: widthDP('4%'),
        marginRight: widthDP('2%'),
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: widthDP('4%'),
        backgroundColor: '#E2E2E2'
    },
    buttonFloat: {
        backgroundColor: '#639DFF',
        width: widthDP('16%'),
        height: widthDP('16%'),
        borderRadius: widthDP('2%'),
        justifyContent: 'center',
        alignItems: 'center'
    },
    actionButton: {
        backgroundColor: '#639DFF',
        height: widthDP('16%'),
        width: widthDP('16%'),
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center'
    },
    //INPUTS
    groupInput: {
        marginBottom: widthDP('4%'),
    },
    labelInput: {
        flexDirection: 'row'
    },
    labelText: {
        fontSize: widthDP('4%'),
        fontFamily: 'montserrat-semi-bold',
        color: '#333333',
        marginLeft: widthDP('2%'),
        marginBottom: widthDP('-2%'),
        zIndex: 999,
        paddingHorizontal: widthDP('1%'),
        backgroundColor: '#FFFFFF',
    },
    iconInput: {
        paddingHorizontal: widthDP('4%'),
        paddingTop: widthDP('4%')
    },
    textInput: {
        height: 50,
        fontSize: widthDP('4%'),   
        fontFamily: 'montserrat-medium',
        flexGrow: 1,
        borderColor: '#E2E2E2',
        borderRadius: widthDP('2%'),
        borderWidth: 1,
        paddingLeft: widthDP('4%'),
        color: '#333333'
    },
    inputTextAlert: {
        fontFamily: 'montserrat-light',
        fontSize: widthDP('4%'),
        color: '#E63B2E',
        paddingLeft: widthDP('1%'),
        paddingTop: widthDP('1%'),
    },
    textareaInput: {
        height: heightDP('12%'),
        textAlignVertical: 'top',
        borderColor: '#E2E2E2',
        borderRadius: widthDP('2%'),
        borderWidth: 1,
        padding: widthDP('4%'),
        fontSize: widthDP('4%'),  
        fontFamily: 'montserrat-medium',
        color: '#333333'   
    },
    //MORE
    illustration: {
        backgroundColor: '#FFFFFF',
        marginBottom: widthDP('15%'),
        maxHeight: heightDP('40%'),
        resizeMode: 'contain',
        alignSelf: 'center'
    },
    boxFluid: {
        paddingHorizontal: widthDP('8%'),
        paddingTop: Constants.statusBarHeight + widthDP('4%'),
        width: widthDP('100%'),
    },
    map: {
        flex:1,
    },
    orderView: {
        height: heightDP('80%'),
        backgroundColor: '#FFFFFF',
        paddingHorizontal: widthDP('8%'),
        paddingTop: widthDP('4%'),
        paddingBottom: widthDP('20%'),
    },
    orderList: {
        padding: widthDP('4%'),
        borderRadius: widthDP('2%'),
        marginBottom: widthDP('4%'),
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