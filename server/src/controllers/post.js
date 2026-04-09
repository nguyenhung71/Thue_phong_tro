const fs = require("fs");
const path = require("path");

const categoryFiles = {
  "nha-nguyen-can": "nhanguyencan.json",
  "can-ho-dich-vu": "canhodichvu.json",
  "can-ho-chung-cu": "canhochungcu.json",
  "can-ho-mini": "canhomini.json",
};

export const getPostsByCategory = async (req, res) => {
  const category = req.params.category;
  const fileName = categoryFiles[category];

  if (!fileName) {
    return res.status(404).json({
      err: 1,
      msg: "Danh muc khong ton tai",
    });
  }

  try {
    const filePath = path.resolve(__dirname, "../../data", fileName);
    const rawData = await fs.promises.readFile(filePath, "utf8");
    const parsedData = JSON.parse(rawData);

    return res.status(200).json({
      err: 0,
      msg: "OK",
      data: parsedData,
    });
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Khong the doc du lieu bai dang",
      detail: error.message,
    });
  }
};
