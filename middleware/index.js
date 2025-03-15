var express = require('express');
var auth = require('./auth');
var router = express.Router();
const verifikasi = require('./verifikasi');

router.post('/api/v1/register', auth.registrasi);
router.post('/api/v1/login', auth.login);

// alamat yg perlu otorisasi
router.get('/api/v1/rahasia', verifikasi(2), auth.halamanrahasia)

module.exports = router;