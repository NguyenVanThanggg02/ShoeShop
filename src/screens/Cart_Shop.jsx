import axios from "axios";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { listToast } from "../constants";
import { setToast } from "../redux/features";
const ConfirmDialog = (props) => {
  const { visible, setVisible, id } = props;
  const onHide = () => {
    setVisible(false);
  };
  const dispatch = useDispatch();
  const onConfirm = () => {
    axios
      .post("http://localhost:9999/order_detail/delOrderDetail", {
        detailId: id,
      })
      .then((res) => {
        if (res.data.success) {
          dispatch(
            setToast({ ...listToast[0], detail: `Delete successfully!` })
          );
        } else {
          dispatch(
            setToast({
              ...listToast[1],
              detail: `Failed to delete order detail!`,
            })
          );
        }
      })
      .catch((error) => {
        dispatch(setToast({ ...listToast[2], detail: `${error}!` }));
      })
      .then((e) => {
        setVisible(false);
      });
  };
  return (
    <Dialog
      header="Confirm Delete"
      visible={visible}
      style={{ width: "50vw" }}
      onHide={onHide}
      footer={
        <div>
          <Button
            label="Cancel"
            icon="pi pi-times"
            onClick={onHide}
            className="p-button-text text-white bg-red-500"
          />
          <Button
            className=""
            label="Confirm"
            icon="pi pi-check"
            onClick={onConfirm}
            autoFocus
          />
        </div>
      }
    >
      <div>Are you sure you want to delete this order detail?</div>
    </Dialog>
  );
};
const CartShop = (props) => {
  const { visible, setVisible } = props;
  const user = JSON.parse(localStorage.getItem("user"));
  const [totalPrice, setTotalPrice] = useState(0);
  const [value, setValue] = useState(1);
  const [order, setOder] = useState(null);
  const [orderDetail, setOrderDetail] = useState([]);
  const [visibleDialog, setVisibleDialog] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    fetch(`http://localhost:9999/order/getOrderDetail?userId=${user._id}`, {
      userId: user._id,
    })
      .then((resp) => resp.json())
      .then((data) => {
        setOrderDetail(data.data);
        setTotalPrice(data.total_cost);
        setOder(data.id);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [visibleDialog]);

  const increaseQuantity = () => {
    setValue((prevValue) => prevValue + 1);
  };

  const decreaseQuantity = () => {
    if (value > 1) {
      setValue((prevValue) => prevValue - 1);
    }
  };
  const onHide = () => {
    setVisible(false);
  };
  return (
    <Dialog
      header="Shopping Cart"
      visible={visible}
      style={{ width: "70vw" }}
      modal
      onHide={onHide}
      // footer={dialogFooter}
    >
      <div className="flex flex-column">
        <div className="card">
          {orderDetail && orderDetail[0] ? (
            orderDetail.map((o) => {
              return (
                <div className="flex align-items-center justify-content-center m-auto card w-11 surface-200 mt-4">
                  <div className="formgrid grid w-full">
                    <div className="field col-6 my-auto">
                      <div className="formgrid grid my-auto">
                        <div className="field col-4 flex my-auto ">
                          <img
                            src={o.image}
                            className="flex align-items-center justify-content-center img-fluid rounded-3 m-auto"
                            alt="Cotton T-shirt"
                            style={{ width: "70%" }}
                          />
                        </div>
                        <div className="field col-8 font-bold m-auto">
                          <div className="w-full mb-3">{o.name}</div>
                          <div>
                            <div className=" mb-3">Size: {o.size} </div>
                            <div className=" mb-3">Color: Grey</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="field col-3 my-auto">
                      <div className="mt-2">
                        {/* <Button
                          className=" bg-white text-green-600 h-4rem w-4rem border-round border-2 border-200"
                          label="-"
                          onClick={decreaseQuantity}
                        /> */}
                        <InputText
                          className="h-4rem w-4rem border-round border-2 border-200 mx-2"
                          style={{ textAlign: "center" }}
                          value={o.quantity}
                          onChange={(e) => setValue(e.target.value)}
                        />
                        {/* <Button
                          className=" bg-white text-green-600 h-4rem w-4rem border-round border-2 border-200"
                          label="+"
                          onClick={increaseQuantity}
                        /> */}
                      </div>
                    </div>
                    <div className="field col-3 my-auto">
                      <div className="formgrid grid">
                        <div className="field col-7 my-auto">
                          <div className="my-auto inline-block">
                            <h3 className="my-auto">
                              {o.total_cost.toLocaleString("en-US", {
                                style: "currency",
                                currency: "USD",
                              })}
                            </h3>
                          </div>
                        </div>
                        <div className="field col-5 my-auto">
                          <div className="ml-6 my-auto inline-block">
                            <Button
                              className="my-auto bg-red-500"
                              label="x"
                              onClick={(e) => setVisibleDialog(true)}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {visibleDialog === true && (
                    <ConfirmDialog
                      visible={visibleDialog}
                      setVisible={setVisibleDialog}
                      id={o._id}
                    />
                  )}
                </div>
              );
            })
          ) : (
            <div className="text-center font-bold text-3xl">Cart is empty</div>
          )}
          <div className="flex align-items-center justify-content-center m-auto card w-11 surface-200 mt-4">
            <div>
              Total:{" "}
              {totalPrice
                ? totalPrice.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })
                : 0}
            </div>
            <div></div>
          </div>
          <div className="flex align-items-center justify-content-center m-auto card w-3  mt-4">
            <Button
              className="w-full"
              label="Pay"
              onClick={(e) => navigate("/payment")}
            />
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default CartShop;
