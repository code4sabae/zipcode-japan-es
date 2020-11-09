import {
  assertEquals,
} from "https://deno.land/std/testing/asserts.ts";

import { fromZipCode } from "../zipcode.mjs";

Deno.test("郵便番号検索（ヒット）", async () => {
  assertEquals(
    await fromZipCode(9160042),
    [{ zipcode: "9160042", lgcode: "18207", town: "新横江", townyomi: "シンヨコエ" }],
  );
});
Deno.test("郵便番号検索（ヒット、町名なし）", async () => {
  assertEquals(
    await fromZipCode(9160000),
    [{ zipcode: "9160000", lgcode: "18207", town: "", townyomi: "" }],
  );
});
Deno.test("郵便番号検索（複数ヒット）", async () => {
  assertEquals(await fromZipCode(8600833), [
    { zipcode: "8600833", lgcode: "43101", town: "平成", townyomi: "ヘイセイ" },
    { zipcode: "8600833", lgcode: "43104", town: "平成", townyomi: "ヘイセイ" },
  ]);
});
Deno.test("郵便番号検索（該当なし）", async () => {
  assertEquals(await fromZipCode(9100000), []);
});
Deno.test("郵便番号検索（全角）", async () => {
  assertEquals(
    await fromZipCode("９１６００４２"),
    [{ zipcode: "9160042", lgcode: "18207", town: "新横江", townyomi: "シンヨコエ" }],
  );
});
Deno.test("郵便番号検索（ハイフン付き）", async () => {
  assertEquals(
    await fromZipCode("９１６-００４２"),
    [{ zipcode: "9160042", lgcode: "18207", town: "新横江", townyomi: "シンヨコエ" }],
  );
});
Deno.test("郵便番号検索（省略）", async () => {
  assertEquals(
    await fromZipCode("９１６"),
    [{ zipcode: "9160000", lgcode: "18207", town: "", townyomi: "" }],
  );
});
Deno.test("郵便番号検索（複数行住所）", async () => {
  assertEquals(
    await fromZipCode("602-8368"),
    [{ zipcode: "6028368", lgcode: "26102", town: "北町（上の下立売通天神道西入上る、上の下立売通御前西入、上の下立売通御前西入上る、上の下立売通御前西入２丁目、上の下立売通御前西入２筋目、下長者町通御前西入、天神道上の下立売上る、天神道仁和寺街道下る、天神道下立売上る、天神道妙心寺道上る、天神道妙心寺道上る西入、仁和寺街道天神道西入下る、仁和寺街道天神道東入下る、御前通上の下立売上る、御前通上の下立売上る西入、御前通下立売上る、御前通下長者町上る西入、御前通仁和寺街道下る西入、御前通妙心寺道上る西入、御前通西裏上の下立売上る、御前通西裏下立売上る）", townyomi: "キタマチ" }],
  );
});
