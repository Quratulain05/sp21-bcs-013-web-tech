const express = require('express');
let router = express.Router();
const validateProduct = require('../../middlewares/validateProduct');
var { Product, validate } = require('../../models/product');

// for single product
router.get('/:id', async (req, res) => {
  try {
    let product = await Product.findById(req.params.id);
    // agr product ghalat de dee
    if (!product)
      return res.status(400).send('Product with given Id is not present');
    return res.send(product);
  } catch (err) {
    return res.status(400).send('Invalid Id'); // if i add dummy value of record id
  }
});

// for all product
/*router.get('/', async (req, res) => {
  let products = await Product.find();
  return res.send(products);
  //return res.send(['Pen', 'Pencil']);
});
*/
// updated record
router.put('/:id', async (req, res) => {
  let product = await Product.findById(req.params.id);
  product.name = req.body.name;
  product.price = req.body.price;
  await product.save();
  return res.send(product);
});

// delete record
router.delete('/:id', async (req, res) => {
  let product = await Product.findByIdAndDelete(req.params.id);

  return res.send(product);
});

// Insert record
router.post('/', async (req, res) => {
  let { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  let product = new Product();
  product.name = req.body.name; // us waqt tak code agy nei jye ga ja tak validation true na ho jye
  product.price = req.body.price;
  await product.save();
  return res.send(product);
});

module.exports = router;
