-- COPY PASTE THIS WHOLE FILE INTO YOUR SQLTABS ORDER TO
-- SET UP OUR TABLES IN OUR DATABASE


-- we want to drop these tables if they're already in our database
-- we drop the posts table first because it has a reference to the users
-- table. if we try this in the reverse order it will give us an error.
DROP TABLE IF EXISTS posts;
DROP TABLE IF EXISTS users;


-- notice our users table has a user_id that will be generated automatically
-- for us when we create a new entry into this table. When we want to create
-- a user we will need to insert an email and a hashed password
CREATE TABLE users
(
    user_id SERIAL PRIMARY KEY,
    email VARCHAR (250),
    password VARCHAR (2500)
);


-- notice how our posts table has an author_id that references our
-- user table. This is so that when we get our posts we can join the users
-- table and get the user information of the user that created the post.
-- (specifically we will get their email)
CREATE TABLE posts
(
    post_id SERIAL PRIMARY KEY,
    post_content VARCHAR(1000),
    author_id INT REFERENCES users(user_id)
);

-- EVERYTHING BELOW THIS WILL BE INSERTED INTO OUR DATABASE WHEN WE
-- CREATE IT SO THAT WE HAVE SOME INFORMATION TO VIEW ON THE FRONTEND
-- RIGHT AWAY. THE PASSWORDS ARE NOT VALID HASHED PASSWORDS SO YOU WILL
-- NOT BE ABLE TO LOG IN AS THESE USERS, THIS IS FOR DEMO ONLY. YOU WILL
-- NEED TO REGISTER USERS WHEN YOU GET TO THAT STEP IN ORDER TO LOG IN AS
-- SOMEONE
INSERT INTO users
    (email, password)
VALUES
    ('test@user.com', 'fakepassword'),
    ('test2@user.com', 'fakepassword2');

INSERT INTO posts
    (author_id, post_content)
VALUES
    (1, 'some content from test@user.com'),
    (1, 'some more content from test@user.com'),
    (2, 'some content from test2@user.com'),
    (2, 'some additional content from test2@user.com');