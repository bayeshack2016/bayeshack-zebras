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

features = []

# Parse the counties data
with open('data/counties_json.csv') as data_file:
    for line in data_file:
        data = json.loads(line)

        for values in geojson['features']:
            if values['properties']['STATE'] == data['state_id'] and values['properties']['COUNTY'] == data['county_id']:
                properties= combine_dicts(values['properties'],data)
                #pprint(properties)
                values['properties'] = properties
                features.append(values)

# Update original features
geojson["features"] = features

# Re export as geojson
with open('data/us-counties-result.json', 'w') as fp:
    json.dump(geojson, fp)
