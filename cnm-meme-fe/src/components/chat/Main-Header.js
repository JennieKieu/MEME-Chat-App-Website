import React, {useState, useEffect} from "react";
import { ListGroup, Image, Row, Col, Container, Card, Form} from 'react-bootstrap';
import Stack from 'react-bootstrap/Stack';
import { icons } from "../../assets";
import styled from "styled-components";
import axiosClient from "../../api/axiosClient";
import { useNavigate } from "react-router-dom";
import { AiOutlineUser } from 'react-icons/ai'; // Import user icon


import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

// id: props
const Header = (id) => {
  const [user, setUser] = useState({});
  const [meetingId, setMeetingId] = useState();
  const [isFriend, setIsFriend] = useState(true); // Giả sử ban đầu là bạn bè
    const [isMember, setIsMember] = useState(false);

  const navigate = useNavigate();
  var socket = id.socket;
  useEffect(() => {
    axiosClient.get("/info-user/" + id.id).then((res) => {
      const data = res.data.data;
      console.log("data group: ", data);
      setUser(data);
    });
  }, [id.id]);
  function formatTime(milliseconds) {
    const seconds = Math.floor(milliseconds / 1000);
    if (seconds < 60) {
      return seconds + " seconds ago";
    }
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) {
      return minutes + " minutes ago";
    }
    const hours = Math.floor(minutes / 60);
    if (hours < 24) {
      return hours + " hours ago";
    }
    const days = Math.floor(hours / 24);
    return days + " days ago";
  }

  const handleCamera = () => {
    if (meetingId) {
      socket.emit("notify", { meetingId: meetingId, userId: user._id });
      window.open("/meeting/" + meetingId, "_blank");
      return;
    }
    // socket.emit('call', { chatRoomId: id.id });
    // socket.on('call', (meetingId) => {
    //     console.log('data', meetingId);
    //     setMeetingId(meetingId);
    //     window.open('/meeting/' + meetingId, '_blank');
    // });
  };
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const [userInfo2, setUserInfo2] = useState([]);

  const handleModal = async () => {
    const res = await axiosClient.get("/profile/" + user._id);
    setUserInfo(res.data.data);
    console.log("userInfo", userInfo);
    setShow(true);
  };
  const handleModalGroup = async (groupId) => {
    console.log("groupId", groupId);
    const res = await axiosClient.get("/profile-group/" + groupId);
    setUserInfo(res.data.data);
    setShow(true);
  };
  const handleClose = () => setShow(false);
  const handleClose2 = () => setShow2(false);
  const handleBt = () => {};
  // useEffect(() => {
  // // if(!meetingId){
  // //     setMeetingId("meetingId");
  // //     socket.emit('call', id.id);
  // //     socket.on('call', (meetingId) => {
  // //         console.log('MeetingHeader', meetingId);
  // //         setMeetingId(meetingId);
  // //     });
  // // }}, []);
  const handleSetAdmin = async (id) => {
    console.log(id);
    const res = await axiosClient.post("/groups/" + id.id + "/delete-member", {
      userId: id,
    });
    console.log(res);
    //reload page:
    window.location.reload();
  };
  const handleRemove = async (userId) => {
    const res = await axiosClient.post("/groups/" + id.id + "/delete-member", {
      userId: userId,
    });
    console.log(res);
    window.location.reload();
  };
  const handleAddMember = async () => {
    const res = await axiosClient.get("/info-add-member/" + user._id);
    console.log(res);
    setUserInfo2(res.data);
    console.log(userInfo2);
    setShow2(true);
  };
  const [forwarded, setForwarded] = useState([]);

  const handleInvite = async (user, index) => {
    const res = await axiosClient.post("/groups/" + id.id + "/add-member", {
      userId: user._id,
    });
    console.log(res);
    setForwarded([...forwarded, index]);
  };

  const handleOutgroup = async () => {
    const res = await axiosClient.post("/groups/" + id.id + "/outGroup");
    console.log(res);
    window.location.reload();
  };
const handleUnfriend = async (friendId) => {
  const res = await axiosClient.post("/unfriend", { friendId });
  console.log(res);
  setIsFriend(false); // Đặt trạng thái là false khi bạn bè bị hủy
  //window.location.reload();
  console.log(res);
  console.log("unfriend");
};

const handleAddFriend = async () => {
  const res = await axiosClient.post("/add-friend", { userInfo });
  console.log(res);
  console.log("add friend");
  setIsFriend(true); // Đặt trạng thái là true khi thêm bạn bè mới
 // window.location.reload();
};


  return (
    <>
      <div className="p-2 border-start">
        <Stack direction="horizontal" gap={2}>
          <div className="flex-grow-1">
            <ListGroup.Item
              as="div"
              className="d-flex justify-content-between align-items-start"
              action
            >
              <DivImage>
                <ImageSidebarStyled
                  src={user.photoURL}
                  roundedCircle
                  onClick={
                    !user.ownerId
                      ? handleModal
                      : () => handleModalGroup(user._id)
                  }
                  style={{ cursor: "pointer" }}
                />
              </DivImage>
              <div className="me-auto">
                <div className="fw-bold">
                  {user.displayName ? user.displayName : user.name}
                </div>
                <div>
                  {!user.members
                    ? user.isOnline
                      ? "Active"
                      : `Active ${formatTime(
                          Date.now() - Date.parse(user.lastOnlineTime)
                        )}`
                    : `${user.members.length} members`}
                </div>
              </div>
            </ListGroup.Item>
          </div>
          <div className="p-1 mx-1 image-hover">
            {user.members && (
              <Image
                src={icons.addGroup}
                style={{ width: "25px", height: "25px" }}
                onClick={handleAddMember}
              />
            )}
          </div>
          <div className="p-1 mx-1 image-hover">
            <Image
              src={icons.search}
              style={{ width: "25px", height: "25px" }}
            />
          </div>
          {/* 
           <div className="p-1 mx-1 image-hover">
             <AiOutlineUser // Sử dụng user icon
               style={{ width: "25px", height: "25px" }}
             />
           </div> */}

          <div className="p-1 mx-1 image-hover" onClick={handleCamera}>
            <Image
              src={icons.video_call}
              style={{ width: "25px", height: "25px" }}
            />
          </div>

          <style>
            {`
                        .image-hover:hover {
                            transform: scale(1.2);
                            transition: transform .2s;
                        }
                        `}
          </style>
        </Stack>
      </div>

      {!isFriend && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            padding: "8px",
            border: "1px solid #ddd",
            borderRadius: "8px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            marginTop: "16px",
          }}
        >
          <Image
            src={icons.addFriend}
            style={{ width: "25px", height: "25px", marginRight: "12px" }}
          />
          <p style={{ margin: 0, fontSize: "16px", color: "#333" }}>
            Gửi lời mời kết bạn
          </p>
          <Button
            variant="primary"
            onClick={handleAddFriend}
            style={{
              marginLeft: "auto",
              padding: "6px 12px",
              fontSize: "14px",
            }}
          >
            Kết bạn
          </Button>
        </div>
      )}
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>User Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container fluid>
            <Row className="justify-content-center align-items-center h-100 w-100 d-flex">
              <Col lg="6" className="mb-4 mb-lg-0 w-100">
                <Card className="mb-3" style={{ borderRadius: ".5rem" }}>
                  <Row className="g-0">
                    <Col
                      md="4"
                      className="gradient-custom text-center px-2"
                      style={{
                        borderTopLeftRadius: ".5rem",
                        borderBottomLeftRadius: ".5rem",
                      }}
                    >
                      <Image
                        src={
                          userInfo.avatar
                            ? userInfo.avatar
                            : "https://i.imgur.com/rsJjBcH.png"
                        }
                        alt="Avatar"
                        className="my-4"
                        style={{ width: "80px", cursor: "pointer" }}
                        fluid
                      />
                      <div className="d-flex flex-column justify-content-between  align-items-center">
                        <h5>{userInfo.name}</h5>
                        <Button
                          variant="danger"
                          className="my-2"
                          onClick={() => {
                            if (isFriend) {
                              handleUnfriend(user._id);
                            } else if (userInfo.isGroup) {
                              handleOutgroup();
                            }
                          }}
                        >
                          {!userInfo.members ? "Unfriend" : "Leave group"}
                        </Button>
                        {console.log(
                          user,
                          JSON.parse(localStorage.getItem("userId"))
                        )}
                        <Button variant="" className="my-2" onClick={handleBt}>
                          {!userInfo.members
                            ? "Block"
                            : user.ownerId ===
                              JSON.parse(localStorage.getItem("userId"))
                            ? "Delete group"
                            : ""}
                        </Button>
                      </div>
                    </Col>
                    <Col md="8" className="p-2">
                      {!userInfo.members ? (
                        <Card.Body className="p-4">
                          <h6>Information</h6>
                          <hr className="mt-0 mb-4" />
                          <Row className="pt-1">
                            <Col sm="12" className="mb-3">
                              <h6>Email</h6>
                              <p className="text-muted">{userInfo.email}</p>
                            </Col>
                            <Col sm="6" className="mb-3">
                              <h6>Phone</h6>
                              <p className="text-muted">{userInfo.phone}</p>
                            </Col>
                          </Row>

                          <hr className="mt-0 mb-4" />
                          <Row className="pt-1">
                            <Col sm="8" className="mb-3">
                              <h6>Dob</h6>
                              <p className="text-muted">{userInfo.dob}</p>
                            </Col>
                            <Col sm="4" className="mb-3">
                              <h6>Gender</h6>
                              <p className="text-muted">{userInfo.gender}</p>
                            </Col>
                          </Row>

                          <hr className="mt-0 mb-4" />
                          <Row className="pt-1">
                            <Col sm="8" className="mb-3">
                              <a className="text-muted">
                                Manual group: ({userInfo.countCommonGroup})
                              </a>
                            </Col>
                          </Row>
                          <div className="d-flex justify-content-start">
                            <a href="#!">
                              <i className="fab fa-facebook me-3 text-black-50"></i>
                            </a>
                            <a href="#!">
                              <i className="fab fa-twitter me-3"></i>
                            </a>
                            <a href="#!">
                              <i className="fab fa-instagram me-3"></i>
                            </a>
                          </div>
                        </Card.Body>
                      ) : (
                        <>
                          <h5>Danh sách thành viên</h5>
                          {userInfo.members.map((member, index) => (
                            <Card className="mb-3 p-2" key={index}>
                              <Row className="g-0 d-flex align-items-center">
                                <Col
                                  sm="3"
                                  className="text-center d-flex align-items-center justify-content-center"
                                >
                                  <Image
                                    src={member.photoURL}
                                    alt="Avatar"
                                    style={{
                                      width: "50px",
                                      height: "50px",
                                      borderRadius: "50%",
                                    }}
                                    fluid
                                  />
                                </Col>
                                <Col sm="6">
                                  <h6 className="mb-1">{member.displayName}</h6>
                                  <p
                                    className="text-muted mb-0 "
                                    style={{ fontSize: "12px" }}
                                  >
                                    {member.roles}
                                  </p>
                                </Col>
                                <Col sm="3">
                                  {member.roles != "owner" &&
                                    user.ownerId ===
                                      JSON.parse(
                                        localStorage.getItem("userId")
                                      ) && (
                                      <div className="d-flex flex-column justify-content-center">
                                        <Button
                                          variant="danger"
                                          onClick={() =>
                                            handleRemove(member.id)
                                          }
                                          className="font-weight-bold text-uppercase px-3 me-2 text-white"
                                          style={{
                                            fontSize: "10px",
                                            marginBottom: "5px",
                                          }}
                                        >
                                          kick
                                        </Button>
                                        <Button
                                          variant="primary"
                                          onClick={() =>
                                            handleSetAdmin(member.id)
                                          }
                                          className="font-weight-bold text-uppercase px-3 me-2 text-white"
                                          style={{ fontSize: "10px" }}
                                        >
                                          set admin
                                        </Button>
                                      </div>
                                    )}
                                </Col>
                              </Row>
                            </Card>
                          ))}
                        </>
                      )}
                    </Col>
                  </Row>
                </Card>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={show2} onHide={handleClose2}>
        <Modal.Header closeButton>
          <Modal.Title>FRIENDS</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container fluid>
            {/* <Thumb>
    <ImageSidebarStyled2 src="https://i.imgur.com/rsJjBcH.png" rounded></ImageSidebarStyled2>
    <Icon src={icons.camera} rounded></Icon>
    </Thumb> */}
            <Row className="justify-content-center align-items-center h-100 w-100 d-flex">
              <Col lg="6" className="mb-4 mb-lg-0 w-100">
                <Card className="mb-3" style={{ borderRadius: ".5rem" }}>
                  {userInfo2.map((user, index) => (
                    <Row className="g-0 p-2" key={index}>
                      <Col
                        lg="2"
                        className="d-flex justify-content-center align-items-center"
                      >
                        <Image
                          src={user.photoURL}
                          style={{ width: "50px", height: "50px" }}
                          roundedCircle
                        />
                      </Col>
                      <Col lg="8">
                        <Card.Body>
                          <Card.Text>{user.displayName}</Card.Text>
                        </Card.Body>
                      </Col>
                      <Col
                        lg="2"
                        className="d-flex justify-content-center align-items-center"
                      >
                        <Button
                          variant="primary"
                          disabled={forwarded.includes(index)}
                          onClick={() => handleInvite(user, index)}
                        >
                          {forwarded.includes(index) ? "invited" : "invite"}
                        </Button>
                      </Col>
                    </Row>
                  ))}
                </Card>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose2}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

const ImageSidebarStyled = styled(Image)`
width: 50px;
height: 50px;
margin: 0 15px;
`;

const DivImage = styled.div`
  max-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3px 0 3px 0;
`;
const StyledListGroupItem = styled(ListGroup.Item)`
border-radius:10px;
&:hover {
 background-color: 	#D3D3D3;
}
`
export default Header;
