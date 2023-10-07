import Category from "../modals/category.modals.js";

export const categoryController = async (req, res) => {
  try {
    const { name, subcategories } = req.body;

    const newCategory = new Category({
      name,
      subcategories: Array.isArray(subcategories) ? subcategories : [],
    });

    const savedCategory = await newCategory.save();

    res.status(201).json(savedCategory);
  } catch (error) {
    console.error('Error creating category:', error);
    res.status(500).json({ error: 'Failed to create category' });
  }
}
export const fetchCategory=async(req,res)=>{
  try{
    await Category.find({}).then(()=>{
      
    })


  }catch{

  }

};
