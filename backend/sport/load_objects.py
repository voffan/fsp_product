from sport.wsgi import application
import json
import datetime
from django.db import transaction
from contests.models import Contest, SportType, Discipline, ContestType, ContestDiscipline, AgeGroup, Gender
from country.models import Region, Country, City


def get_json_data(file_name):
    with open(file_name, encoding='utf-8') as f:
        data = json.load(f)
    return data

contest_types = {
    '10':3,
    '11':3,
    '12':3,
    '13':3,
    '14':3,
    '16':3,
    '17':1,
    '18':1,
    '23':1,
    '19':2,
    '20':2,
    '21':2,
    '22':2,
    '24':4
}

def create_objects(contest):
    with transaction.atomic():
        region = None
        if 'region' in contest and contest['region'] is not None:
            region, created = Region.objects.update_or_create(name=contest['region'], 
                                                              defaults={'name': contest['region']}, 
                                                              create_defaults={'district':None, 'name':contest['region']})
            city, created = City.objects.update_or_create(region__name=contest['region'], name=contest['city'],
                                                          defaults={'name': contest['city']},
                                                          create_defaults={'region': region, 'name': contest['city']})
        else:
            city, created = City.objects.update_or_create(region__isnull=True, name=contest['city'],
                                                          defaults={'name': contest['city']},
                                                          create_defaults={'region':None, 'name': contest['city']})
        country, created = Country.objects.update_or_create(name=contest['country'],
                                                            defaults={'name': contest['country']},
                                                            create_defaults={'name': contest['country']})
        sport_type, created = SportType.objects.update_or_create(name=contest['sport_type'],
                                                                 defaults={'name': contest['sport_type']},
                                                                 create_defaults={'name': contest['sport_type']})
        disciplines = []
        for discipline in contest['disciplines']:
            d, created = Discipline.objects.update_or_create(sport_type__name=sport_type.name, name=discipline,
                                                             defaults={'name': discipline},
                                                             create_defaults={'sport_type': sport_type, 'name': discipline})
            disciplines.append(d)
        contest_type_code = contest['code'][8] + contest['code'][9]
        c = Contest.objects.filter(code=contest['code']).first()
        if c is None:
            c = Contest()
        c.program = contest['program']
        c.code = contest['code']
        c.start = datetime.datetime.strptime(contest['start'], "%d.%m.%Y").date()
        c.end = datetime.datetime.strptime(contest['end'], "%d.%m.%Y").date()
        c.place = city
        c.country = country
        c.contestants = contest['contestants']
        c.contest_type = ContestType.objects.get(pk=contest_types[contest_type_code])
        c.male = 'male' in contest['gender_group']
        c.female = 'female' in contest['gender_group']
        c.save()

        for discipline in disciplines:
            d = ContestDiscipline()
            d.contest = c
            d.discipline = discipline
            d.save()
        
        if 'male' in contest['gender_group']:
            for age_range in contest['gender_group']['male']:
                start = age_range['min'] if 'min' in age_range else -1
                end = age_range['max'] if 'max' in age_range else 100
                ag = AgeGroup.objects.filter(contest__id=c.id, gender=Gender.MALE, start=start, end=end).first()
                if ag is None:
                    ag = AgeGroup()
                ag.contest = c
                ag.gender = Gender.MALE
                ag.start = start
                ag.end = end
                ag.save()
        if 'female' in contest['gender_group']:
            for age_range in contest['gender_group']['female']:
                start = age_range['min'] if 'min' in age_range else -1
                end = age_range['max'] if 'max' in age_range else 100
                ag = AgeGroup.objects.filter(contest__id=c.id, gender=Gender.FEMALE, start=start, end=end).first()
                if ag is None:
                    ag = AgeGroup()
                ag.contest = c
                ag.gender = Gender.MALE
                ag.start = start
                ag.end = end
                ag.save()
    


def load_object(file_name):
    contests = get_json_data(file_name)

    for contest in contests:
        try:
            create_objects(contest)
        except Exception as e:
            print(contest['code'] + contest['program'], 'не удалось загрузить!', str(e))


if __name__ == '__main__':
    load_object('../../parsed_data.json')