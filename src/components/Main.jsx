import React from 'react';



const Main= ({id,image,area,pricepersqft,totalprice,location,onClick}) => {
  return (
    <div className="p-8 bg-gray-100  ">

      <div className="flex flex-wrap justify-center gap-x-6">
         
          <div key={id} onClick={onClick} className='bg-white shadow-lg rounded-xl  overflow-hidden  w-[300px]'>
            <img src={image} alt="Property" className="w-full  h-[300px] object-cover" />
            <div className="px-4">
              <p className="text-gray-700"><span className="font-semibold">Area:</span> {area}</p>
              <p className="text-gray-700"><span className="font-semibold">Price/Sq ft:</span> {pricepersqft}</p>
              <p className="text-gray-700"><span className="font-semibold">Total Price:</span> {totalprice}</p>
              <p className="text-gray-700"><span className="font-semibold">Location:</span> {location}</p>
            </div>
          </div>
        
      </div>
    </div>
  );
};

export default Main;
