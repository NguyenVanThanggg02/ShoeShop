import { Button } from "primereact/button";
import React from "react";
import { Container, Image } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import banner1 from "../assets/images/banner1.png";
import banner2 from "../assets/images/banner2.png";
import banner3 from "../assets/images/banner3.png";
import banner4 from "../assets/images/banner4.png";
import banner5 from "../assets/images/Black-Friday-Facebook-cover-Banner-07.jpg";
import blog from "../assets/images/blog.jpg";
import filter3 from "../assets/images/filterKid.jpg";
import filter1 from "../assets/images/filterMan.jpg";
import filter2 from "../assets/images/filterWoman.jpg";
import shoe from "../assets/images/z4998921239665_57d2527a702bef236df303bacb0939d9-300x300.jpg";
import BannerComponent from "../components/BannerComponent";
import "../styles/Homepage.css";

const Homepage = () => {
  const navigate = useNavigate();
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
  const onToggle = (id) => {
    
  };
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
            </div>
            <div className="col-4 flex align-items-center justify-content-center">
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
            </div>
            <div className="col-4 flex align-items-center justify-content-center">
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
            </div>
          </div>
        </div>
      </Container>
    </Container>
  );
};

export default Homepage;
