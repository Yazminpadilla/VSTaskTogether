// // Handles navigation for logged-in users
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Screens
import HomeScreen from '../screens/HomeScreen';
import TasksScreen from '../screens/TasksScreen';
import GroupsScreen from '../screens/GroupsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import CreateTaskScreen from '../screens/CreateTaskScreen';
import CreateNewGroupScreen from '../screens/CreateNewGroupScreen';
import JoinGroupScreen from '../screens/JoinGroupScreen';
import GroupInfoScreen from '../screens/GroupInfoScreen';
import EditProfileScreen from '../screens/EditProfileScreen';
import JoinTaskScreen from '../screens/JoinTaskScreen';
import TaskInfoScreen from '../screens/TaskInfoScreen';

//Screen names
import { homeName, tasksName, groupsName, profileName, createTaskName, createGroupName, joinGroupName, groupInfoName, editProfileName, joinTaskName, taskInfoName } from '../utils/constants';

const YourTasksStack = createStackNavigator();
function YourTasksStackScreen() {
  return (
    <YourTasksStack.Navigator screenOptions={{headerShown: false}}>
      <YourTasksStack.Screen name={tasksName} component={TasksScreen} />
      <YourTasksStack.Screen name={taskInfoName} component={TaskInfoScreen}/>
    </YourTasksStack.Navigator>
  );
}

const JoinTasksStack = createStackNavigator();
function JoinTasksStackScreen() {
  return (
    <JoinTasksStack.Navigator screenOptions={{headerShown: false}}>
      <JoinTasksStack.Screen name={joinTaskName} component={JoinTaskScreen}/>
      <JoinTasksStack.Screen name={taskInfoName} component={TaskInfoScreen}/>
    </JoinTasksStack.Navigator>
  );
}

const TasksTab = createMaterialTopTabNavigator();
function TasksStackScreen() {
  return (
    <TasksTab.Navigator 
      screenOptions={{headerShown: false}}
      tabBarOptions={{
        activeTintColor: 'white',
        inactiveTintColor: '#c8c8c8',
        indicatorStyle:{ 
          backgroundColor:'#98a836',
          height: 5,
        },
        style: {
          borderBottomColor: "white",
          backgroundColor: '#8147a8',
          elevation: 0,
        },
        tabStyle: {
          marginTop: "35%"
        }
      }}
    >
        <TasksTab.Screen name={tasksName} component={YourTasksStackScreen} />
        <TasksTab.Screen name={createTaskName} component={CreateTaskScreen}/>
        <TasksTab.Screen name={joinTaskName} component={JoinTasksStackScreen}/>
    </TasksTab.Navigator>
  );
}

const YourGroupsStack = createStackNavigator();
function YourGroupsStackScreen() {
  return (
    <YourGroupsStack.Navigator screenOptions={{headerShown: false}}>
      <YourGroupsStack.Screen name={groupsName} component={GroupsScreen} />
      <YourGroupsStack.Screen name={groupInfoName} component={GroupInfoScreen}/>
    </YourGroupsStack.Navigator>
  );
}
const JoinGroupsStack = createStackNavigator();
function JoinGroupsStackScreen() {
  return (
    <JoinGroupsStack.Navigator screenOptions={{headerShown: false}}>
      <JoinGroupsStack.Screen name={joinGroupName} component={JoinGroupScreen}/>
      <JoinGroupsStack.Screen name={groupInfoName} component={GroupInfoScreen}/>
    </JoinGroupsStack.Navigator>
  );
}
const GroupsTab = createMaterialTopTabNavigator();
function GroupsStackScreen() {
  return (
    <GroupsTab.Navigator
      screenOptions={{headerShown: false}}
        tabBarOptions={{
          activeTintColor: 'white',
          inactiveTintColor: '#c8c8c8',
          indicatorStyle:{ 
            backgroundColor:'#98a836',
            height: 5,
          },
          style: {
            borderBottomColor: "white",
            backgroundColor: '#8147a8',
            elevation: 0,
          },
          tabStyle: {
            marginTop: "35%"
          }
        }}>
        <GroupsTab.Screen name={groupsName} component={YourGroupsStackScreen} />
        <GroupsTab.Screen name={createGroupName} component={CreateNewGroupScreen}/>
        <GroupsTab.Screen name={joinGroupName} component={JoinGroupsStackScreen}/>
    </GroupsTab.Navigator>
  );
}

const ProfileStack = createStackNavigator();
function ProfileStackScreen() {
  return (
    <ProfileStack.Navigator screenOptions={{headerShown: false}}>
      <ProfileStack.Screen name={profileName} component={ProfileScreen}/>
      <ProfileStack.Screen name={editProfileName} component={EditProfileScreen}/>
    </ProfileStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();
export default function UserStack() {
  return (
    <NavigationContainer >
      <Tab.Navigator
        initialRouteName={homeName}
        screenOptions={({route}) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let rn = route.name;

            if (rn === homeName) {
              iconName = focused ? 'home' : 'home-outline';

            } else if (rn === tasksName) {
              iconName = focused ? 'list' : 'list-outline';

            } else if (rn === groupsName) {
              iconName = focused ? 'people' : 'people-outline';
            }
            else if (rn === profileName) {
                iconName = focused ? 'person-circle' : 'person-circle-outline';
            }
            else if (rn === createTaskName) {
              iconName = focused ? 'create' : 'create-outline';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} paddingTop={2}/>;
          },
          "tabBarActiveTintColor": "#8147a8",
          "tabBarInactiveTintColor": "grey",
          "tabBarLabelStyle": {
            "paddingBottom": 10,
            "fontSize": 10
          },
          "tabBarStyle": [
            {
              "display": "flex"
            },
            null
          ],
          "headerShown": false,
        })}
        >

        <Tab.Screen name={homeName} component={HomeScreen}  styles={{}}/>
        <Tab.Screen name={tasksName} component={TasksStackScreen}/>
        <Tab.Screen name={groupsName} component={GroupsStackScreen} />
        <Tab.Screen name={profileName} component={ProfileStackScreen} />
      </Tab.Navigator>
      </NavigationContainer>
  );
}