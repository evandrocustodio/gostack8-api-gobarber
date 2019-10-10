import Notification from '../schemas/notification';
import User from '../models/User';

class NotificationController {
  async index(req, res) {
    const isUserProvider = User.findOne({
      where: { id: req.userId, provider: true },
    });

    if (!isUserProvider) {
      return res
        .status(401)
        .json({ error: 'Only providers could read notifications.' });
    }

    const notifications = await Notification.find({ user: req.userId })
      .sort({ createdAt: 'desc' })
      .limit(20);
    return res.json(notifications);
  }

  async update(req, res) {
    const notification = await Notification.findByIdAndUpdate(
      req.params.id,
      { read: true },
      { new: true }
    );

    res.json(notification);
  }
}

export default new NotificationController();
