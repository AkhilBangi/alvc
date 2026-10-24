const { AccessToken } = require('livekit-server-sdk');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  const room = String(req.query.room || 'room1');
  const user = String(req.query.user || 'user-' + Math.floor(Math.random() * 9999));
  const at = new AccessToken(process.env.LIVEKIT_API_KEY, process.env.LIVEKIT_API_SECRET, { identity: user, ttl: '2h' });
  at.addGrant({ roomJoin: true, room, canPublish: true, canSubscribe: true });
  res.json({ token: await at.toJwt() });
};
