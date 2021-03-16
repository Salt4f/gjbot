python3 main.py
echo Main
python3 tickets.py
echo Tickets
docker cp inserts.sql pg:/inserts.sql
docker-compose exec pg psql -U root db -f inserts.sql
docker cp tickets.sql pg:/tickets.sql
docker-compose exec pg psql -U root db -f tickets.sql
