import React from 'react'
import { useContext,useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../App';
import Footer from './Footer'



function Home() {
  const { isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState('');
  const [isBuy,setisBuy]=useState(false);
  const [isRent,setisRent]=useState(false);
  const[error,seterror]=useState('');
  const [location, setLocation] = useState("Vijayanagr");
  const [propertyType, setPropertyType] = useState("Apartment");
  

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  }
  const handleBuy = () => {
    if (isLoggedIn) {
      setisBuy(true)
      setisRent(false)
      seterror('')
    } else {
      navigate('/signin');
    }
  };

  const handleRent = () => {
    if (isLoggedIn) {
      setisRent(true)
      setisBuy(false)
      seterror('')
    } else {
      navigate('/signin');
    }

  };
  const Handlesubmit=(e)=>{
    e.preventDefault();
    if(!isBuy&&!isRent){
      seterror('please choose one among buy or rent')
      return;
    }
    else{
      if(isBuy){
        navigate(`/resultsbuy?location=${location}&type=${propertyType}`);
      }
      else{
        navigate(`/resultsrent?location=${location}&type=${propertyType}`);
      }
     
    }
  }
  return (
  
       <div>
      <div className="im bg-[url('./icons/villa.jpg')] bg-cover bg-center h-[86vh] w-full flex  gap-8 justify-center items-center">
      <div className=' mx-8'>
        <div className= 'flex-col bg-slate-500 bg-opacity-50 w-[25vw] rounded-xl border border-10px border-black'>
        
          <div className='flex gap-5'>
            <button onClick={handleBuy}  className={`${isBuy?'bg-black':'bg-blue-600'}  hover:bg-blue-900 text-white font-bold rounded-lg  w-1/2  h-[6vh] text-lg transition duration-0`}>Buy</button>
            <button onClick={handleRent}  className={` ${isRent?'bg-black':'bg-blue-600'} hover:bg-blue-900 text-white font-bold rounded-lg w-1/2  h-[6vh] text-lg transition duration-0`}>Rent</button>
          </div>
          <form  onSubmit={Handlesubmit}>
          <div className="p-4">
            
      <label className="block text-lg font-medium mb-2 text-white text-bold">Choose the location:</label>
    
      <select required
        
         onChange={(e) => setLocation(e.target.value)}
        className="border border-gray-300 rounded-md w-[20vw] h-[8vh] text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="" disabled>Select an option</option>
        <option value="Vijayanagr">Vijayanagr</option>
        <option value="Gokulam">Gokulam</option>
        <option value="Jayalakshmipuram">Jayalakshmipuram </option>
        <option value="Saraswathipuram">Saraswathipuram </option>
        <option value="Hebbal">Hebbal </option>
      </select>
    </div>
    <div className="p-4">
      <label className="block text-lg font-medium mb-2 text-white text-bold">Choose the property type:</label>
      <select required
        
        onChange={(e) => setPropertyType(e.target.value)}
        className="border border-gray-300 rounded-md w-[20vw] h-[8vh] text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="" disabled>Select an option</option>
        <option value="Apartment">Apartment</option>
        <option value="Row House">Row House</option>
        <option value="Commercial Plot">Commercial Plot</option>
        <option value="Shop">Shop </option>
      </select>
    </div>
    <button   type='submit'  className='bg-violet-400 hover:bg-violet-900 text-white font-bold rounded-xl text-2xl transition duration-200 w-full h-[10vh]'>Search</button>
    {error && <p className="text-red-500 text-xl mb-2">{error}</p>}
    </form>
        </div>
        <div></div>
      </div>
      <div className='flex-col w-[60vw]'>
      <div className=' text-black  text-bold font-bold text-5xl leading-tight '> Let's Find Your Perfect Property</div>
      <div className='text-black text-1xl font-serif'>Welcome to FindMyAsset – your trusted destination for buying, selling, or renting land and properties across India. Whether you're a buyer looking for your dream plot, a seller wanting the right exposure, or an agent seeking serious clients, FindMyAsset offers verified listings, powerful search tools, and a smooth, user-friendly experience.
      Start your real estate journey with confidence — only at FindMyAsset</div>
      </div>
      </div>
      <Footer/>
    </div>
    
  )
}

export default Home
