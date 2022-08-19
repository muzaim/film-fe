import "./App.css";
import { Navbar, Footer } from "./Components/index";
import { Home, DetailFilm, AddFilm, Login, Register } from "./Pages/index";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Navbar />
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
    </>
  );
}

export default App;
