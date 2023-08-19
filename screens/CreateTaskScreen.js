import * as React from 'react';
import { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import NumericInput from 'react-native-numeric-input';
import DateTimePicker from '@react-native-community/datetimepicker';
import { db, auth } from '../config/firebase';
import { collection, addDoc, updateDoc, doc, onSnapshot } from "firebase/firestore";
import styles from './createTask.styles';
import Task from '../classes/task';
import { getCurrentTasksArray, getUserProfileByID } from '../classes/user';
import { taskConverter } from '../classes/task';
import { getCurrentGroupTasksArray, groupConverter } from '../classes/group';
import { SelectList } from 'react-native-dropdown-select-list'
import EmojiPicker from 'rn-emoji-keyboard';
import { tasksName } from '../utils/constants';
import Ionicons from 'react-native-vector-icons/Ionicons';


export default function CreateTaskScreen({ navigation }) {


  const [selectedGroup, setSelectedGroup] = useState("");
  const [groupNames, setGroupNames] = useState([])
  const [title, setTitle] = useState('');
  const [numPeople, setNumPeople] = useState(0);
  const [details, setDetails] = useState('');
  const [chosenDate, setChosenDate] = useState(new Date());
  const [chosenTime, setChosenTime] = useState(new Date());
  const [isOpen, setIsOpen] = useState(false);
  const [emoji, setTaskEmoji] = useState('');

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, "profiles", auth.currentUser.uid),
      (docSnap) => {
        setGroupNames([]);
        const data = docSnap.data();
        const groupsArray = data.groups;
        groupsArray.map((groupUID) => {
          onSnapshot(doc(db, "groups", groupUID), (groupDoc) => {
            const group = groupConverter.fromFirestore(groupDoc);
            setGroupNames(groupNames => [...groupNames, { key: groupUID, value: group.name }])
          });
        });
      },
      (error) => {
        console.log("Error in CreateATask groups's useEffect");
      });
    return () => { unsubscribe(); }
  }, []);

  async function createPressed() {
    try {
      if (!selectedGroup) {
        alert("Please select a group");
        return;
      }
      const user = await getUserProfileByID(auth.currentUser.uid);
      const newTask = new Task(title, emoji, numPeople, details, auth.currentUser.uid,
        {
          day: chosenDate.getDate(),
          month: chosenDate.getMonth() + 1, // Super weird: months are zero indexed. Such an awful design decision
          year: chosenDate.getFullYear(),
          minute: chosenTime.getMinutes(),
          hour: chosenTime.getHours()
        }, selectedGroup, user.username, [auth.currentUser.uid])
      const docRef = await addDoc(collection(db, "tasks"),
        taskConverter.toFirestore(newTask));
      //console.log("Document written with ID: ", docRef.id);

      // get the current tasks array
      var currentTasks = await getCurrentTasksArray(auth.currentUser.uid)

      // add the newly added task to the user's tasks array
      currentTasks.push(docRef.id)

      const profileRef = doc(db, "profiles", auth.currentUser.uid);
      await updateDoc(profileRef, {
        tasks: currentTasks
      });

      // add task ID to group task array
      var currentGroupTasks = await getCurrentGroupTasksArray(selectedGroup)

      // add the newly added task to the group's tasks array
      currentGroupTasks.push(docRef.id)

      const groupRef = doc(db, "groups", selectedGroup);
      await updateDoc(groupRef, {
        tasks: currentGroupTasks
      });
      alert("Task successfully created!");

    } catch (e) {
      console.error("Error adding document: ", e);
    }

    // add task ID to group task array
    setTitle('');
    setTaskEmoji('');
    setNumPeople('');
    setDetails('');
    setSelectedGroup('');
    setChosenDate(new Date());
    setChosenTime(new Date());

    // navigate back groups page and see you're new group!
    navigation.navigate(tasksName)
  }

  function handleEmojiPick(emojiPicker) {
    setTaskEmoji(emojiPicker.emoji);
  }

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setChosenDate(currentDate);
  };

  const onTimeChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setChosenTime(currentDate);
  };


  return (
    <ScrollView style={{ backgroundColor: '#F9F1FF', flex: 1 }}>
      <View style={{ backgroundColor: '#F9F1FF', flex: 1 }}>
        <Text style={[styles.title, { color: "#98a836" }]}>
          Create a Task
        </Text>

        <View>
          <TextInput placeholder='Task Title' placeholderTextColor={'#8147a8'} style={styles.input} onChangeText={setTitle} value={title} />
          <TouchableOpacity style={styles.input} onPress={() => setIsOpen(!isOpen)}>
            <Text style={{ color: '#c57ff5', fontSize: 20 }}>{emoji ? emoji : "Task Emoji"}</Text>
          </TouchableOpacity>
          <EmojiPicker onEmojiSelected={handleEmojiPick} open={isOpen} onClose={() => setIsOpen(false)} />

          <View style={styles.dateRow}>
            <Ionicons name={'calendar'} size={30} color={"#c57ff5"} paddingTop={2} />
            <DateTimePicker
              mode={'date'}
              value={chosenDate}
              minimumDate={new Date()}
              accentColor={"#c57ff5"}
              onChange={(event, date) => { setChosenDate(date) }}
            />
            <DateTimePicker
              mode={'time'}
              value={chosenTime}
              accentColor={"#c57ff5"}
              onChange={onTimeChange} />
          </View>


          <Text style={[styles.title, { color: "#8147a8", fontSize: 30 }]}>
            Choose a Group
          </Text>
          <SelectList
            setSelected={(val) => {
              setSelectedGroup(val);
            }}
            data={groupNames}
            save="key" maxHeight={100}
            // placeholder="Select Group"
            placeholderTextColor="#8147a8"
            boxStyles={styles.selectBox}
            inputStyles={styles.inputStyles}
            dropdownStyles={styles.dropdownBox}
          />

          <View style={{ margin: 10 }}>
            <Text style={[styles.title, { color: "#8147a8", fontSize: 20, marginLeft: 0}]}>
              Max Number of People
            </Text>
            <View style={{ marginTop: 5, backgroundColor: "white", maxWidth: "30%", borderRadius: 20 }}>
              <NumericInput
                value={numPeople}
                onChange={setNumPeople}
                minValue={0}
                textColor="#c57ff5"
                rounded
                iconSize={25}
                rightButtonBackgroundColor="#c57ff5"
                leftButtonBackgroundColor="#c57ff5"
                borderColor="#c57ff5"
                iconStyle={{ color: 'white' }} 
              />
            </View>
          </View>

          <TextInput placeholder='Optional Additional Details' style={styles.input} placeholderTextColor={'#98A836'} multiline
            numberOfLines={4} onChangeText={setDetails} value={details} />

          <View style={{alignItems:'center'}}>
            <TouchableOpacity style={styles.button} onPress={createPressed}>
              <Text style={styles.buttonText}>Create</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
