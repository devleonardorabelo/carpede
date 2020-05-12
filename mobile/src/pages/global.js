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
        backgroundColor: '#fff',
        paddingHorizontal: widthDP('8%'),
        paddingTop: Constants.statusBarHeight + 20,
    },
    header: {
        marginBottom: 24,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    store: {
        flexDirection: 'row',
        marginBottom: 40
    },
    storeAvatar: {
        backgroundColor: '#ccc',
        width: widthDP('20%'),
        height: widthDP('20%'),
        borderRadius: 100,
    },
    row: {
        flexDirection: 'row',
        paddingHorizontal: widthDP('8%'),
        marginBottom: 16,
    },
    column: {
        flexDirection: 'column',
        paddingHorizontal: widthDP('8%'),
        marginBottom: 16,
    },
    alignCenterX: {
        justifyContent: 'center'
    },
    //NAVITEM
    action: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#F2F2F2',
        height: 50,
        paddingVertical: 40
    },
    iconAction: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 50,
        borderTopLeftRadius: 8,
        borderBottomLeftRadius: 8,
    },
    arrowAction: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 50,
        borderTopRightRadius: 8,
        borderBottomRightRadius: 8,
    },
    textAction: {
        fontSize: widthDP('4%'),
        fontFamily: 'montserrat-semi-bold',
        color: '#262626',
    },
    subtitleTextAction: {
        fontFamily: 'montserrat-light',
        fontSize: widthDP('4%'),
        marginTop: -2,
        color: '#424B54'
    },
    //BOX
    block: {
        backgroundColor: '#05668d',
        padding: 8,
        borderRadius: 8,
        color: '#FFFFFF',
        flexGrow: 1,
        marginBottom: 16
    },
    box: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor:'#F5F5F5',
        borderRadius: 8,
        padding: 8,
        marginBottom: 16
    },
    boxImage: {
        width: widthDP('25%'),
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
        width: widthDP('20%'),
        height: widthDP('20%'),
        alignItems: 'center'
    },
    //TEXTS AND TITLES
    title: {
        fontFamily: 'montserrat-bold',
        fontSize: widthDP('7%'),
        color: '#171c29',
    },
    grayTitle: {
        color: '#424B54',
        fontSize: widthDP('4.5%'),
        fontFamily: 'montserrat-medium'
    },
    subtitle: {
        fontSize: widthDP('5%'),
        fontFamily: 'montserrat-bold',
        color: '#171c29'
    },
    text: {
        fontSize: widthDP('4%'),
        fontFamily: 'montserrat-medium',
        color: '#424B54'
    },
    textBold: {
        fontSize: widthDP('4%'),
        fontFamily: 'montserrat-bold',
        color: '#424B54'
    },
    price: {
        color: '#424B54',
        fontFamily: 'montserrat-semi-bold',
        fontSize: widthDP('4%'),
        marginTop: 5,
    },
    textWrap: {
        flex: 1,
        flexWrap: 'wrap',
        alignSelf: 'center',
    },
    textHide: {
        height: widthDP('5%'),
        backgroundColor: '#F5F5F5',
        borderRadius: 8
    },
    titleHide: {
        height: widthDP('8%'),
        flexGrow: 1,
        marginTop: widthDP('2%'),
        marginBottom: 10,
        backgroundColor: '#F5F5F5',
        borderRadius: 8
    }, 
    tag: {
        backgroundColor: '#05668d',
        padding: 8,
        borderRadius: 8,
        color: '#FFFFFF',
        fontFamily: 'montserrat-semi-bold',
        fontSize: widthDP('4%'),
    },
    //BUTTONS
    button: {
        height: 50,
        borderRadius: 8,
        marginBottom: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#02c39a',
    },
        buttonWhiteText: {
            fontFamily: 'montserrat-semi-bold',
            fontSize: 14,
            color: '#fff'
        },
    buttonTransparent: {
        height: 50,
        backgroundColor: 'transparent',
        marginBottom: 20,
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
        backgroundColor: '#FF5216',
        width: 64,
        height: 64,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center'
    },
    actionButton: {
        backgroundColor: '#00a896',
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
        color: '#262626',
        marginLeft: 10,
        marginBottom: -10,
        zIndex: 9,
        paddingHorizontal: 6,
        backgroundColor: '#FFFFFF',
    },
    iconInput: {
        paddingHorizontal:15,
        paddingTop: 16
    },
    textInput: {
        height: 50,
        fontSize: widthDP('4%'),   
        fontFamily: 'montserrat-medium',
        flexGrow: 1,
        borderColor: '#e2e2e2',
        borderRadius: 8,
        borderWidth: 1,
        paddingLeft: 16,
        color: '#424B54'
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
        borderColor: '#e2e2e2',
        borderRadius: 8,
        borderWidth: 1,
        padding: 16,
        fontSize: widthDP('4%'),  
        fontFamily: 'montserrat-medium',
        color: '#424B54'   
    },
    //MORE
    alert: {
        padding: 20,
        marginBottom: 20,
        borderRadius: 8,
        borderWidth: 2,
        backgroundColor: '#FFEEEE',
        borderColor: '#FFD1D1'
    },
    alertTitle: {
        fontFamily: 'montserrat-bold',
        fontSize: widthDP('4%'),
        color: '#533737' 
    },
    alertText: {
        fontFamily: 'montserrat-light',
        fontSize: widthDP('4%'),
        color: '#270000' 
    },
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
    mapMark: {
        width: widthDP('7%'),
        height: widthDP('7%'),
        backgroundColor: '#FF0022',
        borderRadius: 100
    },
    orderView: {
        height: heightDP('80%'),
        backgroundColor: '#FFFFFF',
        paddingHorizontal: widthDP('8%'),
        paddingTop: 20,
        paddingBottom: 80,
    },
    orderList: {
        backgroundColor: '#F9F9F9',
        padding: 16,
        borderRadius: 8,
        marginBottom: 16,
    },  
    orderCheckout: {
        height: 500,
        backgroundColor: '#F0F0F0',
        position: 'absolute',
        right: 0,
        left: 0,
        bottom: -450,
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
    },


})