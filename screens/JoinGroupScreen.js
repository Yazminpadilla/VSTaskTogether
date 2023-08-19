import * as React from 'react';
import { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { groupConverter } from '../classes/group';
import styles from './home.styles';
import { db, auth } from '../config/firebase';
import { collection, doc, getDoc, onSnapshot, query, updateDoc } from "firebase/firestore";
import { ScrollView } from 'react-native-gesture-handler';

export default function JoinGroupsScreen({ navigation }) {
  const [groups, setGroups] = useState([]);
  useEffect(() => {
    const q = query(collection(db, "groups"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      setGroups([]);
      querySnapshot.forEach((change) => {
        // For every group that user is NOT a part of, add to groups array to render
        const groupUID = change.id;
        const memberships = change.data().members;
        if (!memberships.includes(auth.currentUser.uid)) {
          const groupObj = groupConverter.fromFirestore(change);
          const groupObj2 = { ...groupObj, numMembers: groupObj.members.length };
          setGroups(groups => [...groups, { group: groupObj2, group_uid: groupUID }]);
        }
      });
    },
      (error) => {
        console.log("Error in JoinGroupsScreen useEffect");
      });
    return () => { unsubscribe(); }
  }, [])

  async function addUserToGroup(groupUID) {
    try {
      // Step 1: Update Group to have user as a member
      // Fetch the group
      const groupDocRef = doc(db, "groups", groupUID);
      const groupDocSnap = await getDoc(groupDocRef);
      const groupData = groupDocSnap.data();
      // Get the members array
      var groupMemArr = groupData.members;
      // Add user uid to array
      groupMemArr.push(auth.currentUser.uid);
      // Update group doc entry in firebase 
      await updateDoc(groupDocRef, {
        members: groupMemArr
      });
      console.log("Updated group doc.");
      // Step 2: Update user profile to have group in groups
      const profileDocRef = doc(db, "profiles", auth.currentUser.uid);
      const profileDocSnap = await getDoc(profileDocRef);
      const profileData = profileDocSnap.data();
      var profileGroupsArr = profileData.groups;
      profileGroupsArr.push(groupUID);
      await updateDoc(profileDocRef, {
        groups: profileGroupsArr
      })
    } catch (e) {
      console.error("Error adding user to group: ", e);
    }
  }

  function joinGroup(groupUID) {
    Alert.alert("Confirm to Join", "Are you sure you want to join?", [
      {
        text: "Yes",
        onPress: () => addUserToGroup(groupUID)
      },
      {
        text: "No",
        onPress: () => console.log("Not clicked")
      }
    ]);
  }

  function displayGroup(title, emoji, description, numMembers, groupUID) {
    return (
      <TouchableOpacity style={styles.taskBox} onPress={() => joinGroup(groupUID)} >
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
      <Text style={[styles.title, { color: "#98a836", fontSize: 35, marginBottom: 10}]}>Groups Available to Join</Text>
      <View>
        {
          groups.map(groupInfo => {
            return (displayGroup(groupInfo.group.name, groupInfo.group.emoji, groupInfo.group.description, groupInfo.group.numMembers, groupInfo.group_uid))
          })
        }

      </View>
    </ScrollView>
  );
}

