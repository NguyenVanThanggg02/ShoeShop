import { Card, Grid, styled, useTheme } from "@mui/material";
import { TabPanel, TabView } from "primereact/tabview";
import React, { Fragment, useState } from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../../../assets/images/logoooo.png";
import MenuBar from "../../../components/MenuBar";
import DoughnutChart from "../shared/Doughnut";
import StatCards from "../shared/StatCards";
import StatCards2 from "../shared/StatCards2";
import TopSellingTable from "../shared/TopSellingTable";
import RevenueChart from "./Chart/RevenueChart.js";
import OrderManage from "./OrdersManage";
import ProductManage from "./ProductManage";
import UserManage from "./UserManage";
const ContentBox = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
}));

const Title = styled("span")(() => ({
  fontSize: "1rem",
  fontWeight: "500",
  marginRight: ".5rem",
  textTransform: "capitalize",
}));

const SubTitle = styled("span")(({ theme }) => ({
  fontSize: "0.875rem",
  color: theme.palette.text.secondary,
}));

const H4 = styled("h4")(({ theme }) => ({
  fontSize: "1rem",
  fontWeight: "500",
  marginBottom: "16px",
  textTransform: "capitalize",
  color: theme.palette.text.secondary,
}));

const Dashboard = (state) => {
  console.log(state);
  const { palette } = useTheme();
  const [selectedTab, setSelectedTab] = useState(0);
  console.log(selectedTab);
  return (
    <>
      <Container fluid>
        <div class="grid mt-2 surface-ground p-3 surface-0 shadow-2">
          <div class="col-3 flex align-items-center justify-content-center">
            <Link to={"/"}>
              <img
                src={logo}
                height={80}
                alt="logo"
                style={{ objectFit: "contain" }}
              />
            </Link>
          </div>
          <div class="col-9">
            <MenuBar />
          </div>
        </div>
      </Container>
      <div
        style={{ paddingTop: "10px", paddingBottom: "20px" }}
        className="flex align-items-center justify-content-center no-underline"
      >
        <TabView
          className="w-full"
          activeIndex={selectedTab}
          onTabChange={(e) => setSelectedTab(e.index)}
        >
          <TabPanel header="Admin Dashboard">
            <div>
              <Fragment>
                <ContentBox className="analytics">
                  <Grid container spacing={3}>
                    <Grid item lg={8} md={8} sm={12} xs={12}>
                      <StatCards />
                      <TopSellingTable />
                      <StatCards2 />
                    </Grid>
                    <Grid item lg={4} md={4} sm={12} xs={12}>
                      <Card sx={{ px: 3, py: 2, mb: 3 }}>
                        <Title>Traffic Sources</Title>
                        <SubTitle>Last 30 days</SubTitle>
                        <DoughnutChart
                          height="300px"
                          color={[
                            palette.primary.dark,
                            palette.primary.main,
                            palette.primary.light,
                          ]}
                        />
                      </Card>
                      {/* <UpgradeCard /> */}
                      <RevenueChart />
                      {/* <Campaigns /> */}
                    </Grid>
                  </Grid>
                </ContentBox>
              </Fragment>
            </div>
          </TabPanel>
          {/* <TabPanel header="Top Seller">
            <TemplateDemo />
          </TabPanel> */}
          <TabPanel header="Product Management">
            <ProductManage />
          </TabPanel>
          <TabPanel header="User Management">
            <UserManage />
          </TabPanel>
          <TabPanel header="Order Management">
            <OrderManage />
          </TabPanel>
          {/* <TabPanel header="Cash Flow Management">
            <Product />
          </TabPanel> */}
        </TabView>
      </div>
    </>
  );
};

export default Dashboard;
