// index.js
const express = require('express');
const app = express();

// publicフォルダの中身を公開
app.use(express.static('public'));

// トップページ
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// ここからサーバーレス対応
module.exports = app;
