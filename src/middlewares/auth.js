const auth = (req, res, next) => {
  const apiKey = req.get("api-key");
  if (!apiKey || apiKey !== process.env.API_KEY) {
    res.status(401).json({error: "unauthorised"});
  } else {
    next();
  }
};

module.exports = auth;
