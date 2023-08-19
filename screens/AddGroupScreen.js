// import * as React from 'react';
// import {useState} from 'react';
// import {View, Text, TouchableOpacity, Alert} from 'react-native';
// import { TextInput } from 'react-native-gesture-handler';
// import { db, auth } from '../config/firebase';
// import { collection, addDoc, query, where } from "firebase/firestore";
// import styles from './createTask.styles';
// import Group  from '../classes/group';
// import { groupConverter } from '../classes/group';


// export default function CreateNewGroupScreen({navigation}) {
  
//   const [groupTitle, setGroupTitle] = useState('');

//   async function createGroupPressed() {
//       try {
//           const newGroup = new Group(groupTitle, auth.currentUser.uid,
//             [auth.currentUser.uid])
//           const docRef = await addDoc(collection(db, "groups"), 
//                                         groupConverter.toFirestore(newGroup));
//           console.log("Document written with ID: ", docRef.id);
//         } catch (e) {
//           console.error("Error adding document: ", e);
//         }
//         setGroupTitle('');
//   }

//     return (
//         <View style={{backgroundColor: '#F9F1FF', flex: 1}}>
//             <Text style={styles.title}>Create a New Group</Text>
        
//       <View style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: '#F9F1FF', flexDirection: 'column'}}>
        
//         <TextInput placeholder='Group Title' placeholderTextColor={'#98A836'} style={styles.input} onChangeText={setGroupTitle} value={groupTitle}/>
        
//         <TouchableOpacity style={styles.button} onPress={createGroupPressed}>
//             <Text style={styles.buttonText}>Create Group</Text>
//         </TouchableOpacity>
//       </View>
//       </View>
//     );
// }