--
-- Deleting tables if they are already present to recreate
--

DROP TABLE IF EXISTS question_history;
DROP TABLE IF EXISTS session_history;
DROP TABLE IF EXISTS student_details;
DROP TABLE IF EXISTS quiz_questions;
DROP TABLE IF EXISTS quiz_categories;

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
    option_1 VARCHAR(50) NOT NULL,
    option_2 VARCHAR(50) NOT NULL,
    option_3 VARCHAR(50) NOT NULL,
    option_4 VARCHAR(50) NOT NULL,
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
    category_id SMALLINT,
    total_attempts SMALLINT,
    score DECIMAL,
    time_taken TIME,
    test_date TIMESTAMP,
    PRIMARY KEY (session_id),
    FOREIGN KEY (student_id) REFERENCES student_details,
    FOREIGN KEY (category_id) REFERENCES quiz_categories
);

--
-- Create question history table
--

CREATE TABLE question_history (
    id SMALLINT GENERATED ALWAYS AS IDENTITY,
    student_id SMALLINT,
    session_id SMALLINT,
    quesiton_id SMALLINT,
    ans_correctly BOOLEAN,
    PRIMARY KEY (id),
    FOREIGN KEY (student_id) REFERENCES student_details,
    FOREIGN KEY (session_id) REFERENCES session_history,
    FOREIGN KEY (quesiton_id) REFERENCES quiz_questions
);

--
-- Inserting question values into quiz_questions table
--
-- Natural Hazards = 1, Human Environment = 2, Physical Landscape = 3
--

INSERT INTO quiz_categories (category_name)
VALUES ('Natural Hazards'),
('Human Environment'),
('Physical Landscape');


INSERT INTO quiz_questions (category_id, question, option_1, option_2, option_3, option_4, correct_answer)
VALUES (1, 'A tsunami is most commonly triggered by?', 'A. Strong winds over the ocean', 'B. Heavy rainfall', 'C. Undersea earthquakes or volcanic eruption', 'D. Gradual sea-level increase', 3),
(1, 'Where do most earthquakes and volcanoes occur on Earth?', 'A. In the centres of continents', 'B. In the middle of oceans', 'C. In deserts', 'D. Around the edges of tectonic plates', 4),
(1, 'What is the molten rock called before it reaches the surface of a volcano?', 'A. Lava', 'B. Magma', 'C. Obsidian', 'D. Pumice', 2),
(1, 'Which of these is a natural hazard that can be made worse by deforestation?', 'A. Landslide', 'B. Volcanic eruption', 'C. Tsunami', 'D. Tornado', 1),
(1, 'Where do hurricanes usually form?', 'A. In the centre of large continents', 'B. Over wamr tropical oceans near the equator', 'C. In the open Arctic sea', 'D. In freshwater lakes', 1),
(2, 'Which of these is a renewable source of energy?', 'A. Coal', 'B. Wind', 'C. Oil', 'D. Natural gas', 2),
(2, 'What country has the most time zones?', 'A. France', 'B. Russia', 'C. Unites States', 'D. Philippines', 1),
(2, 'Over-farming and drought in the 1930s USA caused which environmental disaster?', 'A. The Great Smog', 'B. Bhopal Gas Disaster', 'C. Deepwater Horizon Spill', 'D. The Dust Bowl', 4),
(2, 'Which of these human activities is NOT considered a cause of global warming?', 'A. Burning fossil fuels', 'B. Recycling glass', 'C. Deforestation', 'D. Using aerosols', 2),
(2, 'Which term describes people moving from the countryside into the ciries?', 'A. Globalisation', 'B. Deforestation', 'C. Urbanisation', 'D. Desertification', 3),
(3, 'What is the largest desert in the world?', 'A. Sahara Desert', 'B. Antartic Desert', 'C. Gobi Desert', 'D. Arabian Desert', 2),
(3, 'Mauna Kea is the tallest mountain on Earth when measured from base to peak. Where is it located?', 'A. Hawaii', 'B. Fiji', 'C. New Zealand', 'D. Australia', 1),
(3, 'Which is the largest ocean?', 'A. Arctic Ocean', 'B. Indian Ocean', 'C. Pacific Ocean', 'D. Atlantic Ocean', 3),
(3, 'Mount Everest is the tallest mountain above sea level. In which mountain range is it found?', 'A. Alps', 'B. Andes', 'C. Rockies', 'D. Himalayas', 4),
(3, 'Which of these is mainly caused by waves repeatedly breaking against a cliff?', 'A. Sand dune formation', 'B. River meanders', 'C. Costal erosion', 'D. Costal deposition', 3);