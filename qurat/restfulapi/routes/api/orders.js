const express = require('express');
let router = express.Router();
const Order = require('../../models/order');
router.delete('/api/order/:id', async function (req, res) {
  let record = await Order.findByIdAndDelete(req.params.id);
  res.send(record);
});
router.get('/api/order/:id', async function (req, res) {
  let record = await Order.findById(req.params.id);
  res.send(record);
});
router.patch('/api/order/:id', async function (req, res) {
  let record = await Order.findById(req.params.id);
  record.name = req.body.name;
  record.price = req.body.price;
  await record.save();
  res.send(record);
});
router.get('/api/order', async function (req, res) {
  let records = await Order.find();
  res.send(records);
});
router.post('/api/order', async function (req, res) {
  let record = new Order(req.body);
  await record.save();
  res.send(record);
});
module.exports = router;
