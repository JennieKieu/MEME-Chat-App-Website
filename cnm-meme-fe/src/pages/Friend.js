import React, {useEffect, useState} from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import SideBar from "../components/chat/SideBar";
import SearchBar from "../components/chat/SearchBar";
import axiosClient from "../api/axiosClient";
import { AuthToken } from "../authToken";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "react-bootstrap-icons";
const FriendList = () => {
    const navigate = useNavigate();
  const [friends, setFriends] = useState([]);
  useEffect( () => {
    const fetchData  = async () => {
      const res = await axiosClient.get("/getAllFriend");
      console.log(res.data);
      setFriends(res.data);
    }
    fetchData();
  }, []);

  //unfriend 
   const handleUnfriend = async (friendId) => {
     try {
       const res = await axiosClient.post("/unfriend", { friendId });
       console.log(res.data);
       // Cập nhật danh sách bạn bè sau khi unfriend thành công
       const updatedFriends = friends.filter(
         (friend) => friend._id !== friendId
       );
       setFriends(updatedFriends);
     } catch (error) {
       console.error("Error unfriending:", error);
       // Xử lý lỗi nếu cần
     }
   };

  return (
    <Container fluid className="m-0 p-0">
      <Row>
        <Col md={1} style={{ width: "101px" }}>
          <SideBar />
        </Col>
        <Col md={10}>
          <Button variant="light" onClick={() => navigate(-1)} className="mb-3">
            <ArrowLeft /> Back
          </Button>
          <Row>
            <h1>Danh sách bạn bè</h1>
          </Row>
          <div style={{ overflowY: "auto", maxHeight: "730px" }}>
            {" "}
            {/* Add this line */}
            {friends.map((friend, index) => (
              <Row key={index}>
                {" "}
                {/* Add key prop to avoid warning */}
                <Card className="mb-3">
                  <Row>
                    <Col
                      md={2}
                      className="d-flex align-items-center justify-content-center p-0"
                    >
                      <Card.Img
                        variant="top"
                        src={friend.photoURL}
                        style={{
                          width: "70px",
                          height: "70px",
                          borderRadius: "50px",
                        }}
                      />
                    </Col>
                    <Col md={8}>
                      <Card.Body>
                        <Card.Title>{friend.displayName}</Card.Title>
                        <Card.Text>Email: {friend.email}</Card.Text>
                        <Card.Text>
                          Số điện thoại: {friend.phoneNumber}
                        </Card.Text>
                        {/* Bạn có thể thêm nhiều thông tin khác về bạn bè ở đây */}
                      </Card.Body>
                    </Col>
                    <Col
                      md={2}
                      className="d-flex align-items-center justify-content-center p-0"
                    >
                      <Button
                        variant="danger"
                        onClick={() => handleUnfriend(friend._id)}
                      >
                        Huỷ kết bạn
                      </Button>
                    </Col>
                  </Row>
                </Card>
              </Row>
            ))}
          </div>{" "}
          {/* Add this line */}
        </Col>
      </Row>
    </Container>
  );
};

export default FriendList;
