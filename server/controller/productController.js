
import Category from "../modals/category.modals.js";
import Product from "../modals/product.modals.js";
export const test = async (req, res) => {
  try {
   
    const categories = await Category.find({});

   
    res.json(categories);
  } catch (error) {
    console.error('Error fetching categories and all:', error);
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
};
export const addProduct = async (req, res) => {
  try {
    const { name, description, price, category, subcategory, nestedSubcategory } = req.body;
    console.log(req.body);
    const newProduct = new Product({
      name,
      description,
      price,
      category,
      subcategory,
      nestedSubcategory,
    });

    const savedProduct = await newProduct.save();

    res.status(201).json(savedProduct);
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ error: 'Failed to create product' });
  }

}
export const productList = async(req, res) => {

  try {
    const { category, subcategory, nestedSubcategory } = req.query;

    const filter = {};

    if (category) {
      filter.category = category;
    }

    if (subcategory) {
      filter.subcategory = subcategory;
    }

    if (nestedSubcategory) {
      filter.nestedSubcategory = nestedSubcategory;
    }

    const products = await Product.find(filter);

    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};


