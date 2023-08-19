import { Timestamp } from "firebase/firestore";
import { doc, getDoc } from "firebase/firestore";
import { db, auth } from '../config/firebase';

export default class Task {
    constructor (title, emoji, max_num_people, description, owner, time, groupUID, username, members) {
      this.title = title;
      this.emoji = emoji;
      this.max_num_people = max_num_people;
      this.description = description;
      this.owner = owner;
      this.time = time;
      this.groupUID = groupUID;
      this.ownerUsername = username;
      this.members = members;
    }
  }
  
  export const taskConverter = {
    toFirestore: (task) => {
      return {
        title: task.title,
        emoji: task.emoji,
        max_num_people: task.max_num_people,
        description: task.description,
        owner: task.owner,
        time: task.time,
        groupUID: task.groupUID,
        ownerUsername: task.ownerUsername,
        members: task.members
      };
    },
    fromFirestore: (snapshot, options) => {
      const data = snapshot.data(options);
      return new Task(data.title, data.emoji, data.max_num_people, data.description, data.owner, data.time, data.groupUID, data.ownerUsername, data.members);
    }
  }

  export const getTaskByID = async function(uid) {
    
    const docRef = doc(db, "tasks", uid);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
        data = docSnap.data();
        console.log("Task Document data:", docSnap.data());
        return new Task(data.title, data.emoji, data.max_num_people, data.description, data.owner, data.time, data.groupUID, data.ownerUsername, data.members);
    } else {
        console.log("No such document!");
    }

  }

  