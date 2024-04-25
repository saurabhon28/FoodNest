import "./App.css";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { CartProvider } from "./components/contextReducer";
import MyOrder from "./pages/MyOrder";
import VendorRegistration from "./pages/VendorRegistration";

function App() {
  return (
    <>
      <CartProvider>
        <BrowserRouter>
          <Navbar />
          <div className="content">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/myOrder" element={<MyOrder />} />
              <Route
                path="/vendorRegistration"
                element={<VendorRegistration />}
              />
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
      </CartProvider>
    </>
  );
}

export default App;
