const db = require("../../db/connect")

class Category{

    constructor({category_id, category_name}){
        this.category_id = category_id,
        this.category_name, category_name
    }

    static async getAll(){
        const response = await db.query("SELECT * FROM quiz_categories")

        if(response.rows.length === 0){
            throw new Error("No quiz categories availabe.")
        }
        return response.rows.map(c => new Category(c))
    }

    static async getByID(category_id){
        const response = await db.query("SELECT * FROM quiz_categories WHERE category_id = $1",[category_id])

        if(response.rows.length !== 1){
            throw new Error("No quiz category available with this ID.")
        }
        return new Category(response.rows[0])
    }
}

module.exports = Category