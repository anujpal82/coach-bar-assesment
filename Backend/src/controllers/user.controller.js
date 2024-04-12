const User = require("../Modal/user.schema");

async function updateUser(req, res) {
  try {
    const userId = req.user.user._id;
    if (!userId) {
      return res.status(404).json({
        hasError: true,
        error: {
          type: "NotFoundError",
          message: "userId not found",
        },
        data: null,
      });
    }

    const updates = Object.keys(req.body);
    const allowedUpdates = ["name", "email", "role"]; // Add other fields you allow to update
    const isValidOperation = updates.every((update) =>
      allowedUpdates.includes(update)
    );

    if (!isValidOperation) {
      return res.status(400).json({
        hasError: true,
        error: {
          type: "BadRequestError",
          message: "Invalid updates",
        },
        data: null,
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        hasError: true,
        error: {
          type: "NotFoundError",
          message: "User not found",
        },
        data: null,
      });
    }

    updates.forEach((update) => (user[update] = req.body[update]));
    const updatedUser = await user.save();

    res.status(200).json({
      hasError: false,
      error: null,
      data: updatedUser,
    });
  } catch (err) {
    return res.status(500).json({
      hasError: true,
      error: {
        type: err.name,
        message: err.message,
      },
      data: null,
    });
  }
}

async function lookupAllUsers(req, res) {
  try {
    const allUsers = await User.find();
    const lookup = allUsers?.map((user) => {
      return {
        value: user._id,
        label: user.name,
      };
    });
    res.status(200).json({
      hasError: false,
      error: null,
      data: lookup,
    });
  } catch (err) {
    return res.status(500).json({
      hasError: true,
      error: {
        type: err.name,
        message: err.message,
      },
      data: null,
    });
  }
}

module.exports = {
  updateUser,
  lookupAllUsers,
};
