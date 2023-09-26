const router = require('express').Router();
const cloudinary = require('cloudinary');
const fs = require ('fs')
const auth = require('../middlewares/auth');
const authAdmin = require('../middlewares/authAdmin')

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret:process.env.CLOUD_API_SECRET_KEY

})

router.post('/upload', auth, authAdmin, (req,res) =>{
    try {
        if(!req.files || Object.keys(req.files).length === 0)
            return res.status(400).json({msg: 'No files were uploaded'})

        const files= req.files.files;

        console.log(files)
        files.forEach((file) => {
        if( files[0].mimetype !== 'image/jpeg' && files[0].mimetype !== 'image/png'){
            removeTemp(files[0].tempFilePath)
            return res.status(400).json({msg: 'file format is incorrect'})
        }})
    

        cloudinary.v2.uploader.upload(files[0].tempFilePath, {folder:"test"},
            async(err,result)=>{
                if(err) throw err;
                removeTemp(files[0].tempFilePath)
                res.json({public_id: result.public_id, url: result.secure_url})
        })

        // return res.status(200).json({msg: 'Successfully'})
        
    } catch (err) {
        return res.status(400).json({msg: err.message})
    }
})

router.post('/destroy', auth, authAdmin, (req,res)=>{
    try {
        const {public_id} = req.body; 
        if(!public_id) return res.status(400).json({msg:'No image selected'})

        cloudinary.v2.uploader.destroy(public_id, async(err, result)=>{
            if(err) throw err;

            res.json({msg: 'Deleted image successfully'})
        })
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
})

const removeTemp = (path) =>{
    fs.unlink(path,err =>{
        if(err) throw err;
    })
}

module.exports= router;