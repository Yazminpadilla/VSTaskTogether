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
    button: {
        backgroundColor: '#8147A8',
        width: 200,
        padding: 10,
        margin: 10,
        borderRadius: 50,
        
    },
    
    buttonText: {
        color: '#ffffff',
        fontSize: 20,
        textAlign: 'center',
        fontFamily: "Futura-CondensedMedium"

    },

    // entireScreen: {
    //     alignItems: "flex-start",
    //     backgroundColor: "#f9f1ff",
    //     flex: 1,
    //     marginTop: "10%",
    // },

    error: {
        color: 'red',
    },


    input: {
        width: 250,
        fontSize: 15,
        borderBottomWidth: 1,
        padding: 10,
        margin: 5,
    },
    
    title: {
        fontSize: 40,
        color: '#8147A8',
        fontWeight: 'bold',
        width: '80%',
        textAlign: 'center',
        padding: 20,
        fontFamily: "Futura",
    }, 
  });