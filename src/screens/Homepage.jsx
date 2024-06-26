import { Button } from "primereact/button";
import React, { useEffect, useState } from "react";
import { Container, Image } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import banner1 from "../assets/images/banner1.png";
import banner2 from "../assets/images/banner2.png";
import banner3 from "../assets/images/banner3.png";
import banner4 from "../assets/images/banner4.png";
import banner5 from "../assets/images/Black-Friday-Facebook-cover-Banner-07.jpg";
import blog from "../assets/images/blog.jpg";
import blen from "../assets/images/blen.jpg";
import adidas from "../assets/images/adidas.jpg";
import filter3 from "../assets/images/filterKid.jpg";
import filter1 from "../assets/images/filterMan.jpg";
import filter2 from "../assets/images/filterWoman.jpg";
import shoe from "../assets/images/z4998921239665_57d2527a702bef236df303bacb0939d9-300x300.jpg";
import BannerComponent from "../components/BannerComponent";
import "../styles/Homepage.css";
import axios from "axios";

const Homepage = () => {
  const [topProduct, setTopProduct] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:9999/products")
      .then((response) => {
        // Sắp xếp dữ liệu theo createdAt
        const sortedProducts = response.data.sort((a, b) => {
          const dateA = new Date(a.updatedAt);
          const dateB = new Date(b.updatedAt);
          return dateB - dateA;
        });

        const latestProducts = sortedProducts.slice(0, 4);

        setTopProduct(latestProducts);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const onClick = (category) => {
    if ((category = "man")) {
      navigate("/listproduct");
    }
    if ((category = "women")) {
      navigate("/listproduct");
    }
    if ((category = "kid")) {
      navigate("/listproduct");
    }
  };
  const onToggle = (id) => {};
  return (
    <Container fluid style={{ paddingTop: "15px", marginRight: "0" }}>
      <BannerComponent
        arrImages={[banner3, banner4, banner5, banner2, banner1]}
      />
      <Container>
        <div
          className="grid mt-2 surface-ground p-3 surface-0 shadow-2"
          style={{ margin: 0 }}
        >
          <div className="col-4 flex flex-column align-items-center justify-content-center">
            <Image
              className="border-round-md"
              src={filter1}
              alt="man"
              height="300"
            />

            <Button
              className="mt-3 surface-0 text-2xl text-blue-700 w-8rem"
              label="Man"
              rounded
              onClick={onClick}
            />
          </div>
          <div className="col-4 flex flex-column align-items-center justify-content-center">
            <Image
              className="border-round-md"
              src={filter2}
              alt="women"
              height="300"
            />

            <Button
              className="mt-3 surface-0 text-2xl text-blue-700 w-8rem"
              label="Woman"
              rounded
              onClick={onClick}
            />
          </div>
          <div className="col-4 flex flex-column align-items-center justify-content-center">
            <Image
              className="border-round-md"
              src={filter3}
              alt="kid"
              height="300"
            />

            <Button
              className="mt-3 surface-0 text-2xl text-blue-700 w-8rem"
              label="Kid"
              rounded
              onClick={onClick}
            />
          </div>
        </div>

        <div className="pt-5 pb-5">
          <h1 className="text-center">New Product</h1>
          <div className="grid mt-2 surface-ground p-3 surface-0 shadow-2">
            {topProduct.map((p) => (
              <div
                key={p._id}
                className="col-3 flex align-items-center justify-content-center"
              >
                <div className="m-2 border-round-md">
                  <Image
                    className="border-round-md"
                    src={p.images[0].url}
                    alt="Image"
                    width="280"
                    preview
                  />
                  <Link
                    to={`/detail/${p._id}`}
                    style={{ textDecoration: "none" }}
                  >
                    <div
                      className="font-bold text-base"
                      style={{ color: "black" }}
                    >
                      {p.name}
                    </div>
                    <div className="text-xl text-red-400 inline-block font-bold">
                      {p.price * 0.5}$
                    </div>{" "}
                    <span className="line-through text-base text-color inline-block">
                      {p.price}$
                    </span>{" "}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-5 pb-5">
          <h1 className="text-center">Best Product</h1>
          <div className="grid mt-2 surface-ground p-3 surface-0 shadow-2">
            <div className="col-3 flex align-items-center justify-content-center">
              <Link to={"/detail"} style={{ textDecoration: "none" }}>
                <div class="card">
                  <Image
                    className="border-round-md"
                    src={shoe}
                    alt="Image"
                    width="280"
                  />

                  <div class="card-body">
                    <p
                      class="card-text"
                      style={{ fontSize: "1.5rem", textAlign: "center" }}
                    >
                      Adidas 8681 Shoe Shoe
                    </p>
                  </div>
                </div>
              </Link>
            </div>
            <div className="col-3 flex align-items-center justify-content-center">
              <Link to={"/detail"} style={{ textDecoration: "none" }}>
                <div class="card">
                  <Image
                    className="border-round-md"
                    src={shoe}
                    alt="Image"
                    width="280"
                  />
                  <div class="card-body">
                    <p
                      class="card-text"
                      style={{ fontSize: "1.5rem", textAlign: "center" }}
                    >
                      Adidas 8681 Shoe Shoe
                    </p>
                  </div>
                </div>
              </Link>
            </div>
            <div className="col-3 flex align-items-center justify-content-center">
              <Link to={"/detail"} style={{ textDecoration: "none" }}>
                <div class="card">
                  <Image
                    className="border-round-md"
                    src={shoe}
                    alt="Image"
                    width="280"
                  />
                  <div class="card-body">
                    <p
                      class="card-text"
                      style={{ fontSize: "1.5rem", textAlign: "center" }}
                    >
                      Adidas 8681 Shoe Shoe
                    </p>
                  </div>
                </div>
              </Link>
            </div>
            <div className="col-3 flex align-items-center justify-content-center">
              <Link to={"/detail"} style={{ textDecoration: "none" }}>
                <div class="card">
                  <Image
                    className="border-round-md"
                    src={shoe}
                    alt="Image"
                    width="280"
                  />
                  <div class="card-body">
                    <p
                      class="card-text"
                      style={{ fontSize: "1.5rem", textAlign: "center" }}
                    >
                      Adidas 8681 Shoe Shoe
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
        <div className="pt-5 pb-5">
          <h1 className="text-center">Blogs</h1>
          <div
            className="grid mt-2 surface-ground p-3 surface-0 shadow-2"
            style={{ margin: 0 }}
          >
            <div className="col-4 flex align-items-center justify-content-center">
              <Link to={"/blog"}>
                <Image
                  className="border-round-md"
                  src={blog}
                  width="350"
                  alt="filter"
                />

                <div
                  className="content_blog"
                  style={{
                    height: "200px",
                    width: "300px",
                    backgroundColor: "#F7F9F9",
                    position: "absolute",
                    top: "10%",
                    left: "12%",
                    fontSize: "1.3em",
                    border: "none",
                    opacity: "0.9",
                  }}
                >
                  <h3 className="text-center pt-3">Never Done Skateboarding</h3>
                  <p className="text-center pt-1">BY ADMIN | DEC 01, 2017</p>
                  <a href="/blog" style={{ color: "red" }}>
                    <p className="text-center">Read more</p>
                  </a>
                </div>
              </Link>
            </div>
            <div className="col-4 flex align-items-center justify-content-center">
              <Link to={"/blog"}>
                <Image
                  className="border-round-md"
                  src={blen}
                  width="350"
                  alt="filter"
                />

                <div
                  className="content_blog"
                  style={{
                    height: "200px",
                    width: "300px",
                    backgroundColor: "#F7F9F9",
                    position: "absolute",
                    top: "10%",
                    left: "12%",
                    fontSize: "1.3em",
                    border: "none",
                    opacity: "0.9",
                  }}
                >
                  <h3 className="text-center pt-3">Never Done Skateboarding</h3>
                  <p className="text-center pt-1">BY ADMIN | DEC 01, 2017</p>
                  <a href="/blog" style={{ color: "red" }}>
                    <p className="text-center">Read more</p>
                  </a>
                </div>
              </Link>
            </div>
            <div className="col-4 flex align-items-center justify-content-center">
              <Link to={"/blog"}>
                <Image
                  className="border-round-md"
                  src={adidas}
                  width="350"
                  alt="filter"
                />

                <div
                  className="content_blog"
                  style={{
                    height: "200px",
                    width: "300px",
                    backgroundColor: "#F7F9F9",
                    position: "absolute",
                    top: "10%",
                    left: "12%",
                    fontSize: "1.3em",
                    border: "none",
                    opacity: "0.9",
                  }}
                >
                  <h3 className="text-center pt-3">Never Done Skateboarding</h3>
                  <p className="text-center pt-1">BY ADMIN | DEC 01, 2017</p>
                  <a href="/blog" style={{ color: "red" }}>
                    <p className="text-center">Read more</p>
                  </a>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </Container>
  );
};

export default Homepage;
