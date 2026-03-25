const Category = require("../../../api/model/Category")
const db = require("../../../db/connect")


describe('Category', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })
    afterAll(() => {
        jest.resetAllMocks()
    })
    describe('getAll', () => {
        it('resolves with categories on a successful db query', async () => {
            const mockCategories = [
                {category_id:1,category_name:'c1'},
                {category_id:2,category_name:'c2'},
                {category_id:3,category_name:'c3'},
            ]
            jest.spyOn(db,'query').mockResolvedValueOnce({rows:mockCategories})
            const categories = await Category.getAll()
            expect(categories).toHaveLength(3)
            expect(categories[0]).toHaveProperty('category_id')
            expect(categories[0].category_name).toBe('c1')
            expect(db.query).toHaveBeenCalledWith('SELECT * FROM quiz_categories')
        })
        it('should throw an Error when no categories are found', async () =>{            
            jest.spyOn(db,'query').mockResolvedValueOnce({rows:[]})
            await expect(Category.getAll()).rejects.toThrow('No quiz categories availabe.')
        })
    })
    describe('getById', () => {
        it('resolves with a Category on successful db query', async () => {
            //Arrange
            const mockCategory = [{category_id:1,category_name:'cat1'}]
            jest.spyOn(db,'query').mockResolvedValueOnce({rows:mockCategory})
            //Act
            const result = await Category.getByID(1)
            //Assert
            expect(result).toBeInstanceOf(Category)
            expect(result.category_name).toBe('cat1')
            expect(result.category_id).toBe(1)
            expect(db.query).toHaveBeenCalledWith('SELECT * FROM quiz_categories WHERE category_id = $1',[1])
        })
        it('should throw an Error when no Category is found', async () =>{
            jest.spyOn(db,'query').mockResolvedValueOnce({rows:[]})
            await expect(Category.getByID(1)).rejects.toThrow('No quiz category available with this ID.')

        })
    })

})