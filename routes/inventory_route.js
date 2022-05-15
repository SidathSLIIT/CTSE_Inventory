const express = require("express");
// const upload = require('../middleware/upload');
const router = express.Router();
const inventoryModel = require("../models/Inventory");
const Error = require("../utils/error_response");

//Insert
router.post("/inventory/inventory-insert", async (req, res, next) => {
  const {
    inventoryName,
    inventoryCount,
    inventoryPrice,
    inventoryDesc,
    inventoryImage,
  } = req.body;

  try {
    const inventory = await inventoryModel.create({
      inventoryName,
      inventoryCount,
      inventoryPrice,
      inventoryDesc,
      inventoryImage,
    });

    inventory.save();
    return res.status(200).json({
      success: "Succussfully added.",
    });
  } catch (error) {
    next(error);
  }
});

//Retrive
router.get("/inventory/inventories", (req, res, next) => {
  inventoryModel.find().exec((err, inventories) => {
    if (err) {
      return next(new Error("Can not find any inventory!", 400));
    }
    return res.status(200).json({
      success: true,
      inventories,
    });
  });
});

// Retrive specific data by name
router.get("/inventory/inventorydata/:id", (req, res,next) => {
  const inventoryid = req.params.id;
  inventoryModel.findById(inventoryid, (err, inventory) => {
    if (err) {
      return next(new Error("Can not find a inventory with this id...!", 400));
    }
    return res.status(200).json({
      success: true,
      inventory,
    });
  });
});

//Update
router.put("/inventory/updateinventory/:id", (req, res, next) => {
  inventoryModel.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    (err, inventory) => {
      if (err) {
        return next(new Error("Can not update the data!", 400));
      }

      return res.status(200).json({
        success: "Succussfully updated.",
      });
    }
  );
});

//Delete
router.delete("/inventory/deleteinventory/:id", (req, res, next) => {
  inventoryModel
    .findByIdAndRemove(req.params.id)
    .exec((err, deleteinventory) => {
      if (err) {
        return next(new Error("Can not delete the data", 400));
      }
      return res.status(200).json({
        success: [true, " Deleted successfully!"],
        deleteinventory,
      });
    });
});

module.exports = router;
