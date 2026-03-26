# Geo Genious 🌍
## 📌 Application Summary
*Geography is not just about countries and maps — it’s a lot more than that.*

GeoGenious is an interactive educational web application designed to make Geography engaging, fun, and memorable for secondary school students.

This project combines quizzes and real-world visualisations to improve student engagement in non-STEM subjects such as Geography!

### Problem Statement
The Hive Foundation identified a decline in engagement in non-STEM subjects. One of the subjects, out of many is Geography where students are showing least interest. 

**GeoGenious addresses this by:**
- Making learning interactive & enjoyable.
- Improving knowledge through quizzes based on different categories.
- Encouraging continuous engagement via visualisations such as Tectonic Plates and rotating globe.

### Main features
1. 🧠 Interactive Quiz System
    - 3 Geography categories
    - Lucky Dip Mode (mixed questions from all categories)
    - Currently 5 questions per quiz (scalable for future expansion)
2. 🌍 Fun Globe
    - Interactive, rotatable globe
    - Helps students visually explore the world
3. 🏆 Results
    - Achievements system
    - Leaderboard to encourage competition
    - Progress tracking for students
4. 🌋 Live Tectonic Plates
    - Integrated third-party visualisation
    - Real-time tectonic activity display
5. 🔐 Authentication
    - User Signup & Login system
    - Secure session handling acroos all pages.
    - JWT-based authentication for session management 
    - Passwords are hashed using bcrypt before storing it into database
    - Sensitive data is stored in .env file to maximize protection

## Technology
1. **Frontend** - HTML, CSS, Javascript
2. **Backend** - Node.js, Express.js
3. **Database** - Supabase
4. **Deployment** - API hosted on Render, Website hosted on Netlify
5. **Other Tools** - Github for version control, Trello Board for Agile management.

### Database
Hosted on Supabase
A setup-db file is provided to recreate the database locally on your own database.

## 🚀 Getting Started
1. Clone the Repository
    ```
    git clone https://github.com/dougthenugget21/Nexus-Studio.git
    ```
2. Install Dependencies
    ```
    npm install
    Npm install -D nodemon
    npm install express cors dotenv pg
    ```

3. Setup Environment Variables
    Create a **.env** file and add:
    ```
    PORT=your_PORT
    DB_URL=your_database_connection_string
    SECRET_TOKEN=your_secret_token_for_encryption
    BCRYPT_SALT_ROUNDS=number_how_many_times_encryption_round_should_work
    ```
4. Setup Database
    - Run the provided SQL file setup-db.sql
    ```npm run setup-db```
    
5. Run the App
    - Run the homepage.html page in browser

## API Overview


## UX & Design Principles
- Simple and intuitive interface
- Gamified learning experience
- Visual engagement (globe, tectonic plates)
- Accessibility-focused design

## Agile Workflow
- Daily stand-ups
- Feature-based task allocation
- Mid-week feature freeze
- Final testing & polish before demo

## Testing
Unit and integration testing implemented
Target: 60%+ coverage

## Screenshots


## Challenges Faced
- Integrating frontend with backend APIs
- Managing time within a 1-week sprint
- Designing engaging yet simple UI
- Handling authentication securely

## Team
1. Douglas - Project Manager
2. Jim
3. Kiruba
4. Rumana
5. Tanjya

## 🔮Future Features
- Dynamic question generation
- More quiz categories
- Teacher / Parents dashboard
- Mobile responsiveness improvements
- Enhanced Achievements criteria

## 🐞Know Issues/Bugs
- No major bugs

*This project is for educational purposes.*
