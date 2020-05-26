const jwt = require('../config/jwt');

exports.master = async (req, res) => {
  try {
    const body = req.body;
    const token = jwt.signJWT({userId: body.userId});
    res.status(200).json({message: 'success', data: {token: token}, error: null});
  } catch (e) {
    res.status(e[0]||500).json({message: ''+(e[1]||'unexpected error'), data: null, error: true});
  }
}
