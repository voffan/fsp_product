#!/usr/bin/env python
from py_pdf_parser.loaders import load_file, load
from py_pdf_parser.tables import extract_simple_table, extract_table
from pprint import pprint
from itertools import islice
import asyncio
import re

IMPORT_PATH = '../import'
IMPORT_FILENAME = 'small.pdf'

async def main():
  pdf = load(f'{IMPORT_PATH}/{IMPORT_FILENAME}')
  print(f"Количество страниц: {pdf.number_of_pages} \n")

  rows = []
  
  for page in pdf.pages:
    page_elements = page.elements
    print(f"\nСтраница №: {page.page_number} \n")
    print(f"Количество элементов страницы': {len(page_elements)} \n")
    page_elements_iter = iter(page_elements)
    for el in page_elements_iter:
      text = el.text()
      match1 = re.match(r"^([0-9]{16}) ([\w+|\S+\ ?]*)$", text)
      if match1:
        id = match1.group(1)
        title = match1.group(2)
        print(f"ID: {id}")
        print(f"Заголовок: {title}")
      match2 = re.match(r"^[0-9]{0,15}$", text)
      if match2:
        count = match2.group(0)
        print(f"Количество участников: {count}")
      match3 = re.match(r"(\d{2}\.\d{2}\.\d{4})\n(\d{2}\.\d{2}\.\d{4})", text)
      if match3:
        date1 = match3.group(1)
        date2 = match3.group(2)
        print(f"Дата начала: {date1}")
        print(f"Дата окончания: {date2}")
      match4 = re.match(r"([\w]+)\n([\w+|\S+\ ?]*), ?([\w+|\S+\ ?]*)", text)
      if match4:
        country = match4.group(1)
        state = match4.group(2)
        city = match4.group(3)
        print(f"Страна: {country}")
        print(f"Регион: {state}")
        print(f"Город: {city}")
      # print(el.text(), end="\n")


asyncio.run(main())

