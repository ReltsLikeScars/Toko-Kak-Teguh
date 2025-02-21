import React, { useState } from "react";
import Image1 from "../assets/image1.png";
import Image2 from "../assets/image2.png";
import Image3 from "../assets/image3.png";
import Image4 from "../assets/image4.png";
import Image5 from "../assets/image5.png";
import Image6 from "../assets/image6.png";
import Image7 from "../assets/image7.png";
import Image8 from "../assets/image8.png";
import Image9 from "../assets/image9.png";
import Image10 from "../assets/image10.png";
import Image11 from "../assets/image11.png";
import Image12 from "../assets/image12.png";
import { AiFillStar } from "react-icons/ai";
import { CiShare1 } from "react-icons/ci";

const products = [
  {
    id: 1,
    name: "Beras",
    category: "Sembako",
    description: "Beras premium kualitas terbaik untuk kebutuhan sehari-hari.",
    image: Image1,
    price: 70000,
    discountPrice: 50000,
    rating: 4,
  },
  {
    id: 2,
    name: "Oreo",
    category: "Makanan Ringan",
    description: "Biskuit Oreo dengan rasa cokelat lembut dan krim lezat.",
    image: Image2,
    price: 4000,
    discountPrice: 2000,
    rating: 4,
  },
  {
    id: 3,
    name: "Tepung",
    category: "Sembako",
    description: "Tepung serbaguna untuk memasak dan membuat kue.",
    image: Image3,
    price: 16000,
    discountPrice: 15000,
    rating: 4,
  },
  {
    id: 4,
    name: "Indomie Goreng",
    category: "Sembako",
    description: "Mi instan favorit dengan rasa gurih khas Indonesia.",
    image: Image4,
    price: null,
    discountPrice: 3000,
    rating: 4,
  },
  {
    id: 5,
    name: "Lays",
    category: "Makanan Ringan",
    description: "Keripik kentang dengan rasa yang gurih dan renyah.",
    image: Image5,
    price: 12000,
    discountPrice: 10000,
    rating: 4,
  },
  {
    id: 6,
    name: "Pocky",
    category: "Maknan Ringan",
    description: "Stik biskuit dengan lapisan cokelat lembut.",
    image: Image6,
    price: null,
    discountPrice: 10000,
    rating: 4,
  },
];

const ProductCard = ({ product, onDetails }) => {
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
            {price && <del className="text-red-400">Rp.{price}</del>} Rp.{discountPrice}
          </div>
          <div className="flex">
            <button className="ml-4" onClick={() => onDetails(product)}>
              <CiShare1 />
            </button>
          </div>
        </section>
      </div>
    </section>
  );
};

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
        <img src={product.image} alt={product.name} className="w-full h-[300px] object-cover mb-4" />
        <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
        <p className="text-gray-700 mb-2">Kategori: {product.category}</p>
        <p className="text-gray-700 mb-2">Deskripsi: {product.description}</p>
        <p className="text-gray-700 mb-2">Harga: Rp.{product.discountPrice}</p>
        <div className="flex mb-4">
          {[...Array(product.rating)].map((_, index) => (
            <AiFillStar key={index} className="text-yellow-500" />
          ))}
        </div>
        <button
          className=" bg-blue-500 text-white p-2 rounded-md"
          onClick={handleCheckout}
        >
          Checkout Now
        </button>
      </div>
    </div>
  );
};

const Produk1 = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [filter, setFilter] = useState("Semua");

  const handleDetails = (product) => {
    setSelectedProduct(product);
  };

  const handleCloseDetails = () => {
    setSelectedProduct(null);
  };

  const handleFilterChange = (category) => {
    setFilter(category);
  };

  const filteredProducts = products.filter(
    (product) => filter === "Semua" || product.category === filter
  );

  return (
    <section className="m-6">
    <div className="col-12 mb-5">
            <p 
             className="text-sm text-blue-500 text-center">This Product For You</p>
            <h1
              className="display-6 text-center text-3xl font-bold font-mono">Product</h1>
              <p 
               className="text-xs text-gray-400 text-center">Pilihlah Barang yang Berkualitas di Toko Teguh</p>
        </div>
            <h2 className="ml-[20px] mb-[20px] mt-[20px] text-[20px] font-semibold font-serif">Recommended</h2>
      <div className="mb-6 flex justify-center gap-4">
        <button
          className={`p-2 rounded-md ${filter === "Semua" ? "bg-blue-500 text-white" : "bg-transparent border-[2px]"}`}
          onClick={() => handleFilterChange("Semua")}
        >
          Semua
        </button>
        <button
          className={`p-2 rounded-md ${filter === "Sembako" ? "bg-blue-500 text-white" : "bg-transparent border-[2px]"}`}
          onClick={() => handleFilterChange("Sembako")}
        >
          Sembako
        </button>
        <button
          className={`p-2 rounded-md ${filter === "Makanan Ringan" ? "bg-blue-500 text-white" : "bg-transparent border-[2px]"}`}
          onClick={() => handleFilterChange("Makanan Ringan")}
        >
          Makanan Ringan
        </button>
        <button
          className={`p-2 rounded-md ${filter === "Kebutuhan Harian" ? "bg-blue-500 text-white" : "bg-transparent border-[2px]"}`}
          onClick={() => handleFilterChange("Kebutuhan Harian")}
        >
          Kebutuhan Harian
        </button>
      </div>

      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 place-items-center">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} onDetails={handleDetails} />
        ))}
      </section>

      {selectedProduct && (
        <ProductDetails product={selectedProduct} onClose={handleCloseDetails} />
      )}
    </section>
  );
};

export default Produk1;
