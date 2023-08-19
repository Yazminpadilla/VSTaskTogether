import * as React from 'react';
import { useState, useEffect } from 'react';
import {View, Text} from 'react-native';
import { Button } from 'react-native-elements';
import { createGroupName } from '../utils/constants';
import { getCurrentGroupsArray } from '../classes/user';
import { groupConverter, getGroupByID } from '../classes/group';
import styles from './home.styles';
import { db, auth } from '../config/firebase';
import { collection, doc, getDoc, onSnapshot, query, where } from "firebase/firestore";
import { ScrollView } from 'react-native-gesture-handler';

export default function TaskInfoScreen({route}) {
  const [group, setGroup] = useState({});
  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, "groups", route.params.group_uid.groupUID), (docSnap) => {
        const groupObj = groupConverter.fromFirestore(docSnap); 
        const groupObj2 = {...groupObj, numMembers: groupObj.members.length};
        setGroup(groupObj2);
    }, 
    (error) => {
      console.log("Error in GroupsInfoScreen useEffect");
    });
    return () => unsubscribe();
  }, [])

  function displayGroup(title, emoji, description, numMembers){
    return(
      <View style={styles.taskBox}>
          <View>
            <View style={styles.picAndDesc}>
              <View style={[ styles.groupPic, {backgroundColor: "#474ba8"} ]}>
                <Text style={styles.groupEmoji}>{emoji}</Text>
              </View>
              <View>
                <Text style={styles.taskTitle}>{title}</Text>
                <Text style={styles.taskInfo}>{numMembers + " Members"}</Text>
              </View>
            </View>
            {/* <View style={styles.taskTags}>
              <View style={styles.taskTag}>
                <Text style={styles.taskTagText}>Centro Fam</Text>
              </View>
              <View style={styles.taskTag}>
                <Text style={styles.taskTagText}>Casual</Text>
              </View>
              <View style={styles.taskTag}>
                <Text style={styles.taskTagText}>{numPeople}</Text>
              </View>
            </View> */}
          </View>
        </View>
    )
  }

    return (
      <ScrollView>
      <View style={{ alignItems: 'center', justifyContent: 'center'}}>
        <Text style={{fontSize: 26, fontWeight: 'bold'}}>TODO: Group Info Page!</Text>
        <View> 
            {displayGroup(group.name, group.emoji, group.description, group.numMembers)}
        </View>
      </View>  
      </ScrollView> 
    );
}
