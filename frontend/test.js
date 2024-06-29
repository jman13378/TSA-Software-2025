const bcrypt = require("bcrypt");
const saltRounds = 10;
const hashedpass = "$2b$10$KL8O3ezVdDnQ9TSAJgxmeOjXRiM6ulrUiJHnabUo9O.b1DH4GHF4m";
// Hash a password
bcrypt.hash("myPassword", saltRounds, (err, hash) => {
  if (err) throw err;
  // Store the hash in your database
console.log(hash)});

// Compare a password with its hash
bcrypt.compare("myPassword", hashedpass, (err, result) => {
  if (err) throw err;
console.log(result) 
});
