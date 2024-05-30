CREATE TABLE public.user (
  id char(36) PRIMARY KEY,
  name varchar(255) NOT NULL,
  email varchar(255) NOT NULL,
  password varchar(255) NOT NULL
);

CREATE TABLE public.daily_quote (
  quote varchar(500) NOT NULL,
  day timestamp NOT NULL
);

CREATE TABLE public.philosopher (
  id char(36) PRIMARY KEY,
  name varchar(255) NOT NULL,
  nationality varchar(255) NOT NULL,
  born_date varchar(25),
  death_date varchar(25)
);

CREATE TABLE public.quote (
  id char(36) PRIMARY KEY,
  phrase varchar(500) NOT NULL,
  philosopher_id char(36) NOT NULL,
  FOREIGN KEY (philosopher_id) REFERENCES philosopher(id)
);

