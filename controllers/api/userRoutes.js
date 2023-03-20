const router = require('express').Router();
const { User } = require('../../models');

router.post('/', async (req, res) => {
  try {
    const newUser = await User.create({ 
      username: req.body.username,
      password: req.body.password,
    });

    req.session.userId = newUser.id;
    req.session.userName = newUser.username;
    req.session.loggedIn = true;
    req.session.save();

    res.json(newUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ 
      where: { 
        username: req.body.username, 
      } 
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const validPassword = user.checkPassword(req.body.password);

    if (!validPassword) {
      return res.status(400).json({ message: "Invalid password" });
    }

    req.session.userId = user.id;
    req.session.userName = user.username;
    req.session.loggedIn = true;
    req.session.save();

    res.json({ user, message: 'You have successfully logged in' });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "No user account found" });
  }
});

router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }        
});

module.exports = router;
