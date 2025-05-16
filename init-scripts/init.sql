-- Enable the required extension
CREATE EXTENSION IF NOT EXISTS plpgsql;

-- Create the "courses" table
CREATE TABLE courses (
    id SERIAL PRIMARY KEY,
    title VARCHAR,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NOT NULL,
    image_url VARCHAR,
    finished BOOLEAN NOT NULL DEFAULT FALSE
);

-- Create the "course_modules" table
CREATE TABLE course_modules (
    id SERIAL PRIMARY KEY,
    course_id BIGINT NOT NULL,
    title VARCHAR,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NOT NULL,
    image_urls TEXT,
    CONSTRAINT fk_course FOREIGN KEY(course_id) REFERENCES courses(id)
);

-- Create the "contents" table
CREATE TABLE contents (
    id SERIAL PRIMARY KEY,
    course_module_id BIGINT NOT NULL,
    text TEXT,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NOT NULL,
    CONSTRAINT fk_course_module FOREIGN KEY(course_module_id) REFERENCES course_modules(id)
);

-- Indexes
CREATE INDEX index_course_modules_on_course_id ON course_modules(course_id);
CREATE INDEX index_contents_on_course_module_id ON contents(course_module_id);
