-- we update the post in our post table that has a post_id of the first thing
-- we pass in to have the content of whatever the second thing we passed in was
UPDATE posts
SET post_content = $2
WHERE post_id = $1;
-- after we update the posts table we get all the posts in the table 
-- and return them
SELECT p.post_id, p.post_content, p.author_id, u.email
FROM posts p JOIN users u on p.author_id = u.user_id
ORDER BY post_id;