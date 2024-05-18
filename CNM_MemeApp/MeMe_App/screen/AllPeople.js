import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Pressable,
} from "react-native";
import Footer from "./Footer";
import * as SecureStore from "expo-secure-store";
import { API_URL } from "@env";

const AllPeople = ({ navigation }) => {
  const [friends, setFriends] = useState([]);

  const handleFriend = async () => {
    const token = await SecureStore.getItemAsync("authToken");
    try {
      const response = await fetch(
        API_URL+"/api/getAllFriend",
        {
          method: "GET",
          headers: {
            Authorization: token,
          },
        }
      );
      if (!response.ok) {
        throw new Error(`Failed to fetch friends: ${response.status}`);
      }
      const responseData = await response.json();
      // console.log("aaaaaaaaa", responseData);
      setFriends(responseData);
      console.log( friends);
    } catch (error) {
      console.error(`Error: ${error.message}`);
    }
  };

  useEffect(() => {
    handleFriend();
  }, []);

  const FriendRequest = () => {
    navigation.navigate("FriendRequest");
  };

  const renderFriends = () => {
    return friends.map((userId, index) => (
      <TouchableOpacity key={index} style={styles.touchChat}>
        <View style={styles.avatar}>
          <Image source={{ uri: userId.photoURL }} style={styles.avatar} />
        </View>
        <View style={styles.viewChat}>
          <Text style={styles.userName}>{userId.username}</Text>
        </View>
      </TouchableOpacity>
    ));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={{ alignItems: "center" }}>
          <Text style={{ fontSize: 25, color: "#00AE72", fontWeight: "bold" }}>
            Danh Bạ
          </Text>
        </View>
      </View>
      <ScrollView>
        <TouchableOpacity onPress={FriendRequest} style={styles.touchAddFriend}>
          <Image
            source={{
              uri: "https://cdn-icons-png.flaticon.com/512/6469/6469169.png",
            }}
            style={{ height: 50, width: 50 }}
          />
          <View style={{ justifyContent: "center" }}>
            <Text style={{ fontSize: 18, marginLeft: 0 }}>Lời mời kết bạn</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
      <ScrollView>{renderFriends()}</ScrollView>
      <Footer navigation={navigation} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    marginTop: 40,
  },
  touchAddFriend: {
    flexDirection: "row",
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#00AE72",
    backgroundColor: "#F9F9F9",
  },
  avatar: {
    height: 60,
    width: 60,
    borderRadius: 360,
  },
  userName: {
    fontSize: 20,
    fontWeight: "bold",
  },
  viewChat: {
    marginLeft: 10,
    width: "100%",
    justifyContent: "center",
  },
  touchChat: {
    flexDirection: "row",
    marginLeft: 10,
    marginRight: 10,
    marginTop: 20,
    height: 70,
  },
});

export default AllPeople;