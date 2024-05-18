import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  Pressable,
  TouchableOpacity,
  Alert,
} from "react-native";
import { API_URL } from "@env";

import { FontAwesome } from "@expo/vector-icons";

const UpdatePassword = ({ navigation, route }) => {
  const { email } = route.params;
  const [password, setPassword] = useState("");
  const [secureTextEntry, setSecureTextEntry] = useState(true);
 
  const Back = () => {
    navigation.navigate("VerifyResetPasswordOTP");
  };

  const updatePassword = async () => {
    try {
      const response = await fetch(`${API_URL}/api/users/update-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email, newPassword: password }),
      });
      const data = await response.json();
      if (data.success) {
        Alert.alert("Thành công", data.message);
        // Chuyển hướng người dùng đến trang đăng nhập
        navigation.navigate("Login");
      } else {
        Alert.alert("Lỗi", data.message);
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Lỗi", "Có lỗi xảy ra khi cập nhật mật khẩu");
    }
  };

  return (
    <View
      style={{
        justifyContent: "space-around",
        alignItems: "center",
      }}
    >
      <Image
        source={require("../assets/logoMeme.png")}
        style={{ height: 325, width: 332.15, alignItems: "center" }}
      />

      <Text style={{ marginBottom: 20, fontWeight: "bold" }}>
        Nhập password mới
      </Text>
      <TextInput
        secureTextEntry={secureTextEntry}
        onChangeText={setPassword}
        style={{
          width: "80%",
          height: 60,
          borderWidth: 1,
          borderRadius: 10,
          borderColor: "#00AE72",
          paddingLeft: 20,
          fontSize: 14,
          color: "gray",
          alignItems: "center",
        }}
        placeholder="Nhập password mới"
      />
      <TouchableOpacity
        onPress={() => setSecureTextEntry((prev) => !prev)} // Thêm nút này
        style={{ padding: 15 }}
      >
        <FontAwesome
          name={secureTextEntry ? "eye-slash" : "eye"}
          size={24}
          color="black"
        />
      </TouchableOpacity>
      <View style={{ flexDirection: "row", marginTop: 50 }}>
        <Pressable
          onPress={() => Back()}
          style={{ marginLeft: 10, marginTop: 10 }}
        >
          <Text style={{ color: "#508BE3" }}>Trở lại</Text>
        </Pressable>
        <TouchableOpacity
          onPress={updatePassword}
          style={{
            width: 146,
            height: 36,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#00AE72",
            flexDirection: "row",
            marginLeft: 80,
          }}
        >
          <Text style={{ fontSize: 14, color: "#FFF" }}>Xác nhận</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default UpdatePassword;
