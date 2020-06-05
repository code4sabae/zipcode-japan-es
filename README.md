# 郵便番号コンポーネント ES

KEN_ALL.ZIPをデータソースとして使った、郵便番号データを地方公共団体コードと町名、町名のよみへ変換するESモジュールです。

[![esmodules](https://taisukef.github.com/denolib/esmodulesbadge.svg)](https://developer.mozilla.org/ja/docs/Web/JavaScript/Guide/Modules)
[![deno](https://taisukef.github.com/denolib/denobadge.svg)](https://deno.land/)

## API (web / Deno)

```
import { fromZipCode } from "https://code4sabae.github.io/zipcode-japan/zipcode.mjs";

console.log(await fromZipCode(9160042)); // [{ lgcode: "18207", town: "新横江", townyomi: "シンヨコエ" }]
```
配列を返します。見つからない場合は長さ0の配列 [] を返します。  
toplevel await 非対応のブラウザでは、async関数内で使用してください。  

- データソースは [国税庁法人番号公表サイト・基本3情報](https://www.houjin-bangou.nta.go.jp/download/) をダウンロードしたものです
- 本パッケージに添付されているデータは 令和2年5月29日更新 のものになります （元パッケージは、令和元年12月27日更新）

## インストール

以下の手順でインストールしローカルでも使用できます。

```
$ github clone https://github.com/code4sabae/zipcode-japan.git
```

## データ生成

[国税庁法人番号公表サイト・全件データのダウンロード（各都道府県別）](https://www.post.japanpost.jp/zipcode/download.html) から CSV 形式・Unicode をダウンロードした KEN_ALL.ZIP を toolsフォルダの download.mjs、sjis2utf8.sh、makedata.mjs を使って data ファルダ内のCSVファイルを生成します。
生成後、tempフォルダは削除して構いません。

## テスト

```
$ deno test -A
```

## 依存モジュール

util.mjs (decodeCSV, encodeCSV)  
https://github.com/taisukef/util  

変換に、全角半角統一コンポーネント IMIMojiConverter  
https://github.com/code4sabae/imi-moji-converter-es  

## 関連記事

Deno対応ESモジュール対応、IMIコンポーネントツールx4とDenoバッジ  
https://fukuno.jig.jp/2866  

日本政府発のJavaScriptライブラリを勝手にweb標準化するプロジェクト、全角-半角統一コンポーネントのESモジュール/Deno対応版公開  
https://fukuno.jig.jp/2865  
