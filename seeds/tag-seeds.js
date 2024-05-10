const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  try{
    const allTags = await Tag.findAll({
      include: [{ 
        model: Product, 
        through: ProductTag 
      }]
    })

    res.json(allTags)

  } catch(err) {
    console.log(err)
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  const id = req.params.id
  try{
    const tag = await Tag.findByPk(id, {
      include: [{ 
        model: Product, 
        through: ProductTag 
      }]
    })

    if(!tag){
      return res.json({message: 'Tag not found'})
    }

    res.json(tag)

  } catch(err) {
    console.log(err)
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try{
    const newTag = req.body

    if(!newTag){
      return res.json({message: 'No Tag entered'})
    }
    
    const addTag = await Tag.create(newTag)
    res.json(addTag)

  } catch(err) {
    console.log(err)
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  const tag_id = req.params.id
  try{
    const newTagName = req.body.tag_name

    const tag = await Tag.findByPk(tag_id)
    if(!tag) {
      return res.json({message: 'Tag not found'})
    }

    const updateTag = await Tag.update({tag_name: newTagName}, {
      where: {
        id: tag_id
      }
    })
    res.json(updateTag)

  } catch(err) {
    console.log(err)
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  const id = req.params.id
  try {
    const tag = await Tag.findByPk(id)

    if (tag) {
      tag.destroy()
      return res.json({
        message: 'Tag deleted successfully'
      })
    }

    res.status(400).json({
      message: 'Tag does not exist'
    })
  } catch (err) {
    console.log(err)
  }
});

module.exports = router;