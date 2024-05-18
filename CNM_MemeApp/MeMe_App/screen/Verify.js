import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  TouchableOpacity,
  Alert,
} from "react-native";
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";
import { API_URL } from "@env";
import Toast from "react-native-toast-message";
 
const CELL_COUNT = 6;
const CELL_SIZE = 50;
const CELL_MARGIN = 5;

export default function Verify({ navigation, route }) {
  const { email } = route.params;
  console.log("Bắt được email trang Verify: ", email);
  const [value, setValue] = useState("");
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const verifyOTP = async () => {
    try {
      console.log("OTP truyền vào:", value); // Thêm dòng này để kiểm tra giá trị OTP

      const response = await fetch(`${API_URL}/api/users/verify`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email, otp: value }),
      });

      const data = await response.json();

      // Nếu có lỗi từ server, hiển thị lỗi đó
      if (!response.ok) {
        console.error(data);
        throw new Error(data.message);
      }

      console.log("Giá trị của data FP2:", data);

      // Hiển thị thông báo từ BE
      Toast.show({
        type: data.success ? "success" : "error",
        text1: "Thông báo",
        text2: data.message,
      });

      // Chuyển đến trang Register nếu xác thực OTP thành công
      if (data.success) {
        console.log("Xác thực OTP thành công!");
        navigation.navigate("Register", { email: email });
      }

      return data;
    } catch (error) {
      console.error("Error:", error);
      alert(`Xác thực OTP không thành công! Lỗi: ${error.message}`);
    }
  };


  const handleSubmit = () => {
    verifyOTP();
  };

    const resendOTP = async () => {
      try {
        const response = await fetch(`${API_URL}/api/users/send-otp`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: email }),
        });

        const data = await response.json();

        // Nếu có lỗi từ server, hiển thị lỗi đó
        if (!response.ok) {
          console.error(data);
          throw new Error(data.message);
        }

        console.log("Mã OTP mới:", data.otp);

        // Hiển thị thông báo từ BE
        Toast.show({
          type: data.success ? "success" : "error",
          text1: "Thông báo",
          text2: data.message,
        });

        return data;
      } catch (error) {
        console.error("Error:", error);
        alert(`Gửi lại OTP không thành công! Lỗi: ${error.message}`);
      }
    };
  return (
    <View style={styles.container}>
      <View>
        <Image
          source={require("../assets/logoMeme.png")}
          style={{ height: 325, width: 332.15, alignItems: "center" }}
        />
      </View>
      <Text style={styles.heading}>Nhập mã xác nhận</Text>
      <Text style={styles.subHeading}>
        Mã xác thực sẽ được gửi qua email hoặc số điện thoại
      </Text>
      <CodeField
        ref={ref}
        {...props}
        value={value}
        onChangeText={setValue}
        cellCount={CELL_COUNT}
        rootStyle={styles.codeField}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        renderCell={({ index, symbol, isFocused }) => (
          <View
            onLayout={getCellOnLayoutHandler(index)}
            key={index}
            style={[
              styles.cell,
              isFocused && styles.focusCell,
              !symbol && styles.emptyCell,
            ]}
          >
            <Text style={styles.cellText}>
              {symbol ? <Text>{symbol}</Text> : null}
            </Text>
          </View>
        )}
       //onSubmitEditing={handleSubmit}
      />
      <Toast ref={(ref) => Toast.setRef(ref)} />

      <Text>Bạn chưa nhận được?</Text>
      <TouchableOpacity onPress={resendOTP}>
        <Text style={styles.resend}>Gửi lại</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleSubmit} style={styles.nextButton}>
        <Text style={styles.nextButtonText}>Tiếp theo</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  heading: {
    fontSize: 24,

    marginTop: 10,
  },
  subHeading: {
    marginTop: 10,
    fontSize: 14,
    color: "gray",
  },
  codeField: {
    width: CELL_COUNT * (CELL_SIZE + 2 * CELL_MARGIN),
    height: CELL_SIZE + 2 * CELL_MARGIN,
    marginTop: 20,
  },
  cell: {
    width: CELL_SIZE,
    height: CELL_SIZE,
    lineHeight: CELL_SIZE,
    textAlign: "center",
    borderColor: "#E4E4E4", // Màu viền khung xám
    borderWidth: 1, // Độ rộng của viền khung
    borderRadius: 10, // Bo tròn góc của viền khung
    justifyContent: "center", // Căn giữa theo trục dọc
  },
  cellText: {
    fontSize: 24,

    textAlign: "center", // Căn giữa theo trục ngang
  },
  focusCell: {
    borderColor: "#000", // Màu viền khung khi ô nhập được focus
  },
  emptyCell: {
    backgroundColor: "#FFF", // Màu nền ô nhập khi chưa có giá trị
  },
  resend: {
    color: "#508BE3",
    fontSize: 14,
    marginTop: 10,
  },
  nextButton: {
    width: 146,
    height: 36,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#00AE72",
    marginTop: 30,
  },
  nextButtonText: {
    fontSize: 14,
    color: "#FFF",
  },
});
