#!/usr/bin/env python
from py_pdf_parser.loaders import load
import re
import json

SPORTS_FILE_PATH = "sport_data.json"

def gender_groups(text):
    # Ключевые слова для проверки и замены
    female_keywords = ["женщины", "девочки", "юниорки", "девушки"]
    male_keywords = ["мужчины", "мальчики", "юниоры", "юноши"]

    # Паттерны
    age_pattern = r'(?P<min>\d+)\s*-\s*(?P<max>\d+)\s*лет\b|(?P<single>\d+)\s*лет\b|от\s*(?P<only_min>\d+)\s*лет\b|до\s*(?P<only_max>\d+)\s*лет\b'
    gender_pattern = r'\b(?:' + '|'.join(female_keywords + male_keywords) + r')\b'

    # Структура для хранения возрастов по категориям
    gender_age_groups = {"male": [], "female": []}

    # Функция для замены гендерных слов на F/M
    def gender_replacer(match):
        word = match.group(0)
        if word in female_keywords:
            return "F"
        elif word in male_keywords:
            return "M"
        return word

    # Фильтруем строки, оставляя только те, которые содержат пол или возраст
    relevant_lines = [
        line.strip() for line in text.splitlines()
        if re.search(gender_pattern, line) or re.search(age_pattern, line)
    ]

    # Объединяем все строки в одну строку
    combined_text = " ".join(relevant_lines).replace('\n', ' ')

    # Заменяем гендерные слова на F/M
    updated_text = re.sub(gender_pattern, gender_replacer, combined_text)

    male_found = "M" in updated_text
    female_found = "F" in updated_text
    # Извлекаем возрастные диапазоны
    matches = re.finditer(age_pattern, updated_text)
    for match in matches:
        # Проверяем, какие группы сработали
        if match.group("min") and match.group("max"):
            age_data = {"min": int(match.group("min")), "max": int(match.group("max"))}
        elif match.group("only_min"):
            age_data = {"min": int(match.group("only_min"))}
        elif match.group("only_max"):
            age_data = {"max": int(match.group("only_max"))}
        elif match.group("single"):
            age_data = {"min": int(match.group("single"))}
        else:
            continue

        # Определяем категорию (male или female) и добавляем данные
        if "M" in updated_text:
            gender_age_groups["male"].append(age_data)
        if "F" in updated_text:
            gender_age_groups["female"].append(age_data)

    # Если пол найден, но возраст не указан, добавляем {"min": -1}
    if male_found and not gender_age_groups["male"]:
        gender_age_groups["male"].append({"min": -1})
    if female_found and not gender_age_groups["female"]:
        gender_age_groups["female"].append({"min": -1})

    # Удаляем дубликаты в списках
    def remove_duplicates(lst):
        seen = set()
        unique_list = []
        for d in lst:
            t = tuple(sorted(d.items()))
            if t not in seen:
                seen.add(t)
                unique_list.append(d)
        return unique_list

    gender_age_groups["male"] = remove_duplicates(gender_age_groups["male"])
    gender_age_groups["female"] = remove_duplicates(gender_age_groups["female"])

    # Исключаем пустые категории
    gender_age_groups = {k: v for k, v in gender_age_groups.items() if v}

    return gender_age_groups

def load_sports_data(file_path):
    with open(file_path, "r", encoding="utf-8") as f:
        return json.load(f)
    
sports_data = load_sports_data(SPORTS_FILE_PATH)

def extract_disciplines(text):
    # Убираем строки с возрастом и полом
    gender_pattern = r'\b(мужчины|женщины|мальчики|девочки|юноши|девушки|юниоры|юниорки)\b'
    age_pattern = r'\b\d+\s*-\s*\d+\s*лет\b|\b\d+\s*лет\b|\bот\s*\d+\s*лет\b|\bдо\s*\d+\s*лет\b'
    discipline_text = " ".join([
        line.strip() for line in text.splitlines()
        if not (re.search(gender_pattern, line) or re.search(age_pattern, line))
    ])

    # Заменяем переносы строк на пробелы, оставляя корректное форматирование
    discipline_text = discipline_text.replace("\n", " ")

    # Разделяем по запятым, учитывая возможные переносы внутри дисциплин
    disciplines = []
    buffer = ""
    for part in discipline_text.split(","):
        part = part.strip()
        if "(" in part and ")" not in part:  # Проверяем на незавершённые скобки
            buffer += part + ", "
        elif ")" in part and buffer:
            buffer += part
            disciplines.append(buffer.strip())
            buffer = ""
        else:
            disciplines.append(part)

    # Добавляем остаток буфера, если есть
    if buffer:
        disciplines.append(buffer.strip())

    # Убираем пустые строки
    return [discipline for discipline in disciplines if discipline]

def get_disciplines(text, code):
    
    parts = extract_disciplines(text)
    print(f"Parts: {parts}")
    found_disciplines = []

    # Ищем вид спорта по коду в "Признанные" и "Общероссийские"
    for category in sports_data.values():
        sport = category.get(str(code))
        if not sport:
            continue

        # Получаем список дисциплин
        disciplines = sport.get("disciplines", [])
        sport_type = sport.get("name")
        
        # Поиск дисциплин в частях текста
        for discipline in disciplines:
            for part in parts:
                if discipline.upper().replace('.', '') == part:  # Полное совпадение
                    found_disciplines.append(discipline)

        # Если дисциплины найдены, возвращаем их
        if found_disciplines:
            return found_disciplines

    # Если вид спорта или дисциплины не найдены, возвращаем пустой список
    return found_disciplines

def get_sport_type(code):
    
    for category in sports_data.values():
        sport = category.get(str(code))
        if not sport:
            continue

        sport_type = sport.get("name")

    return sport_type

# Основная функция
def main():
    IMPORT_PATH = "../import"
    IMPORT_FILENAME = "medium.pdf"

    # Загружаем PDF
    page = load(f"{IMPORT_PATH}/{IMPORT_FILENAME}").get_page(284)
    #print(f"Количество страниц: {pdf.number_of_pages}\n")

    rows = []

#for page in pdf.pages:
    #print(f"\nСтраница №: {page.page_number}\n")
    page_elements = page.elements
    for el in page_elements:
        text = el.text().strip()
        print(f"El: {text}\n")
        if not text:
            continue

        # Регулярные выражения для извлечения данных
        match1 = re.match(r"^([0-9]{16}) ([\w+|\S+\ ?]*)$", text)
        if match1:
            code = match1.group(1)
            sport_code = int(code[1:4])
            program = match1.group(2)
            current_event = {"code": code, "program": program, "sport_code": sport_code}
            rows.append(current_event)
            continue

        match2 = re.match(r"^[0-9]{0,15}$", text)
        if match2:
            contestants = match2.group(0)
            current_event["contestants"] = contestants
            continue

        match3 = re.match(r"(\d{2}\.\d{2}\.\d{4})\s+(\d{2}\.\d{2}\.\d{4})", text)
        if match3:
            start = match3.group(1)
            end = match3.group(2)
            current_event["start"] = start
            current_event["end"] = end
            continue

        match4 = re.match(r"([\w]+)\n([\w+|\S+\ ?]*), ?([\w+|\S+\ ?]*)", text)
        if match4:
            country = match4.group(1)
            region = match4.group(2)
            city = match4.group(3)
            current_event["country"] = country
            current_event["region"] = region
            current_event["city"] = city
            continue

        match5 = re.search(r"(мальчики|девочки|юноши|девушки|юниоры|юниорки|женщины|мужчины)", text)
        if match5:
            description = text
            current_event["description"] = description
            gender_group = gender_groups(text)
            current_event["gender_group"] = gender_group
            disciplines = get_disciplines(text, current_event['sport_code'])
            sport_type = get_sport_type(current_event['sport_code'])
            current_event["sport_type"] = sport_type
            current_event["disciplines"] = disciplines

    # Сохраняем результат в JSON
    with open("bugfix.json", "w", encoding="utf-8") as f:
        json.dump(rows, f, ensure_ascii=False, indent=4)

    print("Данные успешно сохранены в файл bugfix.json")


# Запуск скрипта
if __name__ == "__main__":
    main()
