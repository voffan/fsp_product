import json

types = {}

with open('c:\\Users\\МТС\\Downloads\\parsed_data.json', encoding='utf-8') as f:
    contests = json.load(f)

for contest in contests:
    code = contest['code'][9:11]
    if code not in types:
        types[code] = []
    types[code].append(contest['program'])

with open('contest_types.json', 'w') as f:
    json.dump(types, f, ensure_ascii=False)
