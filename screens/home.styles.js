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
    entireScreen: {
        alignItems: "flex-start",
        backgroundColor: "#f9f1ff",
        flex: 1,
        marginTop: "10%",
    },
    groupEmoji: {
        fontSize: 40,
    },
    groupPic: {
        alignItems: "center",
        borderRadius: 5,
        backgroundColor: "#f4e5ff",
        justifyContent: "center",
        padding: 10,
        margin: 5
    },
    picAndDesc: {
        alignItems: "center",
        flexDirection: "row",
        flex: 1,
    },
    questionButton: {
        backgroundColor: '#0097b2',
    },
    searchContainer: {
        backgroundColor: "#f9f1ff",
        margin: 0,
    },
    searchIcon: {
        color: "#98a836"
    },
    searchInputContainer: {
        backgroundColor: 'white',
        borderColor: "#98a836",
        borderWidth: 1,
        borderBottomWidth: 1,
    },
    subtitle: {
        color: "#98a836", 
        fontFamily: "Futura-CondensedExtraBold",
        fontSize: 30,
        margin: 10,
        marginBottom: 4
    },
    taskBox: {
        backgroundColor: "#ffffff",
        borderColor: "#8147a8",
        borderRadius: 5,
        borderWidth: 2,
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-between",
        marginLeft: 10,
        marginTop: 3,
        marginBottom: 3,
        minWidth: "95%",
        maxWidth: "95%",
    },
    taskInfo: {
        color: "#c57ff5", 
        fontFamily: "Futura",
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
        fontFamily: "Futura",
        padding: 5
    },
    taskTitle: {
        color: "#8147a8", 
        fontFamily: "Futura",
        fontSize: 20,
        fontWeight: "bold",
        // maxWidth: "99.87%",
    },
    title: {
        color: "#8147a8", 
        fontFamily: "Futura-CondensedExtraBold",
        fontSize: 40,
        fontWeight: "bold",
        marginTop: 10,
        marginLeft: 10
    },
    picAndTitle: {
        flex: 1,
        flexDirection: 'row',
        minWidth: "95%",
        maxWidth: "95%",
        alignItems: 'center',
    },
    infoEmoji: {

    },
    groupProfile: {
        flex: 1,
        flexDirection: 'column',
        alignItems: "center",
        justifyContent: 'center',
        minWidth: "80%",
        maxWidth: "80%",
    },

    groupDescBox: {
        minWidth: "100%",
        maxWidth: "100%",
        margin: 10,
        borderWidth: 5,
        borderColor: "#8147a8",
        backgroundColor: 'white',
        padding: 2,
        borderRadius: 10
    },

    groupDescText: {
        backgroundColor: 'white',
        color: "#8147a8", 
        fontFamily: "Futura",
        fontSize: 20,
        fontWeight: "bold",
        minWidth: "80%",
        maxWidth: "80%",
    },

    memberDescBox: {
        flexDirection: 'column',
        minWidth: "100%",
        maxWidth: "100%",
        margin: 10,
        borderWidth: 5,
        borderColor: "#98a836",
        backgroundColor: 'white',
        padding: 2,
        borderRadius: 10
    },
  });