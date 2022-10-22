CREATE TABLE IF NOT EXISTS users
(
    id UUID PRIMARY KEY,
    "name" TEXT,
    password TEXT,
    email TEXT,
    phone TEXT
);

CREATE TABLE IF NOT EXISTS recipients
(
    id UUID PRIMARY KEY,
    "name" TEXT,
    email TEXT,
    phone TEXT
);

CREATE TABLE IF NOT EXISTS messages
(
    id UUID PRIMARY KEY,
    title TEXT,
    content TEXT NOT NULL,
    "type" TEXT NOT NULL,
    send_date DATE NOT NULL,
    user_id UUID NOT NULL,
    recipient_id UUID NOT NULL,
    FOREIGN KEY (user_id)
        REFERENCES users (id),
    FOREIGN KEY (recipient_id)
        REFERENCES recipients (id)
);

INSERT INTO users
VALUES (32db47ca-37ba-4f4c-bd82-14b49f09b27d,
        "Strażak",
        "xxxx",
        "xxxx",
        "xxxx");

INSERT INTO recipients
VALUES ('2e1453d3-76a8-43cf-955d-5b3d0546f7c7',
        'Walter',
        'xxxx',
        'xxxx');

INSERT INTO messages
VALUES ('3e330aa8-b88f-4b21-9411-c382d0dfe479',
        'test',
        'test',
        'EMAIL',
        '2022-10-22',
	    '32db47ca-37ba-4f4c-bd82-14b49f09b27d',
	    '2e1453d3-76a8-43cf-955d-5b3d0546f7c7');