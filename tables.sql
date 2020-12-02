CREATE TABLE inscrits (
    email       text PRIMARY KEY,
    username    text NOT NULL CHECK (username <> '')
);

CREATE TABLE participants (
    email       text PRIMARY KEY,
    discord_id  text UNIQUE CHECK (discord_id <> ''),
    discord_tag text UNIQUE CHECK (discord_tag <> ''),
    
    FOREIGN KEY(email) references inscrits(email)
);

INSERT INTO inscrits VALUES('example@mail.com', 'pepito');
--INSERT INTO participants VALUES('Pepito#0000');