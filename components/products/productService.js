const { models } = require("../../models");
const { Op } = require("sequelize");
const multer = require("multer");
const path = require("path");
const { google } = require("googleapis");
const fs = require("fs");

exports.listProducts = () => {
  return models.products.findAll({ raw: true });
};

exports.list = (page = 0, itemPerPage = 8) => {
  return models.products.findAndCountAll({
    include: [
      {
        model: models.images,
        as: "images",
        where: {
          image_stt: 1,
        },
      },
      {
        model: models.categories,
        as: "category",
      },
    ],
    where: {
      is_active: true,
    },
    raw: true,
    offset: page * itemPerPage,
    limit: itemPerPage,
  });
};

exports.listByName = (search_name, page = 0, itemPerPage = 8) => {
  return models.products.findAndCountAll({
    include: [
      {
        model: models.images,
        as: "images",
        where: {
          image_stt: 1,
        },
      },
      {
        model: models.categories,
        as: "category",
      },
    ],
    where: {
      product_name: {
        [Op.substring]: search_name,
      },
      is_active: true,
    },
    raw: true,
    offset: page * itemPerPage,
    limit: itemPerPage,
  });
};

// Upload file to local

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/");
  },

  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype == "image/png" ||
    file.mimetype == "image/jpg" ||
    file.mimetype == "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
    const err = new Error("Only .png, .jpg and .jpeg format allowed!");
    err.name = "ExtensionError";
    return cb(err);
  }
};

exports.upload2local = multer({
  storage: storage,
  limit: {
    fileSize: 1024 * 1024 * 1024,
  },
  fileFilter: fileFilter,
}).array("product_image", 10);

// upload to Drive

const CLIENT_ID =
  "547782837775-57k3390c583etnbih946g137fn8cn9oi.apps.googleusercontent.com";
const CLIENT_SECRET = "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";
const REDIRECT_URI = "https://developers.google.com/oauthplayground";
const REFRESH_TOKEN =
  "1//04FCmQpWRFDawCgYIARAAGAQSNwF-L9Iry9sI9WLqROZNGuQP26NvJw0J667WrAQZaJlesyNjgWPIw_SSgl6sNStqZCre28WP_0c";
const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

const drive = google.drive({
  version: "v3",
  auth: oauth2Client,
});

/*
filepath which needs to be uploaded
Note: Assumes example.jpg file is in root directory,
though this can be any filePath
*/
// const filePath1 = path.join(__dirname, "/../../public/uploads/image1.jpg");
// const filePath2 = path.join(__dirname, "/../../public/uploads/image2.jpg");
// const filePath3 = path.join(__dirname, "/../../public/uploads/image3.jpg");
// const listFilePath = [filePath1, filePath2, filePath3];
// const listIdImage = ["1", "2", "3"];
// const listLinkImages = ["1", "2", "3"];

async function uploadFile(indexImage) {
  const filePath1 = path.join(__dirname, "/../../public/uploads/image1.jpg");
  const filePath2 = path.join(__dirname, "/../../public/uploads/image2.jpg");
  const filePath3 = path.join(__dirname, "/../../public/uploads/image3.jpg");
  const listFilePath = [filePath1, filePath2, filePath3];
  try {
    response = await drive.files.create({
      requestBody: {
        name: "sample.jpg", //This can be name of your choice
        mimeType: "image/jpg",
      },
      media: {
        mimeType: "image/jpg",
        body: fs.createReadStream(listFilePath[indexImage]),
      },
    });
    console.log(" function uploadFile")
    console.log(response.data);
    // listIdImage[indexImage] = response.data.id;
  } catch (error) {
    console.log(error.message);
  }
  return response.data.id;
}


// deleteFile();

async function generatePublicUrl(listIdImage,indexImage) {
  const listLinkImages = ["1", "2", "3"];
  var imageLink="";
  try {
    const fileId = listIdImage[indexImage];
    await drive.permissions.create({
      fileId: fileId,
      requestBody: {
        role: "reader",
        type: "anyone",
      },
    });

    const result = await drive.files.get({
      fileId: fileId,
      fields: "webViewLink, webContentLink",
    });
    console.log(" function generatePublicUrl")

    console.log(result.data);
    imageLink = result.data.webViewLink;
  } catch (error) {
    console.log(error.message);
  }
  return imageLink;
}

// exports.getListLinkImage = async () => {
//   const listIdImage = ["1", "2", "3"];
//   const listLinkImages = ["1", "2", "3"];
//   for (let i = 0; i < 3; i++) {
//     listIdImage[i] = await uploadFile( i);

//     listLinkImages[i] = await generatePublicUrl( i);
//   }
//   console.log(listIdImage);

//   return listLinkImages;
// };

exports.getListLinkImage = async () => {
  const listIdImage = ["1", "2", "3"];
  const listLinkImages = ["1", "2", "3"];
  for (let i = 0; i < 3; i++) {
    listIdImage[i] = await uploadFile( i);
  }
  for (let i = 0; i < 3; i++) {
    listLinkImages[i] = await generatePublicUrl(listIdImage, i);
  }
  console.log(listLinkImages);
  return listLinkImages;
};



