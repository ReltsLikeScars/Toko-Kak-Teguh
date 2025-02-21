import React from "react";

const Footer = () => {
    return(
        <div className="flex-col">
      <footer className="relative bg-blue-950 text-white pt-20 pb-8">
        {/* Gelombang SVG */}
        <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0]">
          <svg
            className="relative block w-full h-24"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M0,96L120,80C240,64,480,32,720,32C960,32,1200,64,1320,80L1440,96L1440,0L1320,0C1200,0,960,0,720,0C480,0,240,0,120,0L0,0Z"
              className="fill-gray-50"></path>
          </svg>
        </div>

        {/* Konten Footer */}
        <div className="container mx-auto px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">T.Teguh</h3>
              <p className="text-gray-400">
                JL.Saptamrga 11 RT 04 RW 06
              </p>
              <p className="text-gray-400">+6288229535428</p>
              <p className="text-gray-400">teguh12@gmail.com</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">About</h4>
              <p className="text-gray-400 space-y-2">
                website ini dibuat pada tahun 2025 untuk memperkenalkan website ini ke masyarakat luas
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Social</h4>
              <div className="flex space-x-4 mt-2">
                <a href=" https://wa.me/qr/HXBNFHG3BQ36L1 " className="hover:text-blue-400">
                  WhatsApp
                </a>
                <a href="https://www.instagram.com/tempeken?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" className="hover:text-blue-400">
                  Instagram
                </a>
              </div>
            </div>
          </div>
          <div className="text-center text-gray-500 mt-8">
            <p>© T.Teguh. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
    )
};

export default Footer;