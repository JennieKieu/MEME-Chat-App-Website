import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from "react-native";
import Footer from "./Footer";
import Index from "./Index";
 
export default function CallList({ navigation }) {
  const headerImgs = [
    "https://res.cloudinary.com/dpigoorhc/image/upload/v1699298966/onlyfan/index/Icon/esskl98l5b52i8rag9jq.png",
    "https://cdn-icons-png.flaticon.com/512/6469/6469169.png",
  ];

  const indexImgs = [
    "https://top10binhphuoc.vn/wp-content/uploads/2022/10/avatar-gau-cute-1.jpg",
    "https://anhdephd.vn/wp-content/uploads/2022/04/avatar-gau-1.jpg",
    "https://top10binhphuoc.vn/wp-content/uploads/2022/10/avatar-gau-cute-2.jpg",
    "https://i.pinimg.com/736x/bd/8b/23/bd8b235016ce956a9c84b2638b7ba975.jpg",
    "https://i.pinimg.com/originals/c6/2e/0d/c62e0d3e9a34c74e84a0f7f952ce3695.jpg",
    "https://i.pinimg.com/236x/db/8d/48/db8d4877d92d07b4028d19f4c367ab50.jpg",
  ];

  const callListData = [
    {
      name: "Kiều Dương",
      content: "Cuộc gọi đến",
      time: "2 giờ",
      avatar: indexImgs[0],
      missedCall: false,
    },
    {
      name: "Huỳnh Thắng",
      content: "Cuộc gọi đi",
      time: "3 giờ",
      avatar: indexImgs[1],
      missedCall: false,
    },
    {
      name: "Tú Uyên",
      content: "Cuộc gọi đến",
      time: "4 giờ",
      avatar: indexImgs[2],
      missedCall: false,
    },
    {
      name: "Hoàng Bảo",
      content: "Cuộc gọi nhỡ",
      time: "4 giờ",
      avatar: indexImgs[3],
      missedCall: true,
    },

    {
      name: "Văn Bảo",
      content: "Cuộc gọi nhỡ",
      time: "4 giờ",
      avatar: indexImgs[4],
      missedCall: true,
    },
    {
      name: "Thiên Bâng",
      content: "Cuộc gọi đến",
      time: "4 giờ",
      avatar: indexImgs[5],
      missedCall: false,
    },
    {
      name: "Thiên Bâng",
      content: "Cuộc gọi nhỡ",
      time: "4 giờ",
      avatar: indexImgs[5],
      missedCall: true,
    },
    {
      name: "Tú Uyên",
      content: "Cuộc gọi đi",
      time: "4 giờ",
      avatar: indexImgs[2],
      missedCall: false,
    },
    {
      name: "Hoàng Bảo",
      content: "Cuộc gọi nhỡ",
      time: "4 giờ",
      avatar: indexImgs[3],
      missedCall: true,
    },
    {
      name: "Huỳnh Thắng",
      content: "Cuộc gọi nhỡ",
      time: "3 giờ",
      avatar: indexImgs[1],
      missedCall: true,
    },
  ];

 const renderItem = ({ item }) => (
   <TouchableOpacity
     style={styles.touchChat}
     onPress={() => console.log("Item pressed:", item)}
   >
     <Image source={{ uri: item.avatar }} style={styles.avatar} />
     <View style={styles.viewChat}>
       <View style={styles.content}>
         <Text style={styles.userName}>{item.name}</Text>
         <Text style={styles[item.missedCall ? "chatMissCall" : "chatContent"]}>
           {item.content}
         </Text>
       </View>
       <View style={styles.time}>
         <Text>{item.time}</Text>
       </View>
     </View>
   </TouchableOpacity>
 );


  return (
    <SafeAreaView style={styles.container}>
      <SafeAreaView style={styles.header}>
        <View style={styles.row1}>
          {/* <TouchableOpacity
            style={styles.header__item}
            onPress={() => navigation.toggleDrawer()}
          >
            <Image source={{ uri: headerImgs[0] }} style={styles.icon} />
          </TouchableOpacity> */}
          <Text style={styles.headerTitle}>Cuộc gọi</Text>
          {/* <TouchableOpacity style={styles.header__item}>
            <Image
              source={{ uri: headerImgs[1] }}
              style={{ height: 40, width: 40 }}
            />
          </TouchableOpacity> */}
        </View>
      </SafeAreaView>
      <FlatList
        data={callListData}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
      <Footer navigation={navigation} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 50,
    borderBottomColor: "rgba(0, 0, 0, 0.3)",
    borderBottomWidth: 1,
  },
  row1: {
    flexDirection: "row",
    marginTop: 10,
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
  },
  header__item: {
    marginHorizontal: 10,
  },
  headerTitle: {
    fontSize: 22,
    color: "#00AE72",
    fontWeight: "bold",
    marginLeft:170
  },
  icon: {
    width: 25,
    height: 25,
    marginTop: 6,
    marginLeft: 5,
  },
  container: {
    flex: 1,
  },
  avatar: {
    height: 60,
    width: 60,
    borderRadius: 360,
  },
  touchChat: {
    flexDirection: "row",
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    height: 70,
  },
  userName: {
    fontSize: 20,
  },
  chatContent: {
    marginTop: 10,
    color: "gray",
    fontSize: 16,
  },
  chatMissCall: {
    marginTop: 10,
    color: "red",
    fontSize: 16,
  },
  viewChat: {
    marginLeft: 10,
    borderBottomColor: "rgba(0, 0, 0, 0.1)",
    borderBottomWidth: 1,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  time: {
    width: "30%",
    alignItems: "flex-start",
  },
  content: {
    width: "50%",
  },
});
