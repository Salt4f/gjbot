docker cp tables.sql pg:/tables.sql
docker-compose exec pg psql -U root db -f tables.sql
