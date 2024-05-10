const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  try{
    const allCategories = await Category.findAll({
      include: Product
    })

    res.json(allCategories)

  } catch(err) {
    console.log(err)
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  try{
    const id = req.params.id
    const category = await Category.findByPk(id, {
      include: Product
    })

    if(!category){
      return res.json({message: 'Category entered does not exist'})
    }

    res.json(category)

  } catch(err) {
    console.log(err)
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try{
    const newCategory = req.body

    if(!newCategory){
      return res.json({message: 'Please enter a Catagory'})
    }

    const addCategory = await Category.create(newCategory)
    res.json(addCategory)

  } catch(err) {
    console.log(err)
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  const id = req.params.id
  const updateName = req.body
  try{
    const category = await Category.findByPk(id)

    if(!category){
      return res.json({message: 'Category not found'})
    }

    await category.update(updateName)

    res.json({message: 'Category update successfully'})
  } catch(err) {
    console.log(err)
    res.status(400).json({message: 'Internal server error'})
  }
  
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  const id = req.params.id

  try {
    const category = await Category.findByPk(id)

    if (!category) {
      return res.json({
        message: 'Category Not Found'
      })
    }

    await category.destroy()

    res.json({message: 'Category deleted successfully'})
  } catch (err) {
    console.log(err)
    res.status(400).json({message: 'Category does not exist'})
  }
});

module.exports = router;