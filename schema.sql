-- Basic schema for a users table
-- Note: This is a simplified example. A real application would likely need
-- more columns, constraints, indexes, and potentially separate tables for roles, etc.

CREATE TABLE users (
    id SERIAL PRIMARY KEY, -- Auto-incrementing integer ID (PostgreSQL syntax)
    -- Use UUID instead if preferred: id UUID PRIMARY KEY DEFAULT gen_random_uuid()
    username VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL, -- Store hashed passwords, NEVER plain text
    email VARCHAR(255) UNIQUE, -- Optional: Add email field
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Optional: Add an index on username for faster lookups
CREATE INDEX idx_users_username ON users(username);

-- Optional: Add an index on email if used frequently for lookups
-- CREATE INDEX idx_users_email ON users(email);

-- Placeholder for other tables (e.g., products, orders, cart_items)
-- CREATE TABLE products (...);
-- CREATE TABLE orders (...);
