import { StyleSheet } from 'react-native';

/*
 * Important Colors
 * "#f9f1ff" - Light purple background
 * "#98a836" - Dark green
 * "#8147a8" - Dark purple
 * "#c57ff5" - Bright Purple
 * #E4F57F - light green
 */

export default StyleSheet.create({
    saveEdit:{
        flex: 1,
        flexDirection: "row",
        justifyContent: 'space-between'
    },
    profileButton:{
        color: "#FFF",

    },
    groupEmoji: {
        fontSize: 40,
    },
    tagsTitle: {
        color: "#ffffff",
        fontFamily: "Futura",
        padding: 5,
        fontSize: 16,
        color: "#FFF",
        fontFamily: "Futura",
        alignItems: 'center'
    },
    tasksTitle:{
        fontSize: 19,
        color: "#FFF",
        fontFamily: "Futura",
        alignItems: 'center'
    },
    friendsTitle:{
        fontSize: 17,
        color: "#FFF",
        fontFamily: "Futura",
        alignItems: 'center'
    },
    moneyEmoji: {
        fontSize: 20,
    },
    groupPic: {
        alignItems: "center",
        borderRadius: 5,
        justifyContent: "center",
        padding: 10,
        margin: 1
    },
    tagsTitlebox:{
        alignItems: "center",
        borderRadius: 5,
        justifyContent: "center",
        paddingLeft: 120,
        paddingRight: 110,
        padding: 6,
        margin: 1

    },
    picAndDesc: {
        alignItems: "center",
        flexDirection: "row",
    },
    subtitle: {
        color: "#98a836", 
        fontFamily: "Futura",
        fontSize: 30,
        margin: 10,
        marginBottom: 4
    },
    taskBox: {
        alignItems: "center",
        backgroundColor: "#ffffff",
        borderColor: "#98a836",
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
    tagsBox: {
        alignItems: "center",
        backgroundColor: "#ffffff",
        borderColor: "#8147a8",
        borderRadius: 5,
        borderWidth: 2,
        flex: 0.35,
        flexDirection: "col",
        justifyContent: "space-between",
        marginLeft: 10,
        marginTop: 3,
        marginBottom: 3,
        minWidth: "90%"
    },
    friendsBox:{
        alignItems: "center",
        backgroundColor: "#ffffff",
        borderColor: "#c57ff5",
        borderRadius: 5,
        borderWidth: 2,
        flex: 0.35,
        flexDirection: "col",
        justifyContent: "space-between",
        marginLeft: 10,
        marginTop: 3,
        marginBottom: 3,
        minWidth: "90%"
    },
    moneyBox: {
        alignItems: "center",
        backgroundColor: "#ffffff",
        borderColor: "#98a836",
        borderRadius: 5,
        borderWidth: 2,
        flex: 0.35,
        flexDirection: "row",
        justifyContent: "space-between",
        marginLeft: 10,
        marginTop: 3,
        marginBottom: 3,
        minWidth: "40%"
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
    friendTag:{
        backgroundColor: "#FFF"
    },
    taskTags: {
        flexDirection: "row",
        paddingLeft: 5,
    },
    profileTags: {
        flexDirection: "row",
        paddingLeft: 5,
        margin: 2
    },
    friendTags:{
        paddingLeft: 5,
        margin: 2
    },
    taskTagText: {
        color: "#ffffff",
        padding: 5
    },
    friendTagText: {
        color: "#c57ff5",
        padding: 5
    },
    taskTitle: {
        color: "#98a836", 
        fontFamily: "Futura",
        fontSize: 15,
    },
    moneyTitle: {
        color: "#98a836", 
        fontFamily: "Futura",
        fontSize: 15,
        alignSelf: "flex-start"
    },
    title: {
        color: "#8147a8", 
        fontFamily: "Futura",
        fontSize: 40,
        fontWeight: "bold",
        marginTop: 10,
        marginLeft: 10
    },
  });