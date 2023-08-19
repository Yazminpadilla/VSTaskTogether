import * as React from 'react';
import { useState, useEffect } from 'react';
import { View, Text, Button, ScrollView } from 'react-native';
import styles from './home.styles';
import { db, auth } from '../config/firebase';
import { collection, doc, getDoc, onSnapshot, query, where } from "firebase/firestore";
import { getCurrentTasksArray } from '../classes/user';
import { getTaskByID, taskConverter } from '../classes/task';
import { getGroupByID, groupConverter } from '../classes/group';
import { async } from '@firebase/util';


export default function TasksScreen({ navigation }) {

  const [taskUidArray, setTaskUidArray] = useState('');
  const [tasks, setTasks] = useState([]);
  const [groupNames, setGroupNames] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "tasks"), where("members", "array-contains", auth.currentUser.uid));
    setTasks([]);
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      querySnapshot.docChanges().forEach((change) => {
        const task = taskConverter.fromFirestore(change.doc);
        setTasks(tasks => [...tasks, task]);
        const unsub = onSnapshot(doc(db, "groups", task.groupUID), (g) => {
          const group = groupConverter.fromFirestore(g);
          setGroupNames(groupNames => [...groupNames, { key: task.groupUID, value: group.name }]);
        });
      });
    },
      (error) => {
        console.log("Error in TasksScreen useEffect");
      });
    return () => unsubscribe();
  }, []);

  let prevRenderedTasks = new Set();

  function displayTask(title, emoji, time, numPeople, groupUid, ownerUsername) {
    var target = tasks.find(obj => {
      return obj.key === title
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

    let groupName = "";
    for (let groupObj of groupNames) {
      if (groupObj.key === groupUid) {
        groupName = groupObj.value;
      }
      // if (groupObj.indexOf(groupUid) != -1) {
      //   groupName = groupObj[groupUid];
      // }
    }

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

    return (
      <View style={styles.taskBox}>
        <View style={styles.picAndDesc}>
          <View style={styles.groupPic}>
            <Text style={styles.groupEmoji}>{emoji}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.taskTitle}>{title}</Text>
            <Text style={styles.taskInfo}>{timeStr}</Text>
            <Text style={styles.taskInfo}>{"@" + ownerUsername}</Text>
          </View>
        </View>
        <View style={styles.taskTags}>
          <View style={styles.taskTag}>
            <Text style={styles.taskTagText}>{groupName}</Text>
          </View>
          <View style={styles.taskTag}>
            <Text style={styles.taskTagText}>{numPeople + " Spots"}</Text>
          </View>
        </View>
      </View>
    )
  }

  return (
    <ScrollView style={{ backgroundColor: "#f9f1ff" }}>
      <View style={{ flex: 1, alignItems: "flex-start", backgroundColor: "#f9f1ff" }}>
        <Text style={[styles.title, { color: "#98a836", marginBottom: 10 }]}>
          Your Upcoming Tasks
        </Text>

        {
          tasks.map(taskInfo => {
            return (displayTask(taskInfo.title, taskInfo.emoji, taskInfo.time, taskInfo.max_num_people, taskInfo.groupUID, taskInfo.ownerUsername))
          })
        }

      </View>
    </ScrollView>
  );
}

