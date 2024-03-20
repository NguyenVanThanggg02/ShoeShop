import axios from "axios";
import { BreadCrumb } from "primereact/breadcrumb";
import { Button } from "primereact/button";
import { Galleria } from "primereact/galleria";
import { Image } from "primereact/image";
import { InputText } from "primereact/inputtext";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import { listToast } from "../constants";
import { setToast } from "../redux/features";
import Comments from "./Comments";

const Detail = () => {
  const [value, setValue] = useState(1);
  const [images, setImages] = useState([]);
  const [products, setProducts] = useState({});
  const [sizes, setSizes] = useState([]);
  const { pid } = useParams();
  const dispatch = useDispatch();

  const user = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    fetch("http://localhost:9999/products/" + pid)
      .then((resp) => resp.json())
      .then((data) => {
        setProducts(data);
      });
  }, [pid]);


  useEffect(() => {
    axios.get(`http://localhost:9999/sizes/${pid}`).then((res) => {
      setSizes(res.data);
    });
  }, [pid]);
  useEffect(() => {
    axios.get(`http://localhost:9999/images/${pid}`).then((res) => {
      setImages(res.data);
    });
  }, [pid]);

  const items = [
    { label: "List Products", url: "http://localhost:3000/listproduct" },
    { label: products.name },
  ];
  const home = { icon: "pi pi-home", url: "http://localhost:3000/" };
  const responsiveOptions = [
    {
      breakpoint: "991px",
      numVisible: 4,
    },
    {
      breakpoint: "767px",
      numVisible: 3,
    },
    {
      breakpoint: "575px",
      numVisible: 1,
    },
  ];
  const [selectedButton, setSelectedButton] = useState(null);

  const handleButtonClick = (index) => {
    setSelectedButton(index);
  };
  const addToCart = () => {
    axios
      .post("http://localhost:9999/order/addToCart", {
        productId: pid,
        userId: user._id,
        price: products.price,
        quantity: value,
      })
      .then((response) => {
        if (response.data.success) {
          dispatch(
            setToast({ ...listToast[0], detail: "Product added to cart!!" })
          );
          console.log("Product added to cart!!");
        } else {
          console.error("Failed to add product");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  // const buttons = ["3.5 UK", "4 UK", "4.5 UK", "5 UK"];

  const itemTemplate = (item) => {
    return <img src={item.url} alt={item.caption} style={{ width: "100%" }} />;
  };

  const thumbnailTemplate = (item) => {
    return <img src={item.url} alt={item.caption} style={{ width: "50%" }} />;
  };
  const increaseQuantity = () => {
    setValue((prevValue) => prevValue + 1);
  };

  const decreaseQuantity = () => {
    if (value > 1) {
      setValue((prevValue) => prevValue - 1);
    }
  };

  const allSize = [38, 39, 40, 41, 42, 43, 44, 45];
  return (
    <div className="container" style={{ width: "95%", margin: "0 auto" }}>
      <div className=" w-full">
        <BreadCrumb model={items} home={home} />
      </div>
      <div className="card bg-color ">
        <div className="grid grid-form">
          <div className="col-6 lg:col-6  ">
            <Galleria
              value={images}
              responsiveOptions={responsiveOptions}
              numVisible={4}
              style={{ maxWidth: "640px" }}
              item={itemTemplate}
              thumbnail={thumbnailTemplate}
            />
          </div>
          <div className="col-6 lg:col-6  ">
            <h2 key={products._id}>{products.name}</h2>
            <div className=" ">
              <div className="text-4xl text-red-400 inline-block font-bold">
                {products.price}$
              </div>{" "}
              {/* <span className="line-through text-xl text-color inline-block">
                5.200.000₫
              </span>{" "}
              <div className=" font-bold text-white border-round w-4rem h-2rem m-2 bg-red-400 flex align-items-center justify-content-center">
                Sale
              </div> */}
            </div>
            {/* <div>
              <div className="grid grid-form">
                <div className="col-2 lg:col-2  ">
                  <img
                    class="img-responsive"
                    alt="ss"
                    src="//bizweb.dktcdn.net/100/455/315/themes/894917/assets/iamge_product2.png?1688607702821"
                  ></img>
                </div>
                <div className="col-10 lg:col-10  ">
                  <div className="font-bold">Miễn phí vận chuyển</div>
                  <div>Cho đơn hàng từ 499.000đ</div>
                </div>
              </div>
            </div> */}
            {/* <div>
              <div className="grid grid-form">
                <div className="col-2 lg:col-2  ">
                  <img
                    class="img-responsive"
                    alt="ss"
                    src="//bizweb.dktcdn.net/100/455/315/themes/894917/assets/iamge_product1.png?1688607702821"
                  ></img>
                </div>
                <div className="col-10 lg:col-10  ">
                  <div className="font-bold">Miễn phí đổi, sửa hàng</div>
                  <div>
                    Đổi hàng trong 30 ngày kể từ ngày mua Hỗ trợ sửa đồ miễn phí
                  </div>
                </div>
              </div>
            </div> */}
            <div className="mt-2">Quantity:</div>
            <div className="mt-2">
              <Button
                className=" bg-white text-green-600 h-4rem w-4rem border-round border-2 border-green-600"
                label="-"
                onClick={decreaseQuantity}
              />
              <InputText
                className="h-4rem w-4rem border-round border-2 border-green-600"
                style={{ textAlign: "center" }}
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
              <Button
                className=" bg-white text-green-600 h-4rem w-4rem border-round border-2 border-green-600"
                label="+"
                onClick={increaseQuantity}
              />
            </div>
            <div className="mt-2">Select Size</div>
            {/* <div className="mt-2">
                {sizes.map((sizes, index) => (
                  <div key={index}>
                    {sizes.sizes.map((sizeItem, sizeIndex) => (
                      <div key={sizeIndex} className="mr-2 inline-block">
                        <Button
                          className={` ${selectedButton === sizeIndex
                            ? "bg-green-600 text-white"
                            : "bg-white text-green-600 border-round border-1"
                            }`}
                          onClick={() => handleButtonClick(sizeIndex)}
                        >
                          <span>{sizeItem.size}</span>
                        </Button>
                      </div>
                    ))}
                  </div>
                ))}
              </div> */}

            <div className="mt-2">
              {sizes.map((sizesGroup, index) => (
                <div key={index}>
                  {allSize.map((size, sizeIndex) => {
                    // Kiểm tra nếu giá trị size tồn tại trong mảng sizeItem.size của sizesGroup
                    const isValidSize = sizesGroup.sizes.some(
                      (sizeItem) => sizeItem.size === size
                    );

                    // Xác định className dựa trên size hợp lệ
                    const buttonClasses = isValidSize
                      ? "bg-white text-green-600 border-round border-1"
                      : "bg-gray-200 text-gray-500 border-round border-1"; // Class cho nút không hợp lệ/làm mờ

                    return (
                      <div key={sizeIndex} className="mr-2 inline-block">
                        <Button
                          className={buttonClasses}
                          onClick={() => isValidSize && handleButtonClick(size)}
                          // Bạn có thể thêm logic onClick chỉ khi isValidSize là true
                        >
                          <span>{size}</span>
                        </Button>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
            <div className="mt-2">
              <Button
                className="bg-green-600 py-3"
                label="Add To Cart"
                onClick={addToCart}
                style={{ width: "20%", fontSize: "20px" }}
                icon="pi pi-check-square"
                size="large"
              />
            </div>
            <div className="mt-2">
              <Button
                className=" border-round border-2 bg-white text-green-600 border-green-600 py-3"
                style={{ width: "20%", fontSize: "20px" }}
                label="Check Out"
                icon="pi pi-shopping-cart"
                size="large"
              />
            </div>
            <div className="mt-2">
              <p style={{ fontSize: "25px" }}>{products.description}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="comments ">
        <Comments />
      </div>
      <div className="card">
        <div className="text-4xl font-bold mt-2">Sản phẩm tương tự</div>
        <div className="mt-2">
          <div className="flex justify-content-center">
            <div className="m-2 border-round-md">
              <Image
                className="border-round-md"
                src="https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/798d3061f5934cd1983bade800a7f2dd_9366/GIAY_ULTRABOOST_22_trang_GX5595_01_standard.jpg"
                alt="Image"
                width="210"
                preview
              />
              <div className="font-bold text-base">GIÀY ULTRABOOST 22</div>
              <div className="text-xl text-red-400 inline-block font-bold">
                2.600.000₫
              </div>{" "}
              <span className="line-through text-base text-color inline-block">
                5.200.000₫
              </span>{" "}
            </div>
            <div className="m-2 border-round-md">
              <Image
                className="border-round-md"
                src="https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/798d3061f5934cd1983bade800a7f2dd_9366/GIAY_ULTRABOOST_22_trang_GX5595_01_standard.jpg"
                alt="Image"
                width="210"
                preview
              />
              <div className="font-bold text-base">GIÀY ULTRABOOST 22</div>
              <div className="text-xl text-red-400 inline-block font-bold">
                2.600.000₫
              </div>{" "}
              <span className="line-through text-base text-color inline-block">
                5.200.000₫
              </span>{" "}
            </div>
            <div className="m-2 border-round-md">
              <Image
                className="border-round-md"
                src="https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/798d3061f5934cd1983bade800a7f2dd_9366/GIAY_ULTRABOOST_22_trang_GX5595_01_standard.jpg"
                alt="Image"
                width="210"
                preview
              />
              <div className="font-bold text-base">GIÀY ULTRABOOST 22</div>
              <div className="text-xl text-red-400 inline-block font-bold">
                2.600.000₫
              </div>{" "}
              <span className="line-through text-base text-color inline-block">
                5.200.000₫
              </span>{" "}
            </div>
            <div className="m-2 border-round-md">
              <Image
                className="border-round-md"
                src="https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/798d3061f5934cd1983bade800a7f2dd_9366/GIAY_ULTRABOOST_22_trang_GX5595_01_standard.jpg"
                alt="Image"
                width="210"
                preview
              />
              <div className="font-bold text-base">GIÀY ULTRABOOST 22</div>
              <div className="text-xl text-red-400 inline-block font-bold">
                2.600.000₫
              </div>{" "}
              <span className="line-through text-base text-color inline-block">
                5.200.000₫
              </span>{" "}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
