import React, { useState, useEffect } from "react";
import { db } from "../firebase"; // Import Firestore configuration
import { addDoc, collection, getDocs, updateDoc, doc } from "firebase/firestore"; // Firestore functions
import { useNavigate } from "react-router-dom"; // useNavigate hook for navigation
import { AiFillStar } from "react-icons/ai";
import { CiShare1 } from "react-icons/ci";
import { IoCartOutline } from "react-icons/io5";

// Default products (example)
const defaultProducts = [
  // Add your default products here
];

const Produk = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [filter, setFilter] = useState("Semua");
  const [products, setProducts] = useState([]);
  const userId = "user123"; // Define your userId here
  const navigate = useNavigate(); // Navigation hook

  // Fetch data from Firestore
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsSnapshot = await getDocs(collection(db, "products"));
        const productsList = productsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Jika Firestore kosong, gunakan produk default
        if (productsList.length === 0) {
          setProducts(defaultProducts);
        } else {
          setProducts(productsList);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        // Jika ada error, gunakan produk default
        setProducts(defaultProducts);
      }
    };

    fetchProducts();
  }, []);

  // Handle product details view
  const handleDetails = (product) => {
    setSelectedProduct(product);
  };

  const handleCloseDetails = () => {
    setSelectedProduct(null);
  };

  // Handle category filter change
  const handleFilterChange = (category) => {
    setFilter(category);
  };

  // Filter products based on category
  const filteredProducts = products.filter(
    (product) => filter === "Semua" || product.category === filter
  );

  const addToCart = async (product) => {
    try {
      const cartRef = collection(db, "cart");
      const existingItem = await getDocs(collection(db, "cart")); // Check if item exists in cart

      const existingCartItem = existingItem.docs.find((item) => item.data().id === product.id && item.data().userId === userId);

      if (existingCartItem) {
        // Update quantity if item already exists in cart
        await updateDoc(doc(db, "cart", existingCartItem.id), {
          quantity: existingCartItem.data().quantity + 1,
        });
      } else {
        // Add new item to cart
        await addDoc(cartRef, { ...product, quantity: 1, userId });
      }

      alert("Produk berhasil ditambahkan ke keranjang!");
      navigate("/cart"); // Navigate to cart page
    } catch (error) {
      console.error("Error menambahkan produk:", error.message);
    }
  };

  return (
    <section className="m-6">
      <div className="col-12 mb-5">
        <p className="text-sm text-blue-500 text-center">
          This Product For You
        </p>
        <h1 className="display-6 text-center text-3xl font-bold">
          Product
        </h1>
        <p className="text-xs text-gray-400 text-center">
          Pilihlah Barang yang Berkualitas di Toko Teguh
        </p>
      </div>

      <h2 className="ml-[20px] mb-[20px] mt-[20px] text-[20px] font-bold">
        Recommended
      </h2>

      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 place-items-center">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onDetails={handleDetails}
            onAddToCart={addToCart} // Pass addToCart function
          />
        ))}
      </section>

      {selectedProduct && (
        <ProductDetails
          product={selectedProduct}
          onClose={handleCloseDetails}
        />
      )}
    </section>
  );
};

// Product Card Component
const ProductCard = ({ product, onDetails, onAddToCart }) => {
  const { image, name, rating, price, discountPrice } = product;
  return (
    <section className="m-[20px] border-[2px] p-[20px] cursor-pointer shadow-md">
      <img src={image} alt={name} className="w-[250px] h-[210px] mb-1" />
      <div className="card-details">
        <h3 className="mb-1">{name}</h3>
        <section className="flex mb-1">
          {[...Array(rating)].map((_, index) => (
            <AiFillStar key={index} />
          ))}
          <span className="text-1 ml-[9px]">{rating}</span>
        </section>
        <section className="flex flex-auto justify-center">
          <div className="price">
            {price && <del className="text-red-400">Rp.{price}</del>} Rp.
            {discountPrice}
          </div>
          <div className="flex">
            <button className="ml-4" onClick={() => onDetails(product)}>
              <CiShare1 />
            </button>
            <button className="ml-4" onClick={() => onAddToCart(product)}>
            <IoCartOutline />
            </button>
          </div>
        </section>
      </div>
    </section>
  );
};

// Product Details Component
const ProductDetails = ({ product, onClose }) => {
  const handleCheckout = () => {
    const message = `Halo, saya ingin membeli ${product.name} seharga Rp.${product.discountPrice}.`;
    const phoneNumber = "6288229535428"; // Your WhatsApp number
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;

    window.open(url, "_blank");
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-md shadow-lg max-w-[500px] w-full">
        <button className="text-red-500 text-right mb-4" onClick={onClose}>
          ✖
        </button>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-[300px] object-cover mb-4"
        />
        <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
        <p className="text-gray-700 mb-2">Deskripsi: {product.description}</p>
        <p className="text-gray-700 mb-2">Harga: Rp.{product.discountPrice}</p>
        <div className="flex mb-4">
          {[...Array(product.rating)].map((_, index) => (
            <AiFillStar key={index} className="text-yellow-500" />
          ))}
        </div>

        <div className="flex gap-4">
          <button
            className="bg-blue-500 text-white p-2 rounded-md"
            onClick={handleCheckout}
          >
            Checkout Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Produk;