CREATE TABLE inscrits (
    email       text PRIMARY KEY,
    username    text NOT NULL CHECK (username <> '')
);

CREATE TABLE tickets (
    id          text PRIMARY KEY
);

CREATE TABLE grups (
    grup_name   text PRIMARY KEY
);

CREATE TABLE participants (
    email       text PRIMARY KEY,
    discord_id  text NOT NULL UNIQUE CHECK (discord_id <> ''),
    discord_tag text NOT NULL UNIQUE CHECK (discord_tag <> ''),
    ticket      text NOT NULL UNIQUE,
    grup        text DEFAULT NULL,
    
    FOREIGN KEY(email) references inscrits(email),
    FOREIGN KEY(ticket) references tickets(id),
    FOREIGN KEY(grup) references grups(grup_name)
);


INSERT INTO inscrits VALUES('example@mail.com', 'pepito');
INSERT INTO tickets VALUES('1234');
--INSERT INTO participants VALUES('Pepito#0000');
