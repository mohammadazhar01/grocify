import React, { useEffect } from 'react'
import { useAppContext } from '../context/AppContext';
import { assets } from '../assets/assets'

//This search box is only for smaller and mid screen devices

const SearchBox = () =>{
    const {setSearchQuery, searchQuery,navigate } = useAppContext ();
  
    useEffect (()=>{
      if(searchQuery.length > 0){
        navigate ("/products")
      }
    },[searchQuery])

    return (
        <div className='m-auto px-5'>
          <div className="lg:hidden w-full mt-3 flex md:flex items-center w-full text-sm gap-2 border border-gray-300 px-3 rounded-full focus-within:border-primary transition-all duration-200">
          <input onChange={(e)=> setSearchQuery(e.target.value)} className="py-2 w-full bg-transparent outline-none placeholder-gray-500" type="text" placeholder="Search products" />
          <img src={assets.search_icon} alt='search' className='w-4 h-4'/>
      </div>
    </div>
    )
}
export default SearchBox