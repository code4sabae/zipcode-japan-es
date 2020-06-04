# unzip -p ${zip} '*.[cC][sS][vV]' | 
cat temp/KEN_ALL.CSV | iconv -f MS_KANJI -t utf8 > temp/ken_all_utf8.csv
