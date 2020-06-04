import { fromZipCode } from "https://code4sabae.github.io/zipcode-japan/zipcode.mjs"
// import { fromZipCode } from "./zipcode.mjs"

console.log(await fromZipCode(9160042)); // { lgcode: "18207", town: "新横江", townyomi: "シンヨコエ" });
console.log(await fromZipCode(9160000)); // { lgcode: "18207", town: "", townyomi: "" });
console.log(await fromZipCode(9100000)); // null
