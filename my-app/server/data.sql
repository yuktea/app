CREATE DATABASE my-app;
CREATE TABLE stickynotes (
  id VARCHAR(255) PRIMARY KEY,
  user_email VARCHAR(255),
  title VARCHAR(30),
  progress INT,
  date VARCHAR(300)
);
