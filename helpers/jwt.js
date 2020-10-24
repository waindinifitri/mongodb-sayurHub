const jwt = require("jsonwebtoken");
const secretKey = "2020";

const tokenGenerator = (user) => {
  console.log(user, "--user");
  const { email, _id } = user;

  return jwt.sign(
    {
      email,
      _id
    },
    secretKey
  );
};

const tokenVerifier = (access_token) => {
  return jwt.verify(access_token, secretKey);
};

module.exports = {
  tokenGenerator,
  tokenVerifier,
};
