import React from "react";

const OfferCard = ({ discount, title, description, expires, image }) => {
  return (
    <div
      className="relative rounded-xl overflow-hidden shadow-md hover:scale-105 transition-transform cursor-pointer"
      style={{ minHeight: "230px" }}
    >
      <img src={image} alt={title} className="w-full h-full object-cover" />

      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>

      {/* Content */}
      <div className="absolute bottom-4 left-4 text-white">
        <span className="bg-white text-black text-sm px-3 py-1 rounded-full">
          {discount} OFF
        </span>

        <h2 className="text-xl font-playfair font-semibold mt-3">{title}</h2>
        <p className="text-sm font-outfit max-w-xs mt-1">{description}</p>

        <p className="text-xs text-gray-300 mt-1">Expires {expires}</p>

        <button className="mt-3 text-sm font-medium flex items-center gap-1">
          View Offers →
        </button>
      </div>
    </div>
  );
};

export default OfferCard;
