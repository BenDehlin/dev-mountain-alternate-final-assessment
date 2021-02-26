-- Retrieve the information we care above from posts in the post table.
-- notice how we we joined the user table so that we can get the author's email.
-- this will be used to display the author's email on the frontend under any
-- posts that they created.
SELECT p.post_id, p.post_content, p.author_id, u.email
FROM posts p JOIN users u on p.author_id = u.user_id
ORDER BY post_id;