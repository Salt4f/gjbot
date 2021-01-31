CREATE TABLE inscrits (
    email       text PRIMARY KEY
);

CREATE TABLE tickets (
    id          text PRIMARY KEY
);

CREATE TABLE grups (
    grup_name   text PRIMARY KEY,
    project_url text DEFAULT NULL
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

CREATE TABLE votes (
    discord_id  text,
    grup_name   text,
    punt        integer,

    PRIMARY KEY(discord_id, grup_name),
    FOREIGN KEY(discord_id) references participants(discord_id),
    FOREIGN KEY(grup_name) references grups(grup_name)
);
