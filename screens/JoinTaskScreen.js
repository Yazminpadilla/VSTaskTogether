import * as React from 'react';
import { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { taskConverter } from '../classes/task';
import { groupConverter } from '../classes/group';
import styles from './home.styles';
import { db, auth } from '../config/firebase';
import { collection, doc, getDoc, onSnapshot, query, updateDoc } from "firebase/firestore";
import { ScrollView } from 'react-native-gesture-handler';
import { GoogleAuthProvider } from 'firebase/auth';

export default function JoinTaskScreen({ navigation }) {
  const [tasks, setTasks] = useState([]);
  const [groupNames, setGroupNames] = useState([]);
  useEffect(() => {
    const q = query(collection(db, "tasks"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      setTasks([]);
      querySnapshot.forEach((change) => {
        // For every task that user is NOT a part of, add to tasks array to render
        const taskUID = change.id;
        const memberships = change.data().members;
        if (!memberships.includes(auth.currentUser.uid)) {
          const task = taskConverter.fromFirestore(change);
          const unsub = onSnapshot(doc(db, "groups", task.groupUID), (g) => {
            const group = groupConverter.fromFirestore(g);
            if (group.members.includes(auth.currentUser.uid)) {
              setTasks(tasks => [...tasks, { task: task, task_id: taskUID }]);
              setGroupNames(groupNames => [...groupNames, { key: task.groupUID, value: group.name }]);
            }
          });
        }
      });
    },
      (error) => {
        console.log("Error in JoinTaskScreen useEffect");
      });
    return () => { unsubscribe(); }
  }, [])

  async function addUserToTask(taskUID) {
    try {
      // Step 1: Update Task to have user as a member
      // Fetch the task
      console.log("In addUserToTask. taskUID: ", taskUID);
      const taskDocRef = doc(db, "tasks", taskUID);
      const taskDocSnap = await getDoc(taskDocRef);
      const taskData = taskDocSnap.data();
      // Get the members array
      var taskMemArr = taskData.members;
      // Add user uid to array
      taskMemArr.push(auth.currentUser.uid);
      // Update task doc entry in firebase 
      await updateDoc(taskDocRef, {
        members: taskMemArr
      });
      console.log("Updated task doc.");
      // Step 2: Update user profile to have task in tasks
      const profileDocRef = doc(db, "profiles", auth.currentUser.uid);
      const profileDocSnap = await getDoc(profileDocRef);
      const profileData = profileDocSnap.data();
      console.log("Profile data: ", profileData);
      var profileTasksArr = profileData.tasks;
      console.log("Profile tasks: ", profileTasksArr);
      profileTasksArr.push(taskUID);
      await updateDoc(profileDocRef, {
        tasks: profileTasksArr
      })
    } catch (e) {
      console.error("Error adding user to task: ", e);
    }
  }

  function joinTask(taskUID) {
    Alert.alert("Confirm to Join", "Are you sure you want to join?", [
      {
        text: "Yes",
        onPress: () => addUserToTask(taskUID)
      },
      {
        text: "No",
        onPress: () => console.log("Not clicked")
      }
    ]);
  }

  let prevRenderedTasks = new Set();

  function displayTask(title, emoji, time, numPeople, groupUid, ownerUsername, taskUID) {
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
        timeStr = (time.hour - 12) + ":0" + time.minute + " AM";
      } else {
        timeStr = (time.hour - 12) + ":" + time.minute + " AM";
      }
    }
    timeStr = time.month + "/" + time.day + "/" + time.year + " at " + timeStr;

    return (
      <TouchableOpacity style={styles.taskBox} onPress={() => joinTask(taskUID)} >
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
      </TouchableOpacity>
    )
  }

  return (
    <ScrollView style={{ backgroundColor: "#f9f1ff" }}>
      <View style={{ flex: 1, alignItems: "flex-start", backgroundColor: "#f9f1ff" }}>
      <Text style={[styles.title, { color: "#98a836", marginBottom: 10 }]}>
          Join a Task
        </Text>

        {
          tasks.map(taskInfo => {
            return (displayTask(taskInfo.task.title, taskInfo.task.emoji, taskInfo.task.time,
              taskInfo.task.max_num_people, taskInfo.task.groupUID, taskInfo.task.ownerUsername, taskInfo.task_id))
          })
        }

      </View>
    </ScrollView>
  );
}