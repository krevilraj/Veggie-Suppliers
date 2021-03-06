const express = require('express');
const router = express.Router();
const {Product} = require("../models/Product");
const multer = require('multer');
const path = require("path");

const {auth} = require("../middleware/auth");

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads/'))
    // cb(null, 'uploads/')
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname);
  },
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname)
    if (ext !== '.jpg' || ext !== '.png') {
      return cb(res.status(400).end('only jpg, png are allowed'), false);
    }
    cb(null, true)
  }
})

var upload = multer({storage: storage}).single("file")


//=================================
//             Product
//=================================

router.post("/uploadImage", auth, (req, res) => {

  upload(req, res, err => {
    if (err) {
      return res.json({success: false, err})
    }

    return res.json({success: true, image: "uploads/" + res.req.file.filename, fileName: res.req.file.filename})
  })

});

//================ INSERT =================
router.post("/", auth, (req, res) => {
  //save all the data we got from the client into the DB
  const product = new Product(req.body)

  product.save((err) => {
    if (err) return res.status(400).json({success: false, err})
    return res.status(200).json({success: true})
  })

});

//================ GET ALL =================
router.post("/getProducts", (req, res) => {

  let order = req.body.order ? req.body.order : "desc";
  let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
  let limit = req.body.limit ? parseInt(req.body.limit) : 100;
  let skip = parseInt(req.body.skip);

  let findArgs = {};
  let term = req.body.searchTerm;

  for (let key in req.body.filters) {

    if (req.body.filters[key].length > 0) {
      if (key === "price") {
        findArgs[key] = {
          $gte: req.body.filters[key][0],
          $lte: req.body.filters[key][1]
        }
      } else {
        findArgs[key] = req.body.filters[key];
      }
    }
  }

  console.log(findArgs)

  if (term) {
    Product.find(findArgs)
      .find({$text: {$search: term}})
      .populate("writer")
      .sort([[sortBy, order]])
      .skip(skip)
      .limit(limit)
      .exec((err, products) => {
        if (err) return res.status(400).json({success: false, err})
        res.status(200).json({success: true, products, postSize: products.length})
      })
  } else {
    Product.find(findArgs)
      .populate("writer")
      .sort([[sortBy, order]])
      .skip(skip)
      .limit(limit)
      .exec((err, products) => {
        if (err) return res.status(400).json({success: false, err})
        res.status(200).json({success: true, products, postSize: products.length})
      })
  }

});


//?id=${productId}&type=single
//id=12121212,121212,1212121   type=array 
router.get("/products_by_id", (req, res) => {
  let type = req.query.type
  let productIds = req.query.id

  console.log("req.query.id", req.query.id)

  if (type === "array") {
    let ids = req.query.id.split(',');
    productIds = [];
    productIds = ids.map(item => {
      return item
    })
  }

  console.log("productIds", productIds)


  //we need to find the product information that belong to product Id
  Product.find({'_id': {$in: productIds}})
    .populate('writer')
    .exec((err, product) => {
      if (err) return res.status(400).send(err)
      return res.status(200).send(product)
    })
});

//================ UPDATE =================
router.put("/", auth, (req, res) => {
  Product.findByIdAndUpdate(req.body._id, req.body,{new:false}, (err, doc) => { //find by id and update it
    if (!err) {
      res.json({'success': true, 'message': 'Product updated successfully'});
    }
    else {
      console.log('Error during record update : ' + err);
      res.json({'success': false, 'message':'Failed :' + err});
    }
  });

});

//================ GET BY ID =================
router.get('/:id', (req, res) => {
  Product.findById(req.params.id, (err, doc) => {
    if (!err) {
      res.json(doc);
    }
  });
});

//================ DELETE =================
router.delete('/:id', (req, res) => {
  Product.findByIdAndRemove(req.params.id, (err, doc) => {
    if (!err) {
      res.json({'success': true, 'message': 'Product Deleted Successfully!!'});
    }
    else {
      console.log({'success': false, 'message':'Error in removing Product :' + err});
    }
  });
});


module.exports = router;
