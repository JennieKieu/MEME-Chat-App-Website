import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  Pressable,
  TouchableOpacity,
  Alert
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { API_URL } from "@env";
import Verify from "./Verify";
import axios from "axios";
const SendResetPasswordOTP = ({ navigation }) => {
  const [email, setEmail] = useState("");
 
  const Back = () => {
    navigation.navigate("Login");
  };

  const sendOTP = async () => {
    try {
      const response = await fetch(
        `${API_URL}/api/users/send-reset-passwordOTP`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      const data = await response.json();

      // Nếu có lỗi từ server, hiển thị lỗi đó
      if (!data.success) {
        alert(data.message);
        return;
      }

      console.log("Giá trị của data SendOtp:", data);

      // Chuyển đến trang ForgotPass2 nếu gửi OTP thành công
      if (data.success) {
        navigation.navigate("VerifyResetPasswordOTP", { email: email });
      }

      return data;
    } catch (error) {
      console.error("Error:", error);
      // Hiển thị lỗi nếu có
      alert(error.message);
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
        Nhập email để đặt lại mật khẩu
      </Text>
      <TextInput
        onChangeText={setEmail}
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
        placeholder="Nhập email bạn đã dùng đăng kí tài khoản"
      />

      <View style={{ flexDirection: "row", marginTop: 50 }}>
        <Pressable
          onPress={() => Back()}
          style={{ marginLeft: 10, marginTop: 10 }}
        >
          <Text style={{ color: "#508BE3" }}>Trở lại</Text>
        </Pressable>
        <TouchableOpacity
          onPress={sendOTP}
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

export default SendResetPasswordOTP;
