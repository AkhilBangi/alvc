const express = require('express');
const cors = require('cors');
const { AccessToken } = require('livekit-server-sdk');
const app = express();
app.use(cors());
// Set these as environment variables (from your LiveKit Cloud project)
const { LIVEKIT_API_KEY, LIVEKIT_API_SECRET } = process.env;
app.get('/token', async (req, res) => {
  const room = String(req.query.room || 'room1');
  const user = String(req.query.user || 'user-' + Math.floor(Math.random() * 9999));
  const at = new AccessToken(LIVEKIT_API_KEY, LIVEKIT_API_SECRET, { identity: user, ttl: '2h' });
  at.addGrant({ roomJoin: true, room, canPublish: true, canSubscribe: true });
  res.json({ token: await at.toJwt() });
});
app.listen(process.env.PORT || 3000, () => console.log('token server up'));
