CREATE TABLE IF NOT EXISTS sessions (
  id VARCHAR(64) PRIMARY KEY,
  user_id VARCHAR(128),
  created_at DATETIME NOT NULL,
  updated_at DATETIME NOT NULL,
  current_index INT,
  answers JSON,
  completed_at DATETIME
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
