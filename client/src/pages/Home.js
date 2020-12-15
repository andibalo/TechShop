import React, { useEffect, useState } from "react";
import NewArrivals from "../components/home/NewArrivals";
import BestSellers from "../components/home/BestSellers";
import CategoryList from "../components/category/CategoryList";
import SubcategoryList from "../components/subcategory/SubcategoryList";

const Home = (props) => {
  return (
    <>
      <div className="jumbotron">Home</div>

      <div className="container">
        <h4 className="text-center display-2">New Arrivals</h4>
        <NewArrivals />
        <h4 className="text-center display-2">Best Sellers</h4>
        <BestSellers />
        <h4 className="text-center display-2">Categories</h4>
        <CategoryList />
        <h4 className="text-center display-2">Subcategories</h4>
        <SubcategoryList />
      </div>
    </>
  );
};

export default Home;
