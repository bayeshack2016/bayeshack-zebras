# Exploring the Opioid Epidemic (HHS)

### Description
The United States is currently facing a large scale epidemic of abuse and mortality from the abuse of opioids. These include prescription drugs, such as oxycodone, hydrocodone, and morphine as well as heroin, an illicit street drug. (More info from [HHS](https://aspe.hhs.gov/basic-report/opioid-abuse-us-and-hhs-actions-address-opioid-drug-related-overdoses-and-deaths))

This project was made during [BayesHack 2016 hackathon](http://bayeshack.org) to enable the public to explore and better understand the current opioid abuse epidemic.

#### The epidemic
![The surge in opioid related deaths](https://upload.wikimedia.org/wikipedia/commons/c/c1/US_timeline._Prescription_opioid_pain_reliever_deaths.jpg)

Since the increased availability of prescription opioids began nearly two decades ago, the number of deaths in the US due to opioid overdose has more than quadrupled. The pervasive availability of these drugs seems to have created a new group of opioid abusers. The majority of heroin users are now former (or current) prescription opioid users, whereas in the past, few heroin users had previously used any opioids. This large scale epidemic has complex roots, but is taking a heavy toll on public health.

#### Zebras
Our tool, nicknamed Zebras, allows the public to explore the current scale of the epidemic at the county level. Users can view not only the overdose death rate per capita (here per 100k population), but also the opioid prescription rate, as well as the overdoses per prescription. This last metric is interesting in that it gives some sense of how bad the abuse problem is relative to the legal supply of opioids in a county. Users can also compare the rank of a county to understand how those metrics relate to one another.

### Team
- Henry Tominaga [@yukonhenry](https://github.com/yukonhenry)
- Vincent Van Steenbergen [@nsteenv](https://github.com/nsteenv)
- Roy Keyes [@roycoding](https://github.com/roycoding)

### Setup
pip install -r requirements

### Stack
* Python
* Dokku
* Flask
* Digital Ocean
* Leaflet.js
* PostgreSQL
