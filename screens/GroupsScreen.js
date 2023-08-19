import * as React from 'react';
import { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { groupInfoName } from '../utils/constants';
import { groupConverter } from '../classes/group';
import styles from './home.styles';
import { db, auth } from '../config/firebase';
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { ScrollView } from 'react-native-gesture-handler';

export default function GroupsScreen({ navigation }) {

  const [groups, setGroups] = useState([]);

  useEffect(() => {
    // Display groups that you are a member of (i.e. member or admin)
    const q = query(collection(db, "groups"), where("members", "array-contains", auth.currentUser.uid));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      setGroups([]);
      querySnapshot.forEach((change) => {
        const groupUID = change.id;
        const group = groupConverter.fromFirestore(change);
        setGroups(groups => [...groups, { group: group, group_uid: groupUID }]);
      });
    },
      (error) => {
        console.log("Error in GroupsScreen useEffect");
      });
    return () => unsubscribe();
  }, [])

  function displayGroup(title, emoji, description, numMembers, groupUID) {
    return (
      <TouchableOpacity style={styles.taskBox} onPress={() => navigation.navigate(groupInfoName, { group_uid: { groupUID } })} >
        <View>
          <View style={styles.picAndDesc}>
            <View style={[styles.groupPic, { backgroundColor: "#f4e5ff" }]}>
              <Text style={styles.groupEmoji}>{emoji}</Text>
            </View>
            <View>
              <Text style={styles.taskTitle}>{title}</Text>
              <Text style={styles.taskInfo}>{numMembers + " Members"}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#f9f1ff" }}>
      <Text style={[styles.title, { color: "#98a836", marginBottom: 10 }]}>Your Groups</Text>
      <View>
        {
          groups.map(groupInfo => {
            return (displayGroup(groupInfo.group.name, groupInfo.group.emoji, groupInfo.group.description, groupInfo.group.members.length, groupInfo.group_uid))
          })
        }

      </View>
    </ScrollView>
  );
}

