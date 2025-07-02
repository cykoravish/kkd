import { FaPlus } from "react-icons/fa6";
import Header from "../../components/header/Header";
import { IoIosArrowRoundBack } from "react-icons/io";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

export default function Promotion() {
  const [isPromotionPopup, setIsPromotionPopup] = useState(false);
  const [image, setImage] = useState(null);
  const promotionRef = useRef(null);

  const togglePromotion = () => {
    setIsPromotionPopup(!isPromotionPopup);
  };

  const promotions = [
    {
      name: "Interior",
      img: "https://placehold.co/600x400@2x.png",
    },
    {
      name: "Exterior",
      img: "https://placehold.co/600x400@2x.png",
    },
    {
      name: "Wood finish",
      img: "https://placehold.co/600x400@2x.png",
    },
    {
      name: "waterproofing",
      img: "https://placehold.co/600x400@2x.png",
    },
  ];

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isPromotionPopup &&
        promotionRef.current &&
        !promotionRef.current.contains(event.target)
      ) {
        setIsPromotionPopup(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isPromotionPopup]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#C3E8FF] to-white px-10 pt-7 pb-12 space-y-8">
      <Header />
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-semibold text-black text-lg flex items-center">
          <Link to="/">
            <IoIosArrowRoundBack size={35} className="mr-1 text-black" />
          </Link>
          Promotion
        </h2>
        <button
          onClick={togglePromotion}
          className="w-8 h-8 rounded-full bg-white flex items-center justify-center"
        >
          <FaPlus className="text-black text-sm" />
        </button>
      </div>
      {/* Category Grid */}
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-wrap justify-start gap-4">
          {promotions.map((promotion, index) => (
            <div key={index} className="w-full sm:w-[250px]">
              <img
                src={promotion.img}
                alt={promotion.name}
                className="w-full h-48 object-cover rounded"
              />
              <p className="mt-1 text-sm font-medium text-black text-center">
                {promotion.name}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* category popup */}
      {isPromotionPopup && (
        <>
          {/* Blurred backdrop covering the entire screen except Header */}
          <div className="fixed inset-0 bg-transparent backdrop-blur-md z-40"></div>
          {/* Popup on top of the blurred backdrop */}
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div
              className="bg-white p-6 rounded-lg shadow-lg w-120 relative"
              ref={promotionRef}
            >
              <h3 className="text-lg font-semibold mb-4">Add Banner</h3>
              <button
                onClick={togglePromotion}
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
              <div className="space-y-4">
                <div className="max-w-lg">
                  <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg h-40 cursor-pointer hover:border-blue-500 transition">
                    {image ? (
                      <img
                        src={image}
                        alt="Preview"
                        className="w-full h-full object-cover rounded-lg"
                      />
                    ) : (
                      <span className="text-gray-500 text-sm">
                        Click to upload image
                      </span>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                </div>
                <div className="flex justify-between mt-4 gap-x-2">
                  <button className="w-1/2 py-2 border rounded-lg hover:bg-gray-100">
                    Clean
                  </button>
                  <button className="w-1/2 px-4 py-2 bg-[#333333] text-white rounded-lg hover:bg-black">
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
