/* Note: This is a demo dictionary. In a production environment, connect to a backend to load the actual dictionary. */
let correctedText = '';
let incorrectWords = [];
let userChoices = {};

const dictionary = new Set([
    'the', 'quick', 'brown', 'fox', 'jumps', 'over', 'lazy', 'dog', 'hello', 'world',
    'computer', 'science', 'programming', 'algorithm', 'data', 'structure', 'spell',
    'checker', 'corrector', 'university', 'engineering', 'technology', 'lahore',
    'student', 'project', 'assignment', 'course', 'semester', 'education', 'sing', 'nice', 'walk',







    // Common articles, prepositions, conjunctions
    'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 
    'from', 'up', 'about', 'into', 'through', 'during', 'before', 'after', 'above', 
    'below', 'between', 'among', 'under', 'since', 'while', 'until', 'because', 'if', 
    'when', 'where', 'how', 'what', 'who', 'which', 'that', 'this', 'these', 'those',

    // Common verbs
    'is', 'are', 'was', 'were', 'be', 'being', 'been', 'have', 'has', 'had', 'do', 
    'does', 'did', 'will', 'would', 'could', 'should', 'can', 'may', 'might', 'must',
    'go', 'goes', 'going', 'went', 'gone', 'come', 'comes', 'coming', 'came', 'see',
    'sees', 'seeing', 'saw', 'seen', 'get', 'gets', 'getting', 'got', 'gotten',
    'make', 'makes', 'making', 'made', 'take', 'takes', 'taking', 'took', 'taken',
    'know', 'knows', 'knowing', 'knew', 'known', 'think', 'thinks', 'thinking', 'thought',
    'say', 'says', 'saying', 'said', 'tell', 'tells', 'telling', 'told', 'give',
    'gives', 'giving', 'gave', 'given', 'find', 'finds', 'finding', 'found',
    'work', 'works', 'working', 'worked', 'play', 'plays', 'playing', 'played',
    'run', 'runs', 'running', 'ran', 'try', 'tries', 'trying', 'tried', 'help',
    'helps', 'helping', 'helped', 'show', 'shows', 'showing', 'showed', 'shown',
    'move', 'moves', 'moving', 'moved', 'live', 'lives', 'living', 'lived',
    'believe', 'believes', 'believing', 'believed', 'bring', 'brings', 'bringing', 'brought',
    'happen', 'happens', 'happening', 'happened', 'write', 'writes', 'writing', 'wrote', 'written',
    'provide', 'provides', 'providing', 'provided', 'sit', 'sits', 'sitting', 'sat',
    'stand', 'stands', 'standing', 'stood', 'lose', 'loses', 'losing', 'lost',
    'pay', 'pays', 'paying', 'paid', 'meet', 'meets', 'meeting', 'met',
    'include', 'includes', 'including', 'included', 'continue', 'continues', 'continuing', 'continued',
    'set', 'sets', 'setting', 'put', 'puts', 'putting', 'end', 'ends', 'ending', 'ended',
    'why', 'start', 'starts', 'starting', 'started', 'turn', 'turns', 'turning', 'turned',
    'ask', 'asks', 'asking', 'asked', 'need', 'needs', 'needing', 'needed',
    'feel', 'feels', 'feeling', 'felt', 'become', 'becomes', 'becoming', 'became',
    'leave', 'leaves', 'leaving', 'left', 'call', 'calls', 'calling', 'called',
    'back', 'want', 'wants', 'wanting', 'wanted', 'look', 'looks', 'looking', 'looked',
    'use', 'uses', 'using', 'used', 'seem', 'seems', 'seeming', 'seemed',

    // Common adjectives
    'good', 'great', 'big', 'small', 'large', 'little', 'long', 'short', 'high', 'low',
    'old', 'new', 'young', 'early', 'late', 'right', 'wrong', 'true', 'false', 'real',
    'important', 'different', 'same', 'own', 'other', 'another', 'next', 'last', 'first',
    'best', 'better', 'worse', 'worst', 'easy', 'hard', 'difficult', 'simple', 'clear',
    'sure', 'certain', 'possible', 'impossible', 'necessary', 'available', 'free', 'open',
    'close', 'closed', 'full', 'empty', 'hot', 'cold', 'warm', 'cool', 'fast', 'slow',
    'strong', 'weak', 'heavy', 'light', 'dark', 'bright', 'clean', 'dirty', 'safe',
    'dangerous', 'happy', 'sad', 'angry', 'excited', 'tired', 'busy', 'ready', 'fine',
    'bad', 'nice', 'beautiful', 'ugly', 'pretty', 'handsome', 'smart', 'stupid', 'funny',
    'serious', 'quiet', 'loud', 'soft', 'hard', 'smooth', 'rough', 'sharp', 'dull',

    // Common nouns
    'time', 'year', 'day', 'week', 'month', 'hour', 'minute', 'second', 'morning',
    'afternoon', 'evening', 'night', 'today', 'tomorrow', 'yesterday', 'weekend',
    'people', 'person', 'man', 'woman', 'child', 'children', 'boy', 'girl', 'baby',
    'family', 'parent', 'father', 'mother', 'son', 'daughter', 'brother', 'sister',
    'friend', 'friends', 'name', 'place', 'home', 'house', 'room', 'door', 'window',
    'table', 'chair', 'bed', 'car', 'bus', 'train', 'plane', 'bike', 'road', 'street',
    'city', 'town', 'country', 'state', 'world', 'earth', 'water', 'air', 'fire',
    'food', 'money', 'book', 'paper', 'pen', 'pencil', 'phone', 'computer', 'internet',
    'email', 'message', 'letter', 'word', 'words', 'language', 'english', 'school',
    'class', 'teacher', 'student', 'lesson', 'test', 'exam', 'grade', 'homework',
    'job', 'work', 'office', 'company', 'business', 'service', 'product', 'market',
    'price', 'cost', 'value', 'number', 'amount', 'total', 'part', 'piece', 'side',
    'kind', 'type', 'sort', 'way', 'method', 'system', 'process', 'program', 'plan',
    'idea', 'thought', 'mind', 'body', 'hand', 'hands', 'foot', 'feet', 'head',
    'eyes', 'eye', 'face', 'voice', 'heart', 'health', 'life', 'death', 'problem',
    'question', 'answer', 'result', 'reason', 'cause', 'effect', 'change', 'chance',
    'choice', 'decision', 'action', 'activity', 'event', 'situation', 'condition',
    'state', 'position', 'level', 'area', 'space', 'size', 'shape', 'color', 'sound',

    // Technology and programming related
    'software', 'hardware', 'database', 'network', 'server', 'client', 'website',
    'application', 'app', 'mobile', 'desktop', 'laptop', 'tablet', 'smartphone',
    'internet', 'web', 'online', 'offline', 'digital', 'electronic', 'tech',
    'coding', 'development', 'developer', 'programmer', 'code', 'function',
    'variable', 'array', 'object', 'class', 'method', 'library', 'framework',
    'api', 'interface', 'user', 'admin', 'system', 'operating', 'windows',
    'linux', 'mac', 'android', 'ios', 'javascript', 'python', 'java', 'html',
    'css', 'sql', 'database', 'mysql', 'mongodb', 'react', 'angular', 'node',
    'github', 'git', 'version', 'control', 'repository', 'commit', 'branch',
    'merge', 'pull', 'push', 'clone', 'fork', 'issue', 'bug', 'fix', 'patch',
    'update', 'upgrade', 'install', 'setup', 'config', 'configuration', 'settings',
    'password', 'username', 'login', 'logout', 'signin', 'signup', 'register',
    'profile', 'account', 'dashboard', 'admin', 'panel', 'control', 'manage',

    // Academic and educational
    'research', 'study', 'studies', 'academic', 'scholar', 'scholarship', 'degree',
    'bachelor', 'master', 'phd', 'doctorate', 'graduate', 'undergraduate', 'college',
    'faculty', 'department', 'professor', 'instructor', 'lecture', 'tutorial',
    'laboratory', 'lab', 'experiment', 'theory', 'practice', 'practical', 'thesis',
    'dissertation', 'paper', 'essay', 'report', 'presentation', 'conference',
    'journal', 'article', 'publication', 'chapter', 'section', 'paragraph', 'page',
    'reference', 'citation', 'bibliography', 'source', 'author', 'editor', 'publisher',
    'edition', 'volume', 'issue', 'abstract', 'introduction', 'conclusion', 'summary',
    'analysis', 'discussion', 'method', 'methodology', 'result', 'finding', 'data',

    // Business and professional
    'management', 'manager', 'director', 'executive', 'employee', 'staff', 'team',
    'department', 'organization', 'corporation', 'enterprise', 'industry', 'sector',
    'market', 'customer', 'client', 'supplier', 'vendor', 'partner', 'contract',
    'agreement', 'deal', 'negotiation', 'meeting', 'appointment', 'schedule',
    'deadline', 'target', 'goal', 'objective', 'strategy', 'plan', 'budget',
    'finance', 'financial', 'accounting', 'revenue', 'profit', 'loss', 'investment',
    'sales', 'marketing', 'advertising', 'promotion', 'brand', 'product', 'service',
    'quality', 'standard', 'requirement', 'specification', 'feature', 'benefit',
    'advantage', 'disadvantage', 'opportunity', 'challenge', 'risk', 'success',
    'failure', 'achievement', 'performance', 'evaluation', 'assessment', 'review',

    // Common Pakistani/Urdu origin words in English context
    'pakistan', 'pakistani', 'karachi', 'islamabad', 'lahore', 'peshawar', 'quetta',
    'punjab', 'sindh', 'balochistan', 'kpk', 'urdu', 'punjabi', 'sindhi', 'pashto',
    'balochi', 'islamabad', 'rawalpindi', 'faisalabad', 'multan', 'gujranwala',
    'hyderabad', 'sukkur', 'bahawalpur', 'sargodha', 'sialkot', 'larkana',

    // Time and date related
    'january', 'february', 'march', 'april', 'may', 'june', 'july', 'august',
    'september', 'october', 'november', 'december', 'monday', 'tuesday', 'wednesday',
    'thursday', 'friday', 'saturday', 'sunday', 'am', 'pm', 'clock', 'watch',
    'calendar', 'date', 'schedule', 'appointment', 'deadline', 'duration', 'period',

    // Numbers and quantities
    'zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine',
    'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen',
    'seventeen', 'eighteen', 'nineteen', 'twenty', 'thirty', 'forty', 'fifty',
    'sixty', 'seventy', 'eighty', 'ninety', 'hundred', 'thousand', 'million',
    'billion', 'first', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh',
    'eighth', 'ninth', 'tenth', 'last', 'final', 'initial', 'primary', 'secondary',
    'many', 'few', 'several', 'some', 'all', 'most', 'more', 'less', 'much',
    'little', 'enough', 'too', 'very', 'quite', 'rather', 'pretty', 'really',
    'truly', 'certainly', 'definitely', 'probably', 'maybe', 'perhaps', 'possibly',

    // Actions and activities
    'read', 'reads', 'reading', 'write', 'writes', 'writing', 'wrote', 'written',
    'listen', 'listens', 'listening', 'listened', 'speak', 'speaks', 'speaking', 'spoke',
    'talk', 'talks', 'talking', 'talked', 'watch', 'watches', 'watching', 'watched',
    'learn', 'learns', 'learning', 'learned', 'teach', 'teaches', 'teaching', 'taught',
    'study', 'studies', 'studying', 'studied', 'practice', 'practices', 'practicing', 'practiced',
    'exercise', 'exercises', 'exercising', 'exercised', 'play', 'plays', 'playing', 'played',
    'eat', 'eats', 'eating', 'ate', 'eaten', 'drink', 'drinks', 'drinking', 'drank',
    'sleep', 'sleeps', 'sleeping', 'slept', 'wake', 'wakes', 'waking', 'woke', 'woken',
    'travel', 'travels', 'traveling', 'traveled', 'visit', 'visits', 'visiting', 'visited',
    'buy', 'buys', 'buying', 'bought', 'sell', 'sells', 'selling', 'sold',
    'cook', 'cooks', 'cooking', 'cooked', 'clean', 'cleans', 'cleaning', 'cleaned',
    'wash', 'washes', 'washing', 'washed', 'drive', 'drives', 'driving', 'drove', 'driven',
    'fly', 'flies', 'flying', 'flew', 'flown', 'swim', 'swims', 'swimming', 'swam',
    'dance', 'dances', 'dancing', 'danced', 'sing', 'sings', 'singing', 'sang', 'sung',

    // Emotions and feelings
    'love', 'loves', 'loving', 'loved', 'like', 'likes', 'liking', 'liked',
    'hate', 'hates', 'hating', 'hated', 'enjoy', 'enjoys', 'enjoying', 'enjoyed',
    'prefer', 'prefers', 'preferring', 'preferred', 'want', 'wants', 'wanting', 'wanted',
    'wish', 'wishes', 'wishing', 'wished', 'hope', 'hopes', 'hoping', 'hoped',
    'fear', 'fears', 'fearing', 'feared', 'worry', 'worries', 'worrying', 'worried',
    'care', 'cares', 'caring', 'cared', 'trust', 'trusts', 'trusting', 'trusted',
    'respect', 'respects', 'respecting', 'respected', 'admire', 'admires', 'admiring', 'admired',

    // Common misspelled words (correct versions)
    'receive', 'achieve', 'believe', 'piece', 'field', 'friend', 'weird', 'seize',
    'ceiling', 'foreign', 'height', 'weight', 'neighbor', 'eight', 'sleigh', 'vein',
    'rein', 'reign', 'feign', 'deign', 'their', 'there', 'theyre', 'your', 'youre',
    'its', 'whose', 'whos', 'accept', 'except', 'affect', 'effect', 'advise', 'advice',
    'lose', 'loose', 'choose', 'chose', 'than', 'then', 'breath', 'breathe',
    'cloth', 'clothe', 'desert', 'dessert', 'principal', 'principle', 'capital', 'capitol',
    'stationary', 'stationery', 'complement', 'compliment', 'council', 'counsel',
    'discrete', 'discreet', 'elicit', 'illicit', 'emigrant', 'immigrant', 'eminent', 'imminent',

    // Additional common words
    'about', 'above', 'across', 'actually', 'almost', 'alone', 'along', 'already',
    'also', 'although', 'always', 'among', 'anymore', 'anyone', 'anything', 'anyway',
    'anywhere', 'appear', 'around', 'away', 'became', 'because', 'become', 'been',
    'before', 'began', 'begin', 'being', 'believe', 'below', 'between', 'both',
    'bring', 'building', 'came', 'cannot', 'certainly', 'change', 'come', 'coming',
    'common', 'consider', 'could', 'course', 'create', 'created', 'creating', 'down',
    'during', 'each', 'early', 'enough', 'even', 'ever', 'every', 'everyone',
    'everything', 'example', 'experience', 'fact', 'far', 'felt', 'few', 'final',
    'follow', 'form', 'found', 'four', 'from', 'general', 'give', 'given', 'going',
    'government', 'group', 'hand', 'hard', 'have', 'having', 'head', 'hear', 'heard',
    'help', 'here', 'high', 'him', 'his', 'home', 'house', 'however', 'human',
    'important', 'information', 'inside', 'instead', 'interest', 'interested', 'into',
    'issue', 'itself', 'keep', 'kind', 'knew', 'know', 'known', 'large', 'later',
    'lead', 'learn', 'least', 'leave', 'left', 'less', 'level', 'life', 'line',
    'little', 'local', 'long', 'look', 'looking', 'lot', 'made', 'make', 'making',
    'many', 'may', 'mean', 'might', 'minute', 'moment', 'money', 'month', 'more',
    'most', 'move', 'much', 'music', 'must', 'name', 'national', 'nature', 'near',
    'need', 'never', 'news', 'next', 'night', 'nothing', 'now', 'number', 'off',
    'often', 'once', 'only', 'open', 'order', 'organization', 'other', 'others',
    'our', 'out', 'outside', 'over', 'own', 'part', 'particular', 'past', 'people',
    'perhaps', 'person', 'personal', 'place', 'plan', 'play', 'point', 'political',
    'possible', 'power', 'present', 'president', 'pressure', 'private', 'probably',
    'problem', 'program', 'provide', 'public', 'put', 'rather', 'reach', 'reason',
    'remember', 'report', 'result', 'return', 'right', 'room', 'run', 'same', 'school',
    'second', 'section', 'see', 'seem', 'seen', 'send', 'sense', 'service', 'several',
    'she', 'should', 'show', 'similar', 'simple', 'since', 'small', 'social', 'society',
    'some', 'someone', 'something', 'sometimes', 'soon', 'sort', 'speak', 'special',
    'specific', 'staff', 'standard', 'start', 'state', 'still', 'stop', 'structure',
    'support', 'sure', 'system', 'take', 'taken', 'taking', 'talk', 'team', 'tell',
    'term', 'test', 'than', 'thank', 'thanks', 'that', 'their', 'them', 'themselves',
    'then', 'there', 'these', 'they', 'thing', 'things', 'think', 'thinking', 'third',
    'this', 'those', 'though', 'thought', 'three', 'through', 'thus', 'time', 'today',
    'together', 'told', 'took', 'total', 'toward', 'training', 'true', 'try', 'trying',
    'turn', 'turned', 'two', 'type', 'under', 'understand', 'understanding', 'until',
    'upon', 'used', 'using', 'usually', 'value', 'various', 'very', 'want', 'wanted',
    'water', 'ways', 'week', 'weeks', 'well', 'went', 'were', 'what', 'when', 'where',
    'whether', 'which', 'while', 'white', 'whole', 'whom', 'whose', 'will', 'with',
    'within', 'without', 'women', 'work', 'working', 'works', 'would', 'write', 'written',
    'wrote', 'year', 'years', 'yes', 'yet', 'you', 'young', 'your', 'yourself'
]);

function escapeHtml(unsafe) {
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

function preprocessWord(word) {
    word = word.toLowerCase().replace(/[^a-z]/g, '');
    if (!word) return word;

    if (word.length > 3) {
        if (word.endsWith('ies')) {
            word = word.slice(0, -3) + 'y';
        } else if (word.endsWith('ing')) {
            word = word.slice(0, -3) + 'e';
        } else if (word.endsWith('es') && word.length > 4) {
            word = word.slice(0, -2);
        } else if (word.endsWith('ly')) {
            word = word.slice(0, -2);
        } else if (word.endsWith('ed')) {
            word = word.slice(0, -2);
        } else if (word.endsWith('s') && word.length > 3) {
            word = word.slice(0, -1);
        }
    }
    return word;
}

function levenshteinDistance(s1, s2) {
    if (!s1) return s2.length;
    if (!s2) return s1.length;
    
    const matrix = Array(s2.length + 1).fill().map(() => Array(s1.length + 1).fill(0));
    
    for (let i = 0; i <= s1.length; i++) matrix[0][i] = i;
    for (let j = 0; j <= s2.length; j++) matrix[j][0] = j;
    
    for (let j = 1; j <= s2.length; j++) {
        for (let i = 1; i <= s1.length; i++) {
            if (s1[i - 1] === s2[j - 1]) {
                matrix[j][i] = matrix[j - 1][i - 1];
            } else {
                matrix[j][i] = Math.min(
                    matrix[j - 1][i - 1] + 1,
                    matrix[j][i - 1] + 1,
                    matrix[j - 1][i] + 1
                );
            }
        }
    }
    return matrix[s2.length][s1.length];
}

function getSuggestions(word) {
    const suggestions = [];
    const dictArray = Array.from(dictionary);
    
    for (const dictWord of dictArray) {
        const distance = levenshteinDistance(word, dictWord);
        if (distance <= 2) {
            suggestions.push({ word: dictWord, distance });
        }
    }
    
    return suggestions
        .sort((a, b) => a.distance - b.distance)
        .slice(0, 5)
        .map(s => s.word);
}

function checkSpelling(text) {
    const words = text.match(/\b\w+\b/g) || [];
    const results = [];
    incorrectWords = [];
    
    for (const originalWord of words) {
        const processedWord = preprocessWord(originalWord);
        const isCorrect = dictionary.has(processedWord);
        
        if (!isCorrect && processedWord) {
            const suggestions = getSuggestions(processedWord);
            results.push({
                original: originalWord,
                processed: processedWord,
                suggestions: suggestions,
                isCorrect: false
            });
            incorrectWords.push(originalWord);
        } else {
            results.push({
                original: originalWord,
                processed: processedWord,
                isCorrect: true
            });
        }
    }
    
    return { words, results };
}

function displayResults(results) {
    const container = document.getElementById('resultsContainer');
    const incorrectResults = results.filter(r => !r.isCorrect);
    
    if (incorrectResults.length === 0) {
        container.innerHTML = '<div class="text-center text-green-500 py-12 animate-slide-in-up"><div class="text-6xl font-bold mb-4">âœ”</div><p class="text-xl">Perfect! No spelling errors found.</p></div>';
        return;
    }
    
    let html = '';
    incorrectResults.forEach((result, index) => {
        html += `<div class="backdrop-blur-md bg-gray-800/30 rounded-xl p-4 border border-gray-700/50 transition-all duration-300 animate-slide-in-up" style="animation-delay: ${index * 60}ms;">`;
        html += '<div class="flex items-center justify-between mb-4">';
        html += `<span class="text-red-400 font-semibold">"${escapeHtml(result.original)}"</span>`;
        html += '<span class="text-xs text-gray-400 bg-gray-600/50 px-2 py-1 rounded">Incorrect</span>';
        html += '</div>';
        html += '<div class="space-y-2">';
        
        result.suggestions.forEach(suggestion => {
            html += `<button onclick="selectSuggestion('${escapeHtml(result.original)}', '${escapeHtml(suggestion)}')" 
                    class="suggestion-item w-full text-left px-4 py-2 rounded-lg bg-gray-900/50 border border-gray-600 text-gray-200 hover:bg-blue-600/20 hover:border-blue-500 transition-all duration-200">`;
            html += escapeHtml(suggestion);
            html += '</button>';
        });
        
        html += `<button onclick="keepOriginal('${escapeHtml(result.original)}')" 
                class="suggestion-item w-full text-left px-4 py-2 rounded-lg bg-gray-900/50 border border-gray-600 text-gray-400 hover:bg-yellow-600/20 hover:border-yellow-500 transition-all duration-200">`;
        html += `Keep "${escapeHtml(result.original)}" (ignore)`;
        html += '</button>';
        html += '</div>';
        html += '</div>';
    });
    
    container.innerHTML = html;
    document.getElementById('downloadSection').classList.remove('hidden');
}

function selectSuggestion(original, suggestion) {
    userChoices[original] = suggestion;
    event.target.classList.add('bg-green-600/20', 'border-green-500');
    event.target.innerHTML = `âœ” <span class="ml-2">${escapeHtml(suggestion)} (selected)</span>`;
    
    const siblings = Array.from(event.target.parentElement.children);
    siblings.forEach(sibling => {
        if (sibling !== event.target) {
            sibling.disabled = true;
            sibling.classList.add('opacity-50', 'cursor-not-allowed');
        }
    });
}

function keepOriginal(original) {
    userChoices[original] = original;
    event.target.classList.add('bg-yellow-600/20', 'border-yellow-600');
    event.target.innerHTML = `âœ” <span class="ml-2">Keep "${escapeHtml(original)}" (selected)</span>`;
    
    const siblings = Array.from(event.target.parentElement.children);
    siblings.forEach(sibling => {
        if (sibling !== event.target) {
            sibling.disabled = true;
            sibling.classList.add('opacity-50', 'cursor-not-allowed');
        }
    });
}

function generateCorrectedText(originalText, results) {
    let corrected = originalText;
    
    for (const result of results) {
        if (!result.isCorrect && userChoices[result.original]) {
            const replacement = userChoices[result.original];
            const regex = new RegExp('\\b' + result.original.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\b', 'g');
            corrected = corrected.replace(regex, replacement);
        }
    }
    
    return corrected;
}

function updateStats(totalWords, incorrectCount) {
    document.getElementById('totalWords').textContent = totalWords;
    document.getElementById('incorrectWords').textContent = incorrectCount;
    const accuracy = totalWords > 0 ? Math.round(((totalWords - incorrectCount) / totalWords) * 100) : 100;
    document.getElementById('accuracy').textContent = accuracy + '%';
}

document.getElementById('fileInput').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('inputText').value = e.target.result;
        };
        reader.readAsText(file);
    }
});

document.getElementById('checkButton').addEventListener('click', function() {
    const text = document.getElementById('inputText').value.trim();
    if (!text) {
        alert('Please enter some text or upload a file first!');
        return;
    }
    
    const button = this;
    const originalHtml = button.innerHTML;
    button.innerHTML = '<span class="loading-dots">Processing</span>';
    button.disabled = true;
    
    setTimeout(() => {
        const { words, results } = checkSpelling(text);
        displayResults(results);
        updateStats(words.length, results.filter(r => !r.isCorrect).length);
        correctedText = text;
        
        button.innerHTML = originalHtml;
        button.disabled = false;
    }, 300);
});

document.getElementById('downloadButton').addEventListener('click', function() {
    const originalText = document.getElementById('inputText').value;
    const { results } = checkSpelling(originalText);
    const finalText = generateCorrectedText(originalText, results);
    
    const blob = new Blob([finalText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'corrected_text.txt';
    a.click();
    URL.revokeObjectURL(url);
});
