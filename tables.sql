CREATE TABLE inscrits (
    email       text PRIMARY KEY,
    username    text NOT NULL CHECK (username <> '')
);

CREATE TABLE grups (
    grup_name   text PRIMARY KEY
);

CREATE TABLE participants (
    email       text PRIMARY KEY,
    discord_id  text NOT NULL UNIQUE CHECK (discord_id <> ''),
    discord_tag text NOT NULL UNIQUE CHECK (discord_tag <> ''),
    grup        text DEFAULT NULL,
    
    FOREIGN KEY(email) references inscrits(email),
    FOREIGN KEY(grup) references grups(grup_name)
);


INSERT INTO inscrits VALUES('example@mail.com', 'pepito');
--INSERT INTO participants VALUES('Pepito#0000');