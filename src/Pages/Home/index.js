import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FeaturedToday, Jumbotron } from "../../Components";
import { UserContext } from "../../App";
const Home = () => {
  const Navigate = useNavigate();

  // const [user] = useContext(UserContext);
  // if (!user.accesstoken) return Navigate("/");
  const userExist = () => {
    const user = localStorage.getItem("user");
    if (!user) {
      alert(`login terlebih dahulu`);
      Navigate("/login");
    }
  };
  useEffect(() => {
    userExist();
  }, []);
  return (
    <>
      <Jumbotron />
      <FeaturedToday />
      <FeaturedToday />
    </>
  );
};

export default Home;
