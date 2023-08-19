import * as React from 'react';
import { Text, View, StyleSheet, ScrollView } from 'react-native';
import styles from './Profile.styles';
import { useState, useEffect } from 'react';
import { getCurrentTasksArray, getUserProfileByID } from '../classes/user';
import { getTaskByID, taskConverter } from '../classes/task';
import { db, auth } from '../config/firebase';
import { collection, doc, getDoc, onSnapshot, query, where } from "firebase/firestore";
import { getGroupByID, groupConverter } from '../classes/group';


const ProfileTaskBox = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "tasks"), where("members", "array-contains", auth.currentUser.uid));
    setTasks([]);
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      querySnapshot.docChanges().forEach((change) => {
        let task = taskConverter.fromFirestore(change.doc);
        let groupUid = task.groupUID;
        const unsub = onSnapshot(doc(db, "groups", groupUid), (g) => {
          let group = groupConverter.fromFirestore(g);
          task["group"] = group;
          setTasks(tasks => [...tasks, task]);
        });
      });
    },
      (error) => {
        console.log("Error in ProfileTaskBox useEffect");
      });
    return () => unsubscribe();
  }, []);



  let prevRenderedTasks = new Set();

  function displayTask(title, emoji, time, numPeople, groupName, ownerUsername, group) {
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
      <View style={[styles.taskBox, {maxWidth: "90%", minWidth: "90%"}]}>
          <View style={styles.picAndDesc}>
            <View style={[styles.groupPic, { backgroundColor: "#cdd887" }]}>
              <Text style={styles.groupEmoji}>{emoji}</Text>
            </View>
            <View style={{marginLeft: 5}}>
              <Text style={styles.taskTitle}>{title}</Text>
              <Text style={styles.taskInfo}>{timeStr}</Text>
              <Text style={styles.taskInfo}>{ownerUsername}</Text>
            </View>
          </View>
      </View>
    )
  }

  return (
    <View style={styles.taskBox}>
      <View>
        <View style={styles.picAndDesc}>
          <View style={[styles.tagsTitlebox, { backgroundColor: "#98a836", minWidth: "97%"}]}>
            <Text style={styles.tasksTitle}>Open Tasks</Text>
          </View>
        </View>
        <ScrollView>
          <View style={{ flex: 1, alignItems: "flex-start", backgroundColor: "#fff" }}>

            {
              tasks.map(taskInfo => {
                return (displayTask(taskInfo.title, taskInfo.emoji, taskInfo.time, taskInfo.max_num_people, taskInfo.groupUID, taskInfo.ownerUsername, taskInfo["group"]))
              })
            }

          </View>
        </ScrollView>
      </View>
    </View>

  );
};

export default ProfileTaskBox;
