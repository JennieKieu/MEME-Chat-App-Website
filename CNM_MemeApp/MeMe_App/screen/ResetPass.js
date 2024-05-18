import React, { useEffect, useState } from "react";
import { View, Text, Image, TextInput, Pressable } from "react-native";
import { AntDesign } from "@expo/vector-icons";

const ResetPass = ({ navigation }) => {
  return (
    <View
      style={{
        justifyContent: "space-around",
        alignItems: "center",
      }}
    > 
      <Image
        source={require("../assets/logoMeme.png")}
        style={{ height: 325, width: 332.15 }}
      />
      <Text
        style={{
          fontSize: 24,
          fontFamily: "sans-serif",
        }}
      >
        Đặt lại mật khẩu
      </Text>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginTop: 10,
        }}
      ></View>
      <TextInput
        style={{
          width: "80%",
          height: 60,
          borderWidth: 1,
          borderRadius: 10,
          borderColor: "#00AE72",
          paddingLeft: 20,
          fontSize: 14,
          color: "gray",
        }}
        placeholder="Nhập mật khẩu mới"
      />
      <TextInput
        secureTextEntry={true}
        style={{
          width: "80%",
          height: 60,
          borderWidth: 1,
          borderRadius: 10,
          borderColor: "#00AE72",
          paddingLeft: 20,
          fontSize: 14,
          color: "gray",
          marginTop: 30,
        }}
        placeholder="Nhập lại mật khẩu mới"
      />
      <Pressable
        style={{
          width: 146,
          height: 36,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#00AE72",
          flexDirection: "row",
          marginTop: 20,
        }}
      >
        <Text style={{ fontSize: 14, color: "#FFF" }}>Xác nhận</Text>
      </Pressable>
    </View>
  );
};

export default ResetPass;
