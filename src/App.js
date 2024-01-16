// \chicken-website\src\App.js
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { AuthProvider } from "./contexts/AuthContext";
import Navbar from "./components/Navbar";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import Login from "./Pages/Login";
import OrderHistory from "./Pages/OrderHistory";
import { Register } from "./Pages/Register";
import Profile from "./Pages/Profile";
import LeaveRating from "./Pages/RatingForm";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/order-history" element={<OrderHistory />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/rating_form" element={<LeaveRating />} />
          <Route path="/Profile" element={<Profile />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
