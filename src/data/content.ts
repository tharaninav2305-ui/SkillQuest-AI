export type SubjectId =
  | 'java' | 'sql' | 'html' | 'css' | 'javascript'
  | 'dbms' | 'networking' | 'aptitude';

export interface Subject {
  id: SubjectId;
  name: string;
  icon: string;        // font-awesome class
  color: string;       // gradient tailwind classes
  description: string;
  questions: Question[];
}

export interface Question {
  q: string;
  options: string[];
  answer: number;      // index
  xp: number;
  explanation: string;
}

export const subjects: Subject[] = [
  {
    id: 'java',
    name: 'Java',
    icon: 'fa-mug-hot',
    color: 'from-orange-500 to-red-500',
    description: 'OOP, collections, multithreading & more.',
    questions: [
      { q: 'Which keyword is used to inherit a class in Java?', options: ['implements', 'extends', 'inherits', 'super'], answer: 1, xp: 20, explanation: 'The "extends" keyword is used to inherit a class, while "implements" is used for interfaces.' },
      { q: 'What is the size of an int in Java?', options: ['2 bytes', '4 bytes', '8 bytes', 'Depends on JVM'], answer: 1, xp: 15, explanation: 'In Java, int is always 4 bytes (32 bits) regardless of the platform, unlike C/C++.' },
      { q: 'Which of these is not a primitive type in Java?', options: ['boolean', 'String', 'char', 'long'], answer: 1, xp: 15, explanation: 'String is a class (reference type), not a primitive. The 8 primitives are byte, short, int, long, float, double, char, boolean.' },
      { q: 'Which method is the entry point of a Java program?', options: ['start()', 'main()', 'run()', 'init()'], answer: 1, xp: 20, explanation: 'The JVM looks for "public static void main(String[] args)" as the program entry point.' },
      { q: 'Which collection allows duplicate elements but is ordered?', options: ['Set', 'Map', 'List', 'Queue'], answer: 2, xp: 20, explanation: 'List (e.g. ArrayList) preserves insertion order and allows duplicates. Set rejects duplicates; Map uses unique keys.' },
      { q: 'What does JVM stand for?', options: ['Java Virtual Machine', 'Java Variable Method', 'Java Verified Module', 'Java Visual Manager'], answer: 0, xp: 15, explanation: 'JVM = Java Virtual Machine, the runtime that executes Java bytecode and provides platform independence.' },
      { q: 'Which keyword prevents method overriding?', options: ['static', 'final', 'private', 'abstract'], answer: 1, xp: 20, explanation: 'A "final" method cannot be overridden by subclasses. "private" methods are not inherited, so they also cannot be overridden, but "final" is the explicit keyword.' },
      { q: 'Which operator is used for object comparison by reference?', options: ['==', '.equals()', 'compare()', '==='], answer: 0, xp: 15, explanation: 'The "==" operator compares references (memory addresses). Use .equals() to compare the logical contents of objects.' },
      { q: 'Which keyword is used to handle exceptions in a try block?', options: ['catch', 'finally', 'throw', 'throws'], answer: 0, xp: 15, explanation: 'The "catch" block immediately follows a try block and handles the exception that was thrown.' },
      { q: 'What is autoboxing in Java?', options: ['Converting a class to a primitive', 'Converting a primitive to its wrapper class automatically', 'Boxing an object in an array', 'Creating a new object'], answer: 1, xp: 20, explanation: 'Autoboxing is the automatic conversion between primitive types (like int) and their corresponding wrapper classes (like Integer).' },
    ],
  },
  {
    id: 'sql',
    name: 'SQL',
    icon: 'fa-database',
    color: 'from-blue-500 to-cyan-500',
    description: 'Queries, joins, normalization & more.',
    questions: [
      { q: 'Which SQL statement is used to extract data from a database?', options: ['GET', 'OPEN', 'SELECT', 'EXTRACT'], answer: 2, xp: 15, explanation: 'SELECT retrieves rows from one or more tables. The other options are not valid SQL data retrieval statements.' },
      { q: 'Which clause is used to filter records?', options: ['WHERE', 'FILTER', 'HAVING', 'ORDER BY'], answer: 0, xp: 15, explanation: 'WHERE filters rows before grouping. HAVING filters groups after GROUP BY; ORDER BY only sorts.' },
      { q: 'Which JOIN returns all rows when there is a match in both tables?', options: ['INNER JOIN', 'LEFT JOIN', 'FULL JOIN', 'CROSS JOIN'], answer: 0, xp: 20, explanation: 'INNER JOIN returns only the rows that have matching values in both tables. A FULL JOIN would also include unmatched rows from both sides.' },
      { q: 'Which command removes all records but keeps the structure?', options: ['DROP', 'DELETE', 'TRUNCATE', 'REMOVE'], answer: 2, xp: 20, explanation: 'TRUNCATE quickly removes all rows and resets identity counters while keeping the table structure. DROP deletes the table itself.' },
      { q: 'Which key uniquely identifies a row?', options: ['Foreign Key', 'Primary Key', 'Candidate Key', 'Alternate Key'], answer: 1, xp: 15, explanation: 'A Primary Key uniquely identifies each row and cannot contain NULLs. Candidate keys are potential primary keys; foreign keys reference another table.' },
      { q: 'Which function returns the number of rows?', options: ['SUM()', 'AVG()', 'COUNT()', 'TOTAL()'], answer: 2, xp: 15, explanation: 'COUNT() returns the number of rows matching a condition. SUM() adds values, AVG() averages them, and TOTAL() is not standard SQL.' },
      { q: 'Which normal form removes transitive dependency?', options: ['1NF', '2NF', '3NF', 'BCNF'], answer: 2, xp: 20, explanation: 'Third Normal Form (3NF) removes transitive dependencies — non-key attributes depending on other non-key attributes.' },
      { q: 'Which command adds a new column to an existing table?', options: ['ADD COLUMN', 'ALTER TABLE', 'MODIFY', 'UPDATE'], answer: 1, xp: 20, explanation: 'ALTER TABLE is used with the ADD clause (e.g. ALTER TABLE t ADD COLUMN c INT) to add columns to an existing table.' },
      { q: 'Which aggregate function ignores NULL values by default?', options: ['COUNT(*)', 'COUNT(column)', 'SUM(*)', 'All ignore NULLs'], answer: 1, xp: 20, explanation: 'COUNT(column) skips NULLs, while COUNT(*) counts every row including those with NULLs.' },
      { q: 'What does the DISTINCT keyword do in a SELECT query?', options: ['Sorts results', 'Removes duplicate rows', 'Limits rows', 'Joins tables'], answer: 1, xp: 15, explanation: 'DISTINCT removes duplicate rows from the result set, returning only unique combinations of the selected columns.' },
    ],
  },
  {
    id: 'html',
    name: 'HTML',
    icon: 'fa-code',
    color: 'from-orange-600 to-amber-500',
    description: 'Structure, semantics & forms.',
    questions: [
      { q: 'Which tag is used for the largest heading?', options: ['<head>', '<h6>', '<h1>', '<heading>'], answer: 2, xp: 15, explanation: '<h1> is the largest and most important heading; <h6> is the smallest. <head> is a document metadata section, not a heading.' },
      { q: 'Which attribute specifies an alternate text for an image?', options: ['title', 'alt', 'src', 'desc'], answer: 1, xp: 15, explanation: 'The "alt" attribute provides alternative text for screen readers and when the image cannot be displayed.' },
      { q: 'Which element defines a hyperlink?', options: ['<link>', '<a>', '<href>', '<url>'], answer: 1, xp: 15, explanation: 'The <a> (anchor) element with an href attribute creates a hyperlink. <link> is for external resources like stylesheets.' },
      { q: 'Which input type creates a checkbox?', options: ['check', 'checkbox', 'tick', 'select'], answer: 1, xp: 15, explanation: '<input type="checkbox"> creates a checkbox control. The others are not valid input types.' },
      { q: 'Which tag is used to define an unordered list?', options: ['<ol>', '<ul>', '<li>', '<list>'], answer: 1, xp: 15, explanation: '<ul> defines an unordered (bulleted) list. <ol> is ordered (numbered) and <li> is a list item used inside both.' },
      { q: 'Which HTML5 element is used for video?', options: ['<media>', '<movie>', '<video>', '<vid>'], answer: 2, xp: 20, explanation: 'The <video> element, introduced in HTML5, embeds video content with controls, source, and fallback support.' },
      { q: 'Which tag makes text bold without extra importance?', options: ['<strong>', '<b>', '<bold>', '<em>'], answer: 1, xp: 20, explanation: '<b> bolds text without semantic importance. <strong> indicates important content (also bold by default) and is preferred for accessibility.' },
      { q: 'Which attribute opens a link in a new tab?', options: ['target="_blank"', 'new="true"', 'tab="new"', 'open="new"'], answer: 0, xp: 20, explanation: 'target="_blank" opens the linked document in a new tab or window. The other attributes are not valid HTML.' },
      { q: 'Which element is used for multi-line text input in a form?', options: ['<input type="text">', '<textarea>', '<textbox>', '<multiline>'], answer: 1, xp: 15, explanation: '<textarea> creates a multi-line text input control. <input type="text"> is single-line only.' },
      { q: 'Which HTML5 element represents the main content of a document?', options: ['<main>', '<body>', '<content>', '<section>'], answer: 0, xp: 20, explanation: '<main> was introduced in HTML5 to mark the dominant content of the document, excluding headers, footers, and sidebars.' },
    ],
  },
  {
    id: 'css',
    name: 'CSS',
    icon: 'fa-paintbrush',
    color: 'from-pink-500 to-rose-500',
    description: 'Selectors, flexbox, grid & animations.',
    questions: [
      { q: 'Which property changes the text color?', options: ['font-color', 'text-color', 'color', 'foreground'], answer: 2, xp: 15, explanation: 'The "color" property sets the text color. font-color and text-color are not valid CSS properties.' },
      { q: 'Which display value enables flexbox?', options: ['block', 'flex', 'inline-flex-only', 'grid'], answer: 1, xp: 15, explanation: 'display: flex enables the flexbox layout model. "grid" enables CSS Grid, a different layout system.' },
      { q: 'How do you make text bold in CSS?', options: ['font-style: bold', 'font-weight: bold', 'text-bold: true', 'style: bold'], answer: 1, xp: 15, explanation: 'font-weight: bold (or a numeric value like 700) makes text bold. font-style controls italics.' },
      { q: 'Which unit is relative to the root font size?', options: ['em', 'px', 'rem', '%'], answer: 2, xp: 20, explanation: 'rem is relative to the root (<html>) font size. em is relative to the parent element font size.' },
      { q: 'Which property creates space inside the border?', options: ['margin', 'padding', 'spacing', 'gap'], answer: 1, xp: 15, explanation: 'padding is the space between content and border. margin is space outside the border; gap is for flex/grid spacing.' },
      { q: 'Which selector targets an element with a specific class?', options: ['#', '.', '*', '::'], answer: 1, xp: 15, explanation: 'A dot (.) prefix selects by class (e.g. .btn). The hash (#) selects by id, * is universal, and :: targets pseudo-elements.' },
      { q: 'Which property is used to round corners?', options: ['corner-radius', 'border-radius', 'round', 'edge'], answer: 1, xp: 15, explanation: 'border-radius rounds the corners of an element. The others are not valid CSS properties.' },
      { q: 'Which value of position keeps an element fixed during scroll?', options: ['absolute', 'relative', 'fixed', 'sticky'], answer: 2, xp: 20, explanation: 'position: fixed keeps an element relative to the viewport and unaffected by scrolling. sticky toggles between relative and fixed based on scroll position.' },
      { q: 'Which CSS property is used to create space between flex items?', options: ['margin', 'gap', 'padding', 'space-between'], answer: 1, xp: 20, explanation: 'The "gap" property defines spacing between flex (and grid) items. space-between is a value of justify-content, not a property.' },
      { q: 'What does the z-index property control?', options: ['Element opacity', 'Stacking order of elements', 'Zoom level', 'Border thickness'], answer: 1, xp: 15, explanation: 'z-index controls the vertical stacking order of positioned elements — higher values appear in front of lower ones.' },
    ],
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    icon: 'fa-js',
    color: 'from-yellow-400 to-amber-500',
    description: 'ES6, DOM, async & functions.',
    questions: [
      { q: 'How do you declare a block-scoped variable?', options: ['var', 'let', 'static', 'define'], answer: 1, xp: 15, explanation: 'let (and const) are block-scoped. var is function-scoped and can leak out of blocks like if-statements.' },
      { q: 'What does "===" check for?', options: ['Value only', 'Type only', 'Value and type', 'Reference only'], answer: 2, xp: 15, explanation: 'The strict equality operator "===" compares both value and type without coercion. "==" coerces types before comparing.' },
      { q: 'Which method adds an element to the end of an array?', options: ['push()', 'pop()', 'shift()', 'concat()'], answer: 0, xp: 15, explanation: 'push() appends elements to the end of an array. pop() removes the last element; shift() removes the first.' },
      { q: 'What does JSON stand for?', options: ['Java Object Notation', 'JavaScript Object Notation', 'JavaScript Online Notation', 'Java Script Object Node'], answer: 1, xp: 20, explanation: 'JSON = JavaScript Object Notation, a lightweight data-interchange format derived from JavaScript object literals.' },
      { q: 'Which keyword defines a constant?', options: ['const', 'let', 'var', 'final'], answer: 0, xp: 15, explanation: 'const declares a block-scoped variable that cannot be reassigned. "final" is not a JavaScript keyword.' },
      { q: 'What does the "map" method return?', options: ['A boolean', 'A new array', 'The same array', 'A string'], answer: 1, xp: 20, explanation: 'map() returns a new array populated with the results of calling the callback on each element. It does not mutate the original array.' },
      { q: 'Which method converts a JSON string to an object?', options: ['JSON.parse()', 'JSON.stringify()', 'JSON.toObject()', 'parseJSON()'], answer: 0, xp: 20, explanation: 'JSON.parse() converts a JSON string into a JavaScript object. JSON.stringify() does the opposite — object to string.' },
      { q: 'What is a Promise?', options: ['A callback', 'An async value', 'A loop', 'A type of variable'], answer: 1, xp: 20, explanation: 'A Promise represents the eventual result of an asynchronous operation — it can be pending, fulfilled, or rejected.' },
      { q: 'Which keyword is used to handle a rejected Promise?', options: ['catch', 'then', 'finally', 'reject'], answer: 0, xp: 15, explanation: 'The .catch() method handles a rejected Promise. .then() handles fulfillment; "reject" is a function used to reject, not handle.' },
      { q: 'What does the "this" keyword refer to inside an arrow function?', options: ['The function itself', 'The enclosing lexical scope', 'The global object always', 'undefined'], answer: 1, xp: 20, explanation: 'Arrow functions do not bind their own "this" — they inherit it from the enclosing lexical scope.' },
    ],
  },
  {
    id: 'dbms',
    name: 'DBMS',
    icon: 'fa-server',
    color: 'from-indigo-500 to-blue-600',
    description: 'ER models, ACID, indexing & tuning.',
    questions: [
      { q: 'What does ACID stand for in databases?', options: ['Atomicity, Consistency, Isolation, Durability', 'Accuracy, Control, Integrity, Data', 'Atomic, Concurrent, Indexed, Durable', 'Access, Commit, Isolate, Drop'], answer: 0, xp: 20, explanation: 'ACID = Atomicity, Consistency, Isolation, Durability — the four properties that guarantee reliable transactions.' },
      { q: 'Which model organizes data into tables?', options: ['Hierarchical', 'Network', 'Relational', 'Object'], answer: 2, xp: 15, explanation: 'The Relational model organizes data into tables (relations) of rows and columns, linked by keys.' },
      { q: 'What is a primary key?', options: ['A duplicate key', 'A unique identifier', 'A foreign reference', 'An index'], answer: 1, xp: 15, explanation: 'A primary key uniquely identifies each row in a table and cannot be NULL or duplicated.' },
      { q: 'Which command defines a schema?', options: ['DDL', 'DML', 'DCL', 'TCL'], answer: 0, xp: 20, explanation: 'DDL (Data Definition Language) includes CREATE, ALTER, and DROP — commands that define or modify the schema structure.' },
      { q: 'Which normal form ensures atomic values?', options: ['1NF', '2NF', '3NF', '4NF'], answer: 0, xp: 15, explanation: 'First Normal Form (1NF) requires each column to hold atomic (indivisible) values — no repeating groups or arrays.' },
      { q: 'What does a foreign key enforce?', options: ['Speed', 'Referential integrity', 'Encryption', 'Indexing'], answer: 1, xp: 20, explanation: 'A foreign key enforces referential integrity — it ensures the value matches a primary key in the referenced table.' },
      { q: 'Which index speeds up search but slows writes?', options: ['Hash index', 'B-tree index', 'Bitmap index', 'All indexes'], answer: 3, xp: 20, explanation: 'All indexes speed up reads but add overhead on writes because the index must also be updated on every insert/update/delete.' },
      { q: 'What is a view in DBMS?', options: ['A real table', 'A virtual table', 'A backup', 'A trigger'], answer: 1, xp: 15, explanation: 'A view is a virtual table based on the result of a stored query — it does not physically store data.' },
      { q: 'Which property ensures a transaction either fully completes or has no effect?', options: ['Isolation', 'Consistency', 'Atomicity', 'Durability'], answer: 2, xp: 20, explanation: 'Atomicity ("all or nothing") ensures that a transaction is treated as a single, indivisible unit — if any part fails, the whole transaction is rolled back.' },
      { q: 'What is denormalization in DBMS?', options: ['Removing redundant data', 'Adding redundant data to improve read performance', 'Deleting unused tables', 'Normalizing to a higher form'], answer: 1, xp: 20, explanation: 'Denormalization intentionally introduces redundancy (e.g. duplicated columns) to reduce joins and speed up read-heavy workloads, at the cost of write complexity.' },
    ],
  },
  {
    id: 'networking',
    name: 'Networking',
    icon: 'fa-network-wired',
    color: 'from-teal-500 to-emerald-500',
    description: 'OSI, TCP/IP, protocols & security.',
    questions: [
      { q: 'How many layers are in the OSI model?', options: ['5', '6', '7', '8'], answer: 2, xp: 15, explanation: 'The OSI model has 7 layers: Physical, Data Link, Network, Transport, Session, Presentation, and Application.' },
      { q: 'Which protocol is connectionless?', options: ['TCP', 'UDP', 'FTP', 'HTTP'], answer: 1, xp: 20, explanation: 'UDP is connectionless — it sends datagrams without establishing a connection or guaranteeing delivery. TCP is connection-oriented.' },
      { q: 'What is the default HTTP port?', options: ['21', '25', '80', '443'], answer: 2, xp: 15, explanation: 'HTTP uses port 80 by default. Port 443 is HTTPS, 21 is FTP, and 25 is SMTP.' },
      { q: 'Which layer is responsible for routing?', options: ['Data Link', 'Network', 'Transport', 'Session'], answer: 1, xp: 20, explanation: 'The Network layer (Layer 3) handles logical addressing and routing of packets between networks.' },
      { q: 'What does IP stand for?', options: ['Internet Provider', 'Internet Protocol', 'Internal Path', 'Interconnected Process'], answer: 1, xp: 15, explanation: 'IP = Internet Protocol, the principal protocol for routing traffic across networks.' },
      { q: 'Which protocol secures web traffic?', options: ['HTTPS', 'FTP', 'SMTP', 'SSH'], answer: 0, xp: 15, explanation: 'HTTPS (HTTP over TLS/SSL) encrypts web traffic. SSH secures remote shell access, not web traffic.' },
      { q: 'What does DNS resolve?', options: ['IP to MAC', 'Domain to IP', 'Port to protocol', 'URL to DNS'], answer: 1, xp: 20, explanation: 'DNS (Domain Name System) translates human-readable domain names into IP addresses.' },
      { q: 'Which device forwards packets between networks?', options: ['Hub', 'Switch', 'Router', 'Repeater'], answer: 2, xp: 20, explanation: 'A router forwards packets between different networks based on IP addresses. Switches forward frames within a network; hubs simply broadcast.' },
      { q: 'Which TCP/IP layer corresponds to the OSI Session, Presentation, and Application layers?', options: ['Link', 'Internet', 'Transport', 'Application'], answer: 3, xp: 20, explanation: 'The TCP/IP Application layer combines the OSI Session, Presentation, and Application layers into a single layer.' },
      { q: 'What is a subnet mask used for?', options: ['Encrypting packets', 'Identifying the network portion of an IP address', 'Routing between autonomous systems', 'Assigning MAC addresses'], answer: 1, xp: 20, explanation: 'A subnet mask splits an IP address into network and host portions, allowing devices to determine whether a destination is local or remote.' },
    ],
  },
  {
    id: 'aptitude',
    name: 'Aptitude',
    icon: 'fa-brain',
    color: 'from-violet-500 to-purple-600',
    description: 'Quant, logic, reasoning & speed.',
    questions: [
      { q: 'If 2x + 5 = 17, what is x?', options: ['4', '6', '5', '7'], answer: 1, xp: 15, explanation: '2x + 5 = 17 → 2x = 12 → x = 6.' },
      { q: 'What is 15% of 200?', options: ['25', '30', '35', '40'], answer: 1, xp: 15, explanation: '15% of 200 = (15/100) × 200 = 30.' },
      { q: 'A train travels 60 km in 1.5 hours. Its speed is?', options: ['30 km/h', '40 km/h', '45 km/h', '50 km/h'], answer: 1, xp: 20, explanation: 'Speed = distance ÷ time = 60 ÷ 1.5 = 40 km/h.' },
      { q: 'Complete the series: 2, 6, 12, 20, ?', options: ['28', '30', '32', '36'], answer: 1, xp: 20, explanation: 'Differences are 4, 6, 8, 10 → next difference is 10, so 20 + 10 = 30.' },
      { q: 'If a shirt costs $40 after a 20% discount, the original price was?', options: ['$48', '$50', '$52', '$55'], answer: 1, xp: 20, explanation: 'Sale price = 80% of original → original = 40 / 0.8 = $50.' },
      { q: 'What is the next prime after 23?', options: ['25', '27', '29', '31'], answer: 2, xp: 15, explanation: 'The primes after 23 are 29 (25 = 5×5 and 27 = 3×9 are composite). So the next prime is 29.' },
      { q: 'Sum of angles in a triangle?', options: ['90°', '180°', '270°', '360°'], answer: 1, xp: 15, explanation: 'The interior angles of any triangle always sum to 180°.' },
      { q: 'If 5 workers finish a job in 10 hours, 10 workers take?', options: ['2h', '5h', '6h', '8h'], answer: 1, xp: 20, explanation: 'Work is constant: 5 × 10 = 50 worker-hours. With 10 workers: 50 ÷ 10 = 5 hours.' },
      { q: 'What is the LCM of 4 and 6?', options: ['10', '12', '18', '24'], answer: 1, xp: 15, explanation: 'Multiples of 4: 4, 8, 12… Multiples of 6: 6, 12… The least common multiple is 12.' },
      { q: 'A shopkeeper sells an item for $120 at a 20% profit. The cost price was?', options: ['$96', '$100', '$104', '$108'], answer: 1, xp: 20, explanation: 'Selling price = 120% of cost → cost = 120 / 1.2 = $100.' },
    ],
  },
];

export const getSubject = (id: SubjectId) =>
  subjects.find((s) => s.id === id)!;

// ---------- Badges ----------
export interface Badge {
  id: string;
  name: string;
  icon: string;
  description: string;
  tier: 'bronze' | 'silver' | 'gold' | 'platinum';
}

export const badges: Badge[] = [
  { id: 'first_quiz', name: 'First Steps', icon: 'fa-shoe-prints', description: 'Complete your first quiz', tier: 'bronze' },
  { id: 'streak_3', name: 'On Fire', icon: 'fa-fire', description: '3-day streak', tier: 'bronze' },
  { id: 'streak_7', name: 'Unstoppable', icon: 'fa-bolt', description: '7-day streak', tier: 'silver' },
  { id: 'perfect', name: 'Perfectionist', icon: 'fa-crown', description: '100% on a quiz', tier: 'gold' },
  { id: 'level_5', name: 'Rising Star', icon: 'fa-star', description: 'Reach level 5', tier: 'silver' },
  { id: 'level_10', name: 'Legend', icon: 'fa-trophy', description: 'Reach level 10', tier: 'platinum' },
  { id: 'xp_500', name: 'XP Hunter', icon: 'fa-gem', description: 'Earn 500 XP', tier: 'gold' },
  { id: 'scholar', name: 'Scholar', icon: 'fa-graduation-cap', description: 'Try all 8 subjects', tier: 'gold' },
];

// ---------- Mock leaderboard ----------
export interface LeaderRow {
  name: string;
  xp: number;
  level: number;
  badges: number;
  avatar: string;
}

export const leaderboard: LeaderRow[] = [
  { name: 'Aarav Mehta', xp: 4820, level: 24, badges: 8, avatar: 'AM' },
  { name: 'Sara Khan', xp: 4310, level: 22, badges: 7, avatar: 'SK' },
  { name: 'Dev Rao', xp: 3990, level: 20, badges: 7, avatar: 'DR' },
  { name: 'Maya Iyer', xp: 3670, level: 19, badges: 6, avatar: 'MI' },
  { name: 'Kabir Singh', xp: 3210, level: 17, badges: 6, avatar: 'KS' },
  { name: 'Ananya Das', xp: 2890, level: 15, badges: 5, avatar: 'AD' },
  { name: 'Rohit Nair', xp: 2540, level: 13, badges: 5, avatar: 'RN' },
  { name: 'Zoya Ali', xp: 2210, level: 12, badges: 4, avatar: 'ZA' },
  { name: 'Ishaan Verma', xp: 1980, level: 10, badges: 4, avatar: 'IV' },
  { name: 'Tara Joshi', xp: 1640, level: 9, badges: 3, avatar: 'TJ' },
];

// ---------- Testimonials ----------
export const testimonials = [
  { name: 'Priya Sharma', role: 'CS Student, NIT', text: 'SkillQuest AI turned my boring prep into a game. I went from 0 XP to level 12 in three weeks and landed my dream internship!', avatar: 'PS', rating: 5 },
  { name: 'Rahul Gupta', role: 'Placed at Amazon', text: 'The daily streaks kept me consistent. The quiz format mirrors real placement tests perfectly. Absolute game-changer.', avatar: 'RG', rating: 5 },
  { name: 'Neha Reddy', role: 'MCA Final Year', text: 'I love the glassmorphism UI and XP animations. Learning feels addictive instead of stressful now.', avatar: 'NR', rating: 5 },
  { name: 'Arjun Patel', role: 'Placed at TCS Digital', text: 'Aptitude and networking quizzes here are top notch. The leaderboard pushed me to study every single day.', avatar: 'AP', rating: 4 },
];
