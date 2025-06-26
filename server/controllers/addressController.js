import Address from "../models/Address.js"


// Add Address : /api/address/add
export const addAddress = async(req, res)=>{
    try {
        const { address, userId } = req.body
        await Address.create({...address, userId})
        res.json({success: true, message: "Address added successfully"})
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
}

// Get Address : /api/address/get
export const getAddress = async(req, res)=>{
    try {
        const { userId } = req.body
        const addresses = await Address.find({userId})
        res.json({success: true, addresses})
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
}

// fetch user (for admin) : /api/address/user/id

export const getUserName = async (req, res)=>{
    try {
        const { id } = req.params;

        if(!id)
            return res.json({success: false, message: 'Adress does not exist.'});
        const user =  await Address.findById(id);

        return res.json({success: true, user})
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
}