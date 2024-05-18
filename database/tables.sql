CREATE TABLE public.user (
  id char(36) PRIMARY KEY,
  name varchar(255) NOT NULL,
  email varchar(255) NOT NULL,
  password varchar(255) NOT NULL
);

CREATE TABLE public.daily_quote (
  quote varchar(500) NOT NULL,
  day Date NOT NULL
);

CREATE TABLE public.philosophy_school (
  id char(36) PRIMARY KEY,
  name varchar(255) NOT NULL,
  century varchar(255) NOT NULL
);

CREATE TABLE public.philosopher (
  id char(36) PRIMARY KEY,
  name varchar(255) NOT NULL,
  nationality varchar(255) NOT NULL,
  born_date Date NOT NULL,
  death_date Date NOT NULL
);

CREATE TABLE public.philosopher_school (
  id char(36) PRIMARY KEY,
  philosopher_id char(36) NOT NULL,
  school_id char(36) NOT NULL,
  FOREIGN KEY (philosopher_id) REFERENCES philosopher(id),
  FOREIGN KEY (school_id) REFERENCES philosophy_school(id)
);

CREATE TABLE public.quote (
  id char(36) PRIMARY KEY,
  quote varchar(500) NOT NULL,
  philosopher_id char(36) NOT NULL,
  FOREIGN KEY (philosopher_id) REFERENCES philosopher(id)
);

