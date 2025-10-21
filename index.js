// index.js
const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

// JSONデータを受け取れるようにする（POSTで送信される回答用）
app.use(express.json());

// publicフォルダ（HTMLや画像など）を公開
app.use(express.static('public'));

// トップページ（最初に表示するindex.html）
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// 回答結果を受け取り、results.jsonに保存
app.post('/submit', (req, res) => {
  const result = req.body; // 送られてきた回答データ
  const filePath = path.join(__dirname, 'results.json');

  // 既存ファイルがあれば読み込み、なければ空配列
  let existingResults = [];
  if (fs.existsSync(filePath)) {
    try {
      existingResults = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    } catch (err) {
      console.error('JSON parse error:', err);
      existingResults = [];
    }
  }

  // 新しい回答を追加
  existingResults.push(result);

  // JSONとして保存（見やすく整形）
  fs.writeFileSync(filePath, JSON.stringify(existingResults, null, 2), 'utf8');

  // 応答を返す
  res.json({ status: 'success', message: '結果を保存しました' });
});

// サーバー起動
app.listen(port, () => {
  console.log(`✅ テストサイト動作中: http://localhost:${port}`);
});
