import Stack from "react-bootstrap/Stack";
import {
  Image,
  Container,
  Row,
  Col,
  Card,
  Form,
  FormControl,
  ListGroup,
  ListGroupItem,
} from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { icons } from "../../assets";
import Cookies from "js-cookie";
import axiosClient from "../../api/axiosClient";
import styled from "styled-components";
import { useState, useRef, useEffect } from "react";
import FriendItem from "./FriendItem";

const SearchBar = () => {
  const [show, setShow] = useState(false);
  const [showGroup, setShowGroup] = useState(false);
  const [previewAvatarGroup, setPreviewAvatarGroup] = useState();
  const [searchResults, setSearchResults] = useState({});
  const [checkedUserId, setCheckedUserId] = useState([]);
  const [groupName, setGroupName] = useState("");

  const [userInfo, setUserInfo] = useState({}); // eslint-disable-line no-unused-vars
  const [sent, setSent] = useState(false); // eslint-disable-line no-unused-vars
  const [isFriend, setIsFriend] = useState(false); // eslint-disable-line no-unused-vars
  const fileInputRef = useRef();
  const handleClose = () => {
    setShow(false);
  };

  const handleSearch = async (event) => {
    const searchTerm = event.target.value;
    if (searchTerm.length === 10) {
      try {
        const res = await axiosClient.post("/search-user", { searchTerm });
        if (res.status === 200) {
          const userData = res.data.data;
          setUserInfo(userData);
          console.log("userData", userData);
          console.log("userInfo", userInfo);
          if (userData.isFriend) setIsFriend(true);
          else if (userData.sent) setSent(true);
          else {
            setIsFriend(false);
            setSent(false);
          }
          setShow(true);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };
  const handleAddFriend = async () => {
    const res = await axiosClient.post("/add-friend", { userInfo });
    if (res.status === 200) {
      console.log("Add friend success");
      setSent(true);
    }
  };

  const handleAddGroupModal = () => {
    setShowGroup(true);
  };

  const handleCloseGroupModal = () => setShowGroup(false);

  const triggerFileSelectPopup = () => fileInputRef.current.click();

  const handleAvatarChange = (event) => {
    console.log(event.target.files);

    if (event.target.files && event.target.files.length > 0) {
      const newFiles = event.target.files[0];
      // console.log(newFiles);
      setPreviewAvatarGroup(newFiles);
    }
  };

  const handleChangeGroupName = (event) => {
    setGroupName(event.target.value);
    console.log(groupName);
  };

  const handleSubmitGroup = async (event) => {
    event.preventDefault();
    if (event.target.media.length > 0) {
      const formData = new FormData();
      // files.forEach((file) => {
      //     formData.append('media', media);
      // });
      formData.append("name", groupName);
      formData.append("groupAvatar", event.target.media);
      // const res = await axiosClient.post(process.env.REACT_APP_API_URL+'/api/send-media', formData, {
      //     headers: {
      //         'Content-Type': 'multipart/form-data',
      //         'Authorization': Cookies.get('authToken')
      //     }
      // });
      console.log(formData.get("groupAvatar"));
    }
  };

  const handleFriendItemCheck = (userId, isChecked) => {
    if (isChecked) {
      setCheckedUserId((prevUserIds) => [...prevUserIds, userId]);
    } else {
      setCheckedUserId((prevUserIds) =>
        prevUserIds.filter((item) => item !== userId)
      );
    }
  };

  const dataFriendFake = [
    {
      userId: 1,
      userName: "Tú Uyên",
      avatar: "https://i.imgur.com/rsJjBcH.png",
    },
    {
      userId: 2,
      userName: "Tú Uyên",
      avatar: "https://i.imgur.com/rsJjBcH.png",
    },
    {
      userId: 3,
      userName: "Tú Uyên",
      avatar: "https://i.imgur.com/rsJjBcH.png",
    },
  ];

  return (
    <>
      <Stack direction="horizontal" gap={1} className="p-3">
        <div>
          <Image src={icons.search} style={{ width: "25px", height: "25px" }} />
        </div>
        <Form.Control
          className="flex-grow-1 border-0"
          placeholder="Search..."
          onChange={handleSearch}
        />
        <div className="p-1">
          <Image
            src={icons.addFriend}
            style={{ width: "22px", height: "22px" }}
          />
        </div>
        <div className="p-1" onClick={handleAddGroupModal}>
          <Image
            src={icons.addGroup}
            style={{ width: "25px", height: "25px" }}
          />
        </div>
      </Stack>
      <Modal show={show} onHide={handleClose}>
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
                      className="gradient-custom text-center px-0"
                      style={{
                        borderTopLeftRadius: ".5rem",
                        borderBottomLeftRadius: ".5rem",
                      }}
                    >
                      <Image
                        src={userInfo.avatar}
                        alt="Avatar"
                        className="my-4"
                        style={{ width: "80px", cursor: "pointer" }}
                        fluid
                      />
                      <div className="d-flex flex-column justify-content-between  align-items-center">
                        <h5>{userInfo.name}</h5>
                        <Button
                          style={{
                            backgroundColor: "",
                            transition: "all 0.3s ease",
                            ":hover": {
                              backgroundColor: "#9E9E9E",
                              opacity: "1",
                            },
                          }}
                          className="d-flex justify-content-evenly w-75 align-items-center m-2"
                          onClick={!isFriend || !sent ? handleAddFriend : null}
                          disabled={isFriend || sent}
                        >
                          <span className="text-white">
                            {isFriend ? "Friend" : sent ? "Sent" : "Add friend"}
                          </span>
                        </Button>
                      </div>
                    </Col>
                    <Col md="8">
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

                        <div className="d-flex justify-content-start">
                          <a href="#!">
                            <i className="fab fa-facebook me-3"></i>
                          </a>
                          <a href="#!">
                            <i className="fab fa-twitter me-3"></i>
                          </a>
                          <a href="#!">
                            <i className="fab fa-instagram me-3"></i>
                          </a>
                        </div>
                      </Card.Body>
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
      {/*  Model add group */}
      <Modal show={showGroup} onHide={handleCloseGroupModal}>
        <Form onSubmit={handleSubmitGroup} encType="multipart/form-data">
          <Modal.Header closeButton>
            <Modal.Title>Tạo nhóm mới</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Container fluid>
              <Row className="justify-content-center align-items-center h-100 w-100 d-flex mb-3">
                <Col lg="2" className="mb-4 mb-lg-0">
                  <Image
                    className="mx-2"
                    // src={icons.image}
                    src={
                      (previewAvatarGroup &&
                        URL.createObjectURL(previewAvatarGroup)) ||
                      icons.image
                    }
                    style={{ width: "40px", height: "40px" }}
                    onClick={triggerFileSelectPopup}
                  />

                  <input
                    type="file"
                    name="media"
                    id="media"
                    accept="image/*"
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    onChange={handleAvatarChange}
                  />
                </Col>
                <Col lg="10">
                  <Form.Control
                    className="flex-grow-1 border-0 fw-bold "
                    name="groupName"
                    onChange={handleChangeGroupName}
                    placeholder="Nhập tên nhóm"
                    style={{ fontSize: "17px" }}
                  />
                </Col>
              </Row>
              <Row className="mb-3">
                <FormControl
                  type="text"
                  placeholder="Nhập số điện thoại thành viên"
                  onChange={handleSearch}
                />
              </Row>
              <Row>
                <Col lg="12">
                  <StyledListGroup>
                    {/* Đổ api get all friend vào đây  */}
                    {dataFriendFake.map((friend, index) => (
                      <FriendItem
                        friend={friend}
                        key={friend.userId}
                        index={index}
                        onCheck={handleFriendItemCheck}
                      />
                    ))}
                   
                  </StyledListGroup>
                </Col>
                {/* Tạm tắt feature này để update sau  */}
                {/* <Col lg='4'>
                Đây sẽ chứa các user đã được chọn để tạo nhóm
                <StyledListGroup>
                  <StyledListGroupItem
                      className="d-flex justify-content-between align-items-start border-0 px-2 py-3"
                        action
                        onClick={console.log(123)}
                      >
                        a</StyledListGroupItem>
                </StyledListGroup>
              </Col> */}
              </Row>
            </Container>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" type="submit">
              Tạo nhóm
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};
const StyledListGroup = styled(ListGroup)`
  max-height: 60vh;
  overflow-y: auto;
  border-radius: 0;
  scrollbar-width: thin;
  scrollbar-track-color: transparent;
  scrollbar-color: #dedede transparent;
  scroll-behavior: smooth;
`;

export default SearchBar;
