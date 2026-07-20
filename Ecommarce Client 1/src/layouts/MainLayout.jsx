import Navber from "../layouts/Navbar"
import { Outlet } from "react-router";
import Footer from "./Footer"
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const MainLayout = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <>
      <Navber/>
      <Outlet/>
      <Footer/>
    </>
  );
};

export default MainLayout;