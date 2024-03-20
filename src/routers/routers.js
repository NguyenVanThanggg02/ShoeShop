import AddProduct from "../screens/AddProduct";
import Register from "../screens/auth/Register";
import Blog from "../screens/Blog";
import Category from "../screens/Category";
import Contact from "../screens/Contact";
import Detail from "../screens/Detail";
import EditProfile from "../screens/EditProfile";
import Homepage from "../screens/Homepage";
import ListProduct from "../screens/ListProduct";
import NotFoundPage from "../screens/NotFoundPage";
import OrderManagement from "../screens/OrderManagement";
import Payment from "../screens/Payment";
import ListProducts from "../screens/products/ListProducts";
import UpdateProduct from "../screens/UpdateProduct";
import UserList from "../screens/UserList";
import UserProfile from "../screens/UserProfile";

import ChangePassWord from "../screens/auth/ChangePassWord";
import Login from "../screens/auth/Login";
import CartShop from "../screens/Cart_Shop";
export const routers = [
  {
    path: "/login",
    page: Login,
    isShowHeader: false,
  },
  {
    path: "/register",
    page: Register,
    isShowHeader: false,
  },
  {
    path: "/cart",
    page: CartShop,
    isShowHeader: false,
  },
  {
    path: "/",
    page: Homepage,
    isShowHeader: true,
  },
  {
    path: "/detail/:pid",
    page: Detail,
    isShowHeader: true,
  },
  {
    path: "/category",
    page: Category,
    isShowHeader: true,
  },
  {
    path: "/contact",
    page: Contact,
    isShowHeader: true,
  },

  {
    path: "*",
    page: NotFoundPage,
  },

  {
    path: "/listP",
    page: ListProduct,
    isShowHeader: false,
  },
  {
    path: "/addproduct",
    page: AddProduct,
    isShowHeader: true,
  },
  {
    path: "/listproduct",
    page: ListProducts,
    isShowHeader: true,
  },
  {
    path: "/blog",
    page: Blog,
    isShowHeader: true,
  },
  {
    path: "/updateproduct",
    page: UpdateProduct,
    isShowHeader: true,
  },
  {
    path: "/ordermanagement",
    page: OrderManagement,
    isShowHeader: true,
  },
  {
    path: "/payment",
    page: Payment,
    isShowHeader: true,
  },
  {
    path: '/user',
    page: UserList
  },
  {
    path: "/userprofile",
    page: UserProfile,
    isShowHeader: true,
  },
  {
    path: "/userprofile/editprofile",
    page: EditProfile,
    isShowHeader: true,
  },
  {
    path: '/login',
    page: Login,
    isShowHeader: false
  },
  {
    path: '/register',
    page: Register,
    isShowHeader: false
  },
  {
    path: '/auth/change_password',
    page: ChangePassWord,
    isShowHeader: true
  }
];
