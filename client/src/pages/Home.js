import React, { useEffect, useState } from "react";
import NewArrivals from "../components/home/NewArrivals";
import BestSellers from "../components/home/BestSellers";

const Home = (props) => {
  return (
    <>
      <div className="jumbotron">Home</div>

      <div className="container">
        <h4 className="text-center display-2">New Arrivals</h4>
        <NewArrivals />
        <h4 className="text-center display-2">Best Sellers</h4>
        <BestSellers />
      </div>
    </>
  );
};

export default Home;
