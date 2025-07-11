import React, {useEffect, useState} from 'react'
import ProductCard from './ProductCard'
import { useAppContext } from '../context/AppContext';

const BestSeller = () => {
    const { products, navigate } = useAppContext();
    const [ dipslayedProducts, setDisplayedProducts ] = useState([])

    useEffect(() => {
      const productLimit = () =>{
        const width = window.innerWidth;
               if(width < 640){
                setDisplayedProducts(products.slice(0, 14))
               } else {
                setDisplayedProducts(products.slice(0, 20));
               }
      }
    
          productLimit();
          window.addEventListener('resize', productLimit);
          return () => window.removeEventListener('resize', productLimit);
          
    
    
        },[products])



  return (
    <div className='mt-16'>
      <p className='text-2xl md:text-3xl font-medium'>Featured products</p>
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-6 lg:grid-cols-5 mt-6'>
        {dipslayedProducts.map((product, index)=>(
            <ProductCard key={index} product={product}/>
        ))}
          
      </div>

      <div className='flex justify-center mt-4'>
          <button onClick={() => {navigate ('/products')
            scrollTo(0,0)
          }} className="text-primary underline font-medium hover:text-primary-dull cursor-pointer">
            All Products 
            
          </button>  
      </div>
    </div>
  )
}

export default BestSeller
