import "./App.css";
import { Navbar, Footer } from "./Components/index";
import { Home, DetailFilm, AddFilm, Login, Register } from "./Pages/index";
import { Routes, Route } from "react-router-dom";
import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
export const UserContext = createContext();

function App() {
  const Navigate = useNavigate();
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  const logOutCallback = async () => {
    await fetch("http://localhost:5000/api/v1/user/logout", {
      method: "POST",
      withCredentials: true,
    });

    setUser({});
    localStorage.removeItem("user");
    Navigate("/");
    window.location.reload();
  };

  useEffect(() => {
    async function checkRefreshToken() {
      const result = await (
        await fetch("http://localhost:5000/api/v1/user/refresh-token", {
          method: "POST",
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        })
      ).json();
      setUser({
        accesstoken: result.accessToken,
        email: result.email,
      });
      setLoading(false);
    }
    checkRefreshToken();
    // console.log(`user dari luar banget`, user);
  }, []);

  return (
    <>
      <UserContext.Provider value={[user, setUser]}>
        <Navbar logOutCallback={logOutCallback} />
        <div className="container page-minimum">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/detail/:id" element={<DetailFilm />} />
            <Route path="/add" element={<AddFilm />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/*"
              element={
                <h1 className="text-center text-danger">Page Not Found!</h1>
              }
            />
          </Routes>
        </div>
        <Footer />
      </UserContext.Provider>
    </>
  );
}

export default App;
