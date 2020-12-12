import React from "react";
import { Card, Skeleton } from "antd";

const LoadingCard = ({ count }) => {
  const cards = () => {
    let cardsArray = [];

    for (let index = 0; index < count; index++) {
      cardsArray.push(
        <Card className="col-md-4" style={{ height: "445px" }}>
          <Skeleton active></Skeleton>
        </Card>
      );
    }

    return cardsArray;
  };

  return <div className="row py-5">{cards()}</div>;
};

export default LoadingCard;
