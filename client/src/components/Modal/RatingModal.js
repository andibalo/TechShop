import React, { useState } from "react";
import { Modal, Button } from "antd";
import { toast } from "react-toastify";
import { StarOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

const RatingModal = ({ children, submitRating }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const { user } = useSelector((state) => ({ ...state }));

  const history = useHistory();
  const { slug } = useParams();

  const handleModal = () => {
    if (user && user.token) {
      setModalVisible(true);

      return;
    }

    history.push({
      pathname: "/login",
      state: {
        from: `/product/${slug}`,
      },
    });
  };

  return (
    <>
      <div onClick={(e) => handleModal()}>
        <StarOutlined className="text-primary" />
        <br />
        {user ? "Rate" : "Login To Rate"}
      </div>
      <Modal
        title="Leave a rating"
        visible={modalVisible}
        centered
        onOk={() => {
          submitRating();
          setModalVisible(false);

          toast.success("Thank you for your review.");
        }}
        onCancel={() => {
          setModalVisible(false);
        }}
      >
        {children}
      </Modal>
    </>
  );
};

export default RatingModal;
