const { describe } = require("node:test")
const categoriesController = require("../../../api/controller/categories")
const Category = require("../../../api/model/Category")

// Mocking response methods
const mockSend = jest.fn()
const mockJson = jest.fn()
const mockEnd = jest.fn()

// we are mocking .send(), .json() and .end()
const mockStatus = jest.fn(() => ({ 
  send: mockSend, 
  json: mockJson, 
  end: mockEnd 
}));

const mockRes = { status: mockStatus };

describe("Category Controller", () => {
    beforeEach(() => {jest.clearAllMocks()})

    afterAll(() => {jest.resetAllMocks()})

    describe("allCategories", () => {
        it("", async () => {
            const mockCategories = ["c1", "c2", "c3"]
            jest.spyOn(Category, "getAll").mockResolvedValueOnce(mockCategories)

            await categoriesController.allCategories(null, mockRes)

            expect(Category.getAll).toHaveBeenCalledTimes(1)
            expect(mockStatus).toHaveBeenCalledWith(200)
            expect(mockJson).toHaveBeenCalledWith(mockCategories)
        })

        it("returns an error upon failure", async () => {
            jest.spyOn(Category, "getAll").mockRejectedValue(new Error("No quiz categories availabe."))

            await categoriesController.allCategories(null, mockRes)
            expect(Category.getAll).toHaveBeenCalled()
            expect(mockStatus).toHaveBeenCalledWith(500)
            expect(mockJson).toHaveBeenCalledWith({error:"No quiz categories availabe."})
        })
    })

    describe("getByID", () => {
        it("returns the name of a category", async () => {
            const mockCategory = "c1"
            mockReq = {params: {category_id: 1}}
            jest.spyOn(Category, "getByID").mockResolvedValueOnce(mockCategory)


            await categoriesController.categoryByID(mockReq, mockRes)

            expect(Category.getByID).toHaveBeenCalledWith(1)
            expect(mockStatus).toHaveBeenCalledWith(200)
            expect(mockJson).toHaveBeenCalledWith(mockCategory)
        })

        it("returns an error upon failure", async () => {
            jest.spyOn(Category, "getByID").mockRejectedValue(new Error("No categories by this ID"))

            await categoriesController.categoryByID(null, mockRes)
            expect(Category.getByID).toHaveBeenCalled()
            expect(mockStatus).toHaveBeenCalledWith(500)
            expect(mockJson).toHaveBeenCalledWith({error:"No categories by this ID"})
        })
    })
})