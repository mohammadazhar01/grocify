import React, { useState } from 'react'
import { assets, categories } from '../../assets/assets';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';

const UpdateProduct = () => {

    const {id} = useParams()

    const {axios,products,navigate,fetchProducts} = useAppContext()

    const product = products.find((item)=> item._id === id);

    const [files, setFiles] = useState(product.image);
    const [name, setName] = useState(product.name);
    const [description, setDescription] = useState(product.description.join('\n'));
    const [category, setCategory] = useState(product.category);
    const [price, setPrice] = useState(product.price);
    
    const [offerPrice, setOfferPrice] = useState(product.offerPrice);

    const onSubmitHandler = async (event) => {
        try {
            event.preventDefault();

            
            const productData = {
                name,
                description: description.split('\n'),
                category,
                price,
                offerPrice
            }

            const formData = new FormData();
            formData.append('productData', JSON.stringify(productData));

            const imageMetaData = [];

            console.log(files)

            for (let i = 0; i < files.length; i++) {
                if(files[i] instanceof File) {
                    formData.append('images',files[i]);
                    imageMetaData.push({type:'file',i});
                } else  {
                    imageMetaData.push({type:'url',i,url:files[i]});
                    console.log("url")
                }
            }

            console.log(imageMetaData)
            

            formData.append('imageMetaData', JSON.stringify(imageMetaData))

            const {data} = await axios.put(`/api/product/update/${id}`, formData)

            if (data.success){
                toast.success(data.message);
                fetchProducts();
                navigate('/seller/product-list')
            }else{
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
        }
        
      }
      

  return (
    <div className="no-scrollbar flex-1 h-[95vh] overflow-y-scroll flex flex-col justify-between">
            <form onSubmit={onSubmitHandler} className="md:p-10 p-4 space-y-5 max-w-lg">
                <div>
                    <p className="text-base font-medium">Product Images</p>
                    <div className="flex flex-wrap items-center gap-3 mt-2">
                        {Array(4).fill('').map((_, index) => (
                                <img className="max-w-24 cursor-pointer" src={product.image[index]} key={index} width={100} height={100} />
                        ))}
                    </div>
                </div>

                <div>
                    <div className="flex flex-wrap items-center gap-3 mt-2">
                        {Array(4).fill('').map((_, index) => (
                            <label key={index} htmlFor={`image${index}`}>

                                <input onChange={(e)=>{
                                    const selectedFile = e.target.files[0];
                                    const updatedFiles = [...files];
                                    if (selectedFile){
                                        updatedFiles[index] = selectedFile;
                                    }
                                    setFiles(updatedFiles)

                                    console.log(files)
                                }}
                                type="file" id={`image${index}`} hidden />

                                <img className="max-w-24 cursor-pointer" src={files[index] ? files[index] instanceof File ? URL.createObjectURL(files[index]) : files[index] : assets.update_img} alt="uploadArea" width={100} height={100} />
                            </label>
                        ))}
                    </div>
                </div>
                <div className="flex flex-col gap-1 max-w-md">
                    <label className="text-base font-medium" htmlFor="product-name">Product Name</label>
                    <input onChange={(e)=> setName(e.target.value)} name={name} value={name}
                     id="product-name" type="text" placeholder="Type here" className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40" required />
                </div>
                <div className="flex flex-col gap-1 max-w-md">
                    <label className="text-base font-medium" htmlFor="product-description">Product Description</label>
                    <textarea onChange={(e)=> setDescription(e.target.value)} value={description}
                     id="product-description" rows={4} className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40 resize-none" placeholder="Type here"></textarea>
                </div>
                <div className="w-full flex flex-col gap-1">
                    <label className="text-base font-medium" htmlFor="category">Category</label>
                    <select onChange={(e)=> setCategory(e.target.value)} value={category} 
                    id="category" className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40">
                        <option value="">Select Category</option>
                        {categories.map((item, index)=>(
                            <option key={index} value={item.path}>{item.path}</option>
                        ))}
                    </select>
                </div>
                <div className="flex items-center gap-5 flex-wrap">
                    <div className="flex-1 flex flex-col gap-1 w-32">
                        <label className="text-base font-medium" htmlFor="product-price">Product Price</label>
                        <input onChange={(e)=> setPrice(e.target.value)} value={price}
                         id="product-price" type="number" placeholder="0" className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40" required />
                    </div>
                    <div className="flex-1 flex flex-col gap-1 w-32">
                        <label className="text-base font-medium" htmlFor="offer-price">Offer Price</label>
                        <input onChange={(e)=> setOfferPrice(e.target.value)} value={offerPrice} 
                        id="offer-price" type="number" placeholder="0" className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40" required />
                    </div>
                </div>
                <button className="px-8 py-2.5 bg-primary text-white font-medium rounded cursor-pointer">Update</button>
            </form>
        </div>
  )
}

export default UpdateProduct
