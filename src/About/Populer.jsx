import React from "react";
import Image3 from '../assets/image3.png';
import Image2 from '../assets/image2.png';
import Image5 from '../assets/image5.png';
import { motion } from "framer-motion";

export const SlideUp = (delay) => {
  return {
      hidden: {
          y: "100%",
          opacity: 0,
      },
      show: {
          y: 0,
          opacity: 1,
          transition: {
              duration: 0.6,
              delay: delay,
          },
      },
  };
};

const PopulerData = [
    {
        id: 1,
        name: "Oreo",
        img: Image3,
        price: "Rp.2.000",
        delay: 0.4,
    },
    {
        id: 2,
        name: "Tepung",
        img: Image2,
        price: "Rp.15.000",
        delay: 0.8,
    },
    {
        id: 3,
        name: "Lays",
        img: Image5,
        price: "Rp.10.000",
        delay: 1.2,
    },
];

const Populer = () => {
    return (
        <section>
            <div className="container py-1">
                <motion.h3 
                    variants={SlideUp(0)}
                    initial="hidden"
                    whileInView="show"
                    className="text-2xl font-semibold text-teal-800 uppercase py-8"
                >
                    Popular
                </motion.h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 bg-white">
                    {PopulerData.map((item) => (
                        <motion.div
                            key={item.id} // Fixed key
                            variants={SlideUp(item.delay)}
                            initial="hidden"
                            whileInView="show"
                            className="group bg-white-50 shadow-md p-3 flex items-center gap-3"
                        >
                            <img 
                                src={item.img} 
                                alt={item.name} 
                                className="w-24 rounded-full img-shadow group-hover:scale-125 transition-all duration-700 group-hover:rotate-[50deg]"
                            />
                            <div>
                                <h3 className="text-xl font-semibold">{item.name}</h3>
                                <p className="text-xl text-blue-900">{item.price}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};


export default Populer;