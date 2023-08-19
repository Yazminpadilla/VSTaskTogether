import * as React from 'react';
import { useState, useEffect } from 'react';
import { View, Text, TouchableHighlight } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { groupConverter } from '../classes/group';
import styles from './home.styles';
import { db } from '../config/firebase';
import { doc, onSnapshot } from "firebase/firestore";
import { ScrollView } from 'react-native-gesture-handler';
import { groupsName } from '../utils/constants';
import { userConverter } from '../classes/user';
import { taskConverter } from '../classes/task';

export default function GroupsInfoScreen({ navigation, route }) {
  const [group, setGroup] = useState({});
  const [tasks, setTasks] = useState([]);
  const [admin, setAdmin] = useState({});
  const [members, setMembers] = useState([]);
  // Fetch the group doc for the group selected on the previous page
  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, "groups", route.params.group_uid.groupUID), (docSnap) => {
      const groupObj = groupConverter.fromFirestore(docSnap);
      const groupObj2 = { ...groupObj, numMembers: groupObj.members.length };
      setGroup(groupObj2);

      let adminUid = groupObj.admin_uid;
      let memberUids = groupObj.members;
      let taskUids = groupObj.tasks;
      /* Add admin user info to render */
      const unsubAdmin = onSnapshot(doc(db, "profiles", adminUid), (a) => {
        const currAdmin = userConverter.fromFirestore(a);
        setAdmin(admin => currAdmin);
      });
      /* Add member user info */
      for (let memberUid of memberUids) {
        const unsub = onSnapshot(doc(db, "profiles", memberUid), (m) => {
          const member = userConverter.fromFirestore(m);
          setMembers(members => [...members, member]);
        });
      }
      /* Add task info */
      for (let taskUid of taskUids) {
        const unsub = onSnapshot(doc(db, "tasks", taskUid), (t) => {
          const task = taskConverter.fromFirestore(t);
          setTasks(tasks => [...tasks, task]);
        });
      }

    },
      (error) => {
        console.log("Error in GroupsInfoScreen useEffect");
      });
    return () => unsubscribe();
  }, [])

  console.log("Group = ");
  console.log(group);
  console.log("Tasks = ");
  console.log(tasks);
  console.log("Admin = ");
  console.log(admin);
  console.log("Members = ");
  console.log(members);

  let prevRenderedTasks = new Set();

  function displayTask(title, time, numPeople, ownerUsername) {
    var target = members.find(obj => {
      return obj.key === ownerUsername
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
      <View style={[styles.taskBox, {padding: 3}]}>
        <View style={styles.picAndDesc}>
          <View style={{ flex: 1 }}>
            <Text style={styles.taskTitle}>{title}</Text>
            <Text style={styles.taskInfo}>{timeStr}</Text>
            <Text style={styles.taskInfo}>{"@" + ownerUsername}</Text>
          </View>
        </View>
        <View style={styles.taskTags}>
          <View style={styles.taskTag}>
            <Text style={styles.taskTagText}>{numPeople + " Spots"}</Text>
          </View>
        </View>
      </View>
    )
  }

  let prevSeenMembers = new Set();
  let prevSeenTasks = new Set();


  function displayGroup(title, emoji, description, numMembers, admin, members, tasks) {
    return (
      <View style={styles.groupProfile}>
        <View style={styles.picAndTitle}>
          <View style={[styles.groupPic, { backgroundColor: "#f4e5ff" }]}>
            <Text style={[styles.groupEmoji, { fontSize: 120 }]}>{emoji}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={[styles.title]}>{title}</Text>
          </View>
        </View>
        <View style={[styles.groupDescBox, { marginBottom: 3}]}>
          <Text style={styles.groupDescText}>{"Description: " + description}</Text>
        </View>
        <View style={[styles.groupDescBox, { borderColor: "#c57ff5", marginBottom: 3, marginTop: 3 }]}>
          <Text style={[styles.groupDescText, { color: "#c57ff5" }]}>{"Admin: @" + admin.username}</Text>
        </View>
        <View style={[styles.memberDescBox, {marginBottom: 3, marginTop: 3 }]}>
          <Text style={[styles.groupDescText, { color: "#98a836" }]}>{"Members:"}</Text>
          {
            members.map(memberInfo => {
              if (prevSeenMembers.has(memberInfo)) {
                return (null);
              }
              prevRenderedTasks.add(memberInfo);
              return (<Text style={[styles.groupDescText, { color: "#98a836" }]}>{"@" + memberInfo.username}</Text>)
            })
          }
        </View>

        <View style={[styles.memberDescBox, {marginBottom: 3, marginTop: 3, borderColor: '#8147a8' }]}>
          <Text style={[styles.groupDescText, { color: "#8147a8" }]}>{"Open Tasks:"}</Text>
          {
            tasks.map(taskInfo => {
              if (prevSeenTasks.has(taskInfo)) {
                return (null);
              }
              prevSeenTasks.add(taskInfo);
              return (displayTask(taskInfo.title, taskInfo.time, taskInfo.max_num_people, taskInfo.ownerUsername))
            })
          }
        </View>

      </View>
      // <View style={styles.taskBox}>
      //   <View>
      //     <View style={styles.picAndDesc}>
      //       <View style={[styles.groupPic, { backgroundColor: "#474ba8" }]}>
      //         <Text style={styles.groupEmoji}>{emoji}</Text>
      //       </View>
      //       <View>
      //         <Text style={styles.taskTitle}>{title}</Text>
      //         <Text style={styles.taskInfo}>{numMembers + " Members"}</Text>
      //       </View>
      //     </View>
      //     {/* <View style={styles.taskTags}>
      //         <View style={styles.taskTag}>
      //           <Text style={styles.taskTagText}>Centro Fam</Text>
      //         </View>
      //         <View style={styles.taskTag}>
      //           <Text style={styles.taskTagText}>Casual</Text>
      //         </View>
      //         <View style={styles.taskTag}>
      //           <Text style={styles.taskTagText}>{numPeople}</Text>
      //         </View>
      //       </View> */}
      //   </View>
      // </View>
    )
  }

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#f9f1ff" }}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }} >
        <TouchableHighlight style={{
          padding: 5
        }} onPress={() => navigation.navigate(groupsName)}>
          <View>
            <Ionicons
              name={'arrow-back-circle'}
              size={45}
              color="#98A836"
            />
          </View>
        </TouchableHighlight>
        <Text style={[styles.title, { color: "#98a836", margin: 10, marginLeft: "13%" }]}>Group Details</Text>
      </View>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        {displayGroup(group.name, group.emoji, group.description, group.numMembers, admin, members, tasks)}
      </View>
    </ScrollView>
  );
}

