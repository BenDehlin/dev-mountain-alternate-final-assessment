-- create a post that has a reference to the author that created it
-- which will be the first thing we pass in and has content of whatever
-- the second thing we pass in is.
INSERT INTO posts
    (author_id, post_content)
VALUES
    ($1, $2);
-- after we update the posts table we get all the posts in the table 
-- and return them
SELECT p.post_id, p.post_content, p.author_id, u.email
FROM posts p JOIN users u on p.author_id = u.user_id
ORDER BY post_id;