const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const connection = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'Finnovate',
});

const app = express();

app.get('/posts', function (req, res) {
  connection.getConnection(function (err, connection) {
    if (err) {
      console.log(err);
      res
        .status(500)
        .send('An error occurred while connecting to the database');
      return;
    }

    const query = `
  SELECT Posts.*, Users.username, COUNT(DISTINCT Likes.user_id) as likes, COUNT(DISTINCT Comments.comment_id) as comments
  FROM Posts
  LEFT JOIN Likes ON Posts.post_id = Likes.post_id
  LEFT JOIN Comments ON Posts.post_id = Comments.post_id
  LEFT JOIN Users ON Posts.user_id = Users.user_id
  GROUP BY Posts.post_id
`;

    connection.query(query, (error, results) => {
      connection.release();

      if (error) {
        console.log(error);
        res.status(500).send('An error occurred while fetching posts');
      } else {
        res.status(200).json(results);
      }
    });
  });
});

app.get('/posts/:id', function (req, res) {
  const postId = req.params.id;
  connection.getConnection(function (err, connection) {
    connection.query(
      'SELECT * FROM Posts WHERE post_id = ?',
      [postId],
      (error, results) => {
        if (error) {
          console.log(error);
          res.status(500).send('An error occurred while fetching the post');
        } else {
          res.status(200).json(results);
        }
      },
    );
  });
});

app.post('/new-post', bodyParser.json(), function (req, res) {
  connection.getConnection(function (err, connection) {
    if (err) {
      console.log(err);
      res
        .status(500)
        .send('An error occurred while connecting to the database');
      return;
    }

    const {user_id, caption} = req.body;
    let {post_url, image_path} = req.body;
    const date_created = new Date();
    const date_updated = date_created;

    // Jika post_url atau image_path tidak didefinisikan, tetapkan ke null
    post_url = post_url || null;
    image_path = image_path || null;

    const query = `
      INSERT INTO Posts (user_id, caption, post_url, date_created, date_updated, image_path)
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    connection.query(
      query,
      [user_id, caption, post_url, date_created, date_updated, image_path],
      (error, results) => {
        connection.release();

        if (error) {
          console.log(error);
          res.status(500).send('An error occurred while creating new post');
        } else {
          res.status(200).send('New post created successfully');
        }
      },
    );
  });
});

app.listen(3001, () => {
  console.log('Go to http://localhost:3001/posts so you can see the data.');
});
