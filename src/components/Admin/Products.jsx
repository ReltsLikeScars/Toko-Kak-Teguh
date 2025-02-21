import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase"; // Import konfigurasi Firestore
import { collection, addDoc } from "firebase/firestore"; // Import Firestore functions

const Products = () => {
  const [productData, setProductData] = useState({
    nama: "",
    harga: "",
    deskripsi: "",
    foto: null,
  });

  const navigate = useNavigate();

  // Format harga menjadi mata uang Rupiah
  const formatCurrency = (value) => {
    const numberString = value.replace(/[^0-9]/g, ""); // Hanya angka
    const number = Number(numberString) || 0;
    return "Rp " + number.toLocaleString("id-ID"); // Menambahkan "Rp" di depan
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Khusus untuk input harga, simpan value mentah dan tampilkan hasil format
    if (name === "harga") {
      const rawValue = value.replace(/[^0-9]/g, ""); // Ambil hanya angka
      setProductData({ ...productData, [name]: rawValue });
    } else {
      setProductData({ ...productData, [name]: value });
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setProductData({ ...productData, foto: event.target.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validasi semua input
    if (!productData.nama || !productData.harga || !productData.deskripsi || !productData.foto) {
      alert("Semua data harus diisi!");
      return;
    }

    const newProduct = {
      name: productData.nama,
      discountPrice: parseInt(productData.harga, 10), // Menggunakan angka mentah untuk disimpan
      description: productData.deskripsi,
      image: productData.foto,
      rating: 4, // Rating default
    };

    // Simpan produk ke Firestore
    try {
      const docRef = await addDoc(collection(db, "products"), newProduct);
      console.log("Produk berhasil ditambahkan dengan ID:", docRef.id);
      setProductData({ nama: "", harga: "", deskripsi: "", foto: null });
      alert("Produk berhasil ditambahkan!");
      navigate("/produk"); // Redirect ke halaman daftar produk
    } catch (e) {
      console.error("Error menambahkan produk:", e);
      alert("Terjadi kesalahan saat menambahkan produk.");
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Tambah Produk Baru</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Nama Produk:</label>
          <input
            type="text"
            name="nama"
            value={productData.nama}
            onChange={handleInputChange}
            placeholder="Masukkan nama produk"
            className="block w-full border rounded p-2"
            required
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Harga:</label>
          <input
            type="text"
            name="harga"
            value={formatCurrency(productData.harga)} // Menampilkan format Rp
            onChange={handleInputChange}
            placeholder="Masukkan harga produk"
            className="block w-full border rounded p-2"
            required
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Deskripsi:</label>
          <textarea
            name="deskripsi"
            value={productData.deskripsi}
            onChange={handleInputChange}
            placeholder="Masukkan deskripsi produk"
            className="block w-full border rounded p-2"
            rows="4"
            required
          ></textarea>
        </div>
        <div>
          <label className="block font-medium mb-1">Upload Foto:</label>
          <input
            type="file"
            accept="image/png, image/jpeg"
            onChange={handleImageUpload}
            className="block w-full border rounded p-2"
            required
          />
          {productData.foto && (
            <img
              src={productData.foto}
              alt="Preview Produk"
              className="mt-4 w-32 h-32 object-cover rounded-md border"
            />
          )}
        </div>
        <div className="flex space-x-4">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Tambah Produk
          </button>
          <button
            type="button"
            onClick={() => navigate("/produk")}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Lihat Daftar Produk
          </button>
        </div>
      </form>
    </div>
  );
};

export default Products;
