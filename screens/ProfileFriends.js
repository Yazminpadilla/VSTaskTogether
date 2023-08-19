import * as React from 'react';
import { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { groupInfoName } from '../utils/constants';
import { groupConverter } from '../classes/group';

import { db, auth } from '../config/firebase';
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { ScrollView } from 'react-native-gesture-handler';
import styles from './Profile.styles';

export default function ProfileGroupBox() {
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
      <View style={[styles.groupPic, { backgroundColor: "#8147a8" }]}>
        <Text style={styles.groupEmoji}>{emoji}</Text>
      </View>

    )
  }

  return (
    <ScrollView>
      <View style={styles.friendsBox}>
          <View style={styles.picAndDesc}>
            <View style={[styles.tagsTitlebox, { backgroundColor: "#c57ff5" }]}>
              <Text style={[styles.tasksTitle, {fontFamily: "Futura"}]}>Frequent Groups</Text>
            </View>
          </View>
            <View style={{ flex: 1, flexDirection: 'row', alignItems: "flex-start", paddingBottom: 4 }}>
              {
                groups.map(groupInfo => {
                  return (displayGroup(groupInfo.group.name, groupInfo.group.emoji, groupInfo.group.description, groupInfo.group.members.length, groupInfo.group_uid))
                })
              }
            </View>
      </View>
    </ScrollView>
  );
};