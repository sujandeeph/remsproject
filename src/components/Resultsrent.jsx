import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { listings } from './data/listingData'; // Import the static data

// Helper function to format total price
function formatTotalPrice(price) {
    if (price >= 10000000) {
        return `${(price / 10000000).toFixed(2)} Cr`;
    } else if (price >= 100000) {
        return `${(price / 100000).toFixed(2)} Lakhs`;
    } else {
        return `Rs ${price.toLocaleString('en-IN')}`;
    }
}

const Resultsrent = () => {
    const navigate = useNavigate();
    const locationHook = useLocation();
    const [apiData, setApiData] = useState({}); // State for fetched data
    const [loading, setLoading] = useState(true); // State for loading status
    const [error, setError] = useState(null);     // State for error handling

    const searchParams = new URLSearchParams(locationHook.search);
    const locationParam = searchParams.get('location');
    const typeParam = searchParams.get('type');

    // Fetch data from the backend API
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Replace '/api/properties' with your actual API endpoint
                const response = await fetch('http://localhost:5000/api/properties');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                const transformedData = {};

                data.forEach(property => {
                    const location = property.location;
                    const propertyType = property.propertytype.split('/')[0].trim();

                    if (!transformedData[location]) {
                        transformedData[location] = {};
                    }

                    if (!transformedData[location][propertyType]) {
                        transformedData[location][propertyType] = [];
                    }

                    transformedData[location][propertyType].push({
                        image: `http://localhost:5000/uploads/${property.image}`,
                        // Adjust the path as needed
                        area: `${property.area} sqft`,
                        pricePerSqft: `Rs ${parseFloat(property.pricePerSqft).toLocaleString('en-IN')}`,
                        totalPrice: formatTotalPrice(property.totalPrice), // You'll need a function for this
                    });
                });

                setApiData(transformedData);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Combine static and fetched data
      const combinedData = {};

    // Add static data first
    if (listings[locationParam] && listings[locationParam][typeParam]) {
        combinedData[locationParam] = {
            ...combinedData[locationParam],
            [typeParam]: [...listings[locationParam][typeParam]] // Spread to avoid modifying original
        };
    }

      // Append fetched data
      if (apiData[locationParam] && apiData[locationParam][typeParam]) {
        if(!combinedData[locationParam]){
           combinedData[locationParam] = {};
        }
        combinedData[locationParam][typeParam] = [
            ...(combinedData[locationParam][typeParam] || []), // Ensure it's an array
            ...apiData[locationParam][typeParam]
        ];
    }
    const data = combinedData[locationParam]?.[typeParam] || [];
console.log(data)
    const handleclicke = () => {
        navigate('/input');
    };

    if (loading) {
        return <div>Loading...</div>; // Simple loading indicator
    }

    if (error) {
        return <div>Error: {error.message}</div>; // Display error message
    }

    return (
        <div>
            <div className="w-full bg-slate-800 h-[12vh] flex justify-center items-center gap-8 relative">
                <h2 className="text-white text-3xl font-bold uppercase">Sell {typeParam} in {locationParam}</h2>
                <button
                    onClick={handleclicke}
                    className="cursor-pointer font-sans text-1xl absolute right-4 px-9 py-5 bg-emerald-500 hover:bg-emerald-700 text-white font-semibold py-2 px-4 rounded-2xl shadow transition duration-200"
                >
                    <h1> <strong>ADD YOUR PROPERTY</strong> </h1>
                </button>
            </div>
            <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {data.length === 0 ? (
                    <p>No listings found for {typeParam} in {locationParam}.</p>
                ) : (
                    data.map((item, index) => (
                        <div
                            key={index}
                            className="border rounded-xl shadow hover:shadow-lg transition"
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

export default Resultsrent;
