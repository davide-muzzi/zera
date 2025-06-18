CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY, 
    email VARCHAR(100) UNIQUE, 
    password VARCHAR(100) 
);
CREATE TABLE shifts (
    ShiftId INT AUTO_INCREMENT PRIMARY KEY, 
    Date DATE, 
    StartTime Time,         
    EndTime Time,
    ActualStartTime Time NULL,         
    ActualEndTime Time NULL,
    MinsOfBreak INT,
    fk_ProfileID INT,
    FOREIGN KEY (fk_ProfileID)
    REFERENCES users (id)
);