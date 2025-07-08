import { FaPlus } from "react-icons/fa6";
import Header from "../../components/header/Header";
import { IoIosArrowRoundBack } from "react-icons/io";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import axios from "axios";

export default function Category() {
  const [isCategoryPopup, setIsCategoryPopup] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [image, setImage] = useState(null);
  const categoryRef = useRef(null);

  const toggleCategory = () => {
    setIsCategoryPopup(!isCategoryPopup);
  };

  const categories = [
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
      setImageFile(file);
      setImage(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isCategoryPopup &&
        categoryRef.current &&
        !categoryRef.current.contains(event.target)
      ) {
        setIsCategoryPopup(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isCategoryPopup]);

  const handleSaveCategory = async () => {
    if (!categoryName || !imageFile) {
      alert("Please provide category name and image!");
      return;
    }

    const formData = new FormData();
    formData.append("categoryName", categoryName);
    formData.append("categoryImage", imageFile); // 'image' should match your multer.single("image")

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_API}/api/admin/add-category`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      console.log(res.data);
      alert("Category added successfully!");
      setIsCategoryPopup(false);
      setCategoryName("");
      setImageFile(null);
      setImage(null);
      // Optional: trigger category list refresh here
    } catch (err) {
      console.error(err);
      alert("Error adding category!");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#C3E8FF] to-white px-10 pt-7 pb-12 space-y-8">
      <Header />
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-semibold text-black text-lg flex items-center">
          <Link to="/">
            <IoIosArrowRoundBack size={35} className="mr-1 text-black" />
          </Link>
          Category
        </h2>
        <button
          onClick={toggleCategory}
          className="w-8 h-8 rounded-full bg-white flex items-center justify-center"
        >
          <FaPlus className="text-black text-sm" />
        </button>
      </div>
      {/* Category Grid */}
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-wrap gap-3">
          {categories.map((category, index) => (
            <div key={index} className="w-[180px]">
              <img
                src={category.img}
                alt={category.name}
                className="w-full aspect-square object-cover rounded"
              />
              <p className="mt-1 text-sm font-medium text-black text-center">
                {category.name}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* category popup */}
      {isCategoryPopup && (
        <>
          {/* Blurred backdrop covering the entire screen except Header */}
          <div className="fixed inset-0 bg-transparent backdrop-blur-md z-40"></div>
          {/* Popup on top of the blurred backdrop */}
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div
              className="bg-white p-6 rounded-lg shadow-lg w-96 relative"
              ref={categoryRef}
            >
              <h3 className="text-lg font-semibold mb-4">Add New Category</h3>
              <button
                onClick={toggleCategory}
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Category Name
                  </label>
                  <input
                    type="text"
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                    placeholder="Category Name"
                    className="w-full p-2 border rounded-lg bg-gray-100"
                  />
                </div>
                <div className="max-w-xs">
                  <div className="block text-sm font-medium mb-1">
                    Category Image
                  </div>
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
                <div className="flex justify-between mt-4">
                  <button className="px-4 py-2 border rounded-lg hover:bg-gray-100">
                    Clean
                  </button>
                  <button
                    onClick={handleSaveCategory}
                    className="px-4 py-2 bg-[#333333] text-white rounded-lg hover:bg-black"
                  >
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
