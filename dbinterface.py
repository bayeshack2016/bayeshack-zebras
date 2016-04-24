import psycopg2 as pg
class DBInterface(object):
    def __init__(self, local_mode=False):
        connection = None
        try:
            if local_mode:
                connection = pg.connect(database="zebras",
                                        host="localhost",)
            else:
                connection = pg.connect(database="zebras",
                                        host="159.203.214.223",
                                        user="postgres",
                                        password="d95705cbb278d5f6930afba6e414f735",
                                        port=23874,
                                        sslmode="require")
            print "Connection Established"
        except Exception as ex:
            print "exception type %s %s" % (type(ex).__name__, ex.args)
            print "Connection Not Established"
        self.cursor = connection.cursor()

    def get_records(self):
        query_str = 'SELECT state, county, county_population, rx_per_capita_rank, od_per_capita_rank, od_per_rx_rank FROM opioid_data'
        self.cursor.execute(query_str)
        colnames = [desc[0] for desc in self.cursor.description]
        records = self.cursor.fetchall()
        dictionary_records = [dict((x, y) for x, y in zip(colnames, record)) for record in records]
        return dictionary_records
