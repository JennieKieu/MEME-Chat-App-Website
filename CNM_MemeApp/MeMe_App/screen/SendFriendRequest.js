import React from "react";
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
 
export default SendFriendRequest = ({ navigation }) => {
  const FriendRequest = () => {
    navigation.navigate("FriendRequest");
  };
  const Back = () => {
    navigation.navigate("AllPeople");
  };

  let friendRequests = [
    {
      name: "Kota Miura",
      image:
        "https://media-cdn-v2.laodong.vn/Storage/NewsPortal/2022/1/22/997524/Screen-Shot-2022-01--02.png",
    },
    {
      name: "Timothée Chalamet",
      image:
        "https://thegioidienanh.vn/stores/news_dataimages/thanhtan/112021/27/12/in_article/0545_image003_5.jpg?rt=20211127120611",
    },
    {
      name: "Lana Del Rey",
      image:
        "https://vcdn1-giaitri.vnecdn.net/2020/11/05/LanaDelReytop-1604543416-4690-1604543518.jpg?w=500&h=300&q=100&dpr=1&fit=crop&s=r2IcF24rva1jqTpZNMkM8A",
    },
    {
      name: "Taylor Swift",
      image:
        "https://i.pinimg.com/736x/e5/0c/41/e50c4172a0846b241a5d79195a8145e7.jpg",
    },
    {
      name: "Katy Perry",
      image:
        "https://i.dailymail.co.uk/1s/2020/07/11/11/30644086-8512667-Gorgeous_Katy_Perry_showed_off_her_real_side_on_Saturday_as_she_-a-36_1594465196059.jpg",
    },
    {
      name: "Justin Bieber",
      image:
        "https://kenh14cdn.com/thumb_w/660/203336854389633024/2022/1/30/photo-1-1643534908608405916286.jpg",
    },
    {
      name: "Charlie Puth",
      image: "https://baobinhdinh.vn/ViewImage.aspx?imgid=263531",
    },
    {
      name: "Harry Styles",
      image:
        "https://www.rollingstone.com/wp-content/uploads/2019/08/20190723_Rolling_Stone_Harry_Styles_Rocks_0119_03_ext_RGB-LEAD-NEW.jpg?w=1600&h=900&crop=1",
    },
    {
      name: "Shawn Mendes",
      image:
        "https://cdn01.justjaredjr.com/wp-content/uploads/2019/07/shawn-beach/shawn-mendes-camila-cabello-kiss-at-the-beach-10.jpg",
    },
    {
      name: "Camila Cabello",
      image:
        "https://images.hola.com/us/images/028a-1a40a653e1b3-48c0c639ec6a-1000/horizontal-480/exc-camila-cabello.jpg",
    },
    {
      name: "Andrew Taggart",
      image:
        "https://i.dailymail.co.uk/1s/2023/01/17/12/66469631-11643965-Hot_blooded_The_pair_have_not_been_shy_in_the_past_about_discuss-a-17_1673958042216.jpg",
    },
    {
      name: "Nguyễn Thanh Tùng",
      image:
        "https://media.yeah1.com/files/phuongthao09vd/2023/01/09/323429436_728470941820196_359128045812137411_n-212406.jpg",
    },
    {
      name: "Nguyễn Việt Hoàng",
      image:
        "https://vcdn1-vnexpress.vnecdn.net/2024/01/29/saostar-nbj1p4dtlej04pvs-png-6-4324-8805-1706518449.jpg?w=900&h=540&q=100&dpr=1&fit=crop&s=AW3HOumNnPMMKA80-qwB2g",
    },
    {
      name: "Trần Minh Hiếu (aka Hieuthu2)",
      image:
        "https://kenh14cdn.com/203336854389633024/2023/10/29/3485697851252729572311882507427213721498882n-16985572681951423441131.jpg",
    },
    {
      name: "Max Mcfarlin",
      image:
        "https://i.pinimg.com/originals/c2/d6/42/c2d6425687469a7f544e8da8e1f1723c.png",
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <SafeAreaView style={styles.header}>
        <TouchableOpacity onPress={() => Back()}>
          <Image
            style={{ height: 30, width: 30, color: "#00AE72" }}
            source={{
              uri: "https://cdn1.iconfinder.com/data/icons/basic-ui-elements-coloricon/21/01-512.png",
            }}
          />
        </TouchableOpacity>
        <Text style={{ fontSize: 22, color: "#00AE72", fontWeight: "bold" }}>
          Lời mời kết bạn
        </Text>
      </SafeAreaView>
      <SafeAreaView style={{ flexDirection: "row", marginRight: 10 }}>
        <Pressable style={styles.button2}>
          <Text
            onPress={() => FriendRequest()}
            style={{ color: "#00AE72", fontWeight: "bold", fontSize: 18 }}
          >
            Đã nhận
          </Text>
        </Pressable>
        <Pressable style={styles.button}>
          <Text style={{ color: "#00AE72", fontWeight: "bold", fontSize: 18 }}>
            Đã gửi
          </Text>
        </Pressable>
      </SafeAreaView>
      <ScrollView>
        {friendRequests.map((user, index) => (
          <View style={styles.user} key={index}>
            <View style={styles.profile}>
              <Image source={{ uri: user.image }} style={styles.avatar} />
              <View style={styles.userName}>
                <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                  {user.name}
                </Text>
              </View>
            </View>
            <View style={{ justifyContent: "center" }}>
              <TouchableOpacity
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  width: 90,
                  backgroundColor: "#D9D9D9",
                  borderRadius: 30,
                  height: 35,
                }}
              >
                <Text>Thu hồi</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
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
  button: {
    width: "50%",
    height: 40,
    marginTop: 30,
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "black",
  },
  button2: {
    width: "50%",
    height: 40,
    marginTop: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  avatar: {
    height: 60,
    width: 60,
    borderRadius: 360,
  },
  user: {
    flexDirection: "row",
    marginTop: 15,
    marginBottom: 5
  },
  profile: {
    flexDirection: "row",
    width: "70%",
  },
  userName: {
    marginLeft: 10,
    justifyContent: "center",
    width: "70%",
  },
});
