import { Timestamp } from "firebase/firestore";
import { doc, getDoc } from "firebase/firestore";
import { db, auth } from '../config/firebase';

export default class Group {
    constructor (name, description, emoji, admin_uid, members, tasks) {
      this.name = name;
      this.description = description;
      this.emoji = emoji;
      this.admin_uid = admin_uid;
      this.members = members;
      this.tasks = tasks;
    }
  }
  
  export const groupConverter = {
    toFirestore: (group) => {
      return {
        name: group.name,
        description: group.description,
        emoji: group.emoji,
        admin_uid: group.admin_uid,
        members: group.members,
        tasks: group.tasks,
      };
    },
    fromFirestore: (snapshot, options) => {
      const data = snapshot.data(options);
      return new Group(data.name, data.description, data.emoji, data.admin_uid, data.members, data.tasks);
    }
  }


  export const getGroupByID = async function(uid) {
    
    //console.log("in get group by ID")
    //console.log(uid)
    const docRef = doc(db, "groups", uid);
    const docSnap = await getDoc(docRef);
    
    
    if (docSnap.exists()) {
        data = docSnap.data();
        //console.log("Group Document data:", docSnap.data());
        return new Group(data.name, data.description, data.emoji, data.admin_uid, data.members, data.tasks);

    } else {
        //console.log("No such group document!");
    }

  }
 
  export const getCurrentGroupTasksArray = async function(uid) {
    
    
    const docRef = doc(db, "groups", uid);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
        data = docSnap.data();
        console.log("Document data:", docSnap.data());
        
        console.log(data.tasks)

        return data.tasks

    } else {
        // doc.data() will be undefined in this case
        console.log("Doc does not exist");
        return
    }

  }