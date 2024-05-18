import React, { useState, useEffect } from "react";
import * as SecureStore from 'expo-secure-store';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Modal,
  Button,
  Alert
} from "react-native";
import Checkbox from 'expo-checkbox';
import * as ImagePicker from 'expo-image-picker';
import { API_URL } from "@env";

export default HeaderIndex = ({ navigation }) => {
  const header__imgs = [
    "https://res.cloudinary.com/dpigoorhc/image/upload/v1699298966/onlyfan/index/Icon/esskl98l5b52i8rag9jq.png",
    "https://res.cloudinary.com/dpigoorhc/image/upload/v1699298966/onlyfan/index/Icon/klasfpxswxaglw2ujbtn.png",
    "https://res.cloudinary.com/dpigoorhc/image/upload/v1699300339/onlyfan/index/Icon/kliot9ffm7bupw2z7h0a.webp",
    "https://cdn-icons-png.flaticon.com/512/6469/6469169.png",
    "https://res.cloudinary.com/dpigoorhc/image/upload/f_auto,q_auto/v1/onlyfan/index/Icon/pyhiltqmgy54j36rwf3z",
  ];

  const defaultImage = 'https://res.cloudinary.com/dpigoorhc/image/upload/v1699298966/onlyfan/index/Icon/klasfpxswxaglw2ujbtn.png';

  const [showModal, setShowModal] = useState(false);
  const [groupName, setGroupName] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImageURL, setSelectedImageURL] = useState('');
  const [checkedUserId, setCheckedUserId] = useState([]);
  const [isFriend, setIsFriend] = useState([]);
  useEffect(() => {
    getPermissionAsync();
  }, []);

  const getPermissionAsync = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
    }
  };
  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleChooseImage = async () => {
    try {
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
    } catch (error) {
      console.error('Error choosing image:', error);
    }
  };

  const handleSubmitGroup = async () => {
    try {
      const formData = new FormData();
      formData.append('members', JSON.stringify(checkedUserId));
      formData.append('name', groupName);
  
      if (selectedImage) {
        const name = selectedImage.split("/").pop();
        const uriParts = selectedImage.split(".");
        const fileType = uriParts[uriParts.length - 1];
        
        let type = `image/${fileType}`;
        let file = {
          uri: selectedImage,
          name: name,
          type: type,
        };
  
        formData.append("photo", file);
      }
  
      const token = await SecureStore.getItemAsync("authToken");
      const response = await fetch(API_URL + "/api/creategroup", {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
          'Authorization': token,
        },
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error("Failed to create group");
      }
  
      const responseData = await response.json();
      console.log(responseData);
      
      // Display success message and close modal
      Alert.alert("Success", "Group created successfully", [
        { text: "OK", onPress: handleCloseModal }
      ]);
    } catch (error) {
      console.error("Failed to create group:", error);
      // Display error message
      Alert.alert("Error", "Failed to create group");
    }
  };
  
  

  const handleFriendItemCheck = (id, isChecked) => {
    setCheckedUserId((prevCheckedUserId) => {
      if (isChecked) {
        return [...prevCheckedUserId, id];
      } else {
        return prevCheckedUserId.filter((userId) => userId !== id);
      }
    });
  };

  const handleFetchFriends = async () => {
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
      if (Array.isArray(responseData)) {
        setIsFriend(responseData);
      } else {
        console.error("Error: Response data is not an array");
      }
      // console.log("aaaaaaaaa", responseData);
      //setIsFriend(responseData);
      console.log( isFriend);
    } catch (error) {
      console.error(`Error: ${error.message}`);
    }
  };
  // const handleFetchFriends = async () => {
  //   try {
  //     const token = await SecureStore.getItemAsync('authToken');

  //     const response = await fetch(`${API_URL}/getAllFriend`, {
  //       headers: {
  //         'Authorization':  token,
  //       },
  //     });

  //     if (!response.ok) {
  //       throw new Error('Failed to fetch friends');
  //     }

  //     const responseData = await response.json();

  //     if (Array.isArray(responseData)) {
  //       setIsFriend(responseData);
  //     } else {
  //       console.error("Error: Response data is not an array");
  //     }
  //   } catch (error) {
  //     console.error("Error fetching friends:", error);
  //   }
  // };

  useEffect(() => {
    handleFetchFriends();
  }, []);

  const sampleFriends = [
    { _id: '65e8bd23a2df49bbebe5d686', avatar: 'https://i.imgur.com/OcuYHnO_d.webp?maxwidth=128&shape=square', displayName: 'Jennie' },
    { _id: '65efd2b0f509f13a205acbb9', avatar: 'https://res.cloudinary.com/dpigoorhc/image/upload/v1699298966/onlyfan/index/Icon/klasfpxswxaglw2ujbtn.png', displayName: 'Friend 2' },
    { _id: '661eb05be9448b7cb6ffe860', avatar: 'https://res.cloudinary.com/dpigoorhc/image/upload/v1699298966/onlyfan/index/Icon/klasfpxswxaglw2ujbtn.png', displayName: 'Friend 3' },
  ];

  return (
    <SafeAreaView style={[styles.header]}>
      <View style={[styles.row1, styles.f__center, styles.f__sb]}>
        <View>
        </View>
        <View style={{ alignItems: "center" }}>
          <Text
            style={{
              fontSize: 20,
              color: "#00AE72",
              fontWeight: "bold",
              marginLeft: 50,
            }}
          >
            Đoạn chat
          </Text>
        </View>
        <View>
          <TouchableOpacity
            style={styles.header__item}
            onPress={handleOpenModal}
          >
            <Image
              source={{ uri: header__imgs[3] }}
              style={{ height: 40, width: 40 }}
            />
          </TouchableOpacity>
          <Modal
            visible={showModal}
            animationType="slide"
            transparent={true}
            onRequestClose={handleCloseModal}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Tạo nhóm mới</Text>
                <TouchableOpacity onPress={handleChooseImage}>
                  <Image
                    source={{ uri: selectedImage || defaultImage }}
                    style={styles.groupImage}
                  />
                </TouchableOpacity>
                <TextInput
                  style={styles.groupNameInput}
                  placeholder="Nhập tên nhóm"
                  onChangeText={(text) => setGroupName(text)}
                  value={groupName}
                />
                <Text>Chọn thành viên:</Text>
                <ScrollView>
                  {Array.isArray(isFriend) && isFriend.map((friend,index) => (
                    <View key={friend._id} style={styles.friendItem}>
                      <Image
                        source={{ uri: friend.photoURL }}
                        style={styles.friendAvatar}
                      />
                      <Text style={styles.friendDisplayName}>
                        {friend.displayName}
                      </Text>
                      <Checkbox
                        style={styles.checkbox}
                        value={checkedUserId.includes(friend._id)}
                        onValueChange={(isChecked) => {
                          handleFriendItemCheck(friend._id, isChecked);
                          if (isChecked) {
                            console.log('Checkbox with _id', friend._id, 'is checked');
                          }
                        }}
                      />
                    </View>
                  ))}
                </ScrollView>
                <Button title="Tạo nhóm" onPress={handleSubmitGroup} />
                <Button title="Đóng" onPress={handleCloseModal} />
              </View>
            </View>
          </Modal>
        </View>
      </View>
      <View style={styles.row2}>
        <Image source={{ uri: header__imgs[1] }} style={styles.icon} />
        <TextInput
          placeholder="Search"
          style={{
            width: 341,
            marginLeft: 10,
            height: 40,
            borderColor: "#00AE72",
            borderWidth: 1,
            borderRadius: 20,
            paddingLeft: 20,
            color: "#333",
          }}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    position: 'absolute',
    left: 250,
  },
  f__sb: {
    justifyContent: "space-between",
  },
  f__center: {
    justifyContent: "center",
    alignItems: "center",
  },
  wrap: {
    flexWrap: "wrap",
  },
  friendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  friendAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  friendDisplayName: {
    marginLeft: 5,
  },
  header: {
    height: 100,
    color: "hsl(0,0%,96.86%)",
    borderBottomColor: "#00AE72",
    borderBottomWidth: 1,
  },

  row1: {
    flexDirection: "row",
    width: "100%",
  },
  row2: {
    flexDirection: "row",
    marginTop: 5,
    marginLeft: 15,
    marginRight: 15,
    height: 40
  },
  header__item: {
    marginHorizontal: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  groupImage: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    marginBottom: 10,
    alignSelf: 'center',
  },
  groupNameInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  logo: {
    width: 170,
    height: 35,
  },
  icon: {
    width: 25,
    height: 25,
    marginTop: 6,
    marginLeft: 5,
    backfaceVisibility: "hidden",
    opacity: 0.7
  },
});
