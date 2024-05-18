import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { FontAwesome } from "@expo/vector-icons";
import Toast from "react-native-toast-message";
import { API_URL } from "@env";

function Register({ navigation, route }) {
  const { email } = route.params;
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState(new Date(1598051730000));
  const [show, setShow] = useState(false);
  const [mode, setMode] = useState("date");
  const [secureTextEntry, setSecureTextEntry] = useState(true);
 
  

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || dateOfBirth;
    setDateOfBirth(currentDate);
  };
  const registerUser = async () => {
    try {
      console.log("Đang gửi yêu cầu đăng ký với dữ liệu sau:");
      console.log("Email:", email);
      console.log("Mật khẩu:", password);
      console.log("Tên hiển thị:", displayName);
      console.log("Ngày sinh:", dateOfBirth);

      const response = await fetch(`${API_URL}/api/users/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, displayName, dateOfBirth }),
      });

      const data = await response.json();

      // Nếu có lỗi từ server, hiển thị lỗi đó
      if (!response.ok) {
        console.error(data);
        throw new Error(data.message);
      }

      console.log("Dữ liệu từ server:", data);

      Toast.show({
        type: data.success ? "success" : "error",
        text1: "Thông báo",
        text2: alert("Đăng kí thành công"),
      });

      if (data.success) navigation.navigate("Login");

      return data;
    } catch (error) {
      console.error("Lỗi:", error);
      alert(`Đăng ký không thành công! Lỗi: ${error.message}`);
    }
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const Back = () => {
    navigation.navigate("Login");
  };

  return (
    <View style={styles.container}>
      <Image source={require("../assets/logoMeme.png")} style={styles.image} />
      <Text style={styles.title}>Đăng kí</Text>
      <TextInput
        onChangeText={setDisplayName}
        style={styles.input}
        placeholder="Tên tài khoản"
      />
      <TextInput
        onChangeText={setPassword}
        secureTextEntry={secureTextEntry} // Thêm thuộc tính này
        style={styles.input}
        placeholder="Nhập mật khẩu"
      />
      <TouchableOpacity
        onPress={() => setSecureTextEntry((prev) => !prev)} // Thêm nút này
        style={styles.togglePasswordVisibilityButton}
      >
        <FontAwesome
          name={secureTextEntry ? "eye-slash" : "eye"}
          size={24}
          color="black"
        />
      </TouchableOpacity>
      <View style={styles.datePickerContainer}>
        <Text>Ngày sinh:</Text>
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={dateOfBirth}
            mode={mode}
            is24Hour={false}
            display="default"
            onChange={onChange}
          />
        )}
        <TouchableOpacity onPress={showDatepicker}>
          <FontAwesome name="calendar" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={registerUser} style={styles.button}>
          <Text style={styles.buttonText}>Đăng kí</Text>
        </TouchableOpacity>
      </View>
      <Toast ref={(ref) => Toast.setRef(ref)} />
      <View style={styles.footerContainer}>
        <Text style={styles.linkText}>Bạn đã có tài khoản?</Text>

        <TouchableOpacity
          style={{ ...styles.button, marginLeft: 80 }}
          onPress={Back}
        >
          <Text style={styles.buttonText}>Đăng nhập</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-around",
    alignItems: "center",
  },
  image: {
    height: 200,
    width: 200,
    alignItems: "center",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
  },
  input: {
    width: "80%",
    marginTop: 50,
    height: 60,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#00AE72",
    paddingLeft: 15,
    fontSize: 14,
    color: "gray",
  },
  datePickerContainer: {
    flexDirection: "row",
    marginTop: 20,
    alignItems: "center",
    justifyContent: "space-between",
    width: "80%",
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 40,
  },
  button: {
    width: 146,
    height: 36,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#00AE72",
    flexDirection: "row",
  },
  buttonText: {
    fontSize: 14,
    color: "#FFF",
  },
  footerContainer: {
    flexDirection: "row",
    marginTop: 50,
  },
  linkText: {
    marginLeft: 10,
    marginTop: 10,
  },
  togglePasswordVisibilityButton: {
    paddingRight: 15,
  },
});

export default Register;
