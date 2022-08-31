import * as React from "react";
import Button from "@mui/material/Button";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import INFO from "./load_info";

function tweet_func() {
  console.log(`now time is ${Date.now()}`);

  // 日付⇒UNIX時間変換 (ke!san) (ただし、ミリ秒でないので、1000倍する)
  // https://keisan.casio.jp/exec/system/1526003938
  const canTweet = Date.now() >= INFO.canTweetTime;

  let href = "";
  if (!canTweet) {
    alert("Cannot tweet now!");
  } else {
    // Developer Platform Tweet button (Twitter)
    // https://developer.twitter.com/en/docs/twitter-for-websites/tweet-button/guides/web-intent
    // JavaScriptでクエリ付きURLを簡単に作る（URLSearchParams） (Zenn)
    // https://zenn.dev/naoki_oshiumi/articles/be8e3ba99d0788
    const webIntentUrl = "https://twitter.com/intent/tweet";
    const params = {
      url: INFO.url,
      hashtags: INFO.hashtags,
      text: `${INFO.ProblemName}のseed=-1で-1点を獲得しました!\n(ここに画像を貼ってね)\n`,
    };
    const ParamsString = new URLSearchParams(params).toString();
    href = webIntentUrl + "/?" + ParamsString;
    window.open(href, "_blank");
  }
}

export default function TweetButton() {
  return (
    <>
      <Button onClick={tweet_func} startIcon={<OpenInNewIcon />}>
        tweet
      </Button>
    </>
  );
}
