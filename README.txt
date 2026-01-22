MediPoint – React Native Mobile Application

Project Overview
----------------
MediPoint is a simple front-end–based mobile application developed using React Native.
The application demonstrates basic mobile app concepts such as screen navigation,
user authentication UI, splash screen, bottom tab navigation, and list rendering.

This project is created for academic/learning purposes and does not use a backend server.


Objectives
----------
- Design a basic mobile application UI
- Implement screen navigation using React Navigation
- Demonstrate user registration and login (frontend demo)
- Use FlatList for displaying notifications
- Apply simple UI layout concepts


Technologies Used
-----------------
- React Native
- Expo
- React Navigation (Stack & Bottom Tabs)
- AsyncStorage
- JavaScript (ES6)


Application Screens
-------------------
The application consists of 5 main screens:

1. Splash Screen
   - Displays app logo
   - Includes animated progress bar
   - Automatically navigates to Register screen

2. Register Screen
   - Allows user to enter username and password
   - Saves data using AsyncStorage

3. Login Screen
   - Validates username and password
   - Navigates to Home screen on success

4. Home Screen
   - Displays welcome message with username
   - Shows 4 feature cards in a 2×2 grid
   - Uses Bottom Tab Navigation

5. Notification Screen
   - Displays notifications using FlatList


Navigation Structure
--------------------
- Stack Navigator
  - Splash → Register → Login → Main App

- Bottom Tab Navigator
  - Home
  - Notifications


Project Structure
-----------------
MediPoint/
│
├── App.js
├── navigation/
│   └── BottomTabs.js
│
├── screens/
│   ├── SplashScreen.js
│   ├── RegisterScreen.js
│   ├── LoginScreen.js
│   ├── HomeScreen.js
│   └── NotificationScreen.js
│
└── assets/
    └── logo.png


How to Run the Project
---------------------

1. Install Node.js and Expo CLI
   - Download Node.js from https://nodejs.org/
   - Install Expo CLI using:
     npm install -g expo-cli

2. Install Project Dependencies
   npm install

3. Install Required Packages
   expo install @react-navigation/native
   expo install @react-navigation/native-stack
   expo install @react-navigation/bottom-tabs
   expo install react-native-screens react-native-safe-area-context
   expo install @react-native-async-storage/async-storage
   npm install react-native-paper

4. Start the Application
   expo start

5. Run on Device or Emulator
   - Scan the QR code using Expo Go app on your mobile phone
   - OR run on Android Emulator / iOS Simulator


How to Work on the Project
--------------------------
- Open the project folder using VS Code or any code editor
- Modify UI components inside the "screens" folder
- Update navigation logic inside the "navigation" folder
- Edit App.js to manage overall app flow
- Save changes and reload the app using Expo live reload


Notes
-----
- This project uses AsyncStorage only for demonstration
- No backend or database is connected
- UI-focused academic project


Academic Declaration
--------------------
This application was developed solely for educational purposes to demonstrate mobile application development concepts using React Native.


Author
------
MediPoint App
Developed by: Group 11
Course: Mobile App development
