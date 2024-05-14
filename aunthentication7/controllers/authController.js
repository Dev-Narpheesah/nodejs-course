const usersDB = {
  users: require("../model/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};

const bcrypt = require("bcrypt");

const handleLogin = async (req, res) => {
  const { user, pwd } = req.body;
  if (!user || !pwd)
    return res
      .status(400)
      .json({ message: "Username and Password must be provided" });

  const foundUser = usersDB.users.find((person) => person.username === user);

  if(!foundUser) return res.sendStatus(404); // unauthorized

  const match = await bcrypt.compare(pwd, foundUser.password);
  if (match) {
    
  res.json({ 'sucess': `User ${user} is logged in` });
}else{
    res.status(401)
}

};

module.exports = {
  handleLogin,
};