const { Product } = require("../Modal/product.schema");

async function createProduct(req, res) {
  try {
    const { name, SKU, description, category, logo, users } = req?.body;
    if (!name || !SKU || !description || !category || !logo) {
      return res.status(400).json({
        hasError: true,
        error: {
          type: "BadRequestError",
          message: "Please give all valid information",
        },
        data: null,
      });
    }
    const source = req.user?.user?.role;
    const totalUsersIncludingAUthor = users
      ? [...users, req?.user?.user?._id]
      : [req?.user?.user?._id];

    const findBySKUOrName = await Product.findOne({ $or: [{ SKU }, { name }] });

    if (findBySKUOrName) {
      return res.status(409).json({
        hasError: true,
        error: {
          type: "AlreadyExistsError",
          message: "Product name or SKU already exists",
        },
        data: null,
      });
    }
    const product = await Product.create({
      name,
      SKU,
      description,
      category,
      logo,
      source,
      users: totalUsersIncludingAUthor,
    });
    return res.status(201).json({
      hasError: false,
      error: null,
      data: product,
    });
  } catch (err) {
    return res.status(500).json({
      hasError: true,
      error: {
        type: "UnknownRuntimeError",
        message: err.message,
      },
      data: null,
    });
  }
}

async function deleteProduct(req, res) {
  const productId = req.params.id;
  const product = await Product.findByIdAndDelete(productId);
  if (!product) {
    return res.status(404).json({
      hasError: true,
      error: {
        type: "NotFoundError",
        message: "Product not found",
      },
      data: null,
    });
  }
  return res.status(200).json({
    hasError: false,
    error: null,
    data: product,
  });
}

async function EditProduct(req, res) {
  try {
    const productId = req.params.id;
    const product = await Product.findByIdAndUpdate(productId, req.body, {
      new: true,
    });
    if (!product) {
      return res.status(404).json({
        hasError: true,
        error: {
          type: "NotFoundError",
          message: "Product not found",
        },
        data: null,
      });
    }
    return res.status(200).json({
      hasError: false,
      error: null,
      data: product,
    });
  } catch (err) {
    return res.status(500).json({
      hasError: true,
      error: {
        type: "UnknownRuntimeError",
        message: err.message,
      },
      data: null,
    });
  }
}

async function getAllProducts(req, res) {
  try {
    const { user } = req;
    const { search, source, category } = req.query;
    let products;
    const query = {};

    if (user?.user?.role === "admin") {
      query.source = "admin";
    } else {
      query.users = user?._id;
    }

    if (search?.trim()) {
      query.$or = [
        { SKU: { $regex: search, $options: "i" } },
        { name: { $regex: search, $options: "i" } },
      ];
    }

    if (source?.trim()) {
      query.source = source;
    }
    const modCategory = JSON.parse(category);
    if (modCategory && modCategory.length > 0) {
      query.category = {
        $in: Array.isArray(modCategory) ? modCategory : [modCategory],
      };
    }

    products = await Product.find(query);
    const allProducts = await Product.find();
    const allCategories = Array.from(
      new Set(allProducts.map((product) => product.category))
    );
    const allSources = Array.from(
      new Set(allProducts.map((product) => product.source))
    );

    return res.status(200).json({
      hasError: false,
      error: null,
      products: products,
      categories: allCategories,
      sources: allSources,
    });
  } catch (err) {
    return res.status(500).json({
      hasError: true,
      error: {
        type: "UnknownRuntimeError",
        message: err.message,
      },
      data: null,
    });
  }
}

module.exports = {
  createProduct,
  deleteProduct,
  EditProduct,
  getAllProducts,
};
