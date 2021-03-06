## UIの動き

* / 認証なし（Home）
* /login ログインページ
* /private 認証ありページ

## 説明

* Reactからusernameとpasswordを送付。username=hoge,password=passwordに固定されている（実際はDB等で認証）。
* 認証OKならTokenは返るが利用してない。サーバがセットするCookie中のTokenを利用（HttpOnlyなのでクライアント側では操作できない）。
  * Tokenの有効期限は10分。
* ログインの維持はCookieにsignedIn=trueを保存し維持。
  * Cookieの有効期限は5分。

## 利用方法

普通にcloneしてnpm install, npm start。

>再起にAPI側を起動しておくほうがよい。

```
git clone url

npm install
npm start
```

## 参考

異なるオリジンでCookieやAuthorization Headerを含む情報を共有する場合は、

* サーバ側のAccess-Control-Allow-Originで*はNG
* サーバ側のAccess-Control-Allow-Credentialsをtrueに設定
* クライアン側でwithCredentialsの設定をいじる（fetchの場合はcredentials:"include"とする）
