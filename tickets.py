import csv

if __name__ == "__main__":
    with open("tickets.csv", "r") as file:
        reader = file.readlines()
        line_count = 0
        toWrite = ""
        for r in reader:
            row = r[:-1].replace("\"","")
            row = row.split(",")
            if line_count == 0:
                line_count +=1
            else:
                toWrite += "INSERT INTO tickets VALUES (\'"
                toWrite += row[1] + "\');\n"

        f = open("tickets.sql", "w")
        f.write(toWrite)
        f.close()
