import csvutil from "https://taisukef.github.io/util/util.mjs";

const zipcache = {};
const fromZipCode = async code => {
  let s = "0000000" + parseInt(code);
  s = s.substring(s.length - 7);
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
      data = await (await fetch("https://code4sabae.github.io/zipcode-japan/" + fn)).text();
    }
    const json = {};
    const csv = csvutil.decodeCSV(data);
    for (const d of csv) {
      json[parseInt(d[0])] = d;
    }
    cache = zipcache[zip0] = json;
  }
  const d = cache[code];
  if (!d) { return null; }
  return {
    lgcode: d[1],
    town: d[2],
    townyomi: d[3]
  };
};

export { fromZipCode };
