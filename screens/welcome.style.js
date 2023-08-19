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
    
    container: {
            flex: 1,
            paddingTop: 20,
            backgroundColor: '#fff',
            alignItems: 'center',
            justifyContent: 'center',
    },
    logo: {
        width:  250,
        height: 250,
    },
    
    button: {

    },
    title: {
        color: "#8147a8", 
        fontFamily: "Futura-CondensedExtraBold",
        fontSize: 40,
        fontWeight: "bold",
        margin: 10,    
        textAlign: "center",
    },
  });