-- Users
CREATE TABLE users (
    user_id VARCHAR(20) PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Attendance
CREATE TABLE attendance (
    attendance_id SERIAL PRIMARY KEY,
    user_id VARCHAR(20) NOT NULL,
    attendance_date DATE NOT NULL,
    attendance_time TIME NOT NULL,
    is_morning BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    UNIQUE(user_id, attendance_date)
);

-- Session
CREATE TABLE session (
    session_id SERIAL PRIMARY KEY,
    user_id VARCHAR(20) NOT NULL,
    study_date DATE NOT NULL,
    start_time TIMESTAMP NOT NULL,
    end_time TIMESTAMP NULL,
    duration_minutes INTEGER NULL,
    is_valid BOOLEAN DEFAULT true,
    
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- Stats
CREATE TABLE states (
    stat_id SERIAL PRIMARY KEY,
    user_id VARCHAR(20) UNIQUE NOT NULL,
    streak_days INTEGER DEFAULT 0,
    max_streak INTEGER DEFAULT 0,
    total_attendance INTEGER DEFAULT 0,
    total_study_minutes INTEGER DEFAULT 0,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- 인덱스
CREATE INDEX idx_attendance_user_date ON attendance(user_id, attendance_date DESC);
CREATE INDEX idx_session_user_date ON session(user_id, study_date DESC);
CREATE INDEX idx_session_active ON session(user_id) WHERE end_time IS NULL;