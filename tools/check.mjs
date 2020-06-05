import csvutil from "https://taisukef.github.io/util/util.mjs";
import IMIMojiConverter from "https://code4sabae.github.io/imi-moji-converter-es/IMIMojiConverter.mjs";
import denode from "./denode.mjs";

const ss = csvutil.decodeCSV(denode.readTextFileSync("temp/ken_all_utf8.csv")); // head less csv
/*
1. 全国地方公共団体コード（JIS X0401、X0402）………　半角数字
2. （旧）郵便番号（5桁）………………………………………　半角数字
3. 郵便番号（7桁）………………………………………　半角数字
4. 都道府県名　…………　半角カタカナ（コード順に掲載）　（注1）
5. 市区町村名　…………　半角カタカナ（コード順に掲載）　（注1）
6. 町域名　………………　半角カタカナ（五十音順に掲載）　（注1）
7. 都道府県名　…………　漢字（コード順に掲載）　（注1,2）
8. 市区町村名　…………　漢字（コード順に掲載）　（注1,2）
9. 町域名　………………　漢字（五十音順に掲載）　（注1,2） 特殊「以下に掲載がない場合」が先頭にある
10 一町域が二以上の郵便番号で表される場合の表示　（注3）　（「1」は該当、「0」は該当せず）
11. 小字毎に番地が起番されている町域の表示　（注4）　（「1」は該当、「0」は該当せず）
12. 丁目を有する町域の場合の表示　（「1」は該当、「0」は該当せず）
13. 一つの郵便番号で二以上の町域を表す場合の表示　（注5）　（「1」は該当、「0」は該当せず）
14. 更新の表示（注6）（「0」は変更なし、「1」は変更あり、「2」廃止（廃止データのみ使用））
15. 変更理由　（「0」は変更なし、「1」市政・区政・町政・分区・政令指定都市施行、「2」住居表示の実施、「3」区画整理、「4」郵便区調整等、「5」訂正、「6」廃止（廃止データのみ使用））
*/

const zipmap = {};
const minss = [];
let cnt = 0;
for (const s of ss) {
  const zipcode = parseInt(s[3 - 1]);
  const lgcode = parseInt(s[1 - 1]);
  let town = s[9 - 1];
  let townyomi = IMIMojiConverter.toFullWidth(s[6 - 1]);
  if (town === "以下に掲載がない場合") {
    town = townyomi = "";
  }
  const flgMultiZip = s[10 - 1];
  const flgChome = s[11 - 1]; // もう１段細かい指定あり
  const flgMultiTown = s[12 - 1];
  // if (flgMultiTown === "1") {
  if (flgChome === "1") {
  // if (flgMultiZip === "1") {
    console.log(zipcode, lgcode, town, townyomi);
  //   console.log(s);
  }
  let zip = zipmap[zipcode];
  if (!zip) {
    zip = [];
    zipmap[zipcode] = zip;
  }
  zip.push([lgcode, town, townyomi]);
  cnt++;
  minss.push([zipcode, lgcode, town, townyomi]);
}
let cnt2 = 0;
let cnt3 = 0;
for (const zip in zipmap) {
  const z = zipmap[zip];
  cnt2++;
  if (z.length > 1) {
    cnt3++;
    for (let i = 1; i < z.length; i++) {
      if (z[0][0] !== z[i][0]) {
        console.log(zip, z.length, z);
      }
    }
    // console.log(zip, z.length, z);
  }
}
console.log(cnt, cnt2, cnt3); // 124433, 同じ郵便番号で複数あるのは 1535件のみ

