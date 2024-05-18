import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet } from "react-native";

import Login from "./screen/Login";
import SendOtp from "./screen/SendOtp";
import Verify from "./screen/Verify";
import ResetPass from "./screen/ResetPass";
import HeaderIndex from "./screen/HeaderIndex";
import Footer from "./screen/Footer";
import Index from "./screen/Index";
import AllPeople from "./screen/AllPeople";
import CallList from "./screen/CallList";
import FriendRequest from "./screen/FriendRequest";
import SendFriendRequest from "./screen/SendFriendRequest";
import OnlineChat from "./screen/OnlineChat";
import CallTo from "./screen/CallTo";
import Register from "./screen/Register";
import SendResetPasswordOTP from "./screen/SendResetPasswordOTP";
import VerifyResetPasswordOTP from "./screen/VerifyResetPasswordOTP";
import UpdatePassword from "./screen/UpdatePassword";
export default function App() {
  const Stack = createNativeStackNavigator();
  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: "white",
    },
  };

  return (
    <NavigationContainer theme={MyTheme}>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SendOtp" component={SendOtp} />
        <Stack.Screen name="Verify" component={Verify} />
        <Stack.Screen name="ResetPass" component={ResetPass} />
        <Stack.Screen name="HeaderIndex" component={HeaderIndex} />
        <Stack.Screen name="Footer" component={Footer} />
        <Stack.Screen name="Index" component={Index} />
        <Stack.Screen name="AllPeople" component={AllPeople} />
        <Stack.Screen name="CallList" component={CallList} />
        <Stack.Screen name="FriendRequest" component={FriendRequest} />
        <Stack.Screen name="SendFriendRequest" component={SendFriendRequest} />
        <Stack.Screen name="OnlineChat" component={OnlineChat} />
        <Stack.Screen name="CallTo" component={CallTo} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen
          name="SendResetPasswordOTP"
          component={SendResetPasswordOTP}
        />
        <Stack.Screen
          name="VerifyResetPasswordOTP"
          component={VerifyResetPasswordOTP}
        />
        <Stack.Screen name="UpdatePassword" component={UpdatePassword} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    paddingHorizontal: 10,
  },
});
