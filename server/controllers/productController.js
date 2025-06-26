import { v2 as cloudinary } from "cloudinary"
import Product from "../models/Product.js"

// Add Product : /api/product/add
export const addProduct = async (req, res)=>{
    try {
        let productData = JSON.parse(req.body.productData)

        const images = req.files

        let imagesUrl = await Promise.all(
            images.map(async (item)=>{
                let result = await cloudinary.uploader.upload(item.path, {resource_type: 'image'});
                return result.secure_url
            })
        )

        await Product.create({...productData, image: imagesUrl})

        res.json({success: true, message: "Product Added"})

    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })
    }
}

// Get Product : /api/product/list
export const productList = async (req, res)=>{
    try {
        const products = await Product.find({})
        res.json({success: true, products})
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })
    }
}

// Get single Product : /api/product/id
export const productById = async (req, res)=>{
    try {
        const { id } = req.body
        const product = await Product.findById(id)
        res.json({success: true, product})
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })
    }
}

// Change Product inStock : /api/product/stock
export const changeStock = async (req, res)=>{
    try {
        const { id, inStock } = req.body
        await Product.findByIdAndUpdate(id, {inStock})
        res.json({success: true, message: "Stock Updated"})
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })
    }
}

//Update product: /api/product/update/id
export const updateProduct = async (req, res)=>{
    try {
        const {id} = req.params
        let productData = req.body.productData ? JSON.parse(req.body.productData):{};
        const images = req.files;
        const imageMetaData = JSON.parse(req.body.imageMetaData);
        let imagesUrl = []
        let index = 0

        console.log(imageMetaData)

        for( let meta of imageMetaData){
            if(meta.type == 'file'){
                const result = await cloudinary.uploader.upload(images[index].path, { 
                    resource_type: 'image'})
                imagesUrl[meta.i] = result.secure_url;
                index++;
            }else if (meta.type == 'url') {
                imagesUrl[meta.i] = meta.url;
            }
        }

        console.log("imageurl :-"+imagesUrl)


      const updateProduct = await Product.findByIdAndUpdate(id, {...productData, image:imagesUrl.length ? imagesUrl : productData.image},
        { new:true, runValidators:true}
      );

      if(!updateProduct) {
        return res.status(404).json({success:false, message:'product not found'});
      }

      res.json({success:true, message: 'Product Updated', product: updateProduct});

    } catch (error) {
        console.error(error.message);
        res.status(500).json({success:false, message: error.message});
    }
}


//Update product: /api/product/delete/id
export const deleteProduct = async (req,res)=>{
    try {
        const {id} = req.params
        const deleted = await Product.findByIdAndDelete(id);
        console.log(deleted)
        if(!deleted) {
            return res.status(404).json({success:false, message:"Product not found"});
        }

        res.json({success:true, message:"Product deleted successfully"})
    } catch (error) {
        console.error(error.message);
        res.status(500).json({success:false, message: error.message});
    } 
}