import axios from 'axios';
import { TabPanel, TabView } from 'primereact/tabview';
import React, { useEffect, useState } from 'react';
import { Image } from 'react-bootstrap';
import { Calendar2Check, ChatDotsFill, FileEarmarkText } from 'react-bootstrap-icons';
import { useDispatch } from 'react-redux';
import { listToast } from '../constants';
import { setToast } from '../redux/features';
import { BreadCrumb } from '../uiCore';

const Payment = () => {
    const items = [{ label: "Payment" }];
    const home = { icon: "pi pi-home", url: "http://localhost:3000/" };
    const [expiration, setExpiration] = useState('')
    const user = JSON.parse(localStorage.getItem("user"));
    const [totalPrice, setTotalPrice] = useState(0);
    const [order, setOder] = useState(null);
    const [orderDetail, setOrderDetail] = useState([]);
    const totalPriceVND = totalPrice * 24000
    const dispatch = useDispatch();
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
    }, []);
    const handlePay = (order) => {
        axios
            .post("http://localhost:9999/order/changStatusOrder", { orderId: order })
            .then((response) => {
                if (response.data.success) {
                    dispatch(
                        setToast({ ...listToast[0], detail: "Payment success!" })
                    );
                } else {
                    dispatch(
                        setToast({ ...listToast[1], detail: "Failed to pay!" })
                    );
                    console.error("Failed to pay!");
                }
            })
            .catch((error) => {
                console.error("Error:", error);
            })
    };
    return (
        <div className="container"
            style={{ paddingTop: "15px", paddingBottom: "20px" }}
        >
            <div className="m-2 mb-4 w-full">
                <BreadCrumb model={items} home={home} />
            </div>
            <div className="flex justify-content-center align-items-center w-full">
                <div className="grid w-8">
                    <div className="col-5 my-auto h-28rem w-26rem flex align-items-stretch justify-content-center border-round-xs"
                        style={{ backgroundColor: "#3fcc6c" }}>
                        <div className="grid align-items-center text-50 m-2 w-10">
                            <div style={{ fontFamily: "Courier New" }} className="w-full">
                                {
                                    orderDetail && orderDetail[0] ? (
                                        orderDetail.map((o) => {
                                            return (
                                                <div className='grid'>
                                                    <div className='col-7'>
                                                        <div>{o.name}</div>
                                                    </div>
                                                    <div className='col-5 text-right'>
                                                        <div className="ps-1">
                                                            {o.total_cost.toLocaleString("en-US", {
                                                                style: "currency",
                                                                currency: "USD",
                                                            })}
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    ) : null
                                }

                                <hr />
                                <div className="font-bold mb-4">
                                    <div className='text-right' >
                                        {totalPrice
                                            ? totalPrice.toLocaleString("en-US", {
                                                style: "currency",
                                                currency: "USD",
                                            })
                                            : 0}</div>
                                </div>
                                <div className="flex flex-column mb-4">
                                    <div className="ps-2">
                                        <FileEarmarkText />
                                        <div className='inline-block m-1'>Invoice ID :</div>
                                    </div>
                                    <span className="ps-3">SN8478042099</span>
                                </div>
                                <div className="flex flex-column mb-4">
                                    <div className="ps-2">
                                        <Calendar2Check />
                                        <div className='inline-block m-1'>
                                            Next payment :
                                        </div>
                                    </div>
                                    <span className="ps-3">22 July 2018</span>
                                </div>
                                <div >
                                    <div >
                                        <div>Customer Support:</div>
                                        <div>online chat 24/7</div>
                                    </div>
                                    <div className="inline-block rounded-circle"
                                        style={{ borderColor: "white" }}>
                                        <ChatDotsFill className="inline-block" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-7  flex flex-column align-items-stretch border-round-xs border-3 border-round surface-border"
                        style={{ fontFamily: "Garamond" }}>
                        <div className='text-2xl font-bold m-4'>
                            Payment methods
                        </div>
                        <TabView>
                            <TabPanel header="Credit Card">
                                <div className='m-2'>
                                    <div style={{ fontFamily: "Garamond" }} className='text-lg'>Credit Card</div>
                                    <div className="">
                                        <div className='relative'>
                                            <input className="form-control m-2 text-lg relative" style={{ fontFamily: "Garamond" }} type="text" value="5136 1845 5468 3894" ></input>
                                            <img
                                                style={{
                                                    position: "absolute",
                                                    height: "40px",
                                                    top: "10px",
                                                    right: 0,
                                                    display: "flex",
                                                    alignItems: "center",
                                                }}
                                                src="https://www.freepnglogos.com/uploads/mastercard-png/mastercard-logo-logok-15.png" alt="" />
                                        </div>
                                    </div>
                                </div>
                                <div className='grid m-1'>
                                    <div className='col'>
                                        <div style={{ fontFamily: "Garamond" }} className='text-lg'>Expiration Date</div>
                                        <div className="relative">
                                            <input
                                                type="month"
                                                className="form-control m-2 text-lg"
                                                style={{ fontFamily: "Garamond" }}
                                                value={expiration}
                                                onChange={e => setExpiration(e.target.value)} />
                                            {/* <i
                                                className="pi pi-calendar"
                                                style={{
                                                    fontSize: '1.5rem',
                                                    position: "absolute",
                                                    height: "40px",
                                                    top: "10px",
                                                    right: 0,
                                                    display: "flex",
                                                    alignItems: "center",
                                                }}>
                                            </i> */}
                                        </div>
                                    </div>
                                    <div className='col'>
                                        <div style={{ fontFamily: "Garamond" }} className='text-lg'>Code CVV</div>
                                        <div className="relative">
                                            <input type="password" className="form-control m-2 text-lg" style={{ fontFamily: "Garamond" }} value="123" />
                                            <i
                                                className="pi pi-lock"
                                                style={{
                                                    fontSize: '1.5rem',
                                                    position: "absolute",
                                                    height: "40px",
                                                    top: "10px",
                                                    right: 0,
                                                    display: "flex",
                                                    alignItems: "center",
                                                }}>
                                            </i>
                                        </div>
                                    </div>
                                </div>
                                <div className='m-2'>
                                    <div style={{ fontFamily: "Garamond" }} className='text-lg'>Name</div>
                                    <div className="">
                                        <input className="form-control m-2 uppercase text-lg" style={{ fontFamily: "Garamond" }} type="text" value="Vladimir Berezovkiy" />
                                        <div className="far fa-user"></div>
                                    </div>
                                </div>
                                <div className="flex flex-row flex-wrap">
                                    <input
                                        type="submit"
                                        value="Pay"
                                        className='flex align-items-center justify-content-center border-round-sm w-8rem h-3rem mx-auto text-white text-xl'
                                        style={{ backgroundColor: "#3fcc6c", borderColor: "#3fcc6c", fontFamily: "Garamond" }}
                                    />
                                </div>
                            </TabPanel>
                            <TabPanel header="Mobile Payment">
                                <div className='flex align-items-center justify-content-center h-10 mx-auto '>
                                    <Image style={{ height: "320px" }} className='h-10' src={`https://img.vietqr.io/image/BIDV-4270786850-compact2.png?amount=${totalPriceVND}&accountName=Doan%20Dac%2020Hau`}>

                                    </Image>
                                </div>
                                <div className="flex flex-row flex-wrap">
                                    <input
                                        type="submit"
                                        value="Pay"
                                        onClick={(e) => handlePay(order)}
                                        className='flex align-items-center justify-content-center border-round-sm w-8rem h-3rem mx-auto text-white text-xl'
                                        style={{ backgroundColor: "#3fcc6c", borderColor: "#3fcc6c", fontFamily: "Garamond" }}
                                    />
                                </div>
                                {/* <Image style={{height :"400px"}} src={`https://img.vietqr.io/image/BIDV-4270786850-compact2.png?amount=${totalPriceVND}&accountName=Doan%20Dac%2020Hau`}/> */}
                                {/* <image className='w-full' src={`https://img.vietqr.io/image/BIDV-4270786850-compact2.png?amount=${totalPriceVND}&accountName=Doan%20Dac%2020Hau`}/> */}
                            </TabPanel>
                            <TabPanel header="More">
                            </TabPanel>
                        </TabView>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Payment;