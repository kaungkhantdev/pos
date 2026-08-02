CREATE TABLE tasks (
   id BIGINT AUTO_INCREMENT PRIMARY KEY,
   task VARCHAR(255) NOT NULL,
   description TEXT NULL,
   status ENUM('Done', 'InProgress', 'Plan', 'Doing') NOT NULL,
   created_at DATETIME NOT NULL,
   updated_at DATETIME NULL
)