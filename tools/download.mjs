// import iconv from "https://dev.jspm.io/iconv"; // err


/*
<form id="appForm" action="" method="post"><div><input type="hidden" name="jp.go.nta.houjin_bangou.framework.web.common.CNSFWTokenProcessor.request.token" value="8066bb93-a3be-410a-ba85-662db80f11c8"/></div>
<input type="hidden" name="event" id="event" value="download">
<input type="hidden" name="selDlFileNo" id="selDlFileNo">
*/
const download = async (fileno, dstfn) => {
  const formurl = "https://www.houjin-bangou.nta.go.jp/download/zenken/index.html"
  const data = {
    // "jp.go.nta.houjin_bangou.framework.web.common.CNSFWTokenProcessor.request.token": token, // tokenは不要
    "event": "download",
    "selDlFileNo": fileno,
  };
  const method = "POST";
  const body = Object.keys(data).reduce((o, key) => (o.set(key, data[key]), o), new FormData());
  const headers = {
    'Accept': 'application/json'
  };
  const res = await fetch(formurl, { method, headers, body });
  // const res = await fetch(formurl + `?selDlFileNo=${fileno}`); // GETでは取得できない
  const bin = await res.arrayBuffer();
  const ar = new Uint8Array(bin);
  console.log(`${fileno} downloaded ${ar.length} bytes, saved ${dstfn}`);
  Deno.writeFileSync(dstfn, ar);
  return ar.length;
};
// await download(11348, "temp/test.zip");
// Deno.exit(0);

const downloadIndex = async () => {
  const url = "https://www.houjin-bangou.nta.go.jp/download/zenken/"
  const html = await (await fetch(url)).text();
  Deno.writeTextFileSync("index.html", html);
}

/*
await downloadIndex();
const html = Deno.readTextFileSync("index.html");
const dom = cheerio.load(html);

const searchDomClass = (base, cls) => {
  let c = base;
  for (;;) {
    c = c.next;
    if (c == null) { return null; }
    if (c.type !== "tag") { continue };
    if (c.attribs.class === cls) { break; }
  }
  return c;
};

try {
  Deno.mkdirSync("temp");
} catch (e) {
}

const h2 = dom("#csv-unicode")[0];
const tbl02 = searchDomClass(h2, "tbl02");
const links = dom("a", null, tbl02);
for (let i = 0; i < links.length; i++) {
  const link = links[i];
  const code = link.attribs["onclick"]?.match(/^return doDownload\((\d+)\);$/)[1];
  // console.log(code);
  const len = await download(code, `temp/${code}.zip`);
  // console.log(`${len} bytes downloaded`);
}

*/


