const express = require('express');
let router = express.Router();
// let productValidator = require('../../middlewares/validators/validateProduct');
let Product = require('../../models/product');
// const validateProduct = require('../../middlewares/validators/validateProduct');

//render the add form
router.get('/products/add', async (req, res) => {
  res.render('admin/products/add', {
    layout: 'adminlayout',
  });
});

//process the add form and redirect to index page
router.post('/products/add', async (req, res) => {
  let product = new Product(req.body);
  await product.save();
  req.session.flash = { type: 'success', message: 'New Product Saved' };
  res.redirect('/admin/products');
});

router.get('/products/edit/:id', async function (req, res) {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      req.session.flash = { type: 'danger', message: 'Product not found' };
      return res.redirect('/admin/products');
    }

    res.render('admin/products/edit', {
      layout: 'adminlayout',
      product,
    });
  } catch (error) {
    console.error(error);
    req.session.flash = {
      type: 'danger',
      message: 'Error fetching product for edit',
    };
    res.redirect('/admin/products');
  }
});

router.post('/products/edit/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body);

    if (!product) {
      req.session.flash = {
        type: 'danger',
        message: 'Product not found for update',
      };
      return res.redirect('/admin/products');
    }

    req.session.flash = { type: 'success', message: 'Product Updated!' };
    res.redirect('/admin/products');
  } catch (error) {
    console.error(error);
    req.session.flash = { type: 'danger', message: 'Error updating product' };
    res.redirect('/admin/products');
  }
});

router.get('/products/delete/:id', async (req, res) => {
  let product = await Product.findByIdAndDelete(req.params.id);
  req.session.flash = { type: 'danger', message: 'product Deleted!' };
  res.redirect('/admin/products');
});

router.get('/products', async (req, res) => {
  let products = await Product.find();
  res.render('admin/products/index', {
    layout: 'adminlayout',
    products,
  });
});
module.exports = router;

