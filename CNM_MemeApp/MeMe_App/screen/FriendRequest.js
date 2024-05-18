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
import * as SecureStore from "expo-secure-store";
import { API_URL } from "@env";
import { useNavigation } from "@react-navigation/native";



const FriendRequest = ({ navigation }) => {
  const [friendRequests, setFriendRequests] = useState([]);
  const [friendRecall, setFriendRecall] = useState([]);
  const [currentTab, setCurrentTab] = useState("received");

  const handleFriendRequest = async () => {
    const token = await SecureStore.getItemAsync("authToken");

    try {
      const response = await fetch(API_URL + "/api/getAllFriendRequest", {
        method: "GET",
        headers: {
          Authorization: token,
        },
      });
      if (!response.ok) {
        throw new Error(`Failed to fetch friend requests: ${response.status}`);
      }
      const responseData = await response.json();
      setFriendRequests(responseData.data);
    } catch (error) {
      console.error(`Error: ${error.message}`);
    }
  };

  useEffect(() => {
    handleFriendRequest();
  }, []);

  const handleRecallFriendRequest = async () => {
    const token = await SecureStore.getItemAsync("authToken");
    try {
      const response = await fetch(API_URL + "/api/getAllCancelFriendRequest", {
        method: "GET",
        headers: {
          Authorization: token,
        },
      });
      if (!response.ok) {
        throw new Error(`Failed to fetch friend requests: ${response.status}`);
      }
      const responseData = await response.json();
      setFriendRecall(responseData.data);
    } catch (error) {
      console.error(`Error: ${error.message}`);
    }
  };

  useEffect(() => {
    handleRecallFriendRequest();
  }, []);

  const acceptFriend = async (email) => {
    const token = await SecureStore.getItemAsync("authToken");
    try {
      const response = await fetch(API_URL + "/api/accept-friend", {
        method: "POST",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      if (!response.ok) {
        throw new Error(`Failed to accept friend: ${response.status}`);
      }
      const responseData = await response.json();
      console.log(responseData);
      // Perform corresponding UI changes after successfully accepting the friend
    } catch (error) {
      console.error(`Error: ${error.message}`);
    }
  };

  const handleAcceptFriend = (email) => {
    acceptFriend(email);
  };

  const declineFriendRequest = async (email) => {
    const token = await SecureStore.getItemAsync("authToken");
    try {
      const response = await fetch(API_URL + "/api/decline-friend-request", {
        method: "POST",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error(`Failed to accept friend: ${response.status}`);
      }
      const responseData = await response.json();
      console.log(responseData);
      // Perform corresponding UI changes after successfully accepting the friend
    } catch (error) {
      console.error(`Error: ${error.message}`);
    }
  };

  const handleDeleteFriendRequest = (email) => {
    declineFriendRequest(email);
  };
  const deleteRecallFriendRequest = async (friendId) => {
    const token = await SecureStore.getItemAsync("authToken");
    try {
      const response = await fetch(API_URL + "/api/cancel-friend-request", {
        method: "POST",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ friendId }),
      });
      if (!response.ok) {
        throw new Error(`Failed to accept friend: ${response.status}`);
      }

      const responseData = await response.json();
      console.log(responseData);
      // Perform corresponding UI changes after successfully accepting the friend
    } catch (error) {
      console.error(`Error: ${error.message}`);
    }
  };

  const handleRecall = (friendId) => {
    deleteRecallFriendRequest(friendId); // Gọi hàm xử lý yêu cầu từ chối bạn bè với email được truyền vào
  };

  const renderFriendRequests = () => {
    return friendRequests.map((friend, index) => (
      <View style={styles.user} key={index}>
        <View style={styles.profile}>
          <Image source={{ uri: friend.avatar }} style={styles.avatar} />
          <View style={{ marginLeft: 10 }}>
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>
              {friend.name}
            </Text>
            <Text style={{ marginTop: 5, color: "#888888" }}>
              {friend.email}
            </Text>
            <Text style={{ marginTop: 5, color: "#888888" }}>
              {friend.phone}
            </Text>
          </View>
        </View>
        <View style={styles.choose}>
          <TouchableOpacity
            style={styles.accept}
            onPress={() => handleAcceptFriend(friend.email)}
          >
            <Text style={{ color: "white" }}>Accept</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.cancel}
            onPress={() => handleDeleteFriendRequest(friend.email)}
          >
            <Text>Decline</Text>
          </TouchableOpacity>
        </View>
      </View>
    ));
  };

  const renderRecallFriendRequests = () => {
    return friendRecall.map((friend, index) => (
      <View style={styles.user} key={index}>
        <View style={styles.profile}>
          <Image source={{ uri: friend.avatar }} style={styles.avatar} />
          <View style={{ marginLeft: 10 }}>
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>
              {friend.name}
            </Text>
            <Text style={{ marginTop: 5, color: "#888888" }}>
              {friend.email}
            </Text>
            <Text style={{ marginTop: 5, color: "#888888" }}>
              {friend.phone}
            </Text>
          </View>
        </View>
        <View style={styles.choose}>
          <TouchableOpacity
            style={styles.cancel}
            onPress={() => handleRecall(friend._id)}
          >
            <Text>Thu hồi</Text>
          </TouchableOpacity>
        </View>
      </View>
    ));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            style={{ height: 30, width: 30, tintColor: "#00AE72" }}
            source={{
              uri: "https://cdn1.iconfinder.com/data/icons/basic-ui-elements-coloricon/21/01-512.png",
            }}
          />
        </TouchableOpacity>
        <Text style={{ fontSize: 22, color: "#00AE72", fontWeight: "bold" }}>
          Lời mời kết bạn
        </Text>
      </View>
      <View style={{ flexDirection: "row" }}>
        <Pressable
          style={[styles.button, currentTab === "received" && styles.activeTab]}
          onPress={() => setCurrentTab("received")}
        >
          <Text style={{ color: "#00AE72", fontWeight: "bold", fontSize: 18 }}>
            Đã nhận
          </Text>
        </Pressable>
        <Pressable
          style={[styles.button2, currentTab === "sent" && styles.activeTab]}
          onPress={() => setCurrentTab("sent")}
        >
          <Text style={{ color: "#00AE72", fontWeight: "bold", fontSize: 18 }}>
            Đã gửi
          </Text>
        </Pressable>
      </View>
      <View style={{ flex: 1 }}>
        {currentTab === "received" ? (
          <ScrollView>{renderFriendRequests()}</ScrollView>
        ) : (
          <ScrollView>{renderRecallFriendRequests()}</ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    marginLeft: 10,
  },
  header: {
    flexDirection: "row",
  },
   button2: {
    width: "50%",
    height: 40,
    marginTop: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    width: "50%",
    height: 40,
    marginTop: 30,
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "black",
  },
  avatar: {
    height: 70,
    width: 70,
    borderRadius: 360,
  },
  user: {
    flexDirection: "row",
    marginTop: 20,
    height: 100,
    borderBottomWidth: 1,
    borderBottomColor: "#CCCCCC",
  },
  choose: {
    width: "30%",
  },
  profile: {
    flexDirection: "row",
    width: "70%",
  },
  accept: {
    justifyContent: "center",
    alignItems: "center",
    height: "40%",
    marginTop: 5,
    backgroundColor: "#00AE72",
    borderRadius: 10,
    marginRight: 10,
  },
  cancel: {
    justifyContent: "center",
    alignItems: "center",
    height: "40%",
    marginTop: 5,
    backgroundColor: "#D9D9D9",
    borderRadius: 10,
    marginRight: 10,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: "#00AE72",
  },
});

export default FriendRequest;
