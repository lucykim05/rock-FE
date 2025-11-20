CREATE TABLE Session (
    session_id SERIAL NOT NULL,
    user_id VARCHAR NOT NULL,
    guild_id INT NOT NULL,
    study_date DATE,
    start_time TIMESTAMP,
    end_time TIMESTAMP,
    total_study_time INTEGER DEFAULT 0,
    PRIMARY KEY (session_id, user_id, guild_id)
);

CREATE TABLE Stats (
    state_id SERIAL NOT NULL,
    user_id VARCHAR NOT NULL,
    guild_id INT NOT NULL,
    streak_days INTEGER,
    max_streak INTEGER,
    total_attendance INTEGER,
    total_study INTEGER,
    updated_at TIMESTAMP,
    PRIMARY KEY (state_id, user_id, guild_id)
);

CREATE TABLE Users (
    user_id VARCHAR NOT NULL,
    guild_id INT NOT NULL,
    username VARCHAR NOT NULL,
    created_at TIMESTAMP,
    PRIMARY KEY (user_id, guild_id)
);

CREATE TABLE Attendance (
    attendance_id SERIAL NOT NULL,
    user_id VARCHAR NOT NULL,
    guild_id INT NOT NULL,
    attendance_date DATE,
    attendance_time TIME,
    is_morning BOOLEAN DEFAULT false,
    created_at TIMESTAMP,
    PRIMARY KEY (attendance_id, user_id, guild_id)
);

CREATE TABLE Settings (
    guild_id INT NOT NULL,
    attendance_channel_id VARCHAR,
    study_channel_id VARCHAR,
    attendance_time INT,
    created_at TIMESTAMP,
    PRIMARY KEY (guild_id)
);

ALTER TABLE Session
    ADD CONSTRAINT FK_Users_TO_Session_1 FOREIGN KEY (user_id)
    REFERENCES Users (user_id);

ALTER TABLE Session
    ADD CONSTRAINT FK_Users_TO_Session_2 FOREIGN KEY (guild_id)
    REFERENCES Users (guild_id);

ALTER TABLE Stats
    ADD CONSTRAINT FK_Users_TO_Stats_1 FOREIGN KEY (user_id)
    REFERENCES Users (user_id);

ALTER TABLE Stats
    ADD CONSTRAINT FK_Users_TO_Stats_2 FOREIGN KEY (guild_id)
    REFERENCES Users (guild_id);

ALTER TABLE Users
    ADD CONSTRAINT FK_Settings_TO_Users_1 FOREIGN KEY (guild_id)
    REFERENCES Settings (guild_id);

ALTER TABLE Attendance
    ADD CONSTRAINT FK_Users_TO_Attendance_1 FOREIGN KEY (user_id)
    REFERENCES Users (user_id);

ALTER TABLE Attendance
    ADD CONSTRAINT FK_Users_TO_Attendance_2 FOREIGN KEY (guild_id)
    REFERENCES Users (guild_id);
