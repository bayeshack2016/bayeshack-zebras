import json
from pprint import pprint

def combine_dicts(a, b):
    dict = {}
    dict.update(a)
    dict.update(b)
    return dict

# Parse the geojson
with open('data/us-counties.json') as geojson_file:
    geojson = json.load(geojson_file)

# Parse the counties data
with open('data/counties_json.csv') as data_file:
    for line in data_file:
        data = json.loads(line)

        for values in geojson['features']:
            if values['properties']['STATE'] == data['state_id'] and values['properties']['COUNTY'] == data['county_id']:
                properties= combine_dicts(values['properties'],data)
                pprint(properties)

# Merge back counties data into geojson

# Export as json
