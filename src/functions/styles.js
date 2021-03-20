import { StyleSheet } from "react-native";

const Styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    containerPadding: {
        flex: 1,
        padding: 10,
    },
    conSize: {
        width: '100%',
        alignSelf: 'center',
        height: 150,
    },
    nameText: {
        fontSize: 50,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    or: {
        textAlign: 'center',
        margin: 10,
    },
    containerPaddingMargin: {
        flex: 1,
        padding: 10,
        margin: 10,
    },
    containerRow: {
        flex: 1,
        flexDirection: 'row',
    },
    homeContainer: {
        flex: 1,
        flexDirection: 'row',
    },
    input: {
        height: 70,
        backgroundColor: 'white',
        borderWidth: 1,
        borderRadius: 5,
        marginTop: 20,
        margin: 12,
        padding: 10,
        fontSize: 20,
    },
    inputCustom: {
        backgroundColor: 'white',
        borderWidth: 1,
        borderRadius: 5,
        margin: 10,
        padding: 10,
        fontSize: 20,
    },
    coloumn: {
        flex: 1,
        backgroundColor: 'white',
        height: 150,
        margin: 20,
    },
    icon: {
        width: 100,
        height: 100,
        margin: 10,
        alignSelf: 'center'
    },
    navText: {
        fontSize: 20,
        alignSelf: 'center',
        fontWeight: 'bold',
    },
    content: {
        width: '95%',
        backgroundColor: 'white',
        borderRadius: 5,
        marginTop: 30,
        alignSelf: 'center',
        padding: 10,
        fontSize: 20,
    },
    containerDate: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    containerAdd: {
        flex: 1,
        marginTop: 5,
    },
    title: {
        width: '95%',
        alignSelf: 'center',
        backgroundColor: 'white',
        borderRadius: 3,
        height: 40,
    },
    summary: {
        width: '95%',
        alignSelf: 'center',
        backgroundColor: 'white',
        borderRadius: 3,
    },
    dates: {
        width: 170,
        height: 40,
        alignSelf: 'center',
        backgroundColor: 'white',
    },
    modal: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        alignContent: 'center',
    },
    modalContainer: {
        width: '98%',
        alignSelf: 'center',
        backgroundColor: '#53d796',
        borderRadius: 4,
    },
    event: {
        width: '95%',
        alignSelf: 'center',
    },
    NavContainer: {
        flex: 1,
        margin: 20,
        flexDirection: 'row',
    },
    nav: {
        flex: 1,
        height: 150,
        padding: 10,
        borderRadius: 5,
        margin: 10,
        shadowColor: 'rgba(0, 0, 0, 0.5)',
        shadowOffset: { x: 0, y: 10 },
        shadowOpacity: 1,
        alignSelf: 'stretch',
        backgroundColor: 'white',
        marginTop: 20,
        borderWidth: 0.5,
        //backgroundColor: '#161b22',

    },
    text: {
        textAlign: 'center',
        fontSize: 25,
        padding: 7,
    },
    fonts: {
        alignSelf: 'center',
        marginTop: 10,
    },
    image: {
        width: 90,
        height: 90,
        padding: 10,
        alignSelf: 'center',
    },
    button: {
        alignSelf: 'center',
        borderWidth: 1,
        borderRadius: 4,
        padding: 10,
        margin: 10,
        backgroundColor: 'black',
    },
    buttonText: {
        alignSelf: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        padding: 10,
    },
    modalHalf: {
        height: '50%',
    },
    headerText: {
        fontSize: 40,
        textAlign: 'center',
        fontWeight: 'bold',
        padding: 10,
    },
    badge: {
        alignSelf: 'center',
        marginTop: 10,
    },
    loginBtn: {
        padding: 16,
        width: '40%',
        height: 70,
        margin: 20,
        borderRadius: 5,
        backgroundColor: 'black',
        alignSelf: 'center',
    },
    loginText: {
        textAlign: 'center',
        fontSize: 30,
        color: 'white',
    },
    btnFlex: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    profileIamge: {
        flex: 1,
        height: 150,
        backgroundColor: 'black',
        borderRadius: 7,
        margin: 10,
    },
    profileDetails: {
        flex: 1.5,
        height: 150,
        margin: 8,
    },
    body: {
        flex: 2,
    },
    heading: {
        backgroundColor: 'black',
        color: 'white',
        padding: 16,
        margin: 10,
        height: 60,
        width: '48%',
        fontSize: 20,
        borderRadius: 5,
        textAlign: 'center',
    },
})

export { Styles };
