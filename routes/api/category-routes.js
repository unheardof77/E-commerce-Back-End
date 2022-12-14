const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const catData = await Category.findAll({include:[{model: Product}]});
    res.status(200).json(catData);
  } catch (err) {
    res.status(500).json(err);
  };
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const catData = await Category.findByPk(req.params.id, {include:[{model: Product}]});

    if(!catData) return res.status(404).json({message:"No category found with that id."});

    res.status(200).json(catData);
  } catch (err) {
    res.status(500).json(err);
  };
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const data = await Category.create(req.body);
    res.status(200).json(data);
  } catch(err){
    res.status(500).json(err);
  };
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try{
    const updatedCat = await Category.update(req.body, {where:{id: req.params.id}});
    if(updatedCat == 0) return res.status(404).json({message:"No category found with that id."});
    res.status(200).json(updatedCat);
  }catch(err){
    res.status(500).json(err);
  };
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try{
    const deletedCat = await Category.destroy({where:{id:req.params.id}});
    if(deletedCat == 0) return res.status(404).json({message:"No category found with that id."});
    res.status(200).json(deletedCat);
  }catch(err){
    res.status(500).json(err);
  };
});

module.exports = router;
