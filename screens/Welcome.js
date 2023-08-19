import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Button } from 'react-native-elements';
import { loginName, registerName } from '../utils/constants';
import styles from './welcome.style';
import mainStyles from './main.styles';

const WelcomeScreen = ({ navigation }) => {
    return (
      <View style={styles.container}>
        <Image style={styles.logo} source={require('../assets/TaskTogetherLogo.png')}/>

        <Text style={styles.title}>Welcome to Task Together!</Text>
  
        <TouchableOpacity style={mainStyles.button} onPress={() => navigation.navigate(loginName)}>
          <Text style={mainStyles.buttonText}>LOGIN</Text>
        </TouchableOpacity>
        <TouchableOpacity style={mainStyles.button} onPress={() => navigation.navigate(registerName)}>
          <Text style={mainStyles.buttonText}>SIGN UP</Text>
        </TouchableOpacity>
      </View>
    );
  }
  
  
export default WelcomeScreen;
  