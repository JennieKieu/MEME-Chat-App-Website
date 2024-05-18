import React, {useState, useEffect, useRef} from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Platform
} from "react-native";
import HeaderIndex from "./HeaderIndex";
import Footer from "./Footer";
import * as SecureStore from 'expo-secure-store';
import {API_URL} from '@env';
import io from 'socket.io-client';
import { AppRegistry } from 'react-native';
import App from '../App';
import { name as appName } from '../app.json';
 
AppRegistry.registerComponent(appName, () => App);
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';

let socket;
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});
const Index = ({ navigation, route }) => {
  const [userInfo, setUserInfo] = useState([]);
  const setupSocket = async () => {
    socket = io(API_URL);
    socket.on("connection", ()=>{
      console.log("Socket connected");
    })
    const userId = await SecureStore.getItemAsync("userId");
    socket.emit("setup", `"${userId}"`);
    socket.on("setup", (user) => {
      console.log("setup", user);
    })
  }
  useEffect( () => {
    setupSocket();
    return () => {
      socket.disconnect();
    }
  }, []);
  const indexImgs = [
    "https://top10binhphuoc.vn/wp-content/uploads/2022/10/avatar-gau-cute-1.jpg",
    "https://anhdephd.vn/wp-content/uploads/2022/04/avatar-gau-1.jpg",
    "https://top10binhphuoc.vn/wp-content/uploads/2022/10/avatar-gau-cute-2.jpg",
    "https://i.pinimg.com/736x/bd/8b/23/bd8b235016ce956a9c84b2638b7ba975.jpg",
    "https://i.pinimg.com/originals/c6/2e/0d/c62e0d3e9a34c74e84a0f7f952ce3695.jpg",
    "https://i.pinimg.com/236x/db/8d/48/db8d4877d92d07b4028d19f4c367ab50.jpg",
  ];

  const names = [
    "Kiều Dương",
    "Huỳnh Thắng",
    "Tú Uyên",
    "Hoàng Bảo",
    "Văn Bảo",
    "Thiên Bâng",
    "Nguyễn Văn An",
    "Trần Minh Đức",
    "Lê Thành Long",
    "Phạm Quang Huy",
    "Hoàng Văn Nam",
    "Đặng Tuấn Anh",
    "Ngô Đình Quân",
    "Vũ Hoàng Nam",
    "Nguyễn Đình Hòa",
    "Trần Văn Bình",
  ];

  const OnlineChat = async (idChatRoom) => {
    const userId = await SecureStore.getItemAsync("userId");
    socket.emit('join chat', idChatRoom, `"${userId}"`);
    socket.on('join chat', (room)=>{
      console.log("joined",room);
    });
    socket.on("message", (message)=>{
      userId != message.senderId && schedulePushNotification("Thuy Duong", message.content);
      const index = userInfo.findIndex((user) => user.idChatRoom === idChatRoom);
      userInfo[index].lastMessage.text = message.content;
      userInfo[index].lastMessage.time = message.time;
      setUserInfo([...userInfo]);
    });
    navigation.navigate("OnlineChat", {idChatRoom, socket});
  };
// const [lastMessage, setLastMessage] = useState([]);
useEffect(() => {
  const fetchData = async () =>{
  console.log(API_URL);
  const token = await SecureStore.getItemAsync('authToken');
    fetch(API_URL+"/api/info-chat-item/", {
      headers: {
        'Authorization': token
      }
    }).then((response) => response.json()).then((res) => {
      setUserInfo(res.data);
    });
  }
  fetchData();
}, [route.params?.reload]);
const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <HeaderIndex navigation={navigation} />
      <ScrollView showsVerticalScrollIndicator={true} style={{padding: 10}}>
        {userInfo?.map((user, index) => (
          <TouchableOpacity
            onPress={() => OnlineChat(user.idChatRoom)}
            key={index}
            style={styles.touchChat}
          >
            <Image
              source={{uri: user.photoURL? user.photoURL: "https://i.imgur.com/rsJjBcH.png"}}
              style={styles.avatar}
            />
            <View style={styles.chatContainer}>
              <View>
                <Text style={styles.userName}>{user.name}</Text>
                <Text style={styles.chatContent}>{user.lastMessage.text}</Text>
              </View>
              <View style={styles.timeContainer}>
                <Text>{user.lastMessage.time}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <Footer navigation={navigation} />
    </SafeAreaView>
  );
};

async function schedulePushNotification(name, content) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: name,
      body: content,
      data: { data: 'goes here' },
      sound: 'default',
    },
    trigger: { seconds: 1 },
  });
}

async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    // Learn more about projectId:
    // https://docs.expo.dev/push-notifications/push-notifications-setup/#configure-projectid
    token = (await Notifications.getExpoPushTokenAsync({ projectId: 'your-project-id' })).data;
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  return token;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  avatar: {
    height: 60,
    width: 60,
    borderRadius: 360,
  },
  touchChat: {
    flexDirection: "row",
    marginHorizontal: 10,
    marginTop: 10,
    height: 70,
  },
  chatContainer: {
    flex: 1,
    marginLeft: 10,
    borderBottomColor: "rgba(0, 0, 0, 0.1)",
    borderBottomWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  userName: {
    fontSize: 20,
    fontWeight: "bold",
  },
  chatContent: {
    marginTop: 5,
    color: "gray",
    fontSize: 16,
  },
  timeContainer: {
    alignItems: "flex-end",
    marginRight: 20,
  },
});

export default Index;
