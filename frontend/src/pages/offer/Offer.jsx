import { FaPlus } from "react-icons/fa6";
import Header from "../../components/header/Header";
import { IoIosArrowRoundBack } from "react-icons/io";
import { Link } from "react-router-dom";

export default function Offer() {
  const offers = [
    {
      name: "Hyundai",
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
    {
      name: "Hyundai",
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
    {
      name: "Hyundai",
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#C3E8FF] to-white px-10 pt-7 pb-12 space-y-8">
      <Header />
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-semibold text-black text-lg flex items-center">
          <Link to="/">
            <IoIosArrowRoundBack size={35} className="mr-1 text-black" />
          </Link>
          Offers
        </h2>
        <button className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
          <FaPlus className="text-black text-sm" />
        </button>
      </div>
      {/* Category Grid */}
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-wrap justify-between gap-3">
          {offers.map((offer, index) => (
            <div key={index} className="w-[180px]">
              <img
                src={offer.img}
                alt={offer.name}
                className="w-full aspect-square object-cover rounded"
              />
              <p className="mt-1 text-sm font-medium text-black text-center">
                {offer.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
