
import React , { useState , useEffect , useContext } from 'react';
import { StyleSheet, Text, Image ,View} from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { auth , onAuthStateChanged   } from "../firebase/firebase-utilities";
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '../state-managment/reducers';

import Loading_Screen from '../../loading';

import Login from "../Screens/login";
import SignUp from "../Screens/signUp";
import Welcome_screen from '../Screens/welcome';
import CreateChat from '../Screens/createchat';
import Choice from '../Screens/choice';
import CreateImage from '../Screens/createimage';
import SocketChat from '../Screens/socket-client';
import ChatListScreen from '../Screens/chatlist';



const Stack = createStackNavigator();


 function AuthScreens() {
  return (

      <Stack.Navigator screenOptions={{ headerShown: false }} >
        <Stack.Screen name="welcome_screen" component={Welcome_screen} />
        <Stack.Screen name="login" component={Login} />
        <Stack.Screen name="signUp" component={SignUp} />
      </Stack.Navigator>

  );
 }

 function AppScreens() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="chatListScreen" component={ChatListScreen} />
      <Stack.Screen name="choice" component={Choice} />
      <Stack.Screen name="createChat" component={CreateChat} />
      <Stack.Screen name="createimage" component={CreateImage} />
      <Stack.Screen name="socketChat" component={SocketChat} />
    </Stack.Navigator>
  );
 }



export default function Home() {

  const dispatch = useDispatch();
  const [user, isUser] = useState(false);
  const isLoading = useSelector((state) => state.isLoading);

  useEffect(() => {
    const redirect = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user);
        isUser(true);
        dispatch(setLoading(false));
      } else {
        dispatch(isUser(null));
        isUser(false);
      }
    });

    return redirect;
  }, []);


  ////  Comment Below stack for Development Mode /////
  ////  UnComment Below stack for Production Mode /////

      return (
        <NavigationContainer>
          {isLoading ? (
            <Loading_Screen />
          ) : user ? ( <AppScreens />) : ( <AuthScreens />)}
        </NavigationContainer>
        );

  

    ///  {/* Developent Mode  */}  ///
    ///  {/* UnComment below Stack for App */}  ///
  return (
    <NavigationContainer>
       <AppScreens />
    </NavigationContainer>
  );
}