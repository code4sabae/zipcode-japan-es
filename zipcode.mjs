import IMIMojiConverter from "https://code4sabae.github.io/imi-moji-converter-es/IMIMojiConverter.mjs";
import csvutil from "https://taisukef.github.io/util/util.mjs";

const zipcache = {};
const fromZipCode = async code => {
  if (typeof code === "string") {
    code = IMIMojiConverter.toHalfWidth(code).replace(/[\D]/g, "");
  }
  let s = parseInt(code) + "0000000";
  s = s.substring(0, 7);
  console.log(s);
  const zip0 = parseInt(s.charAt(0));
  let cache = zipcache[zip0];
  if (!cache) {
    const fn = `data/${zip0}.csv`;
    let data = null;
    if (import.meta && import.meta.url && import.meta.url.startsWith("file://") && window.Deno) {
      const url = import.meta.url;
      const path = url.substring("file://".length, url.lastIndexOf("/") + 1);
      data = await Deno.readTextFile(path + fn);
    } else {
      data = await (await fetch("https://code4sabae.github.io/zipcode-japan-es/" + fn)).text();
    }
    const json = {};
    const csv = csvutil.decodeCSV(data);
    for (const d of csv) {
      const n = parseInt(d[0]);
      if (!json[n]) {
        json[n] = [d];
      } else {
        json[n].push(d);
      }
    }
    cache = zipcache[zip0] = json;
  }
  const d = cache[s];
  if (!d) { return []; }
  return d.map(d => {
    return {
      lgcode: d[1],
      town: d[2],
      townyomi: d[3]
    }
  });
};

export { fromZipCode };
