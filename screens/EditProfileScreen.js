import * as React from 'react';
import { useState, useEffect } from 'react';
import {View, Text, Image, ScrollView, TextInput, Alert, TouchableHighlight} from 'react-native';
import { auth, db } from '../config/firebase';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from './Profile.styles';
import {getUserProfileByID} from '../classes/user';
import ProfileFriendBox from './ProfileFriends';
import ProfileTaskBox from './ProfileTasks';
import { profileName } from '../utils/constants';
import { updateDoc, doc } from "firebase/firestore";


export default function EditProfileScreen({navigation}) {

  const [username, setUsername] = useState('');
  const [useremail, setUseremail] = useState('');
  const [userPhone, setUserphone] = useState('');
  const [userVenmo, setUserVenmo] = useState('');
  const [userfullName, setUserFull] = useState('');
  const [userBio, setUserBio] = useState('');
  
  useEffect(() => {
     async function getInfo() {
        const result = await getUserProfileByID(auth.currentUser.uid);
        setUseremail(result.email);
        setUsername(result.username);
        setUserphone(result.phone);
        setUserVenmo(result.venmo);
        setUserFull(result.name);
        setUserBio(data.bio);
     }
     getInfo();
  }, [])
  async function saveChangesPressed() {
    try { 
      const profileRef = doc(db, "profiles", auth.currentUser.uid);
      await updateDoc(profileRef, {
        email: useremail,
        username: username,
        venmo: userVenmo,
        phone: userPhone,
        bio: userBio
      });

    } catch (e) {
      console.error("Error adding document: ", e);
    }
}
  const checkTextInput = () => {
    // Check if email is valid
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (reg.test(useremail) === false) {
        alert("Please Enter a Valid Email");
        return;
      }
    
    if (!useremail.trim()) {
      alert('Please Enter Email');
      return;
    }
    if (!userPhone.trim()) {
        alert('Please Enter Phone');
        return;
    }
    if (!username.trim()) {
        alert('Please Enter Username');
        return;
    }
    if (!userBio.trim()) {
      alert('Please Enter User Bio');
      return;
  }
    saveChangesPressed();
    //Checked Successfully
    Alert.alert( "Changes Saved")
  };
    return (
      <ScrollView style={{backgroundColor: "#f9f1ff"}}>
         <View style={[styles.saveEdit, {marginTop: "10%"}]}>
            <TouchableHighlight  style={{
            padding: 5 }} onPress={() => navigation.navigate(profileName)}>
                <View>
                <Ionicons
                        name={'arrow-back-circle'}
                        size={45}
                        color="#98A836"
                    />
                </View>
            </TouchableHighlight>
            <TouchableHighlight style={{
            padding: 5, paddingRight: 10 }} onPress={checkTextInput}>
                <View>
                    <Text style={{fontSize: 26, fontWeight: 'bold', color: '#98A836'}}>
                        Save
                    </Text>
                </View>
            </TouchableHighlight>
        </View>
        <View style={{flex: 1, alignItems: "center", backgroundColor: "#f9f1ff"}}>
        <Image 
          source={{
          uri: 'https://thumbs.dreamstime.com/b/user-profile-grey-icon-web-avatar-employee-symbol-user-profile-grey-icon-web-avatar-employee-symbol-sign-illustration-design-191067342.jpg'
          }} 
          style={{width: 150, height: 150, borderRadius: 150/2, borderWidth: 10,  borderColor: '#8147A8'}} 
        />
        <TextInput
        placeholder={username}
        style={{fontSize: 26, fontWeight: 'bold', color: '#98A836',
        margin: 5,
        borderWidth: 1,
        padding: 2,
        borderColor:'#98A836'}}
        onChangeText={
          (value) => setUsername(value)
        }
      />
        <View style={{flexDirection: 'row'}}>
            <Ionicons
                name={'mail'}
                size={20}
                color="#98A836"
            />
            <TextInput
                placeholder={useremail}
                style={{fontSize: 16, fontWeight: 'bold', color: '#98A836',
                margin: 5,
                borderWidth: 1,
                padding: 2,
                borderColor:'#98A836'}}
                onChangeText={
                    (value) => setUseremail(value)
                  }
            />
        </View>  
        <View style={{flexDirection: 'row'}}>
          <Ionicons
            name={'call'}
            size={20}
            color="#98A836"
          />
            <TextInput
                placeholder={userPhone}
                style={{fontSize: 16, fontWeight: 'bold', color: '#98A836',
                margin: 5,
                borderWidth: 1,
                padding: 2,
                borderColor:'#98A836'}}
                onChangeText={
                    (value) => setUserphone(value)
                  }
            />
        </View>
        
        <View style={styles.moneyBox}>
          <View>
            <View style={styles.picAndDesc}>
            <Image 
          source={{
          uri: 'https://www.ehcc.org/sites/default/files/Venmo-Logo.png'
          }} 
          style={{width: 30, height: 30}} 
        />
              <View>
                <TextInput
                placeholder= {userVenmo}
                style={{fontSize: 16, fontWeight: 'bold', color: '#98A836',
                borderColor:'#98A836', paddingLeft: 5}}
                onChangeText={
                    (value) => setUserVenmo(value)
                  }
            />
              </View>
            </View>
            <View style={styles.taskTags}>
            </View>
          </View>
        </View>
        <View style={styles.moneyBox}>
          <View style={{padding: 4, flexShrink: 1}} >
            <View style={{padding: 4, flexShrink: 1, alignItems: "center",
        flexDirection: "row", flexWrap: 'wrap', flex:1}}>
              <Text style={{fontSize: 16, color: '#98A836', fontFamily: "Arial Rounded MT Bold",flexWrap: 'wrap'}}>
                About Me:
              </Text>
              <View>
              <TextInput
                placeholder={userBio}
                style={{fontSize: 15,  color: '#8147a8', fontFamily: "Arial Rounded MT Bold", flexWrap: 'wrap'}}
                onChangeText={
                    (value) => setUserBio(value)
                  }
            />
              </View>
            </View>
            <View style={styles.taskTags}>
            </View>
          </View>
        </View>
        <ProfileFriendBox/>
        <ProfileTaskBox/>
        </View>
      </ScrollView>
      
    );
}
