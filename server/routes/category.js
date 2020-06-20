const express = require("express");
const router = express.Router();
const { Category } = require("../models/Category");
const multer = require("multer");
const path = require("path");

const { auth } = require("../middleware/auth");

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads/"));
    // cb(null, 'uploads/')
  },
  filename: (req, file, cb) => {
    cb(
      null,
      new Date().toISOString().replace(/:/g, "-") + "-" + file.originalname
    );
  },
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    if (ext !== ".jpg" || ext !== ".png") {
      return cb(res.status(400).end("only jpg, png are allowed"), false);
    }
    cb(null, true);
  },
});

var upload = multer({ storage: storage }).single("file");

//=================================
//             Category
//=================================

router.post("/uploadImage", auth, (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return res.json({ success: false, err });
    }

    return res.json({
      success: true,
      image: "uploads/" + res.req.file.filename,
      fileName: res.req.file.filename,
    });
  });
});

//================ INSERT =================
router.post("/", auth, (req, res) => {
  //save all the data we got from the client into the DB
  if (req.body.parent_id) {
    Category.findById(req.body.parent_id, (err, doc) => {
      if (!err) {
        const category = new Category(req.body);
        category.level = doc.level + 1;
        category.save((err) => {
          if (err) return res.status(400).json({ success: false, err });
          return res.status(200).json({ success: true });
        });
      }
    });
  } else {
    const category = new Category(req.body);

    category.save((err) => {
      if (err) return res.status(400).json({ success: false, err });
      return res.status(200).json({ success: true });
    });
  }
});

//================ GET ALL =================
let cat = [];
async function pushArray1(arr) {
  cat.push(arr);
  await getsubcategories(arr);

  return cat;
}
function getsubcategories(category) {
  return new Promise((resolve, reject) => {
    Category.find({ parent_id: category._id }).exec((err, categories) => {
      let m;
      if (err) reject(err);
      else {
        categories.forEach(function (child) {
          var minus = "";
          for (var i = 0; i < child.level; i++) {
            minus = "- " + minus;
          }
          child["name"] = minus + child.name;

          m = pushArray1(child);
          // cat.push(child);
          // console.log("ch1",cat,child)
          // getsubcategories(child);
        });
        resolve(m);
      }
    });
  });

  //------------------------------------------------------

  // var myPromise1 = () => {
  //   return new Promise((resolve, reject) => {
  //     Category.find({ parent_id: category._id }).exec((err, categories) => {
  //       err ? reject(err) : resolve(categories);
  //     });
  //   });
  // };
  // var callMyPromise1 = async () => {
  //   var categories = await myPromise1();
  //   categories.forEach(function (child) {
  //     var minus = "";
  //     for (var i = 0; i < child.level; i++) {
  //       minus = "- " + minus;
  //     }
  //     child["name"] = minus + child.name;

  //     cat.push(child);
  //     // console.log("ch1",cat,child)
  //     getsubcategories(child);
  //   });

  //   return cat;
  // };
  // callMyPromise1().then(function (result) {
  //   return cat;
  // });

  //------------------------------------------------------

  // let cat1 = [];
  // Category.find({ parent_id: category._id }).exec((err, categories) => {
  //   categories.forEach(function (child) {
  //     var i;
  //     var minus = "";
  //     for (i = 0; i < child.level; i++) {
  //       minus = "- " + minus;
  //     }
  //     child["name"] = minus + child.name;
  //     // child.name = minus + child.name
  //     cat1.push(child);
  //     cat1.concat(getsubcategories(child));
  //     console.log("ch", cat1);
  //     return cat1;
  //     console.log(child);
  //   });
  //   // console.log(categories)
  // });
}

async function pushArray(arr) {
  for (let i = 0; i < arr.length; i++) {
    cat.push(arr[i]);
    await getsubcategories(arr[i]);
  }
  return cat;
}
router.post("/getCategories", (req, res) => {
  resultCat = [];
  Category.find({ parent_id: null })
    .sort({ _id: -1 })
    .exec((err, categories) => {
      var myPromise = () => {
        return new Promise((resolve, reject) => {
          resultCat = pushArray(categories);
          resolve(resultCat);
        });
      };
      var callMyPromise = async () => {
        var result = await myPromise();

        return result;
      };
      callMyPromise().then(function (result) {
        cat = [];
        res.status(200).json({
          success: true,
          result,
          postSize: cat.length,
        });
      });

      // err ? reject(err) : resolve(categories);
    });

  // Category.find()
  //   .sort({ _id: -1 })
  //   .exec((err, categories) => {
  //     if (err) return res.status(400).json({ success: false, err });
  //     categories.forEach(function (category) {
  //       var i;
  //       var minus = "";
  //       for (i = 0; i < category.level; i++) {
  //         minus = "- " + minus;
  //       }
  //       category["name"] = minus + category.name;

  //       cat.push(category);
  //     });

  // Category.find({ parent_id: null })
  //   .sort({ _id: -1 })
  //   .exec((err, categories_nn) => {
  //     categories_nn.forEach(function (category) {

  //       resultCat.push(category);
  //       let temparr = getsubcategories(category);
  //       resultCat.concat(temparr);
  //       console.log("temp",tempar)

  //       // for (let i = 0; i < cat.length; i++) {
  //       //   let str1 = String(cat[i].parent_id);
  //       //   let str2 = String(category._id);
  //       //   console.log(i, str1, str2, str1.localeCompare(str2));
  //       //   if (str1.localeCompare(str2) == 0) {
  //       //     console.log("yes");
  //       //     resultCat.push(cat[i]);
  //       //   }
  //       // }
  //       // resultCat1 = cat.filter(
  //       //   (item) => item.parent_id == category._id
  //       // );
  //       // var resultCat = resultCat1.concat(resultCat);

  //     });
  //     res.status(200).json({
  //       resultCat,
  //       success: true,
  //       categories,
  //       postSize: categories.length,
  //     });
  //   });
  // });
});

// router.post("/getCategories", (req, res) => {

//   let order = req.body.order ? req.body.order : "desc";
//   let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
//   let limit = req.body.limit ? parseInt(req.body.limit) : 100;
//   let skip = parseInt(req.body.skip);

//   let findArgs = {};
//   let term = req.body.searchTerm;

//   for (let key in req.body.filters) {

//     if (req.body.filters[key].length > 0) {
//       if (key === "price") {
//         findArgs[key] = {
//           $gte: req.body.filters[key][0],
//           $lte: req.body.filters[key][1]
//         }
//       } else {
//         findArgs[key] = req.body.filters[key];
//       }
//     }
//   }

//   console.log(findArgs)

//   if (term) {
//     Category.find(findArgs)
//       .find({$text: {$search: term}})
//       .populate("writer")
//       .sort([[sortBy, order]])
//       .skip(skip)
//       .limit(limit)
//       .exec((err, categories) => {
//         if (err) return res.status(400).json({success: false, err})
//         res.status(200).json({success: true, categories, postSize: categories.length})
//       })
//   } else {
//     Category.find(findArgs)
//       .populate("writer")
//       .sort([[sortBy, order]])
//       .skip(skip)
//       .limit(limit)
//       .exec((err, categories) => {
//         if (err) return res.status(400).json({success: false, err})
//         res.status(200).json({success: true, categories, postSize: categories.length})
//       })
//   }

// });

//?id=${categoryId}&type=single
//id=12121212,121212,1212121   type=array
router.get("/categories_by_id", (req, res) => {
  let type = req.query.type;
  let categoryIds = req.query.id;

  if (type === "array") {
    let ids = req.query.id.split(",");
    categoryIds = [];
    categoryIds = ids.map((item) => {
      return item;
    });
  }

  //we need to find the category information that belong to category Id
  Category.find({ _id: { $in: categoryIds } })
    .populate("writer")
    .exec((err, category) => {
      if (err) return res.status(400).send(err);
      return res.status(200).send(category);
    });
});

//================ UPDATE =================
router.put("/", auth, (req, res) => {
  if (req.body.parent_id) {
    Category.findById(req.body.parent_id, (err, doc) => {
      if (!err) {
        const category = new Category(req.body);
        category.level = doc.level + 1;

        Category.findByIdAndUpdate(
          req.body._id,
          category,
          { new: false },
          (err, doc) => {
            //find by id and update it
            if (!err) {
              res.json({
                success: true,
                message: "Category updated successfully",
              });
            } else {
              res.json({ success: false, message: "Failed :" + err });
            }
          }
        );
      }
    });
  } else {
    Category.findByIdAndUpdate(
      req.body._id,
      req.body,
      { new: false },
      (err, doc) => {
        //find by id and update it
        if (!err) {
          res.json({ success: true, message: "Category updated successfully" });
        } else {
          res.json({ success: false, message: "Failed :" + err });
        }
      }
    );
    
  }
});

//================ GET BY ID =================
router.get("/:id", (req, res) => {
  Category.findById(req.params.id, (err, doc) => {
    if (!err) {
      res.json(doc);
    }
  });
});

//================ DELETE =================
router.delete("/:id", (req, res) => {
  Category.findByIdAndRemove(req.params.id, (err, doc) => {
    if (!err) {
      res.json({ success: true, message: "Category Deleted Successfully!!" });
    } else {
      res.json({
        success: false,
        message: "Error in removing Category :" + err,
      });
    }
  });
});

module.exports = router;
