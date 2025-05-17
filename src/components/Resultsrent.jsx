import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { listings } from './data/listingData';

const Resultant = () => {
  
  const navigate = useNavigate();
   const locationHook = useLocation();

  const searchParams = new URLSearchParams(locationHook.search);
  const location = searchParams.get('location');
  const type = searchParams.get('type');

  const data = listings[location]?.[type] || [];

  const handleClick = (item) => {
    navigate('/input', {
      state: {
        img: item.image,
        area: item.area,
        pricePerSqft: item.pricePerSqft,
        totalPrice: item.totalPrice,
        location,
        type
      }
    });
  };

  return (
   <div>
       <div className="w-full bg-slate-800 h-[12vh] flex justify-center items-center">
        <h2  className=" text-white text-3xl font-bold uppercase" >Sell {type} in {location}</h2>
        
        </div>
    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {data.length === 0 ? (
        <p>No listings found for {type} in {location}.</p>
      ) : (
        data.map((item, index) => (
          <div
            key={index}
            onClick={() => handleClick(item)}
            className="border rounded-xl shadow hover:shadow-lg cursor-pointer transition"
          >
            <img src={item.image} alt={`Listing ${index}`} className="w-full h-48 object-cover rounded-t-xl" />
            <div className="p-4">
              <p><strong>Area:</strong> {item.area}</p>
              <p><strong>Price/Sqft:</strong> {item.pricePerSqft}</p>
              <p><strong>Total:</strong> {item.totalPrice}</p>
            </div>
          </div>
        ))
      )}
    </div>
    </div>
  );
};

export default Resultant;
