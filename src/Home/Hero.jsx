import React from "react";
import Image1 from "../assets/Image1.png";
import Image2 from "../assets/Image2.png";
import Image3 from "../assets/Image3.png";
import Image4 from "../assets/Image5.png";
import Image5 from "../assets/Image5.png";
import Image6 from "../assets/Image6.png";
import Slider from "react-slick";

const ImageList = [
    {
        id: 1,
        img: Image1,
        title1: "Selamat Datang",
        title: "di Toko Teguh",
        description: "Sebelum berbelanja, pastikan stok barang terlebih dahulu.",
    },
    {
        id: 2,
        img: Image2,
        title1: "Selamat Datang",
        title: "di Toko Teguh",
        description: "Sebelum berbelanja, pastikan stok barang terlebih dahulu.",
    },
    {
        id: 3,
        img: Image3,
        title1: "Selamat Datang",
        title: "di Toko Teguh",
        description: "Sebelum berbelanja, pastikan stok barang terlebih dahulu.",
    },
    {
        id: 4,
        img: Image4,
        title1: "Selamat Datang",
        title: "di Toko Teguh",
        description: "Sebelum berbelanja, pastikan stok barang terlebih dahulu.",
    },
    {
        id: 5,
        img: Image5,
        title1: "Selamat Datang",
        title: "di Toko Teguh",
        description: "Sebelum berbelanja, pastikan stok barang terlebih dahulu.",
    },
    {
        id: 6,
        img: Image6,
        title1: "Selamat Datang",
        title: "di Toko Teguh",
        description: "Sebelum berbelanja, pastikan stok barang terlebih dahulu.",
    },
]

const Hero = () => {

    var settings = {
        dots: true,
        infinite: true,
        speed: 2500,
        slideToScroll: 1,
        slideToShow: 3,
        autoplay: true,
        autoplaySpeed: 1000,
        cssEase: "ease-in-out",
        pauseOnHover: true,
        pauseOnFocus: true,
    };

    return (
        <div className="relative overflow-hidden min-h-[550px] sm:min-h-[650px] bg-gray-100 flex justify-center
        items-center dark:bg-gray dark:text-black duration-200">
            <div className="h-[700px] w-[700px] bg-blue-300 absolute -top-1/2 right-0 rounded-3xl rotate-45 -z-9"> </div>
                <div className="container pb-8 sm:pb-0">
                    <Slider {...settings}>
                        {ImageList.map((data) => (
                            <div>
                            <div className="grid grid-cols-1 sm:grid-cols-2">
                                <div className="flex flex-col justify-center gap-4 pt-12 sm:pt-0 text-center sm:text-left order-2
                                sm:order-1 relative z-10">
                                    <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold">{data.title1}</h1>
                                    <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold">{data.title}</h1>
                                    <p className="text-sm">{data.description}</p>
                                </div>
                                <div className="order-1 sm:order-2">
                                    <div className="relative z-10">
                                        <img src={data.img} alt=""
                                        className="w-[300px] h-[300px] sm:h-[450px sm:w-[450px] sm:scale-125
                                        lg:scale-120 object-contain mx-auto"/>
                                    </div>
                                </div>
                            </div>
                         </div>
                        ))}
                    </Slider>
                </div>
        </div>
    )
};

export default Hero;