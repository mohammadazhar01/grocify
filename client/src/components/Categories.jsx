import React, { useState , useEffect} from 'react'
import { categories } from '../assets/assets'
import { useAppContext } from '../context/AppContext'

const Categories = () => {

    const {navigate} = useAppContext()
    const [displayedCategories, setDisplayedCategories] = useState([]);
    

    useEffect(() => {
      const updateCategories = () => {
        const width = window.innerWidth;
       if(width < 640){
        setDisplayedCategories(categories.slice(0, 6))
       } else {
        setDisplayedCategories(categories);
       }
      }

      updateCategories();
      window.addEventListener('resize', updateCategories);
      return () => window.removeEventListener('resize', updateCategories);
      


    },[categories])

    

  return (
    <div className='mt-16'>
      <p className='text-2xl md:text-3xl font-medium'>Categories</p>
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 mt-6 gap-6'>

        {displayedCategories.map((category, index)=>(
            <div key={index} className='group cursor-pointer py-5 px-3 gap-2 rounded-lg flex flex-col justify-center items-center'
            style={{backgroundColor: category.bgColor}}
            onClick={()=>{
                navigate(`/products/${category.path.toLowerCase()}`);
                scrollTo(0,0)
            }}
            >
                <img src={category.image} alt={category.text} className='group-hover:scale-108 transition max-w-28'/>
                <p className='text-sm font-medium'>{category.text}</p>
            </div>
                    
        ))}

        
      </div>
      <div className='flex justify-center mt-4 lg:hidden'>
          <button onClick={() => {navigate('/allcategories')
            scrollTo(0,0)
          }} className="text-primary underline font-medium cursor-pointer">
            See All Categories
            
          </button>  
      </div>
    </div>
  )
}

export default Categories
