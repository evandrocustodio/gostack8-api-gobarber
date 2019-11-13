import User from "../models/User";
import File from "../models/File";

class UserController {
  async store(req, res) {
    const userExists = await User.findOne({ where: { email: req.body.email } });
    if (userExists) {
      return res.status(400).json({ error: "User already exists." });
    }
    const { id, name, email, provider } = await User.create(req.body);
    return res.json({
      id,
      name,
      email,
      provider
    });
  }

  async update(req, res) {
    const { userId } = req;
    const { email, oldPassword } = req.body;

    const user = await User.findByPk(userId);

    if (email !== user.email) {
      const userExists = await User.findOne({ where: { email } });

      if (userExists) {
        return res.status(400).json({ error: "User already exists." });
      }
    }
    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(400).json({ error: "User ou Password errors." });
    }

    await user.update(req.body);

    const { id, name, provider, avatar } = await User.findByPk(userId, {
      include: [
        {
          model: File,
          as: "avatar",
          attributes: ["id", "path", "url"]
        }
      ]
    });

    return res.json({
      id,
      name,
      email,
      provider,
      avatar
    });
  }
}

export default new UserController();
