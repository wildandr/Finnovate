const moment = require('moment');
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

const bcrypt = require('bcrypt');

app.use(bodyParser.urlencoded({extended: false}));

app.use(bodyParser.json());

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
  SELECT Posts.*, Users.username, Users.full_name, COUNT(DISTINCT Likes.user_id) as likes, COUNT(DISTINCT Comments.comment_id) as comments
  FROM Posts
  LEFT JOIN Likes ON Posts.post_id = Likes.post_id
  LEFT JOIN Comments ON Posts.post_id = Comments.post_id
  LEFT JOIN Users ON Posts.user_id = Users.user_id
  GROUP BY Posts.post_id
`;

    connection.query(query, (error, results) => {
      if (error) {
        console.log(error);
        res.status(500).send('An error occurred while fetching posts');
        connection.release();
        return;
      }

      let completedQueries = 0;
      results.forEach((post, index) => {
        const commentsQuery = `
          SELECT comment_id, post_id, user_id, content, date_created, parent_comment_id
          FROM Comments
          WHERE post_id = ?
          ORDER BY parent_comment_id ASC
        `;

        connection.query(commentsQuery, [post.post_id], (error, comments) => {
          if (error) {
            console.log(error);
            res.status(500).send('An error occurred while fetching comments');
            connection.release();
            return;
          }

          const commentsWithReplies = comments.reduce((acc, comment) => {
            if (comment.parent_comment_id) {
              const parentComment = acc.find(
                c => c.comment_id === comment.parent_comment_id,
              );
              if (parentComment) {
                parentComment.replies = parentComment.replies || [];
                parentComment.replies.push(comment);
              }
            } else {
              acc.push(comment);
            }
            return acc;
          }, []);

          results[index].commentsArray = commentsWithReplies;

          if (post.analysis_id) {
            const analysisQuery = `
              SELECT *
              FROM PostCards
              WHERE analysis_id = ?
            `;

            connection.query(
              analysisQuery,
              [post.analysis_id],
              (error, analysis) => {
                if (error) {
                  console.log(error);
                  res
                    .status(500)
                    .send('An error occurred while fetching analysis');
                  connection.release();
                  return;
                }

                results[index].analysis = analysis[0];
                completedQueries++;

                if (completedQueries === results.length) {
                  res.status(200).json(results);
                  connection.release();
                }
              },
            );
          } else {
            completedQueries++;

            if (completedQueries === results.length) {
              res.status(200).json(results);
              connection.release();
            }
          }
        });
      });
    });
  });
});

app.get('/posts/:id', function (req, res) {
  const postId = req.params.id;
  const query = `
    SELECT Posts.*, Users.username, COUNT(DISTINCT Likes.user_id) as likes, COUNT(DISTINCT Comments.comment_id) as comments
    FROM Posts
    LEFT JOIN Likes ON Posts.post_id = Likes.post_id
    LEFT JOIN Comments ON Posts.post_id = Comments.post_id
    LEFT JOIN Users ON Posts.user_id = Users.user_id
    WHERE Posts.post_id = ?
    GROUP BY Posts.post_id
  `;

  connection.query(query, [postId], (error, results) => {
    if (error) {
      console.log(error);
      res.status(500).send('An error occurred while fetching the post');
      return;
    }

    const post = results[0];
    const commentsQuery = `
      SELECT comment_id, post_id, user_id, content, date_created, parent_comment_id
      FROM Comments
      WHERE post_id = ?
      ORDER BY parent_comment_id ASC
    `;

    connection.query(commentsQuery, [post.post_id], (error, comments) => {
      if (error) {
        console.log(error);
        res.status(500).send('An error occurred while fetching comments');
        return;
      }

      const commentsWithReplies = comments.reduce((acc, comment) => {
        if (comment.parent_comment_id) {
          const parentComment = acc.find(
            c => c.comment_id === comment.parent_comment_id,
          );
          if (parentComment) {
            parentComment.replies = parentComment.replies || [];
            parentComment.replies.push(comment);
          }
        } else {
          acc.push(comment);
        }
        return acc;
      }, []);

      post.commentsArray = commentsWithReplies;

      if (post.analysis_id) {
        const analysisQuery = `
          SELECT *
          FROM PostCards
          WHERE analysis_id = ?
        `;

        connection.query(
          analysisQuery,
          [post.analysis_id],
          (error, analysis) => {
            if (error) {
              console.log(error);
              res.status(500).send('An error occurred while fetching analysis');
              return;
            }

            post.analysis = analysis[0];
            res.status(200).json(post);
          },
        );
      } else {
        res.status(200).json(post);
      }
    });
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
    let {post_url, image_path, analysis_id} = req.body;
    const date_created = new Date();
    const date_updated = date_created;

    post_url = post_url || null;
    image_path = image_path || null;
    analysis_id = analysis_id || null;

    const query = `
      INSERT INTO Posts (user_id, caption, post_url, date_created, date_updated, image_path, analysis_id)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    connection.query(
      query,
      [
        user_id,
        caption,
        post_url,
        date_created,
        date_updated,
        image_path,
        analysis_id,
      ],
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

// Endpoint untuk melihat daftar komen pada sebuah post
app.get('/posts/:postId/comments', function (req, res) {
  connection.getConnection(function (err, connection) {
    if (err) {
      console.log(err);
      res
        .status(500)
        .send('An error occurred while connecting to the database');
      return;
    }

    const {postId} = req.params;

    const mainCommentsQuery = `
  SELECT 
    Comments.*, 
    Users.username AS commenter_username,
    Users.full_name AS commenter_full_name,
    Users.profile_picture_url AS commenter_profile_picture,
    (SELECT username FROM Users WHERE Users.user_id = (SELECT user_id FROM Posts WHERE Posts.post_id = Comments.post_id)) AS post_owner_username,
    (SELECT COUNT(*) FROM CommentLikes WHERE CommentLikes.comment_id = Comments.comment_id) AS likes_count,
    (SELECT COUNT(*) FROM Comments AS Replies WHERE Replies.parent_comment_id = Comments.comment_id) AS replies_count
  FROM Comments 
  JOIN Users ON Comments.user_id = Users.user_id
  WHERE post_id = ? AND parent_comment_id IS NULL
`;

    const repliesQuery = `
  SELECT 
    Comments.*, 
    Users.username AS commenter_username,
    Users.full_name AS commenter_full_name,
    Users.profile_picture_url AS commenter_profile_picture,
    (SELECT username FROM Users WHERE Users.user_id = (SELECT user_id FROM Posts WHERE Posts.post_id = Comments.post_id)) AS post_owner_username,
    (SELECT COUNT(*) FROM CommentLikes WHERE CommentLikes.comment_id = Comments.comment_id) AS likes_count
  FROM Comments 
  JOIN Users ON Comments.user_id = Users.user_id
  WHERE post_id = ? AND parent_comment_id IS NOT NULL
`;

    connection.query(mainCommentsQuery, [postId], (error, mainComments) => {
      if (error) {
        console.log(error);
        connection.release();
        res.status(500).send('An error occurred while fetching comments');
        return;
      }

      connection.query(repliesQuery, [postId], (error, replies) => {
        connection.release();

        if (error) {
          console.log(error);
          res.status(500).send('An error occurred while fetching comments');
          return;
        }

        mainComments.forEach(comment => {
          comment.replies = replies.filter(
            reply => reply.parent_comment_id === comment.comment_id,
          );
        });

        res.status(200).json(mainComments);
      });
    });
  });
});

// Endpoint untuk menambahkan komentar baru
app.post('/posts/:postId/comments', function (req, res) {
  connection.getConnection(function (err, connection) {
    if (err) {
      console.log(err);
      res
        .status(500)
        .send('An error occurred while connecting to the database');
      return;
    }

    const {content, userId} = req.body;
    const {postId} = req.params;
    const offset = 7;
    const date = new Date();
    date.setHours(date.getHours() + offset);
    const date_created = date.toISOString().slice(0, 19).replace('T', ' ');

    const query = `
      INSERT INTO Comments (post_id, user_id, content, date_created)
      VALUES (?, ?, ?, ?)
    `;

    connection.query(
      query,
      [postId, userId, content, date_created],
      (error, results) => {
        if (error) {
          console.log(error);
          res.status(500).send('An error occurred while adding the comment');
          connection.release();
          return;
        }

        res.status(200).json({message: 'Comment added successfully'});
        connection.release();
      },
    );
  });
});

// Endpoint untuk membalas komentar
app.post('/posts/:postId/comments/:commentId/replies', function (req, res) {
  connection.getConnection(function (err, connection) {
    if (err) {
      console.log(err);
      res
        .status(500)
        .send('An error occurred while connecting to the database');
      return;
    }

    const offset = 7;
    const date = new Date();
    date.setHours(date.getHours() + offset);
    const date_created = date.toISOString().slice(0, 19).replace('T', ' ');

    const {content, userId} = req.body;
    const {postId, commentId} = req.params;
    const parent_comment_id = commentId;

    const query = `
  INSERT INTO Comments (post_id, user_id, content, parent_comment_id, date_created)
  VALUES (?, ?, ?, ?, ?)
`;

    connection.query(
      query,
      [postId, userId, content, parent_comment_id, date_created],
      (error, results) => {
        if (error) {
          console.log(error);
          res.status(500).send('An error occurred while adding the comment');
          connection.release();
          return;
        }

        res.status(200).json({message: 'Comment added successfully'});
        connection.release();
      },
    );
  });
});

// GET route for likes
app.get('/likes', function (req, res) {
  connection.query('SELECT * FROM Likes', (error, results) => {
    if (error) {
      console.log(error);
      res.status(500).send('An error occurred while fetching likes');
    } else {
      res.status(200).json(results);
    }
  });
});

// POST route for likes
app.post('/likes/create', function (req, res) {
  const {user_id, post_id} = req.body;
  connection.query(
    'INSERT INTO Likes (user_id, post_id, date_created) VALUES (?, ?, NOW())',
    [user_id, post_id],
    (error, results) => {
      if (error) {
        console.log(error);
        res.status(500).send('An error occurred while creating a like');
      } else {
        res.status(200).send('Like created successfully');
      }
    },
  );
});

// DELETE route for likes
app.delete('/likes/delete', function (req, res) {
  const {user_id, post_id} = req.body;
  connection.query(
    'DELETE FROM Likes WHERE user_id = ? AND post_id = ?',
    [user_id, post_id],
    (error, results) => {
      if (error) {
        console.log(error);
        res.status(500).send('An error occurred while deleting a like');
      } else {
        res.status(200).send('Like deleted successfully');
      }
    },
  );
});

// POST route for registering a new user
app.post('/users/register', async function (req, res) {
  const {name, email, username, password} = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  connection.query(
    'INSERT INTO Users (full_name, email, username, password, date_created) VALUES (?, ?, ?, ?, NOW())',
    [name, email, username, hashedPassword],
    (error, results) => {
      if (error) {
        console.log(error);
        res.status(500).send('An error occurred while registering a new user');
      } else {
        res.status(200).send('User registered successfully');
      }
    },
  );
});

// POST route for logging in a user
app.post('/users/login', async function (req, res) {
  const {email, password} = req.body;

  connection.query(
    'SELECT * FROM Users WHERE email = ?',
    [email],
    async (error, results) => {
      if (error) {
        console.log(error);
        res.status(500).send('An error occurred while logging in');
      } else {
        if (results.length > 0) {
          const comparison = await bcrypt.compare(
            password,
            results[0].password,
          );

          if (comparison) {
            res.status(200).json({
              user_id: results[0].user_id,
              email: results[0].email,
              username: results[0].username,
              full_name: results[0].full_name,
              profile_picture_url: results[0].profile_picture_url,
              description: results[0].description,
            });
          } else {
            res.status(401).send('Wrong password');
          }
        } else {
          res.status(404).send('User not found');
        }
      }
    },
  );
});

// GET route for comment likes
app.get('/commentLikes', function (req, res) {
  connection.query('SELECT * FROM CommentLikes', (error, results) => {
    if (error) {
      console.log(error);
      res.status(500).send('An error occurred while fetching comment likes');
    } else {
      res.status(200).json(results);
    }
  });
});

// POST route for comment likes
app.post('/commentLikes/create', function (req, res) {
  const {user_id, comment_id} = req.body;
  connection.query(
    'INSERT INTO CommentLikes (user_id, comment_id, date_created) VALUES (?, ?, NOW())',
    [user_id, comment_id],
    (error, results) => {
      if (error) {
        console.log(error);
        res.status(500).send('An error occurred while creating a comment like');
      } else {
        res.status(200).send('Comment like created successfully');
      }
    },
  );
});

// DELETE route for comment likes
app.delete('/commentLikes/delete', function (req, res) {
  const {user_id, comment_id} = req.body;
  connection.query(
    'DELETE FROM CommentLikes WHERE user_id = ? AND comment_id = ?',
    [user_id, comment_id],
    (error, results) => {
      if (error) {
        console.log(error);
        res.status(500).send('An error occurred while deleting a comment like');
      } else {
        res.status(200).send('Comment like deleted successfully');
      }
    },
  );
});

// GET route for user info, follower count, and post count
app.get('/users/:userId', function (req, res) {
  connection.getConnection(function (err, connection) {
    if (err) {
      console.log(err);
      res
        .status(500)
        .send('An error occurred while connecting to the database');
      return;
    }

    const {userId} = req.params;

    const query = `
      SELECT 
        Users.user_id,
        Users.email,
        Users.username,
        Users.full_name,
        Users.profile_picture_url,
        Users.banner_picture_url,
        Users.description,
        (SELECT COUNT(*) FROM Followings WHERE Followings.following_id = Users.user_id) AS followers_count,
        (SELECT COUNT(*) FROM Posts WHERE Posts.user_id = Users.user_id) AS posts_count
      FROM Users 
      WHERE Users.user_id = ?
    `;

    connection.query(query, [userId], (error, results) => {
      connection.release();

      if (error) {
        console.log(error);
        res.status(500).send('An error occurred while fetching user info');
      } else {
        res.status(200).json(results[0]);
      }
    });
  });
});

// Get route for user posts
app.get('/users/:userId/posts', function (req, res) {
  connection.getConnection(function (err, connection) {
    if (err) {
      console.log(err);
      res
        .status(500)
        .send('An error occurred while connecting to the database');
      return;
    }

    const {userId} = req.params;

    const query = `
      SELECT 
        Posts.post_id,
        Posts.user_id,
        Users.username, 
        Users.profile_picture_url,
        Users.full_name,
        Posts.caption,
        Posts.post_url,
        Posts.date_created,
        Posts.date_updated,
        Posts.image_path,
        Posts.analysis_id,
        PostCards.analysis_id,
        PostCards.symbol,
        PostCards.equity_name,
        PostCards.target_price,
        PostCards.initial_price,
        PostCards.upside_percentage,
        PostCards.agree_count,
        PostCards.disagree_count,
        PostCards.timing,
        PostCards.prediction,
        COUNT(DISTINCT Likes.user_id, Likes.post_id) AS likes,
        COUNT(DISTINCT Comments.comment_id) AS comments
      FROM Posts 
      LEFT JOIN Likes ON Posts.post_id = Likes.post_id
      LEFT JOIN Comments ON Posts.post_id = Comments.post_id
      INNER JOIN Users ON Posts.user_id = Users.user_id
      LEFT JOIN PostCards ON Posts.analysis_id = PostCards.analysis_id
      WHERE Posts.user_id = ?
      GROUP BY Posts.post_id
    `;

    connection.query(query, [userId], (error, results) => {
      connection.release();

      if (error) {
        console.log(error);
        res.status(500).send('An error occurred while fetching posts');
      } else {
        const transformedResults = results.map(result => {
          const {
            analysis_id,
            symbol,
            equity_name,
            target_price,
            initial_price,
            upside_percentage,
            agree_count,
            disagree_count,
            timing,
            prediction,
            ...post
          } = result;
          return {
            ...post,
            analysis: analysis_id
              ? {
                  analysis_id,
                  symbol,
                  equity_name,
                  target_price,
                  initial_price,
                  upside_percentage,
                  agree_count,
                  disagree_count,
                  timing,
                  prediction,
                }
              : null,
          };
        });

        res.status(200).json(transformedResults);
      }
    });
  });
});

app.get('/users/:userId/posts-with-analysis', function (req, res) {
  connection.getConnection(function (err, connection) {
    if (err) {
      console.log(err);
      res
        .status(500)
        .send('An error occurred while connecting to the database');
      return;
    }

    const {userId} = req.params;

    const query = `
  SELECT 
    Posts.post_id,
    Posts.user_id,
    Users.username, 
    Users.full_name,
    Users.profile_picture_url,
    Posts.caption,
    Posts.post_url,
    Posts.date_created,
    Posts.date_updated,
    Posts.image_path,
    Posts.analysis_id,
    PostCards.analysis_id,
    PostCards.symbol,
    PostCards.equity_name,
    PostCards.target_price,
    PostCards.initial_price,
    PostCards.upside_percentage,
    PostCards.agree_count,
    PostCards.disagree_count,
    PostCards.timing,
    PostCards.prediction,
    COUNT(DISTINCT Likes.user_id, Likes.post_id) AS likes,
    COUNT(DISTINCT Comments.comment_id) AS comments
  FROM Posts 
  LEFT JOIN Likes ON Posts.post_id = Likes.post_id
  LEFT JOIN Comments ON Posts.post_id = Comments.post_id
  INNER JOIN Users ON Posts.user_id = Users.user_id
  INNER JOIN PostCards ON Posts.analysis_id = PostCards.analysis_id
  WHERE Posts.user_id = ? AND Posts.analysis_id IS NOT NULL
  GROUP BY Posts.post_id
`;

    connection.query(query, [userId], (error, results) => {
      connection.release();

      if (error) {
        console.log(error);
        res.status(500).send('An error occurred while fetching user posts');
      } else {
        // Transform the results to include the analysis object
        const transformedResults = results.map(result => {
          const {
            analysis_id,
            symbol,
            equity_name,
            target_price,
            initial_price,
            upside_percentage,
            agree_count,
            disagree_count,
            timing,
            prediction,
            ...post
          } = result;
          return {
            ...post,
            analysis: analysis_id
              ? {
                  analysis_id,
                  symbol,
                  equity_name,
                  target_price,
                  initial_price,
                  upside_percentage,
                  agree_count,
                  disagree_count,
                  timing,
                  prediction,
                }
              : null,
          };
        });

        res.status(200).json(transformedResults);
      }
    });
  });
});

// Get route for all followings
app.get('/followings', function (req, res) {
  const query = 'SELECT * FROM Followings';

  connection.query(query, (error, results) => {
    if (error) {
      console.log(error);
      res.status(500).send('An error occurred while fetching followings');
    } else {
      res.status(200).json(results);
    }
  });
});

// GET route for user followers
app.get('/users/:userId/followers', function (req, res) {
  connection.getConnection(function (err, connection) {
    if (err) {
      console.log(err);
      res
        .status(500)
        .send('An error occurred while connecting to the database');
      return;
    }

    const {userId} = req.params;

    const query = `
      SELECT 
        Users.user_id,
        Users.username,
        Users.full_name,
        Users.profile_picture_url
      FROM Users 
      INNER JOIN Followings ON Users.user_id = Followings.user_id
      WHERE Followings.following_id = ?
    `;

    connection.query(query, [userId], (error, results) => {
      connection.release();

      if (error) {
        console.log(error);
        res.status(500).send('An error occurred while fetching followers');
      } else {
        res.status(200).json(results);
      }
    });
  });
});

// POST route for creating a follow
app.post('/follow', function (req, res) {
  connection.getConnection(function (err, connection) {
    if (err) {
      console.log(err);
      res
        .status(500)
        .send('An error occurred while connecting to the database');
      return;
    }

    const {userId, followingId} = req.body;

    const query = `
      INSERT INTO Followings (user_id, following_id, date_created)
      VALUES (?, ?, NOW())
    `;

    connection.query(query, [userId, followingId], (error, results) => {
      connection.release();

      if (error) {
        console.log(error);
        res.status(500).send('An error occurred while creating a follow');
      } else {
        res.status(200).send('Follow created successfully');
      }
    });
  });
});

// DELETE route for deleting a follow
app.delete('/follow/delete', function (req, res) {
  connection.getConnection(function (err, connection) {
    if (err) {
      console.log(err);
      res
        .status(500)
        .send('An error occurred while connecting to the database');
      return;
    }

    const {userId, followingId} = req.body;

    if (!userId || !followingId) {
      res.status(400).send('userId and followingId are required');
      return;
    }

    const query = `
      DELETE FROM Followings 
      WHERE user_id = ? AND following_id = ?
    `;

    connection.query(query, [userId, followingId], (error, results) => {
      connection.release();

      if (error) {
        console.log(error);
        res.status(500).send('An error occurred while deleting a follow');
      } else {
        res
          .status(200)
          .send({message: 'Follow deleted successfully', userId, followingId});
        console.log(results);
      }
    });
  });
});

app.post('/postcards', (req, res) => {
  let {
    symbol,
    equity_name,
    target_price,
    initial_price,
    upside_percentage,
    agree_count,
    disagree_count,
    timing,
    prediction,
  } = req.body;

  timing = moment(timing).format('YYYY-MM-DD HH:mm:ss');

  const insertQuery = `
    INSERT INTO PostCards (
      symbol,
      equity_name,
      target_price,
      initial_price,
      upside_percentage,
      agree_count,
      disagree_count,
      timing,
      prediction
    ) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  connection.query(
    insertQuery,
    [
      symbol,
      equity_name,
      target_price,
      initial_price,
      upside_percentage,
      agree_count,
      disagree_count,
      timing,
      prediction,
    ],
    (error, results) => {
      if (error) {
        console.log(error);
        res.status(500).send('An error occurred while creating the post card');
        return;
      }

      res.status(201).json({
        message: 'Post card created successfully',
        id: results.insertId,
      });
    },
  );
});

// PUT route for updating user info
app.put('/users/:userId/update', function (req, res) {
  connection.getConnection(function (err, connection) {
    if (err) {
      console.log(err);
      res
        .status(500)
        .send('An error occurred while connecting to the database');
      return;
    }

    const {userId} = req.params;
    const {username, full_name, description} = req.body;

    let query = 'UPDATE Users SET date_updated = NOW(),';
    let queryParams = [];

    if (username) {
      query += ' username = ?,';
      queryParams.push(username);
    }

    if (full_name) {
      query += ' full_name = ?,';
      queryParams.push(full_name);
    }

    if (description) {
      query += ' description = ?,';
      queryParams.push(description);
    }

    query = query.slice(0, -1) + ' WHERE user_id = ?';
    queryParams.push(userId);

    connection.query(query, queryParams, (error, results) => {
      connection.release();

      if (error) {
        console.log(error);
        res.status(500).send('An error occurred while updating user info');
      } else {
        res.status(200).send('User info updated successfully');
      }
    });
  });
});

app.get('/followedPosts/:user_id', function (req, res) {
  const {user_id} = req.params;
  connection.getConnection(function (err, connection) {
    if (err) {
      console.log(err);
      res
        .status(500)
        .send('An error occurred while connecting to the database');
      return;
    }

    const query = `
      SELECT Posts.*, Users.username, Users.full_name, Users.profile_picture_url, COUNT(DISTINCT Likes.user_id) as likes, COUNT(DISTINCT Comments.comment_id) as comments
      FROM Posts
      LEFT JOIN Followings ON Posts.user_id = Followings.following_id
      LEFT JOIN Likes ON Posts.post_id = Likes.post_id
      LEFT JOIN Comments ON Posts.post_id = Comments.post_id
      LEFT JOIN Users ON Posts.user_id = Users.user_id
      WHERE Followings.user_id = ? OR Posts.user_id = ?
      GROUP BY Posts.post_id
    `;

    connection.query(query, [user_id, user_id], (error, results) => {
      if (error) {
        console.log(error);
        res.status(500).send('An error occurred while fetching posts');
        connection.release();
        return;
      }

      let completedQueries = 0;
      results.forEach((post, index) => {
        const commentsQuery = `
          SELECT comment_id, post_id, user_id, content, date_created, parent_comment_id
          FROM Comments
          WHERE post_id = ?
          ORDER BY parent_comment_id ASC
        `;

        connection.query(commentsQuery, [post.post_id], (error, comments) => {
          if (error) {
            console.log(error);
            res.status(500).send('An error occurred while fetching comments');
            connection.release();
            return;
          }

          const commentsWithReplies = comments.reduce((acc, comment) => {
            if (comment.parent_comment_id) {
              const parentComment = acc.find(
                c => c.comment_id === comment.parent_comment_id,
              );
              if (parentComment) {
                parentComment.replies = parentComment.replies || [];
                parentComment.replies.push(comment);
              }
            } else {
              acc.push(comment);
            }
            return acc;
          }, []);

          results[index].commentsArray = commentsWithReplies;

          if (post.analysis_id) {
            const analysisQuery = `
              SELECT *
              FROM PostCards
              WHERE analysis_id = ?
            `;

            connection.query(
              analysisQuery,
              [post.analysis_id],
              (error, analysis) => {
                if (error) {
                  console.log(error);
                  res
                    .status(500)
                    .send('An error occurred while fetching analysis');
                  connection.release();
                  return;
                }

                results[index].analysis = analysis[0];
                completedQueries++;

                if (completedQueries === results.length) {
                  res.status(200).json(results);
                  connection.release();
                }
              },
            );
          } else {
            completedQueries++;

            if (completedQueries === results.length) {
              res.status(200).json(results);
              connection.release();
            }
          }
        });
      });
    });
  });
});

app.get('/search-popular', function (req, res) {
  connection.getConnection(function (err, connection) {
    if (err) {
      console.log(err);
      res
        .status(500)
        .send('An error occurred while connecting to the database');
      return;
    }

    const searchTerm = req.query.searchTerm || '';
    let query = `
  SELECT Posts.*, Users.username, Users.full_name, Users.profile_picture_url, COUNT(DISTINCT Likes.user_id) as likes, COUNT(DISTINCT Comments.comment_id) as comments
  FROM Posts
  LEFT JOIN Likes ON Posts.post_id = Likes.post_id
  LEFT JOIN Comments ON Posts.post_id = Comments.post_id
  LEFT JOIN Users ON Posts.user_id = Users.user_id
  LEFT JOIN PostCards ON Posts.analysis_id = PostCards.analysis_id
  WHERE Users.username LIKE '%${searchTerm}%' OR Users.full_name LIKE '%${searchTerm}%' OR PostCards.prediction LIKE '%${searchTerm}%' OR Posts.caption LIKE '%${searchTerm}%'
  OR PostCards.symbol LIKE '%${searchTerm}%' OR PostCards.equity_name LIKE '%${searchTerm}%'
`;

    query += `
  GROUP BY Posts.post_id
  ORDER BY likes DESC, comments DESC
`;

    connection.query(query, (error, results) => {
      if (error) {
        console.log(error);
        res.status(500).send('An error occurred while fetching posts');
        connection.release();
        return;
      }

      let completedQueries = 0;
      results.forEach((post, index) => {
        const commentsQuery = `
          SELECT comment_id, post_id, user_id, content, date_created, parent_comment_id
          FROM Comments
          WHERE post_id = ?
          ORDER BY parent_comment_id ASC
        `;

        connection.query(commentsQuery, [post.post_id], (error, comments) => {
          if (error) {
            console.log(error);
            res.status(500).send('An error occurred while fetching comments');
            connection.release();
            return;
          }

          const commentsWithReplies = comments.reduce((acc, comment) => {
            if (comment.parent_comment_id) {
              const parentComment = acc.find(
                c => c.comment_id === comment.parent_comment_id,
              );
              if (parentComment) {
                parentComment.replies = parentComment.replies || [];
                parentComment.replies.push(comment);
              }
            } else {
              acc.push(comment);
            }
            return acc;
          }, []);

          results[index].commentsArray = commentsWithReplies;

          if (post.analysis_id) {
            const analysisQuery = `
              SELECT *
              FROM PostCards
              WHERE analysis_id = ?
            `;

            connection.query(
              analysisQuery,
              [post.analysis_id],
              (error, analysis) => {
                if (error) {
                  console.log(error);
                  res
                    .status(500)
                    .send('An error occurred while fetching analysis');
                  connection.release();
                  return;
                }

                results[index].analysis = analysis[0];
                completedQueries++;

                if (completedQueries === results.length) {
                  res.status(200).json(results);
                  connection.release();
                }
              },
            );
          } else {
            completedQueries++;

            if (completedQueries === results.length) {
              res.status(200).json(results);
              connection.release();
            }
          }
        });
      });
    });
  });
});

app.get('/search-latest', function (req, res) {
  connection.getConnection(function (err, connection) {
    if (err) {
      console.log(err);
      res
        .status(500)
        .send('An error occurred while connecting to the database');
      return;
    }

    const searchTerm = req.query.searchTerm || '';
    let query = `
  SELECT Posts.*, Users.username, Users.full_name, Users.profile_picture_url, COUNT(DISTINCT Likes.user_id) as likes, COUNT(DISTINCT Comments.comment_id) as comments
  FROM Posts
  LEFT JOIN Likes ON Posts.post_id = Likes.post_id
  LEFT JOIN Comments ON Posts.post_id = Comments.post_id
  LEFT JOIN Users ON Posts.user_id = Users.user_id
  LEFT JOIN PostCards ON Posts.analysis_id = PostCards.analysis_id
  WHERE Users.username LIKE '%${searchTerm}%' OR Users.full_name LIKE '%${searchTerm}%' OR PostCards.prediction LIKE '%${searchTerm}%' OR Posts.caption LIKE '%${searchTerm}%'
  OR PostCards.symbol LIKE '%${searchTerm}%' OR PostCards.equity_name LIKE '%${searchTerm}%'
`;

    query += `
  GROUP BY Posts.post_id
  ORDER BY Posts.date_created DESC
`;

    connection.query(query, (error, results) => {
      if (error) {
        console.log(error);
        res.status(500).send('An error occurred while fetching posts');
        connection.release();
        return;
      }

      let completedQueries = 0;
      results.forEach((post, index) => {
        const commentsQuery = `
          SELECT comment_id, post_id, user_id, content, date_created, parent_comment_id
          FROM Comments
          WHERE post_id = ?
          ORDER BY parent_comment_id ASC
        `;

        connection.query(commentsQuery, [post.post_id], (error, comments) => {
          if (error) {
            console.log(error);
            res.status(500).send('An error occurred while fetching comments');
            connection.release();
            return;
          }

          const commentsWithReplies = comments.reduce((acc, comment) => {
            if (comment.parent_comment_id) {
              const parentComment = acc.find(
                c => c.comment_id === comment.parent_comment_id,
              );
              if (parentComment) {
                parentComment.replies = parentComment.replies || [];
                parentComment.replies.push(comment);
              }
            } else {
              acc.push(comment);
            }
            return acc;
          }, []);

          results[index].commentsArray = commentsWithReplies;

          if (post.analysis_id) {
            const analysisQuery = `
              SELECT *
              FROM PostCards
              WHERE analysis_id = ?
            `;

            connection.query(
              analysisQuery,
              [post.analysis_id],
              (error, analysis) => {
                if (error) {
                  console.log(error);
                  res
                    .status(500)
                    .send('An error occurred while fetching analysis');
                  connection.release();
                  return;
                }

                results[index].analysis = analysis[0];
                completedQueries++;

                if (completedQueries === results.length) {
                  res.status(200).json(results);
                  connection.release();
                }
              },
            );
          } else {
            completedQueries++;

            if (completedQueries === results.length) {
              res.status(200).json(results);
              connection.release();
            }
          }
        });
      });
    });
  });
});

// Note for search users connect with userId
app.get('/search-users', function (req, res) {
  connection.getConnection(function (err, connection) {
    if (err) {
      console.log(err);
      res
        .status(500)
        .send('An error occurred while connecting to the database');
      return;
    }

    const searchTerm = req.query.searchTerm || '';
    let query = `
      SELECT *
      FROM Users
      WHERE username LIKE '%${searchTerm}%' OR full_name LIKE '%${searchTerm}%'
    `;

    connection.query(query, (error, results) => {
      if (error) {
        console.log(error);
        res.status(500).send('An error occurred while fetching users');
        connection.release();
        return;
      }

      res.status(200).json(results);
      connection.release();
    });
  });
});

app.get('/search-relevant', function (req, res) {
  connection.getConnection(function (err, connection) {
    if (err) {
      console.log(err);
      res
        .status(500)
        .send('An error occurred while connecting to the database');
      return;
    }

    const searchTerm = req.query.searchTerm || '';
    let query = `
      SELECT Posts.*, Users.username, Users.full_name, Users.profile_picture_url, COUNT(DISTINCT Likes.user_id) as likes, COUNT(DISTINCT Comments.comment_id) as comments,
      (
        (CASE WHEN Users.username LIKE '%${searchTerm}%' THEN 1 ELSE 0 END) +
        (CASE WHEN Users.full_name LIKE '%${searchTerm}%' THEN 1 ELSE 0 END) +
        (CASE WHEN PostCards.prediction LIKE '%${searchTerm}%' THEN 1 ELSE 0 END) +
        (CASE WHEN Posts.caption LIKE '%${searchTerm}%' THEN 1 ELSE 0 END) +
        (CASE WHEN PostCards.symbol LIKE '%${searchTerm}%' THEN 1 ELSE 0 END) +
        (CASE WHEN PostCards.equity_name LIKE '%${searchTerm}%' THEN 1 ELSE 0 END)
      ) AS relevance
      FROM Posts
      LEFT JOIN Likes ON Posts.post_id = Likes.post_id
      LEFT JOIN Comments ON Posts.post_id = Comments.post_id
      LEFT JOIN Users ON Posts.user_id = Users.user_id
      LEFT JOIN PostCards ON Posts.analysis_id = PostCards.analysis_id
      WHERE Users.username LIKE '%${searchTerm}%' OR Users.full_name LIKE '%${searchTerm}%' OR PostCards.prediction LIKE '%${searchTerm}%' OR Posts.caption LIKE '%${searchTerm}%'
      OR PostCards.symbol LIKE '%${searchTerm}%' OR PostCards.equity_name LIKE '%${searchTerm}%'
    `;

    query += `
      GROUP BY Posts.post_id
      ORDER BY relevance DESC, Posts.date_created DESC
    `;

    connection.query(query, (error, results) => {
      if (error) {
        console.log(error);
        res.status(500).send('An error occurred while fetching posts');
        connection.release();
        return;
      }

      let completedQueries = 0;
      results.forEach((post, index) => {
        const commentsQuery = `
          SELECT comment_id, post_id, user_id, content, date_created, parent_comment_id
          FROM Comments
          WHERE post_id = ?
          ORDER BY parent_comment_id ASC
        `;

        connection.query(commentsQuery, [post.post_id], (error, comments) => {
          if (error) {
            console.log(error);
            res.status(500).send('An error occurred while fetching comments');
            connection.release();
            return;
          }

          const commentsWithReplies = comments.reduce((acc, comment) => {
            if (comment.parent_comment_id) {
              const parentComment = acc.find(
                c => c.comment_id === comment.parent_comment_id,
              );
              if (parentComment) {
                parentComment.replies = parentComment.replies || [];
                parentComment.replies.push(comment);
              }
            } else {
              acc.push(comment);
            }
            return acc;
          }, []);

          results[index].commentsArray = commentsWithReplies;

          if (post.analysis_id) {
            const analysisQuery = `
              SELECT *
              FROM PostCards
              WHERE analysis_id = ?
            `;

            connection.query(
              analysisQuery,
              [post.analysis_id],
              (error, analysis) => {
                if (error) {
                  console.log(error);
                  res
                    .status(500)
                    .send('An error occurred while fetching analysis');
                  connection.release();
                  return;
                }

                results[index].analysis = analysis[0];
                completedQueries++;

                if (completedQueries === results.length) {
                  res.status(200).json(results);
                  connection.release();
                }
              },
            );
          } else {
            completedQueries++;

            if (completedQueries === results.length) {
              res.status(200).json(results);
              connection.release();
            }
          }
        });
      });
    });
  });
});

app.get('/search-analysis', function (req, res) {
  connection.getConnection(function (err, connection) {
    if (err) {
      console.log(err);
      res
        .status(500)
        .send('An error occurred while connecting to the database');
      return;
    }

    const searchTerm = req.query.searchTerm || '';
    let query = `
  SELECT Posts.*, Users.username, Users.full_name,Users.profile_picture_url, COUNT(DISTINCT Likes.user_id) as likes, COUNT(DISTINCT Comments.comment_id) as comments
  FROM Posts
  LEFT JOIN Likes ON Posts.post_id = Likes.post_id
  LEFT JOIN Comments ON Posts.post_id = Comments.post_id
  LEFT JOIN Users ON Posts.user_id = Users.user_id
  LEFT JOIN PostCards ON Posts.analysis_id = PostCards.analysis_id
  WHERE (Users.username LIKE '%${searchTerm}%' OR Users.full_name LIKE '%${searchTerm}%' OR PostCards.prediction LIKE '%${searchTerm}%' OR Posts.caption LIKE '%${searchTerm}%'
  OR PostCards.symbol LIKE '%${searchTerm}%' OR PostCards.equity_name LIKE '%${searchTerm}%') AND Posts.analysis_id IS NOT NULL
`;

    query += `
  GROUP BY Posts.post_id
  ORDER BY Posts.date_created DESC
`;

    connection.query(query, (error, results) => {
      if (error) {
        console.log(error);
        res.status(500).send('An error occurred while fetching posts');
        connection.release();
        return;
      }

      let completedQueries = 0;
      results.forEach((post, index) => {
        const commentsQuery = `
      SELECT comment_id, post_id, user_id, content, date_created, parent_comment_id
      FROM Comments
      WHERE post_id = ?
      ORDER BY parent_comment_id ASC
    `;

        connection.query(commentsQuery, [post.post_id], (error, comments) => {
          if (error) {
            console.log(error);
            res.status(500).send('An error occurred while fetching comments');
            connection.release();
            return;
          }

          const commentsWithReplies = comments.reduce((acc, comment) => {
            if (comment.parent_comment_id) {
              const parentComment = acc.find(
                c => c.comment_id === comment.parent_comment_id,
              );
              if (parentComment) {
                parentComment.replies = parentComment.replies || [];
                parentComment.replies.push(comment);
              }
            } else {
              acc.push(comment);
            }
            return acc;
          }, []);

          results[index].commentsArray = commentsWithReplies;

          if (post.analysis_id) {
            const analysisQuery = `
          SELECT *
          FROM PostCards
          WHERE analysis_id = ?
        `;

            connection.query(
              analysisQuery,
              [post.analysis_id],
              (error, analysis) => {
                if (error) {
                  console.log(error);
                  res
                    .status(500)
                    .send('An error occurred while fetching analysis');
                  connection.release();
                  return;
                }

                results[index].analysis = analysis[0];
                completedQueries++;

                if (completedQueries === results.length) {
                  res.status(200).json(results);
                  connection.release();
                }
              },
            );
          } else {
            completedQueries++;

            if (completedQueries === results.length) {
              res.status(200).json(results);
              connection.release();
            }
          }
        });
      });
    });
  });
});

app.listen(3001, () => {
  console.log('Go to http://localhost:3001/posts so you can see the data.');
});
