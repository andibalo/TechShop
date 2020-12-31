import React, { useState, useEffect } from "react";
import AdminNav from "../../components/nav/AdminNav";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { Spin } from "antd";
import DatePicker from "react-datepicker";
import { DeleteOutlined } from "@ant-design/icons";
import { getCoupons, deleteCoupon, createCoupon } from "../../functions/coupon";
import "react-datepicker/dist/react-datepicker.css";

const CreateCoupon = (props) => {
  const [name, setName] = useState("");
  const [discount, setDiscount] = useState(0);
  const [expiry, setExpiry] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const [coupons, setCoupons] = useState([]);
  const [getCouponEffect, setGetCouponEffect] = useState(false);
  const { user } = useSelector((state) => ({ ...state }));

  const loadCoupons = async () => {
    setLoading(true);
    try {
      const res = await getCoupons(user && user.token);
      //console.log(res.data);
      setCoupons(res.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCoupons();
  }, [getCouponEffect]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(name, discount, expiry);

    setLoading(true);
    try {
      const res = await createCoupon(user && user.token, {
        name,
        expiry,
        discount,
      });

      //console.log(res.data);
      setName("");
      setDiscount(0);
      setExpiry(new Date());
      setLoading(false);
      toast.success(`Coupon "${res.data.name}" has been created`);
      setGetCouponEffect(!getCouponEffect);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleRemove = async (couponId) => {
    if (window.confirm("Delete Coupon?")) {
      setLoading(true);
      try {
        const res = await deleteCoupon(user && user.token, couponId);

        //console.log(res.data);
        setGetCouponEffect(!getCouponEffect);
        toast.error(`Coupon "${res.data.name}" has been deleted`);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col-md-10">
          <Spin spinning={loading} tip="Loading..." size="large">
            <h4>Coupon</h4>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="text-muted">Name</label>
                <input
                  type="text"
                  className="form-control"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label className="text-muted">Discount %</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  className="form-control"
                  required
                  value={discount}
                  onChange={(e) => setDiscount(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label className="text-muted">Expiry</label>
                <br />
                <DatePicker
                  className="form-control"
                  selected={expiry}
                  value={expiry}
                  required
                  onChange={(date) => setExpiry(date)}
                />
              </div>
              <button type="submit" className="btn btn-outline-primary">
                Create Coupon
              </button>
            </form>
            <div className="mt-5">
              <h4>{coupons.length > 0 && coupons.length} Coupons</h4>

              <table className="table table-bordered">
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Expiry</th>
                    <th scope="col">Discount %</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {!loading &&
                    coupons.length > 0 &&
                    coupons.map((coupon) => (
                      <tr key={coupon._id}>
                        <td>{coupon.name}</td>
                        <td>{new Date(coupon.expiry).toLocaleDateString()}</td>
                        <td>{coupon.discount} %</td>
                        <td>
                          <DeleteOutlined
                            className="text-danger pointer"
                            onClick={() => handleRemove(coupon._id)}
                          />
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </Spin>
        </div>
      </div>
    </div>
  );
};

export default CreateCoupon;
