import Category from "../modals/category.modals.js";
export const test = async (req, res) => {
    try {
        // Fetch categories from the database
        const categories = await Category.find({}); // You can add conditions if needed
    
        // Send the categories to the frontend as JSON
        res.json(categories);
      } catch (error) {
        console.error('Error fetching categories and all:', error);
        res.status(500).json({ error: 'Failed to fetch categories' });
      }
};