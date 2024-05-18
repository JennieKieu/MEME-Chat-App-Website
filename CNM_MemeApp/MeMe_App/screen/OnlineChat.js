import React, { useEffect, useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  TextInput,
  Platform,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";
import Modal from "react-native-modal";
import * as SecureStore from "expo-secure-store";
import { API_URL } from "@env";
import { KeyboardAvoidingView } from "react-native";
import axios from "axios";
import { Video } from "expo-av";
  
const OnlineChat = ({ navigation, route }) => {
  const id = route.params.idChatRoom;
  const socket = route.params.socket;
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedMessageId, setSelectedMessageId] = useState(null);
  const scrollViewRef = useRef();
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImageUri, setSelectedImageUri] = useState(null); // State để lưu URI của hình ảnh được chọn

  useEffect(() => {
    getPermissionAsync();
  }, []);

  const getPermissionAsync = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const token = await SecureStore.getItemAsync("authToken");
      try {
        const response = await fetch(API_URL + `/api/messages/${id}`, {
          method: "GET",
          headers: {
            Authorization: token,
          },
        });
        const res = await response.json();
        setMessages(res.data);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async () => {
    if (!message && !selectedImage) {
      return;
    }

    if (selectedImage) {
      await sendMedia(id, "", selectedImage);
      setSelectedImage(null);
    } else {
      const token = await SecureStore.getItemAsync("authToken");
      const data = {
        chatRoomId: id,
        senderId: `"${await SecureStore.getItemAsync("userId")}"`,
        content: message,
        type: "text",
      };
      const response = await fetch(API_URL + `/api/messages/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({ data: data }),
      });
      const res = await response.json();
      socket.emit("message", data, res.data._id);
    }

    setMessage("");
  };

  const handleReaction = async (reaction) => {
    const token = await SecureStore.getItemAsync("authToken");
    const data = {
      reaction,
    };
    const response = await fetch(
      API_URL + `/api/react-message/${selectedMessageId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({ data: data }),
      }
    );
    const res = await response.json();
    if (res.status === 200) {
      socket.emit("react message", {
        chatRoomId: id,
        messageId: selectedMessageId,
        reactions: res.data.data.reactions,
      });
    }
    setModalVisible(false);
  };

  useEffect(() => {
    socket.on("react message", (message) => {
      setMessages((prevMessages) =>
        prevMessages.map((m) =>
          m.id === message.messageId
            ? { ...m, reactions: message.reactions }
            : m
        )
      );
    });
  }, [socket]);

  const convertReaction = (reaction) => {
    switch (reaction) {
      case "like":
        return "👍";
      case "love":
        return "❤";
      case "haha":
        return "😆";
      case "wow":
        return "😮";
      case "sad":
        return "😢";
      case "angry":
        return "😠";
      default:
        return "";
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setSelectedImage(result.assets[0].uri);
      console.log("URII",result.assets[0].uri);
    }
  };

  const sendMedia = async (chatRoomId, content, uri) => {
    let formData = new FormData();
    let name = uri.split("/").pop();
    let type =
      name.split(".").pop().toLowerCase() === "mp4"
        ? "video/mp4"
        : "image/jpeg";
    let file = {
      uri: uri,
      name: name,
      type: type,
    };
    console.log("file",file);

    formData.append("media", file);
    formData.append("content", content);
    formData.append("chatRoomId", chatRoomId);
    console.log("Formdata",formData);
    try {
      const token = await SecureStore.getItemAsync("authToken");
      const response = await fetch(API_URL + "/api/send-media", {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: token,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to send media");
      }

      const responseData = await response.json();
      console.log(responseData);
    } catch (error) {
      console.error("Failed to send media:", error);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.navigate("Index")}>
            <Image
              source={require("../assets/back.png")}
              style={styles.backButton}
            />
          </TouchableOpacity>
          <View style={styles.userInfo}>
            <Text style={styles.username}>Kiều Dương</Text>
            <Text style={styles.lastSeen}>Truy cập 2 phút trước</Text>
          </View>
          <View style={styles.actionButtons}>
            <TouchableOpacity>
              <Image
                source={require("../assets/phone.png")}
                style={{ height: 30, width: 30, marginRight: 20 }}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image
                source={require("../assets/videocall.png")}
                style={{ marginTop: 2, marginRight: 20 }}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image source={require("../assets/menu.png")} style={{}} />
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView
          ref={scrollViewRef}
          onContentSizeChange={() =>
            scrollViewRef.current.scrollToEnd({ animated: true })
          }
          contentContainerStyle={{ paddingHorizontal: "1%" }}
        >
          {messages &&
            messages.map((message, index) => (
              <TouchableOpacity
                onLongPress={() => {
                  setSelectedMessageId(message.id);
                  setModalVisible(true);
                }}
                onPress={() => {
                  if (message.type === "image") {
                    setSelectedImageUri(message.media.url);
                  }
                }}
                key={index}
              >
                <SafeAreaView
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: `${
                      message.isSent ? "flex-end" : "flex-start"
                    }`,
                    width: "100%",
                    marginVertical: "1%",
                  }}
                >
                  <SafeAreaView style={{ width: "auto", height: "auto" }}>
                    <SafeAreaView
                      style={{ display: "flex", flexDirection: "row" }}
                    >
                      {!message.sent && (
                        <Image
                          source={{
                            uri: message.receiverPhoto
                              ? message.receiverPhoto
                              : "https://i.imgur.com/rsJjBcH.png",
                          }}
                          style={{
                            height: 30,
                            width: 30,
                            borderRadius: 360,
                            marginRight: "2%",
                          }}
                        />
                      )}
                      <SafeAreaView
                        style={{
                          backgroundColor: "#76E3BD",
                          width: "auto",
                          borderRadius: 5,
                          paddingHorizontal: 8,
                          paddingVertical: 8,
                        }}
                      >
                        {message.type === "image" ? (
                          <Image
                            source={{ uri: message.media.url }}
                            style={{
                              width: 200,
                              aspectRatio: 1,
                              maxHeight: 300,
                              borderRadius: 5,
                            }}
                          />
                        ) : message.type === "video" ? (
                          <Video
                            source={{ uri: message.media.url }}
                            style={{
                              width: 200,
                              aspectRatio: 1,
                              maxHeight: 300,
                              borderRadius: 5,
                            }}
                            useNativeControls
                            resizeMode="contain"
                          />
                        ) : (
                          <Text style={{ fontSize: 18, textAlign: "left" }}>
                            {message.content.length < 5
                              ? message.content +
                                " ".repeat(10 - message.content.length)
                              : message.content}
                          </Text>
                        )}
                        <Text style={{ paddingTop: 5 }}>{message.time}</Text>
                        {message.reactions &&
                          message.reactions.map((reaction, index) => (
                            <Text key={index}>
                              {convertReaction(reaction.reaction)}
                            </Text>
                          ))}
                      </SafeAreaView>
                    </SafeAreaView>
                  </SafeAreaView>
                </SafeAreaView>
              </TouchableOpacity>
            ))}
        </ScrollView>

        <View
          style={{ backgroundColor: "#fff", padding: 11, flexDirection: "row" }}
        >
          <View style={{ width: "80%" }}>
            <TextInput
              placeholder="Tin nhắn"
              style={{ fontSize: 20 }}
              value={message}
              onChangeText={(text) => setMessage(text)}
            ></TextInput>
          </View>
          <View
            style={{
              flexDirection: "row",
              width: "20%",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            {!message ? (
              <>
                <TouchableOpacity>
                  <Image
                    source={require("../assets/micro.png")}
                    style={{
                      marginTop: 5,
                      marginRight: 20,
                      height: 25,
                      width: 17,
                    }}
                  />
                </TouchableOpacity>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <TouchableOpacity onPress={pickImage}>
                    <Image
                      source={require("../assets/image.png")}
                      style={{
                        marginTop: 5,
                        marginRight: 20,
                        height: 25,
                        width: 35,
                      }}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={handleSubmit}>
                    <Text style={{ fontSize: 20 }}>Send</Text>
                  </TouchableOpacity>
                </View>
              </>
            ) : (
              <TouchableOpacity onPress={handleSubmit}>
                <Text style={{ fontSize: 20 }}>Send</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        <Modal isVisible={isModalVisible}>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <TouchableOpacity onPress={() => handleReaction("like")}>
              <Text style={{ fontSize: 30 }}>👍</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleReaction("love")}>
              <Text style={{ fontSize: 30 }}>❤️</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleReaction("haha")}>
              <Text style={{ fontSize: 30 }}>😆</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleReaction("wow")}>
              <Text style={{ fontSize: 30 }}>😮</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleReaction("sad")}>
              <Text style={{ fontSize: 30 }}>😢</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleReaction("angry")}>
              <Text style={{ fontSize: 30 }}>😠</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={{ fontSize: 40 }}>❌</Text>
            </TouchableOpacity>
          </View>
          {messages
            ?.find((m) => m.id === selectedMessageId)
            ?.reactions.map((reaction, index) => (
              <Text key={index}>{convertReaction(reaction)}</Text>
            ))}
        </Modal>

        <Modal isVisible={selectedImageUri !== null}>
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Image
              source={{ uri: selectedImageUri }}
              style={{ width: "100%", height: "80%" }}
              resizeMode="contain"
            />
            <TouchableOpacity
              style={{ marginTop: 20 }}
              onPress={() => setSelectedImageUri(null)}
            >
              <Text style={{ fontSize: 20, color: "white" }}>Thoát</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};
//
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F1FFFA",
  },
  header: {
    flexDirection: "row",
    backgroundColor: "#00AE72",
    padding: 10,
    paddingTop: 20,
    alignItems: "center",
    marginTop: -20,
  },
  backButton: {
    width: 30,
    height: 30,
  },
  userInfo: {
    flex: 1,
    marginLeft: 10,
  },
  username: {
    fontSize: 19,
    fontWeight: "bold",
    color: "#ffff",
  },
  lastSeen: {
    color: "#ffff",
  },
  actionButtons: {
    flexDirection: "row",
    alignItems: "flex-end",
  },
});

export default OnlineChat;
