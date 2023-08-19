import { StyleSheet } from 'react-native';

/*
 * Important Colors
 * "#f9f1ff" - Light purple background
 * "#98a836" - Dark green
 * "#8147a8" - Dark purple
 * "#c57ff5" - Bright Purple
 */

export default StyleSheet.create({
    cancelText: {
        color: "#98a836"
    },
    subtitle: {
        color: "#8147a8", 
        fontFamily: "Arial Rounded MT Bold",
        fontSize: 25,
        margin: 10,
        marginBottom: 4
    },
    taskBox: {
        alignItems: "center",
        backgroundColor: "#ffffff",
        borderColor: "#8147a8",
        borderRadius: 5,
        borderWidth: 2,
        flex: 0.35,
        flexDirection: "row",
        justifyContent: "space-between",
        marginLeft: 10,
        marginTop: 3,
        marginBottom: 3,
        minWidth: "90%"
    },
    taskInfo: {
        color: "#c57ff5", 
        fontFamily: "Arial Rounded MT Bold",
        fontSize: 18,
    },
    taskTag: {
        backgroundColor: "#8147a8",
        borderRadius: 10,  
        marginBottom: 2,
        marginRight: 5,
    },
    taskTags: {
        flexDirection: "row",
        paddingLeft: 5,
    },
    taskTagText: {
        color: "#ffffff",
        padding: 5
    },
    taskTitle: {
        color: "#8147a8", 
        fontFamily: "Arial Rounded MT Bold",
        fontSize: 20,
    },
    title: {
        color: "#8147a8", 
        fontFamily: "Futura-CondensedExtraBold",
        fontSize: 40,
        fontWeight: "bold",
        marginTop: 10,
        marginLeft: 10
    },

    //
    input: {
      width: '95%',
      backgroundColor: '#FFFFFF',
      padding: 10,
      color: '#98A836',
      borderColor: '#8147A8',
      borderRadius: 10,
      borderWidth: 1,
      fontSize: 20,
      margin: 10,
      marginBottom: 0,
    },
    numberInput: {
      width: 40,
      backgroundColor: '#FFFFFF',
      padding: 10,
      color: '#98A836',
      borderColor: '#8147A8',
      borderRadius: 10,
      borderWidth: 1,
      fontSize: 20,
      marginBottom: 30,
    },
    button: {
        backgroundColor: '#98A836',
        padding: 5,
        margin: 5,
        borderRadius: 10,
        minWidth: "95%",
        maxWidth: "95%",
        marginTop: "20%",
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: "white", 
        fontFamily: "Futura-CondensedExtraBold",
        fontSize: 40,
    },

    dateRow: {
        flexDirection: 'row',
        margin: 10,
        marginBottom: 40,
    },

    dateTime: {
        border: 'solid',
    },

    selectBox: {
        backgroundColor: "white",
        borderColor: '#8147A8',
        margin: 10,
        marginBottom: 0,
        maxWidth: "95%",
    },

    selectInputStyles: {
    },

    dropdownBox: {
        backgroundColor: "white",
        borderColor: '#8147A8',
        maxWidth: "95%",
        marginLeft: 10
    },

  });