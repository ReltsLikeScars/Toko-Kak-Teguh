import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Hero from "./Home/Hero";
import Populer from "./About/Populer";
import About from "./About/About";
import Produk from "./Menu/Produk";
import Contact from "./Contac/Contac";
import Produk1 from "./components/Produk1";
import Login from "./components/Login";
import Bk from "./components/Bk";

// Admin components
import Sidebar from "./components/Admin/Sidebar";
import Dashboard from "./components/Admin/Dashboard";
import Table from "./components/Admin/Table";
import Products from "./components/Admin/Products";

// Layout untuk rute umum (dengan navbar dan footer)
const DefaultLayout = ({ children }) => (
  <>
    <Navbar />
    <main>{children}</main>
    <Footer />
  </>
);

// Layout untuk rute admin
const AdminLayout = ({ children }) => (
  <div style={{ display: "flex", height: "100vh" }}>
    <Sidebar />
    <div style={{ flex: 1, overflowY: "auto" }}>
      {children}
    </div>
  </div>
);

const App = () => {
  // Misalnya kita cek apakah pengguna sudah login
  const currentUser = { role: "admin" }; // Ganti ini sesuai dengan data autentikasi pengguna yang valid
  const isAdmin = currentUser && currentUser.role === "admin";

  return (
    <Router>
      <Routes>
        {/* Rute untuk Admin */}
        {isAdmin && (
          <>
            <Route path="/admin" element={<AdminLayout><Dashboard /></AdminLayout>} />
            <Route path="/orders" element={<AdminLayout><Table /></AdminLayout>} />
            <Route path="/products" element={<AdminLayout><Products /></AdminLayout>} />
          </>
        )}

        {/* Rute untuk Pengguna Umum */}
        <Route path="/" element={<DefaultLayout><Hero /></DefaultLayout>} />
        <Route path="/hero" element={<DefaultLayout><Hero/> <Populer/> <About/> <Contact/> </DefaultLayout>} />
        <Route path="/login" element={<DefaultLayout><Login /></DefaultLayout>} />
        <Route path="/produk1" element={<DefaultLayout><Produk1 /></DefaultLayout>} />
        <Route path="/produk" element={<DefaultLayout><Produk /></DefaultLayout>} />
        <Route path="/contact" element={<DefaultLayout><Contact /></DefaultLayout>} />
        <Route path="/about" element={<DefaultLayout><About /></DefaultLayout>} />
        <Route path="/cart" element={<DefaultLayout><Bk /></DefaultLayout>} />
      </Routes>
    </Router>
  );
};

export default App;
