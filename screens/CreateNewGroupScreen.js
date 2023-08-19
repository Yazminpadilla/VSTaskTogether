import * as React from 'react';
import { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { db, auth } from '../config/firebase';
import { collection, addDoc, updateDoc, doc } from "firebase/firestore";
import styles from './createTask.styles';
import Group from '../classes/group';
import { groupConverter } from '../classes/group';
import { getCurrentGroupsArray } from '../classes/user';
import { groupsName } from '../utils/constants';
import EmojiPicker from 'rn-emoji-keyboard';


export default function CreateNewGroupScreen({ navigation }) {
  const [groupTitle, setGroupTitle] = useState('');
  const [emoji, setGroupEmoji] = useState('');
  const [groupDescription, setGroupDescription] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  async function createGroupPressed() {
    try {
      // Attempt to add error checking on fields
      if (groupTitle == '' || emoji == '' || groupDescription == '') {
        alert("Please fill in all fields");
        return;
      }
      const newGroup = new Group(groupTitle, groupDescription, emoji, auth.currentUser.uid,
        [auth.currentUser.uid], [])
      const docRef = await addDoc(collection(db, "groups"),
        groupConverter.toFirestore(newGroup));
      //console.log("Document written with ID: ", docRef.id);

      var currentGroups = await getCurrentGroupsArray(auth.currentUser.uid)

      currentGroups.push(docRef.id)

      const profileRef = doc(db, "profiles", auth.currentUser.uid);
      await updateDoc(profileRef, {
        groups: currentGroups
      });
      alert("Group successfully created!")

    } catch (e) {
      console.error("Error adding document: ", e);
    }
    setGroupTitle('');
    setGroupEmoji('');
    setGroupDescription('');

    // navigate back groups page and see you're new group!
    navigation.navigate(groupsName)

  }
  function handleEmojiPick(emojiPicker) {
    setGroupEmoji(emojiPicker.emoji);
  }

  return (
    <View style={{ backgroundColor: '#F9F1FF', flex: 1 }}>
      <Text style={[styles.title, {color: "#98a836"}]}>Create a New Group</Text>
      <View style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: '#F9F1FF', flexDirection: 'column' }}>

        <TextInput placeholder='Group Title' placeholderTextColor={'#8147a8'} style={[styles.input, {color: '#8147a8'}]} onChangeText={setGroupTitle} value={groupTitle} />

        <TouchableOpacity style={styles.input} onPress={() => setIsOpen(!isOpen)}>
          <Text style={{ color: '#c57ff5', fontSize: 20 }}>{emoji ? emoji : "Group Emoji"}</Text>
        </TouchableOpacity>
        <EmojiPicker onEmojiSelected={handleEmojiPick} open={isOpen} onClose={() => setIsOpen(false)} />

        <TextInput placeholder='Group Description' placeholderTextColor={'#98A836'} style={styles.input} onChangeText={setGroupDescription} value={groupDescription} />

        <TouchableOpacity style={styles.button} onPress={createGroupPressed}>
          <Text style={styles.buttonText}>Create Group</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}