const Product = require("../models/ProductData");        
                                                           
const getProducts = async (req, res) => {              
  const products = await Product.find();           
                                             
  res.json(products);                          
};                             
 const getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(404).json({
      message: "Product not found",
    });
  }
  
  res.json(product);
};               
                                                         
const createProduct = async (req, res) => {                
  try {                                              
    const newProduct = await Product.create(req.body);                 
                                                         
    res.status(201).json(newProduct);                 
  } catch (error) {                   
    res.status(400).json({              
      message: "Invalid product data",              
      error: error.message,                      
    });                               
  }                     
};                

const updateProduct = async (req, res) => {
  const product = await Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  );

  if (!product) {
    return res.status(404).json({
      message: "Product not found",
    });
  }

  res.json(product);
};

const deleteProduct = async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);

  if (!product) {
    return res.status(404).json({
      message: "Product not found",
    });
  }

  res.json(product);
};


                              


module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};


