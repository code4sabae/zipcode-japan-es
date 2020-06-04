import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

import { fromZipCode } from "../zipcode.mjs"

Deno.test("郵便番号検索（ヒット）", async () => {
  assertEquals(await fromZipCode(9160042), { lgcode: "18207", town: "新横江", townyomi: "シンヨコエ" });
});
Deno.test("郵便番号検索（町名なし）", async () => {
  assertEquals(await fromZipCode(9160000), { lgcode: "18207", town: "", townyomi: "" });
});
Deno.test("郵便番号検索（該当なし）", async () => {
  assertEquals(await fromZipCode(9100000), null);
});
