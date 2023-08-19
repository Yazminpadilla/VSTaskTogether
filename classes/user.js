import { doc, getDoc } from "firebase/firestore";
import { db, auth } from '../config/firebase';


export default class User {
    constructor (uid, email, name, username, phone, venmo, tasks, bio, groups) {
      this.uid = uid;
      this.email = email;
      this.name = name;
      this.username = username;
      this.phone = phone;
      this.venmo = venmo;
      this.tasks = tasks;
      this.bio = bio;
      this.groups = groups
    }
  }
  
  export const userConverter = {
    toFirestore: (user) => {
      return {
        uid: user.uid,
        email: user.email,
        name: user.name,
        username: user.username,
        phone: user.phone,
        venmo: user.venmo,
        tasks: user.tasks,
        bio: user.bio,
        groups: user.groups
      };
    },
    fromFirestore: (snapshot, options) => {
      const data = snapshot.data(options);
      return new User(data.uid, data.email, data.name, data.username, data.phone, data.venmo, data.tasks, data.bio, data.groups);
    }
  }

  export const getUserProfileByID = async function(uid) {
    
    const docRef = doc(db, "profiles", uid);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
        data = docSnap.data();
        console.log("Document data:", docSnap.data());
        return new User(data.uid, data.email, data.name, data.username, data.phone, data.venmo, data.bio, data.groups);

    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }

  }

  export const getCurrentTasksArray = async function(uid) {
    const docRef = doc(db, "profiles", uid);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
        data = docSnap.data();
        //console.log("Document data:", docSnap.data());
        
        //console.log(data.tasks)

        return data.tasks

    } else {
        // doc.data() will be undefined in this case
        console.log("Doc does not exist");
        return
    }

  }

  export const getCurrentGroupsArray = async function(uid) {
    const docRef = doc(db, "profiles", uid);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
        data = docSnap.data();
        //console.log("Document data:", docSnap.data());
        
        //console.log(data.groups)

        return data.groups

    } else {
        // doc.data() will be undefined in this case
        console.log("Doc does not exist");
        return
    }

  }
