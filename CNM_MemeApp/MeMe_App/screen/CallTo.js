import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";
import AllPeople from "./AllPeople";
import Index from "./Index";
export default CallTo = ({ navigation }) => {
   

  return (
    <SafeAreaView style={styles.container}>
      <SafeAreaView style={styles.header}>
        <Image
          style={{ height: 120, width: 120, borderRadius: 360 }}
          source={{
            uri: "https://top10binhphuoc.vn/wp-content/uploads/2022/10/avatar-gau-cute-1.jpg",
          }}
        ></Image>
        <Text style={{ fontSize: 30 }}>Kiều Dương</Text>
        <Text style={{ color: "#5F5F5F", fontSize: 15 }}>Đang gọi...</Text>
      </SafeAreaView>
      <SafeAreaView style={styles.footer}>
        <SafeAreaView style={styles.icon}>
          <Image
            style={{ height: 50, width: 50 }}
            source={{
              uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Speaker_Icon.svg/1024px-Speaker_Icon.svg.png",
            }}
          ></Image>
        </SafeAreaView>
        <SafeAreaView style={styles.icon}>
          <Image
            style={{ height: 50, width: 50 }}
            source={{
              uri: "https://cdn4.iconfinder.com/data/icons/interface-glyph-34/32/unmute-512.png",
            }}
          ></Image>
        </SafeAreaView>
        <SafeAreaView style={styles.icon}>
          <Image
            style={{ height: 50, width: 50 }}
            source={{
              uri: "https://cdn-icons-png.flaticon.com/512/25/25457.png",
            }}
          ></Image>
        </SafeAreaView>
      </SafeAreaView>
      <SafeAreaView style={styles.footer}>
        <SafeAreaView style={styles.icon2}>
          <Image
            style={{ height: 50, width: 50 }}
        
              source={require("../assets/phone.png")}
            
          ></Image>
        </SafeAreaView>
      </SafeAreaView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#76E3BD",
  },
  header: {
    alignItems: "center",
    //backgroundColor:"pink",
    height: 200,
    marginTop: 100,
  },
  footer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 50,
  },
  icon: {
    backgroundColor: "#F1FFFA",
    height: 70,
    width: 70,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderRadius: 360,
    margin: 20,
  },
  icon2: {
    height: 70,
    width: 70,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderRadius: 360,
    margin: 20,
    backgroundColor:"red"
  }
});
