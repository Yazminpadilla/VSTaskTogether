import React from 'react';
import { ThemeProvider } from 'react-native-elements';
import './config/firebase';
import RootNavigation from './navigation';
import { LogBox } from 'react-native';

// Ignore all log notifications
LogBox.ignoreAllLogs();

export default function App() {
  return (
    <ThemeProvider>
      <RootNavigation />
    </ThemeProvider>  
  );
}
