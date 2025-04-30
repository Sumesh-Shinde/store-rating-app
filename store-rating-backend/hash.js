const bcrypt = require('bcryptjs');
const hash = bcrypt.hashSync('Password@123', 10);
console.log('Hash:', hash);
