#include <iostream>
#include <fstream>
#include <string>
#include <vector>
#include <algorithm>
#include <cctype>
#include <sstream>
#include <unordered_set>
#include <cstdlib>
#include <regex>
#include <limits>

using namespace std;

class HashTable {
private:
    static const int TABLE_SIZE = 10007;
    vector<vector<string>> table;
    
    int hashFunction(const string& key) const {
        unsigned long long hash = 0;
        for (char c : key) {
            hash = (hash * 31 + c) % TABLE_SIZE;
        }
        return static_cast<int>(hash);
    }
    
public:
    HashTable() : table(TABLE_SIZE) {}
    
    void insert(const string& word) {
        if (word.empty()) return;
        int index = hashFunction(word);
        for (const string& w : table[index]) {
            if (w == word) return;
        }
        table[index].push_back(word);
    }
    
    bool search(const string& word) const {
        if (word.empty()) return false;
        int index = hashFunction(word);
        for (const string& w : table[index]) {
            if (w == word) return true;
        }
        return false;
    }
    
    vector<string> getAllWords() const {
        vector<string> allWords;
        for (const auto& bucket : table) {
            for (const string& word : bucket) {
                allWords.push_back(word);
            }
        }
        return allWords;
    }
};

class SpellCorrector {
private:
    HashTable dictionary;
    
    string toLowerCase(const string& word) const {
        string result = word;
        transform(result.begin(), result.end(), result.begin(), ::tolower);
        return result;
    }
    
    string preprocessWord(const string& word) const {
        string processed = toLowerCase(word);
        processed.erase(remove_if(processed.begin(), processed.end(), [](char c) {
            return !isalpha(c);
        }), processed.end());
        
        if (processed.empty()) return processed;
        
        if (processed.length() > 3) {
            if (processed.substr(processed.length() - 3) == "ies") {
                processed = processed.substr(0, processed.length() - 3) + "y";
            } else if (processed.substr(processed.length() - 3) == "ing") {
                processed = processed.substr(0, processed.length() - 3) + "e";
            } else if (processed.substr(processed.length() - 2) == "es" && 
                       processed.length() > 4) {
                processed = processed.substr(0, processed.length() - 2);
            } else if (processed.substr(processed.length() - 2) == "ly") {
                processed = processed.substr(0, processed.length() - 2);
            } else if (processed.substr(processed.length() - 2) == "ed") {
                processed = processed.substr(0, processed.length() - 2);
            } else if (processed.back() == 's' && processed.length() > 3) {
                processed = processed.substr(0, processed.length() - 1);
            }
        }
        
        return processed;
    }
    
    int levenshteinDistance(const string& s1, const string& s2) const {
        if (s1.empty()) return s2.length();
        if (s2.empty()) return s1.length();
        
        int m = s1.length(), n = s2.length();
        vector<vector<int>> dp(m + 1, vector<int>(n + 1));
        
        for (int i = 0; i <= m; i++) dp[i][0] = i;
        for (int j = 0; j <= n; j++) dp[0][j] = j;
        
        for (int i = 1; i <= m; i++) {
            for (int j = 1; j <= n; j++) {
                if (s1[i-1] == s2[j-1]) {
                    dp[i][j] = dp[i-1][j-1];
                } else {
                    dp[i][j] = 1 + min({dp[i-1][j], dp[i][j-1], dp[i-1][j-1]});
                }
            }
        }
        return dp[m][n];
    }
    
    vector<string> getSuggestions(const string& word) const {
        vector<pair<string, int>> candidates;
        vector<string> allWords = dictionary.getAllWords();
        
        for (const string& dictWord : allWords) {
            int distance = levenshteinDistance(word, dictWord);
            if (distance <= 2) {
                candidates.push_back({dictWord, distance});
            }
        }
        
        sort(candidates.begin(), candidates.end(), 
             [](const pair<string, int>& a, const pair<string, int>& b) {
                 return a.second < b.second;
             });
        
        vector<string> suggestions;
        for (size_t i = 0; i < min<size_t>(5, candidates.size()); i++) {
            suggestions.push_back(candidates[i].first);
        }
        
        return suggestions;
    }
    
public:
    bool loadDictionary(const string& filename) {
        ifstream file(filename);
        if (!file.is_open()) {
            cout << "Error: Could not open dictionary file: " << filename << endl;
            return false;
        }
        
        string word;
        size_t wordCount = 0;
        while (getline(file, word)) {
            if (!word.empty()) {
                word = toLowerCase(word);
                dictionary.insert(word);
                wordCount++;
            }
        }
        file.close();
        cout << "Dictionary loaded successfully! (" << wordCount << " words)" << endl;
        return true;
    }
    
    void generateWebInterface() {
        ofstream htmlFile("spell_corrector.html");
        if (!htmlFile.is_open()) {
            cout << "Error: Could not create spell_corrector.html" << endl;
            return;
        }
        
        htmlFile << R"(<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Advanced Spell Corrector</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="styles.css" rel="stylesheet">
</head>
<body class="bg-gradient-to-br from-gray-900 via-gray-800 to-purple-900 min-h-screen text-white overflow-x-hidden">
    <!-- Background Effects -->
    <div class="fixed inset-0 pointer-events-none z-0">
        <div class="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_70%)] animate-pulse-slow"></div>
        <div class="absolute top-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-float"></div>
        <div class="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-float delay-1000"></div>
    </div>

    <!-- Main Container -->
    <div class="relative z-10 container mx-auto px-4 py-12 max-w-7xl">
        <!-- Header -->
        <header class="text-center mb-16">
            <h1 class="text-5xl md:text-7xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 animate-gradient-x">
                Spell Corrector
            </h1>
            <p class="mt-4 text-lg md:text-xl text-gray-300 max-w-2xl mx-auto animate-fade-in-up">
                Experience cutting-edge spell checking with AI-driven suggestions and real-time corrections.
            </p>
        </header>

        <!-- Main Content -->
        <div class="grid lg:grid-cols-2 gap-8">
            <!-- Input Section -->
            <div class="backdrop-blur-md bg-gray-800/30 border border-gray-700/50 rounded-3xl p-8 shadow-2xl transition-all duration-500 hover:shadow-blue-500/20 animate-slide-in-left">
                <h2 class="text-3xl font-semibold mb-6 flex items-center text-blue-300">
                    <svg class="w-8 h-8 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Input Text
                </h2>
                <div class="mb-6">
                    <label class="block text-sm font-medium text-gray-400 mb-2">Upload Text File</label>
                    <input type="file" id="fileInput" accept=".txt" 
                           class="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-gray-200 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700">
                </div>
                <div class="mb-6">
                    <label class="block text-sm font-medium text-gray-400 mb-2">Or Type Your Text</label>
                    <textarea id="inputText" rows="8" placeholder="Enter your text here to check for spelling errors..."
                              class="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-gray-200 resize-none"></textarea>
                </div>
                <button id="checkButton" 
                        class="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-xl py-4 font-semibold text-sm uppercase tracking-wide transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/50 flex items-center justify-center">
                    <span id="buttonText">Check Spelling</span>
                    <svg class="w-5 h-5 ml-2 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                </button>
            </div>

            <!-- Results Section -->
            <div class="backdrop-blur-md bg-gray-800/30 border border-gray-700/50 rounded-3xl p-8 shadow-2xl transition-all duration-500 hover:shadow-purple-500/20 animate-slide-in-right">
                <h2 class="text-3xl font-semibold mb-6 flex items-center text-purple-300">
                    <svg class="w-8 h-8 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Results & Suggestions
                </h2>
                <div id="resultsContainer" class="space-y-6 min-h-[400px]">
                    <div class="text-center text-gray-400 py-16 animate-pulse">
                        <svg class="w-20 h-20 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                        <p class="text-lg">Enter text or upload a file to begin spell checking</p>
                    </div>
                </div>
                <div id="downloadSection" class="mt-6 hidden">
                    <button id="downloadButton" 
                            class="w-full bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 rounded-xl py-4 font-semibold text-sm uppercase tracking-wide transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-green-500/50 flex items-center justify-center">
                        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l4 4m-4-4l-4 4m4-4V4" />
                        </svg>
                        Download Corrected Text
                    </button>
                </div>
            </div>
        </div>

        <!-- Stats Section -->
        <div class="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div class="backdrop-blur-md bg-gray-800/30 border border-gray-700/50 rounded-2xl p-6 text-center transition-all duration-300 hover:bg-gray-700/20 animate-slide-in-up" style="animation-delay: 0.1s;">
                <div class="text-4xl font-bold text-blue-400" id="totalWords">0</div>
                <div class="text-sm text-gray-400">Total Words</div>
            </div>
            <div class="backdrop-blur-md bg-gray-800/30 border border-gray-700/50 rounded-2xl p-6 text-center transition-all duration-300 hover:bg-gray-700/20 animate-slide-in-up" style="animation-delay: 0.2s;">
                <div class="text-4xl font-bold text-red-400" id="incorrectWords">0</div>
                <div class="text-sm text-gray-400">Incorrect Words</div>
            </div>
            <div class="backdrop-blur-md bg-gray-800/30 border border-gray-700/50 rounded-2xl p-6 text-center transition-all duration-300 hover:bg-gray-700/20 animate-slide-in-up" style="animation-delay: 0.3s;">
                <div class="text-4xl font-bold text-green-400" id="accuracy">100%</div>
                <div class="text-sm text-gray-400">Accuracy</div>
            </div>
        </div>
    </div>

    <script src="script.js"></script>
</body>
</html>
)";
        
        htmlFile.close();
        cout << "Web interface generated successfully! Created spell_corrector.html" << endl;
        cout << "Ensure styles.css and script.js are in the same directory." << endl;
    }
    
    void processFile(const string& inputFile, const string& outputFile) {
        ifstream inFile(inputFile);
        if (!inFile.is_open()) {
            cout << "Error: Could not open input file: " << inputFile << endl;
            return;
        }
        
        inFile.seekg(0, ios::end);
        if (inFile.tellg() == 0) {
            cout << "Error: Input file is empty: " << inputFile << endl;
            inFile.close();
            return;
        }
        inFile.seekg(0, ios::beg);
        
        ofstream outFile(outputFile);
        if (!outFile.is_open()) {
            cout << "Error: Could not create output file: " << outputFile << endl;
            inFile.close();
            return;
        }
        
        string line;
        int totalWords = 0, correctWords = 0;
        
        cout << "\n=== Spell Checking Process ===" << endl;
        
        while (getline(inFile, line)) {
            if (line.empty()) {
                outFile << endl;
                continue;
            }
            
            istringstream iss(line);
            string word;
            string correctedLine;
            
            while (iss >> word) {
                totalWords++;
                string originalWord = word;
                
                string prefix, suffix, cleanWord = word;
                while (!cleanWord.empty() && !isalpha(cleanWord.front())) {
                    prefix += cleanWord.front();
                    cleanWord = cleanWord.substr(1);
                }
                while (!cleanWord.empty() && !isalpha(cleanWord.back())) {
                    suffix = cleanWord.back() + suffix;
                    cleanWord = cleanWord.substr(0, cleanWord.length() - 1);
                }
                
                if (!cleanWord.empty()) {
                    string processedWord = preprocessWord(cleanWord);
                    
                    if (dictionary.search(processedWord)) {
                        correctWords++;
                        correctedLine += originalWord + " ";
                        cout << "âœ“ '" << cleanWord << "' is correct" << endl;
                    } else {
                        vector<string> suggestions = getSuggestions(processedWord);
                        
                        cout << "\nâŒ '" << cleanWord << "' is incorrect" << endl;
                        cout << "Suggestions:" << endl;
                        
                        if (suggestions.empty()) {
                            cout << "No suggestions found. Keeping original word." << endl;
                            correctedLine += originalWord + " ";
                        } else {
                            for (size_t i = 0; i < suggestions.size(); i++) {
                                cout << (i + 1) << ". " << suggestions[i] << endl;
                            }
                            cout << (suggestions.size() + 1) << ". Keep original '" << cleanWord << "'" << endl;
                            
                            int choice = 0;
                            while (true) {
                                cout << "Choose option (1-" << (suggestions.size() + 1) << "): ";
                                if (cin >> choice && choice >= 1 && choice <= static_cast<int>(suggestions.size() + 1)) {
                                    break;
                                }
                                cout << "Invalid choice. Please try again." << endl;
                                cin.clear();
                                cin.ignore(numeric_limits<streamsize>::max(), '\n');
                            }
                            
                            if (choice >= 1 && choice <= static_cast<int>(suggestions.size())) {
                                correctedLine += prefix + suggestions[choice - 1] + suffix + " ";
                                cout << "âœ“ Replaced with '" << suggestions[choice - 1] << "'" << endl;
                                correctWords++;
                            } else {
                                correctedLine += originalWord + " ";
                                cout << "âœ“ Kept original word" << endl;
                            }
                        }
                    }
                } else {
                    correctedLine += originalWord + " ";
                }
            }
            
            if (!correctedLine.empty()) {
                correctedLine.pop_back();
            }
            outFile << correctedLine << endl;
        }
        
        inFile.close();
        outFile.close();
        
        cout << "\n=== Spell Check Summary ===" << endl;
        cout << "Total words processed: " << totalWords << endl;
        cout << "Correct words: " << correctWords << endl;
        cout << "Incorrect words: " << (totalWords - correctWords) << endl;
        cout << "Accuracy: " << (totalWords > 0 ? (correctWords * 100.0 / totalWords) : 100.0) << "%" << endl;
        cout << "Corrected text saved to: " << outputFile << endl;
    }
    
    void run() {
        cout << "ðŸ”® Advanced Spell Corrector System" << endl;
        cout << "=================================" << endl;
        
        if (!loadDictionary("dict.txt")) {
            return;
        }
        
        generateWebInterface();
        
        int choice = 0;
        while (true) {
            cout << "\nChoose an option:" << endl;
            cout << "1. Process text file" << endl;
            cout << "2. Open web interface" << endl;
            cout << "Enter choice (1-2): ";
            if (cin >> choice && choice >= 1 && choice <= 2) {
                break;
            }
            cout << "Invalid choice. Please enter 1 or 2." << endl;
            cin.clear();
            cin.ignore(numeric_limits<streamsize>::max(), '\n');
        }
        cin.ignore();
        
        if (choice == 1) {
            string inputFile, outputFile;
            cout << "Enter input file name: ";
            getline(cin, inputFile);
            if (inputFile.empty()) {
                cout << "Error: Input file name cannot be empty." << endl;
                return;
            }
            cout << "Enter output file name: ";
            getline(cin, outputFile);
            if (outputFile.empty()) {
                cout << "Error: Output file name cannot be empty." << endl;
                return;
            }
            
            processFile(inputFile, outputFile);
        } else {
            cout << "Opening web interface..." << endl;
            int result;
            #ifdef _WIN32
                result = system("start spell_corrector.html");
            #elif __APPLE__
                result = system("open spell_corrector.html");
            #else
                result = system("xdg-open spell_corrector.html");
            #endif
            
            if (result != 0) {
                cout << "Warning: Could not open browser automatically." << endl;
            }
            cout << "Web interface opened in your default browser!" << endl;
            cout << "If it didn't open, please open 'spell_corrector.html' manually." << endl;
        }
    }
};

int main() {
    SpellCorrector corrector;
    corrector.run();
    
    cout << "\nPress Enter to continue...";
    cin.get();
    
    return 0;
}
