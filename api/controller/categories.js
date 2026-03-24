const Category = require("../model/Category")

async function allCategories(req,res){
    try{
        const categories = await Category.getAll()
        res.status(200).json(categories)
    } catch(err){
        res.status(500).json({"error":err.message})
    }
}

async function categoryByID(req, res) {
    try{
        const category_id = req.params.category_id
        const category = await Category.getByID(category_id)
        res.status(200).json(category)
    } catch(err){
        res.status(500).json({"error":err.message})
    }
    
}

module.exports = { allCategories, categoryByID }