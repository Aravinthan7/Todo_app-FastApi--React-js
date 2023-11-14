import MySQLdb
class Mysqlconfig():
    db_config = {
    'host': 'localhost',
    'user': 'root',
    'passwd': 'Friday',
    'db': 'tododb',
    }

# Create a connection to the database
    conn = MySQLdb.connect(**db_config)

    cursor=conn.cursor()
