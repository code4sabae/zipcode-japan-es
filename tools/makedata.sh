mkdir data
cd data
rm KEN_ALL.CSV
curl "https://www.post.japanpost.jp/zipcode/dl/kogaki/zip/ken_all.zip" --output ken_all.zip
unzip ken_all.zip '*.[cC][sS][vV]'
cat KEN_ALL.CSV | iconv -f MS_KANJI -t utf8 > ken_all_utf8.csv
cd ..
deno run -A converter.js
