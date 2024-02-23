const authenticateAdmin = require('./authenticateAdmin');
const authenticateUser = require('./authenticateUser');
const getFileUploader = require('./fileUpload');
module.exports = {
  authenticateUser,
  authenticateAdmin,
  getFileUploader,
};
