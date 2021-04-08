const multer = require("multer");


// const video = './video/';

  const checkinStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      // console.log(`req khuram`,req.destination);
      cb(null, __basedir + "/checkinUser/");
    },
    filename: (req, file, cb) => {
      cb(null, file.fieldname + "-" + Date.now() + "-" + file.originalname);
    },
  });
  // console.log(`storage`,storage);
  
  exports.saveFileCheckIn = multer({ storage: checkinStorage }).single("checkInUser");
 

  const checkoutStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      // console.log(`req khuram`,req.destination);
      cb(null, __basedir + "/checkoutUser/");
    },
    filename: (req, file, cb) => {
      cb(null, file.fieldname + "-" + Date.now() + "-" + file.originalname);
    },
  });
  // console.log(`storage`,storage);
  
  exports.saveFileCheckout = multer({ storage: checkoutStorage }).single("checkoutUser");




  