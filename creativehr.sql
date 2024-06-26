CREATE TABLE auth (
    id SERIAL PRIMARY KEY,
    fullname VARCHAR(50) NOT NULL,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(100) NOT NULL,
    user_id INT UNIQUE NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
);


CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    fullname VARCHAR(50) NOT NULL,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    photo VARCHAR NOT NULL,
    nohp VARCHAR NOT NULL,
    alamat VARCHAR NOT NULL,
    role VARCHAR(20) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
