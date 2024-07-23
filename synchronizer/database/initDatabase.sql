CREATE TABLE person (
  id CHAR(100) PRIMARY KEY,
  updatedat bigint,
  first_name text,
  last_name text,
  email text,
  phone_number text
);


CREATE TABLE election (
  id CHAR(100) PRIMARY KEY,
  updatedat bigint,
  name text,
  description text,
  status text,
  notice_interval_hours text,
  participant_number text,
  voting_start_datetime text,
  voting_end_datetime text,
  question_one text,
  question_one_option_one text,
  question_one_option_two text,
  question_two text,
  question_two_option_one text,
  question_two_option_two text
);

CREATE TABLE person_election (
  id CHAR(100) PRIMARY KEY,
  updatedat bigint,
  user_id CHAR(100),
  election_id CHAR(100) REFERENCES election(id)
);

CREATE TABLE ballot (
    id CHAR(100) PRIMARY KEY,
    updatedat BIGINT,
    user_id CHAR(100),
    person_name TEXT,
    election_id CHAR(100) REFERENCES election(id),
    question_one TEXT,
    question_two TEXT
  );
