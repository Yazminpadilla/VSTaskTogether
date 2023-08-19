import * as React from 'react';
import { useState, useEffect } from 'react';
import {View, Text, Image, ScrollView, TouchableOpacity} from 'react-native';
import { db, auth } from '../config/firebase';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from './Profile.styles';
import ProfileGroupBox from './ProfileFriends';
import ProfileTaskBox from './ProfileTasks';
import { editProfileName} from '../utils/constants';
import { signOut } from '@firebase/auth';
import { Menu, Divider, Provider } from 'react-native-paper';
import { doc, onSnapshot } from 'firebase/firestore';

export default function ProfileScreen({navigation}) {

  const [visible, setVisible] = useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const [username, setUsername] = useState('');
  const [useremail, setUseremail] = useState('');
  const [userPhone, setUserphone] = useState('');
  const [userVenmo, setUserVenmo] = useState('');
  const [userBio, setUserBio] = useState('');
  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, "profiles", auth.currentUser.uid), 
    (docSnap) => {
      data = docSnap.data();
      setUsername(data.username);
      setUserVenmo(data.venmo);
      setUserphone(data.phone);
      setUseremail(data.email);
      setUserBio(data.bio);
    }, 
    (error) => {
      console.log("Error in ProfileScreen useEffect");
    });
    return () => unsubscribe();
  }, [username, useremail, userPhone, userVenmo, userBio]);
    return (
      <ScrollView style={{backgroundColor: "#f9f1ff", marginTop: "10%"}}>
        {/* Sets up Edit Profile and Signout Buttons */}
        <View style={{zIndex: 100}}>
          <Provider>
          <View
            style={{
              paddingTop: 10,
              flexDirection: 'row',
              paddingBottom: 20,
              flex: 1,
              alignSelf: 'flex-end',
            }}>
            <Menu
            style={{ marginTop: -50,
              backgroundColor: "#f9f1ff", borderWidth: 2, zIndex:100 }}
            visible={visible}
            onDismiss={closeMenu}
            anchor={
              <TouchableOpacity onPress={openMenu}>
                <Ionicons
              name={'ellipsis-horizontal'}
              size={40}
              color="#98A836"
              style={{ paddingRight:20 }}
            />
              </TouchableOpacity>
            }>
                <Menu.Item onPress={() => navigation.navigate(editProfileName)} title="Edit Profile" />
                <Divider />
                <Menu.Item onPress={() => signOut(auth)} title="Sign Out" />
            </Menu>
          </View>
        </Provider>
      </View>
        <View style={{flex: 1, alignItems: "center", backgroundColor: "#f9f1ff"}}>
          {/* User Info: Profile picture, Name, Email, Phonenumber, and Venmo */}
        <Image 
          source={{
          uri: 'https://thumbs.dreamstime.com/b/user-profile-grey-icon-web-avatar-employee-symbol-user-profile-grey-icon-web-avatar-employee-symbol-sign-illustration-design-191067342.jpg'
          }} 
          style={{width: 150, height: 150, borderRadius: 150/2, borderWidth: 10,  borderColor: '#8147A8'}} 
        />
        <Text style={{fontSize: 26, fontWeight: 'bold', color: '#98A836', fontFamily: "Futura-CondensedExtraBold"}}>
          {username}
        </Text>
        <View style={{flexDirection: 'row'}}>
        <Ionicons
            name={'mail'}
            size={20}
            color="#98A836"
          />
          <Text style={{fontSize: 16, fontWeight: 'bold', color: '#98A836', fontFamily: "Futura"}}>: {useremail}</Text>
        </View>  
        <View style={{flexDirection: 'row'}}>
          <Ionicons
            name={'call'}
            size={20}
            color="#98A836"
          />
          <Text style={{fontSize: 16, fontWeight: 'bold', color: '#98A836', fontFamily: "Futura"}}>
            : {userPhone}
          </Text>
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
                <Text style={[styles.moneyTitle, {fontFamily: "Futura"}]}> @{userVenmo}  </Text>
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
              <Text style={{fontSize: 16, color: '#98A836', fontFamily: "Futura",flexWrap: 'wrap'}}>
                About Me:
              </Text>
              <View>
                <Text style={{fontSize: 15,  color: '#8147a8', fontFamily: "Futura", flexWrap: 'wrap'}}> {userBio}</Text>
              </View>
            </View>
            <View style={styles.taskTags}>
            </View>
          </View>
        </View>
        
        <ProfileGroupBox/>
        <ProfileTaskBox/>
        </View>
      </ScrollView>
      
    );
}
