import * as React from 'react';
import { useState, useEffect } from 'react';
import {View, Text, Button, ScrollView} from 'react-native';
import { SearchBar } from 'react-native-elements';
import { createGroupName } from '../utils/constants';
import { getCurrentGroupsArray } from '../classes/user';
import { groupConverter, getGroupByID } from '../classes/group';
import styles from './home.styles';
import { db, auth } from '../config/firebase';
import { collection, doc, getDoc, onSnapshot, query, where } from "firebase/firestore";
import { getTaskByID, taskConverter } from '../classes/task';


export default function HomeScreen({navigation}) {
  const [tasks, setTasks] = useState([]);
  const [groupNames, setGroupNames] = useState([]);
  const [searchQuery, setSearchQuery] = React.useState('');

  const onChangeSearch = query => setSearchQuery(query);

  useEffect(() => {
    const q = query(collection(db, "groups"), where("members", 'array-contains', auth.currentUser.uid));
    setTasks([]);
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      querySnapshot.docChanges().forEach((change) => {
        const group = groupConverter.fromFirestore(change.doc);
        setGroupNames(groupNames => [...groupNames, group]);
        const taskUids = group.tasks;
        for (let taskUid of taskUids) {
          const unsub = onSnapshot(doc(db, "tasks", taskUid), (t) => {
            const task = taskConverter.fromFirestore(t);
            task["group"] = group;
            setTasks(tasks => [...tasks, task]);
          });
        }
      });
    }, 
    (error) => {
      console.log("Error in TasksScreen useEffect");
    });
    return () => unsubscribe();
  }, []);

  let prevRenderedTasks = new Set();

  function displayTask(title, time, numPeople, groupName, ownerUsername, group) {
    var target = groupNames.find(obj => {
      return obj.key === groupName
    })

    /* Do not render tasks from the past */
    let currTime = new Date();
    /* Date has already passed. */
    if (currTime.getFullYear() >= time.year && (currTime.getMonth() + 1) >= time.month && currTime.getDate() > time.day) {
      return (null);
    }
    /* Today, but need to check time. */
    if (currTime.getFullYear() === time.year && (currTime.getMonth() + 1) === time.month && currTime.getDate() === time.day) {
      /* Previously in the day. */
      if (currTime.getHours() > time.hour) {
        return (null);
      }
      /* Previously in the hour. */
      if (currTime.getHours() === time.hour) {
        if (currTime.getMinutes() > time.minute) {
          return (null);
        }
      }
    }

    /* Do not re-render tasks with the same title. */
    if (prevRenderedTasks.has(title)) {
      return (null);
    }
    prevRenderedTasks.add(title);

    /* Convert to 12 hour clock. */
    let timeStr = "";
    if (time.hour == 0) {
      if (time.minute < 10) {
        timeStr = 12 + ":0" + time.minute + " AM";
      } else {
        timeStr = 12 + ":" + time.minute + " AM";
      }
    }
    else if (time.hour >= 12) {
      if (time.minute < 10) {
        timeStr = (time.hour - 12) + ":0" + time.minute + " PM";
      } else {
        timeStr = (time.hour - 12) + ":" + time.minute + " PM";
      }
    } else {
      if (time.minute < 10) {
        timeStr = (time.hour) + ":0" + time.minute + " AM";
      } else {
        timeStr = (time.hour) + ":" + time.minute + " AM";
      }
    }
    timeStr = time.month + "/" + time.day + "/" + time.year + " at " + timeStr;

    return(
      <View style={styles.taskBox}>
        <View style={styles.picAndDesc}>
          <View style={styles.groupPic}>
            <Text style={styles.groupEmoji}>{group.emoji}</Text>
          </View>
          <View style={{flex: 1}}>
            <Text style={styles.taskTitle}>{title}</Text>
            <Text style={styles.taskInfo}>{timeStr}</Text>
            <Text style={styles.taskInfo}>{"@" + ownerUsername}</Text>
          </View>
        </View>
        <View style={styles.taskTags}>
          <View style={styles.taskTag}>
            <Text style={styles.taskTagText}>{group.name}</Text>
          </View>
          <View style={styles.taskTag}>
            <Text style={styles.taskTagText}>{numPeople + " Spots"}</Text>
          </View>
        </View>
      </View>
    )
  }

  return (
    <ScrollView style={{backgroundColor: "#f9f1ff"}}>
      <View style={styles.entireScreen}>
        <Text style={styles.title}> 
          Task Together
        </Text>


        <SearchBar
          cancelButtonProps={styles.cancelText}
          containerStyle={styles.searchContainer}
          inputContainerStyle={styles.searchInputContainer}
          placeholder="Search recent tasks..."
          placeholderTextColor="#98a836"
          platform="ios"
          searchIcon={styles.searchIcon}
          onChangeText={onChangeSearch}
          value={searchQuery}
        />

        <Text style={styles.subtitle}> 
          Recent Activity
        </Text>

        {     
          tasks.map( taskInfo => {
            return(displayTask(taskInfo.title, taskInfo.time, taskInfo.max_num_people, taskInfo.groupUID, taskInfo.ownerUsername, taskInfo.group))
          })
        }
 
      </View>
    </ScrollView>
  );
}
  

