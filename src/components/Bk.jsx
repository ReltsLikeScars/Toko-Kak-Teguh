import React, { useState, useEffect } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";
import { db } from "../firebase"; // Pastikan file konfigurasi Firebase sudah benar
import {
  collection,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

const Bk = () => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);

  // Format harga ke rupiah
  const formatCurrency = (value) => {
    if (typeof value !== "number" || isNaN(value)) {
      return "Rp 0"; // Nilai default jika tidak valid
    }
    return `Rp ${value.toLocaleString("id-ID")}`;
  };

  // Fetch data keranjang dari Firestore
  const fetchCart = async () => {
    setLoading(true);
    try {
      const cartRef = collection(db, "cart");
      const querySnapshot = await getDocs(cartRef);

      const cartItems = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      console.log("Fetched cart items:", cartItems);
      setCart(cartItems);
    } catch (error) {
      console.error("Error mengambil data keranjang:", error.message);
    } finally {
      setLoading(false);
    }
  };

  // Update jumlah produk di keranjang
  const updateCartQuantity = async (cartItemId, quantity) => {
    if (quantity < 1) return; // Hindari jumlah kurang dari 1
    try {
      const cartItemRef = doc(db, "cart", cartItemId);
      await updateDoc(cartItemRef, { quantity });
      fetchCart();
    } catch (error) {
      console.error("Error memperbarui jumlah produk:", error.message);
    }
  };

  // Hapus produk dari keranjang
  const removeFromCart = async (cartItemId) => {
    try {
      const cartItemRef = doc(db, "cart", cartItemId);
      await deleteDoc(cartItemRef);
      fetchCart();
    } catch (error) {
      console.error("Error menghapus produk:", error.message);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const total = cart.reduce(
    (acc, item) => acc + item.discountPrice * item.quantity,
    0
  );

  const openWhatsApp = () => {
    if (!cart || cart.length === 0) {
      alert("Keranjang belanja kosong. Tidak ada produk untuk dipesan.");
      return;
    }
  
    const phoneNumber = "6288229535428"; // Nomor WhatsApp tujuan (format internasional tanpa tanda "+" atau spasi)
  
    // Susun detail pesanan
    const orderDetails = cart
      .map(
        (item) =>
          `- ${item.name} (x${item.quantity}): ${formatCurrency(
            item.discountPrice * item.quantity
          )}`
      )
      .join("\n");
  
    // Tambahkan total harga ke pesan
    const message = `Halo, saya ingin memesan produk berikut:\n\n${orderDetails}\n\nTotal: ${formatCurrency(
      total
    )}\n\nMohon konfirmasi pesanan saya. Terima kasih!`;
  
    // Format URL WhatsApp
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;
  
    // Buka URL WhatsApp di tab baru
    window.open(whatsappURL, "_blank");
  };
  
  


  return (
    <div className="p-4 md:p-6">
      <h2 className="text-2xl font-bold text-center mb-4">Keranjang Belanja</h2>
      {loading ? (
        <p className="text-center text-gray-500">Memuat data keranjang...</p>
      ) : cart.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300 text-center">
            <thead>
              <tr className="bg-gray-200 text-xs md:text-sm">
                <th>Produk</th>
                <th>Nama</th>
                <th>Harga</th>
                <th>Jumlah</th>
                <th>Hapus</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item.id}>
                  <td>
                    <img
                      src={item.image || "https://via.placeholder.com/64"}
                      alt={item.name}
                      className="w-16 h-12 object-cover"
                    />
                  </td>
                  <td>{item.name}</td>
                  <td>{formatCurrency(item.discountPrice)}</td>
                  <td>
                    <div className="flex justify-center items-center gap-2">
                      <button
                        onClick={() =>
                          updateCartQuantity(item.id, item.quantity - 1)
                        }
                        className="px-2 py-1 bg-gray-300 rounded hover:bg-gray-400"
                      >
                        <FaMinus />
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() =>
                          updateCartQuantity(item.id, item.quantity + 1)
                        }
                        className="px-2 py-1 bg-gray-300 rounded hover:bg-gray-400"
                      >
                        <FaPlus />
                      </button>
                    </div>
                  </td>
                  <td>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="bg-red-500 text-white px-2 rounded hover:bg-red-600"
                    >
                      Hapus
                    </button>
                  </td>
                  <td>{formatCurrency(item.discountPrice * item.quantity)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-gray-500">Keranjang kosong.</p>
      )}
      <div className="text-right mt-4 text-lg font-bold">
        Total: <span className="text-blue-600">{formatCurrency(total)}</span>
      </div>
      {cart.length > 0 && (
        <button
        onClick={openWhatsApp}
          className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4 hover:bg-blue-600"
        >
          Beli Sekarang
        </button>
      )}
    </div>
  );
};

export default Bk;
