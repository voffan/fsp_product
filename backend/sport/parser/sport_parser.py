import pandas as pd
import json

# Путь к файлу
FILE_PATH = "../import/VRVS_278635ae1b.xls"

import pandas as pd
import json

# Путь к файлу
FILE_PATH = "../import/VRVS_278635ae1b.xls"

def parse_all_sheets(file_path):
    # Загружаем Excel-файл
    xls = pd.ExcelFile(file_path, engine='xlrd')

    # Словарь для хранения структуры данных всех листов
    all_sheets_data = {}

    for sheet_name in xls.sheet_names:
        print(f"Обработка листа: {sheet_name}")
        df = xls.parse(sheet_name=sheet_name, header=None)  # Загружаем лист без заголовков

        # Определяем строку, с которой начинаются данные (пропускаем заголовки)
        start_row = df[df[0] == "1"].index[0]  # Предполагаем, что первый вид спорта начинается с "1"
        df = df.iloc[start_row:]  # Отбрасываем заголовки

        # Словарь для хранения структуры текущего листа
        sheet_structure = {}
        current_sport = None

        # Обход строк таблицы
        for _, row in df.iterrows():
            # Проверяем, является ли строка видом спорта
            if pd.notna(row[0]) and pd.notna(row[1]):
                try:
                    # Создаем новую запись для вида спорта
                    current_sport = {
                        "name": str(row[1]).replace("  ", " ").strip(),  # Название вида спорта
                        "disciplines": []  # Список названий дисциплин
                    }
                    sheet_structure[int(row[2])] = current_sport
                except ValueError:
                    continue  # Пропускаем строки, которые не могут быть преобразованы

            # Проверяем, является ли строка дисциплиной
            if current_sport and pd.notna(row[9]) and pd.notna(row[11]):
                # Добавляем название дисциплины в список с удалением двойных пробелов
                discipline_name = str(row[9]).replace("  ", " ").strip()
                current_sport["disciplines"].append(discipline_name)

        # Сохраняем данные листа
        all_sheets_data[sheet_name] = sheet_structure

    return all_sheets_data

def save_structure_to_json(data, output_path="all_sheets_structure.json"):
    # Сохранение в JSON-файл
    with open(output_path, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=4)

if __name__ == "__main__":
    # Парсим все листы Excel
    structure = parse_all_sheets(FILE_PATH)
    
    # Сохраняем результат
    save_structure_to_json(structure)
    
    print("Парсинг завершен. Данные сохранены в 'all_sheets_structure.json'.")