# 説明

## フォルダ

### basis

ビジュアライザの構成自体などに関するフォルダ  
問題ごとに書き換える必要なし

### IO

入出力のパースなどをする 問題の変数なども定める  
問題ごとに書き換える必要あり

### vis

ビジュアライザの本質部分 canvasの動作を定める  
問題ごとに書き換える必要あり

### ../public/input

localhost側から見られるように、ここに配置した  
ここにある情報をIOのinput_genが現状見ている

## ファイル

### index.ts

エントリーポイント  
問題ごとに書き換える必要なし

### info.json

問題固有の情報  

* "ProblemName":"MM139",          // 画面のタイトルやtweetの文字列
* "canvas_size":1000,             // ビジュアライザのキャンバスサイズ 正方形
* "inputs_num":50,                // シード値を幾つ読み込むか
* "one_indexed":true,             // シード値の読み込みは何番から始まるか
* "hashtags":"A,B",               // tweetに埋め込むハッシュタグ
* "url":"http://www.google.com/", // tweetに埋め込むurl
* "canTweetTime":0                // tweet可能開始時刻

### table_info.tsx

テーブルの仕様  
問題ごとに書き換える必要あり
