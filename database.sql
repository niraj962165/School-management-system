-- ALIES International School Database Setup
-- Run this script in your SQL environment (MySQL, PostgreSQL, SQLite, etc.)

-- 1. Create the Student Schema carefully including the Password column
CREATE TABLE IF NOT EXISTS students (
    id VARCHAR(10) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    class INT NOT NULL,
    section VARCHAR(2) NOT NULL,
    roll_no INT NOT NULL,
    gender VARCHAR(10) NOT NULL,
    contact VARCHAR(15),
    password VARCHAR(255) NOT NULL
);

-- 2. Insert 70 Students smoothly (using INSERT OR IGNORE to prevent duplicate errors on server restarts)
INSERT OR IGNORE INTO students (id, name, class, section, roll_no, gender, contact, password) VALUES
-- CLASS 6 (Password is defaulted to matched ID for simple testing)
('S601', 'Aarav Sharma', 6, 'A', 1, 'Male', '9876500601', 'S601'),
('S602', 'Vivaan Gupta', 6, 'A', 2, 'Male', '9876500602', 'S602'),
('S603', 'Aditya Kumar', 6, 'A', 3, 'Male', '9876500603', 'S603'),
('S604', 'Reyansh Singh', 6, 'A', 4, 'Male', '9876500604', 'S604'),
('S605', 'Vihaan Patel', 6, 'A', 5, 'Male', '9876500605', 'S605'),
('S606', 'Ananya Desai', 6, 'B', 6, 'Female', '9876500606', 'S606'),
('S607', 'Aadhya Reddy', 6, 'B', 7, 'Female', '9876500607', 'S607'),
('S608', 'Kiara Joshi', 6, 'B', 8, 'Female', '9876500608', 'S608'),
('S609', 'Diya Shah', 6, 'B', 9, 'Female', '9876500609', 'S609'),
('S610', 'Saanvi Rao', 6, 'B', 10, 'Female', '9876500610', 'S610'),

-- CLASS 7
('S701', 'Arjun Nair', 7, 'A', 1, 'Male', '9876500701', 'S701'),
('S702', 'Sai Krishna', 7, 'A', 2, 'Male', '9876500702', 'S702'),
('S703', 'Ishaan Mehta', 7, 'A', 3, 'Male', '9876500703', 'S703'),
('S704', 'Shaurya Mishra', 7, 'A', 4, 'Male', '9876500704', 'S704'),
('S705', 'Atharv Pandey', 7, 'A', 5, 'Male', '9876500705', 'S705'),
('S706', 'Prisha Das', 7, 'B', 6, 'Female', '9876500706', 'S706'),
('S707', 'Kriti Agarwal', 7, 'B', 7, 'Female', '9876500707', 'S707'),
('S708', 'Avni Sinha', 7, 'B', 8, 'Female', '9876500708', 'S708'),
('S709', 'Navya Kapoor', 7, 'B', 9, 'Female', '9876500709', 'S709'),
('S710', 'Tara Menon', 7, 'B', 10, 'Female', '9876500710', 'S710'),

-- CLASS 8
('S801', 'Rudra Verma', 8, 'A', 1, 'Male', '9876500801', 'S801'),
('S802', 'Ritvik Sharma', 8, 'A', 2, 'Male', '9876500802', 'S802'),
('S803', 'Kian Malik', 8, 'A', 3, 'Male', '9876500803', 'S803'),
('S804', 'Dhruv Chauhan', 8, 'A', 4, 'Male', '9876500804', 'S804'),
('S805', 'Kabir Bhatia', 8, 'A', 5, 'Male', '9876500805', 'S805'),
('S806', 'Myra Kaur', 8, 'B', 6, 'Female', '9876500806', 'S806'),
('S807', 'Zoya Ahuja', 8, 'B', 7, 'Female', '9876500807', 'S807'),
('S808', 'Sara Jain', 8, 'B', 8, 'Female', '9876500808', 'S808'),
('S809', 'Aria Trivedi', 8, 'B', 9, 'Female', '9876500809', 'S809'),
('S810', 'Nisha Thakur', 8, 'B', 10, 'Female', '9876500810', 'S810'),

-- CLASS 9
('S901', 'Ayaan Bose', 9, 'A', 1, 'Male', '9876500901', 'S901'),
('S902', 'Darsh Saxena', 9, 'A', 2, 'Male', '9876500902', 'S902'),
('S903', 'Pratyush Roy', 9, 'A', 3, 'Male', '9876500903', 'S903'),
('S904', 'Rishaan Pal', 9, 'A', 4, 'Male', '9876500904', 'S904'),
('S905', 'Shreyas Yadav', 9, 'A', 5, 'Male', '9876500905', 'S905'),
('S906', 'Pari Khanna', 9, 'B', 6, 'Female', '9876500906', 'S906'),
('S907', 'Anvi Dutta', 9, 'B', 7, 'Female', '9876500907', 'S907'),
('S908', 'Trisha Bhatt', 9, 'B', 8, 'Female', '9876500908', 'S908'),
('S909', 'Sneha Chatterjee', 9, 'B', 9, 'Female', '9876500909', 'S909'),
('S910', 'Meera Goel', 9, 'B', 10, 'Female', '9876500910', 'S910'),

-- CLASS 10
('S1001', 'Yash Tiwari', 10, 'A', 1, 'Male', '9876501001', 'S1001'),
('S1002', 'Aarush Dixit', 10, 'A', 2, 'Male', '9876501002', 'S1002'),
('S1003', 'Vedant Rajput', 10, 'A', 3, 'Male', '9876501003', 'S1003'),
('S1004', 'Rohan Prasad', 10, 'A', 4, 'Male', '9876501004', 'S1004'),
('S1005', 'Madhav Narayan', 10, 'A', 5, 'Male', '9876501005', 'S1005'),
('S1006', 'Siddhi Pandey', 10, 'B', 6, 'Female', '9876501006', 'S1006'),
('S1007', 'Riya Soni', 10, 'B', 7, 'Female', '9876501007', 'S1007'),
('S1008', 'Anika Rastogi', 10, 'B', 8, 'Female', '9876501008', 'S1008'),
('S1009', 'Neha Mathur', 10, 'B', 9, 'Female', '9876501009', 'S1009'),
('S1010', 'Tanvi Jha', 10, 'B', 10, 'Female', '9876501010', 'S1010'),

-- CLASS 11
('S1101', 'Abhinav Khatri', 11, 'A', 1, 'Male', '9876501101', 'S1101'),
('S1102', 'Nikhil Mittal', 11, 'A', 2, 'Male', '9876501102', 'S1102'),
('S1103', 'Kartik Ghosh', 11, 'A', 3, 'Male', '9876501103', 'S1103'),
('S1104', 'Samar Sengupta', 11, 'A', 4, 'Male', '9876501104', 'S1104'),
('S1105', 'Harsh Vardhan', 11, 'A', 5, 'Male', '9876501105', 'S1105'),
('S1106', 'Gauri Sethi', 11, 'B', 6, 'Female', '9876501106', 'S1106'),
('S1107', 'Vanya Puri', 11, 'B', 7, 'Female', '9876501107', 'S1107'),
('S1108', 'Kashvi Chawla', 11, 'B', 8, 'Female', '9876501108', 'S1108'),
('S1109', 'Ishani Garg', 11, 'B', 9, 'Female', '9876501109', 'S1109'),
('S1110', 'Roshni Bakshi', 11, 'B', 10, 'Female', '9876501110', 'S1110'),

-- CLASS 12
('S1201', 'Kunal Kashyap', 12, 'A', 1, 'Male', '9876501201', 'S1201'),
('S1202', 'Lakshay Dubey', 12, 'A', 2, 'Male', '9876501202', 'S1202'),
('S1203', 'Manan Suri', 12, 'A', 3, 'Male', '9876501203', 'S1203'),
('S1204', 'Omkar Basu', 12, 'A', 4, 'Male', '9876501204', 'S1204'),
('S1205', 'Parth Goswami', 12, 'A', 5, 'Male', '9876501205', 'S1205'),
('S1206', 'Nandini Grover', 12, 'B', 6, 'Female', '9876501206', 'S1206'),
('S1207', 'Khushi Wadhwa', 12, 'B', 7, 'Female', '9876501207', 'S1207'),
('S1208', 'Simran D''Souza', 12, 'B', 8, 'Female', '9876501208', 'S1208'),
('S1209', 'Richa Thakur', 12, 'B', 9, 'Female', '9876501209', 'S1209'),
('S1210', 'Shruti Nayar', 12, 'B', 10, 'Female', '9876501210', 'S1210');

-- 3. Create the Teacher Schema
CREATE TABLE IF NOT EXISTS teachers (
    user_id VARCHAR(10) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    course VARCHAR(100) NOT NULL,
    qualification VARCHAR(100) NOT NULL,
    salary DECIMAL(10,2) NOT NULL,
    phone_number VARCHAR(15),
    email VARCHAR(100) UNIQUE,
    password VARCHAR(255) NOT NULL
);

-- 4. Insert initial Teachers data
INSERT OR IGNORE INTO teachers (user_id, name, course, qualification, salary, phone_number, email, password) VALUES
('T101', 'Amit Mishra', 'Mathematics', 'M.Sc. Mathematics, B.Ed', 55000.00, '9876543210', 'amit.mishra@alies.edu', 'T101'),
('T102', 'Sunita Rao', 'Science', 'M.Sc. Physics, B.Ed', 54000.00, '9876543211', 'sunita.rao@alies.edu', 'T102'),
('T103', 'Ravi Kumar', 'English', 'M.A. English, B.Ed', 50000.00, '9876543212', 'ravi.kumar@alies.edu', 'T103'),
('T104', 'Anita Desai', 'History', 'M.A. History, B.Ed', 48000.00, '9876543213', 'anita.desai@alies.edu', 'T104'),
('T105', 'Vikram Singh', 'Computer Science', 'M.C.A., B.Ed', 60000.00, '9876543214', 'vikram.singh@alies.edu', 'T105');
