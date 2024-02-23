Array.prototype.getProjection = function () {
  return this.reduce((acc, key) => {
    return { ...acc, [key]: 1 };
  }, {});
};

Array.prototype.toSelectString = function () {
  return this.join(' ');
};
Array.prototype.toUnselectString = function () {
  return '-' + this.join(' -');
};

Object.prototype.toSelectString = function () {
  return Object.keys(this).join(' ');
};

Object.prototype.toUnselectString = function () {
  return '-' + Object.keys(this).join(' -');
};

const adminPubField = ['profile_image', 'phone', 'email', 'name', 'profile_img', 'status'];
const adminPrivateField = ['password', 'otp', 'otp_expiry', 'created_at', 'updated_at', '__v'];

module.exports = {
  adminPubField,
  adminPrivateField,
};

// adminPrivateField.map((key) => (admin[key] = undefined));

// in schema
// admin.methods.projectPublic = function () {
//   return {
//     ...this.toJSON(),
//     name: 'hi',
//   };
// };
