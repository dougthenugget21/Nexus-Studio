--
-- Deleting tables if they are already present to recreate
--

DROP TABLE IF EXISTS student_details;
DROP TABLE IF EXISTS quiz_categories;
DROP TABLE IF EXISTS quiz_questions;
DROP TABLE IF EXISTS session_history;
DROP TABLE IF EXISTS question_history;
DROP TABLE IF EXISTS fun_facts;

--
-- Create student details table
--

CREATE TABLE student_details (
    student_id SMALLINT GENERATED ALWAYS AS IDENTITY,
    first_name VARCHAR(30) NOT NULL,
    surname VARCHAR(30) NOT NULL,
    email VARCHAR(50) NOT NULL,
    password VARCHAR(255) NOT NULL,
    PRIMARY KEY (student_id)
);

--
-- Create quiz categories table
--

CREATE TABLE quiz_categories (
    category_id SMALLINT GENERATED ALWAYS AS IDENTITY,
    category_name VARCHAR(30) NOT NULL,
    PRIMARY KEY (category_id)
);

--
-- Create quiz questions table
--

CREATE TABLE quiz_questions (
    question_id SMALLINT GENERATED ALWAYS AS IDENTITY,
    category_id SMALLINT,
    question VARCHAR(254) NOT NULL,
    option_1 VARCHAR(30) NOT NULL,
    option_2 VARCHAR(30) NOT NULL,
    option_3 VARCHAR(30) NOT NULL,
    option_4 VARCHAR(30) NOT NULL,
    correct_answer SMALLINT,
    PRIMARY KEY (question_id),
    FOREIGN KEY (category_id) REFERENCES quiz_categories
);

--
-- Create session history table
--

CREATE TABLE session_history (
    session_id SMALLINT GENERATED ALWAYS AS IDENTITY,
    student_id SMALLINT,
    total_attempts SMALLINT,
    score DECIMAL,
    time_taken TIME,
    test_date TIMESTAMP,
    PRIMARY KEY (session_id),
    FOREIGN KEY (student_id) REFERENCES student_details
);

--
-- Create question history table
--

CREATE TABLE question_history (
    id SMALLINT GENERATED ALWAYS AS IDENTITY,
    student_id SMALLINT,
    session_id SMALLINT,
    quesiton_id SMALLINT,
    student_ans BOOLEAN,
    PRIMARY KEY (id),
    FOREIGN KEY (session_id) REFERENCES student_details,
    FOREIGN KEY (session_id) REFERENCES session_history,
    FOREIGN KEY (quesiton_id) REFERENCES quiz_questions
);

--
-- Create fun facts table
--

CREATE TABLE fun_facts (
    fact_id SMALLINT GENERATED ALWAYS AS IDENTITY,
    fact VARCHAR(254),
    PRIMARY KEY (fact_id)
);