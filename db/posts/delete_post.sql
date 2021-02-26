-- we delete the post out of the posts table where the id matches what gets
-- passed in
DELETE FROM posts WHERE post_id = $1;
-- after we update the posts table we get all the posts in the table 
-- and return them
SELECT p.post_id, p.post_content, p.author_id, u.email
FROM posts p JOIN users u on p.author_id = u.user_id
ORDER BY post_id;