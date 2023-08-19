import React, {useState} from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-elements';
import { auth, db } from '../config/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { setDoc, doc } from "firebase/firestore";
import User from "../classes/user";
import { userConverter } from '../classes/user';
import styles from './Register.styles';
import mainStyles from './main.styles';

const RegistrationScreen = ({ navigation }) => {
  const [value, setValue] = useState({
    email: '',
    password: '',
    fullName: '',
    username: '',
    venmoId: '',
    number: '',
    bio: '',
    error: ''
  })

  async function addUserToDatabase() {
    console.log(auth.currentUser.uid)
    try {

      const newUser = new User(auth.currentUser.uid, auth.currentUser.email, value.fullName, value.username, value.number, value.venmoId, [], value.bio, []);

      await setDoc(doc(db, "profiles", auth.currentUser.uid), userConverter.toFirestore(newUser));
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  async function register() {
    if (value.email === '' || value.password === '') {
      setValue({
        ...value,
        error: 'Email and password are mandatory.'
      })
      return;
    }

    try {
        await createUserWithEmailAndPassword(auth, value.email, value.password).then(addUserToDatabase);
        navigation.navigate('Login');
    } catch (error) {
        setValue({
          ...value,
          error: error.message,
        })
    }
  }

  return (
    <View style={styles.container}>
      <Text style={mainStyles.title}>Sign Up</Text>

      {!!value.error && <View ><Text style={mainStyles.error}>{value.error}</Text></View>}

      <View style={styles.inputContainer}>
        <TextInput
          placeholder='Email'
          style={mainStyles.input}
          value={value.email}
          onChangeText={(text) => setValue({ ...value, email: text })}
          autoCapitalize="none"
        />

        <TextInput
          placeholder='Password'
          style={mainStyles.input}
          value={value.password}
          onChangeText={(text) => setValue({ ...value, password: text })}
          secureTextEntry={true}
          autoCapitalize="none"
        />

        <TextInput
          placeholder='Full Name'
          style={mainStyles.input}
          value={value.fullName}
          onChangeText={(text) => setValue({ ...value, fullName: text })}
          autoCapitalize="none"
        />
        <TextInput
          placeholder='Username'
          style={mainStyles.input}
          value={value.username}
          onChangeText={(text) => setValue({ ...value, username: text })}
          autoCapitalize="none"
        />
        <TextInput
          placeholder='Venmo ID'
          style={mainStyles.input}
          value={value.venmoId}
          onChangeText={(text) => setValue({ ...value, venmoId: text })}
          autoCapitalize="none"
        />
        <TextInput
          placeholder='Phone Number'
          style={mainStyles.input}
          value={value.number}
          onChangeText={(text) => setValue({ ...value, number: text })}
          autoCapitalize="none"
        />

          <TextInput
          placeholder='Bio'
          style={mainStyles.input}
          value={value.bio}
          onChangeText={(text) => setValue({ ...value, bio: text })}
          autoCapitalize="none"
        />

      <TouchableOpacity style={mainStyles.button} onPress={register}>
                <Text style={mainStyles.buttonText}>CONTINUE</Text>
            </TouchableOpacity>
      </View>
    </View>
  );
}



export default RegistrationScreen;

