const { Router } = require("express")

const categoriesController = require("../controller/categories")

const categoriesRouter = Router()

categoriesRouter.get("/", categoriesController.allCategories)
categoriesRouter.get("/:category_id", categoriesController.categoryByID)

module.exports = categoriesRouter