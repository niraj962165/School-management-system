/**
 * ALIES International School - Student Database
 * Contains 10 students for each class from 6th to 12th.
 * Total records: 70
 */

const studentsDatabase = [
    // === CLASS 6 ===
    { id: "S601", name: "Aarav Sharma", class: 6, section: "A", rollNo: 1, gender: "Male", contact: "9876500601" },
    { id: "S602", name: "Vivaan Gupta", class: 6, section: "A", rollNo: 2, gender: "Male", contact: "9876500602" },
    { id: "S603", name: "Aditya Kumar", class: 6, section: "A", rollNo: 3, gender: "Male", contact: "9876500603" },
    { id: "S604", name: "Reyansh Singh", class: 6, section: "A", rollNo: 4, gender: "Male", contact: "9876500604" },
    { id: "S605", name: "Vihaan Patel", class: 6, section: "A", rollNo: 5, gender: "Male", contact: "9876500605" },
    { id: "S606", name: "Ananya Desai", class: 6, section: "B", rollNo: 6, gender: "Female", contact: "9876500606" },
    { id: "S607", name: "Aadhya Reddy", class: 6, section: "B", rollNo: 7, gender: "Female", contact: "9876500607" },
    { id: "S608", name: "Kiara Joshi", class: 6, section: "B", rollNo: 8, gender: "Female", contact: "9876500608" },
    { id: "S609", name: "Diya Shah", class: 6, section: "B", rollNo: 9, gender: "Female", contact: "9876500609" },
    { id: "S610", name: "Saanvi Rao", class: 6, section: "B", rollNo: 10, gender: "Female", contact: "9876500610" },

    // === CLASS 7 ===
    { id: "S701", name: "Arjun Nair", class: 7, section: "A", rollNo: 1, gender: "Male", contact: "9876500701" },
    { id: "S702", name: "Sai Krishna", class: 7, section: "A", rollNo: 2, gender: "Male", contact: "9876500702" },
    { id: "S703", name: "Ishaan Mehta", class: 7, section: "A", rollNo: 3, gender: "Male", contact: "9876500703" },
    { id: "S704", name: "Shaurya Mishra", class: 7, section: "A", rollNo: 4, gender: "Male", contact: "9876500704" },
    { id: "S705", name: "Atharv Pandey", class: 7, section: "A", rollNo: 5, gender: "Male", contact: "9876500705" },
    { id: "S706", name: "Prisha Das", class: 7, section: "B", rollNo: 6, gender: "Female", contact: "9876500706" },
    { id: "S707", name: "Kriti Agarwal", class: 7, section: "B", rollNo: 7, gender: "Female", contact: "9876500707" },
    { id: "S708", name: "Avni Sinha", class: 7, section: "B", rollNo: 8, gender: "Female", contact: "9876500708" },
    { id: "S709", name: "Navya Kapoor", class: 7, section: "B", rollNo: 9, gender: "Female", contact: "9876500709" },
    { id: "S710", name: "Tara Menon", class: 7, section: "B", rollNo: 10, gender: "Female", contact: "9876500710" },

    // === CLASS 8 ===
    { id: "S801", name: "Rudra Verma", class: 8, section: "A", rollNo: 1, gender: "Male", contact: "9876500801" },
    { id: "S802", name: "Ritvik Sharma", class: 8, section: "A", rollNo: 2, gender: "Male", contact: "9876500802" },
    { id: "S803", name: "Kian Malik", class: 8, section: "A", rollNo: 3, gender: "Male", contact: "9876500803" },
    { id: "S804", name: "Dhruv Chauhan", class: 8, section: "A", rollNo: 4, gender: "Male", contact: "9876500804" },
    { id: "S805", name: "Kabir Bhatia", class: 8, section: "A", rollNo: 5, gender: "Male", contact: "9876500805" },
    { id: "S806", name: "Myra Kaur", class: 8, section: "B", rollNo: 6, gender: "Female", contact: "9876500806" },
    { id: "S807", name: "Zoya Ahuja", class: 8, section: "B", rollNo: 7, gender: "Female", contact: "9876500807" },
    { id: "S808", name: "Sara Jain", class: 8, section: "B", rollNo: 8, gender: "Female", contact: "9876500808" },
    { id: "S809", name: "Aria Trivedi", class: 8, section: "B", rollNo: 9, gender: "Female", contact: "9876500809" },
    { id: "S810", name: "Nisha Thakur", class: 8, section: "B", rollNo: 10, gender: "Female", contact: "9876500810" },

    // === CLASS 9 ===
    { id: "S901", name: "Ayaan Bose", class: 9, section: "A", rollNo: 1, gender: "Male", contact: "9876500901" },
    { id: "S902", name: "Darsh Saxena", class: 9, section: "A", rollNo: 2, gender: "Male", contact: "9876500902" },
    { id: "S903", name: "Pratyush Roy", class: 9, section: "A", rollNo: 3, gender: "Male", contact: "9876500903" },
    { id: "S904", name: "Rishaan Pal", class: 9, section: "A", rollNo: 4, gender: "Male", contact: "9876500904" },
    { id: "S905", name: "Shreyas Yadav", class: 9, section: "A", rollNo: 5, gender: "Male", contact: "9876500905" },
    { id: "S906", name: "Pari Khanna", class: 9, section: "B", rollNo: 6, gender: "Female", contact: "9876500906" },
    { id: "S907", name: "Anvi Dutta", class: 9, section: "B", rollNo: 7, gender: "Female", contact: "9876500907" },
    { id: "S908", name: "Trisha Bhatt", class: 9, section: "B", rollNo: 8, gender: "Female", contact: "9876500908" },
    { id: "S909", name: "Sneha Chatterjee", class: 9, section: "B", rollNo: 9, gender: "Female", contact: "9876500909" },
    { id: "S910", name: "Meera Goel", class: 9, section: "B", rollNo: 10, gender: "Female", contact: "9876500910" },

    // === CLASS 10 ===
    { id: "S1001", name: "Yash Tiwari", class: 10, section: "A", rollNo: 1, gender: "Male", contact: "9876501001" },
    { id: "S1002", name: "Aarush Dixit", class: 10, section: "A", rollNo: 2, gender: "Male", contact: "9876501002" },
    { id: "S1003", name: "Vedant Rajput", class: 10, section: "A", rollNo: 3, gender: "Male", contact: "9876501003" },
    { id: "S1004", name: "Rohan Prasad", class: 10, section: "A", rollNo: 4, gender: "Male", contact: "9876501004" },
    { id: "S1005", name: "Madhav Narayan", class: 10, section: "A", rollNo: 5, gender: "Male", contact: "9876501005" },
    { id: "S1006", name: "Siddhi Pandey", class: 10, section: "B", rollNo: 6, gender: "Female", contact: "9876501006" },
    { id: "S1007", name: "Riya Soni", class: 10, section: "B", rollNo: 7, gender: "Female", contact: "9876501007" },
    { id: "S1008", name: "Anika Rastogi", class: 10, section: "B", rollNo: 8, gender: "Female", contact: "9876501008" },
    { id: "S1009", name: "Neha Mathur", class: 10, section: "B", rollNo: 9, gender: "Female", contact: "9876501009" },
    { id: "S1010", name: "Tanvi Jha", class: 10, section: "B", rollNo: 10, gender: "Female", contact: "9876501010" },

    // === CLASS 11 ===
    { id: "S1101", name: "Abhinav Khatri", class: 11, section: "A", rollNo: 1, gender: "Male", contact: "9876501101" },
    { id: "S1102", name: "Nikhil Mittal", class: 11, section: "A", rollNo: 2, gender: "Male", contact: "9876501102" },
    { id: "S1103", name: "Kartik Ghosh", class: 11, section: "A", rollNo: 3, gender: "Male", contact: "9876501103" },
    { id: "S1104", name: "Samar Sengupta", class: 11, section: "A", rollNo: 4, gender: "Male", contact: "9876501104" },
    { id: "S1105", name: "Harsh Vardhan", class: 11, section: "A", rollNo: 5, gender: "Male", contact: "9876501105" },
    { id: "S1106", name: "Gauri Sethi", class: 11, section: "B", rollNo: 6, gender: "Female", contact: "9876501106" },
    { id: "S1107", name: "Vanya Puri", class: 11, section: "B", rollNo: 7, gender: "Female", contact: "9876501107" },
    { id: "S1108", name: "Kashvi Chawla", class: 11, section: "B", rollNo: 8, gender: "Female", contact: "9876501108" },
    { id: "S1109", name: "Ishani Garg", class: 11, section: "B", rollNo: 9, gender: "Female", contact: "9876501109" },
    { id: "S1110", name: "Roshni Bakshi", class: 11, section: "B", rollNo: 10, gender: "Female", contact: "9876501110" },

    // === CLASS 12 ===
    { id: "S1201", name: "Kunal Kashyap", class: 12, section: "A", rollNo: 1, gender: "Male", contact: "9876501201" },
    { id: "S1202", name: "Lakshay Dubey", class: 12, section: "A", rollNo: 2, gender: "Male", contact: "9876501202" },
    { id: "S1203", name: "Manan Suri", class: 12, section: "A", rollNo: 3, gender: "Male", contact: "9876501203" },
    { id: "S1204", name: "Omkar Basu", class: 12, section: "A", rollNo: 4, gender: "Male", contact: "9876501204" },
    { id: "S1205", name: "Parth Goswami", class: 12, section: "A", rollNo: 5, gender: "Male", contact: "9876501205" },
    { id: "S1206", name: "Nandini Grover", class: 12, section: "B", rollNo: 6, gender: "Female", contact: "9876501206" },
    { id: "S1207", name: "Khushi Wadhwa", class: 12, section: "B", rollNo: 7, gender: "Female", contact: "9876501207" },
    { id: "S1208", name: "Simran D'Souza", class: 12, section: "B", rollNo: 8, gender: "Female", contact: "9876501208" },
    { id: "S1209", name: "Richa Thakur", class: 12, section: "B", rollNo: 9, gender: "Female", contact: "9876501209" },
    { id: "S1210", name: "Shruti Nayar", class: 12, section: "B", rollNo: 10, gender: "Female", contact: "9876501210" }
];

// Utility functions to access the DB across portals
const DB = {
    getAllStudents: () => studentsDatabase,
    getStudentsByClass: (classNum) => studentsDatabase.filter(s => s.class === classNum),
    getStudentById: (id) => studentsDatabase.find(s => s.id === id),
    getTotalCount: () => studentsDatabase.length
};
