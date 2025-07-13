# Spell-checker
This project is a C++-based spell correction system that identifies and suggests corrections for misspelled words using a custom-built hash table and Levenshtein distance for similarity matching. The system also features an elegant web-based user interface built with HTML, TailwindCSS, and JavaScript

🚀 Features
📚 Dictionary Loader: Efficiently loads words from a dictionary file using a custom hash table.

🧠 Word Preprocessing: Handles common suffixes like -ing, -ed, -ly, -ies for more accurate spell checking.

🧮 Levenshtein Distance Algorithm: Calculates edit distances between input words and dictionary entries for intelligent suggestions.

💡 Top Suggestions: Displays up to 5 closest matches for each incorrect word.

🖥️ Web Interface:

Upload .txt files or input text directly.

Displays spelling suggestions and accuracy stats in a modern, responsive UI.

Uses TailwindCSS animations and design patterns.

📄 Text File Processing: Reads and processes text files, saving corrected content to a new file with word-by-word analysis.

🧰 Technologies Used
C++: Core application logic, spell correction engine.

HTML/CSS (TailwindCSS): Front-end UI for web interface.

JavaScript: Client-side interaction for file upload, spell checking interface.

Custom Hash Table: Lightweight in-memory word storage.

📂 How to Run
Place your dictionary file as dict.txt in the working directory.

Compile and run the program:

bash
Copy
Edit
g++ spell_corrector.cpp -o spell_corrector
./spell_corrector
Choose between:

Processing a text file via CLI.

Launching the web interface (auto-opens in browser).

📎 Files Included
spell_corrector.cpp: Main application logic.

spell_corrector.html: Web-based UI (auto-generated).

dict.txt: Word list for spell correction (to be provided).

styles.css & script.js: Additional web assets (expected in the same directory as the HTML file).


