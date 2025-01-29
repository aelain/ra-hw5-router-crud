import PropTypes from 'prop-types';
import Post from "./Post";
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import createRequest from '../createRequest';

export default function HomePage({ user }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
      createRequest({
        url: 'http://localhost:7070/posts',
        method: 'GET',
      }).then(data => {
        setPosts(data);
      });
    }, [setPosts]);

  return (
    <main>
      <article className="article__buttons">
        <Link to="/posts/new">
          <button type="button" className="btn__ok">Создать пост</button>
        </Link>
      </article>
      {posts.length ? posts.map(post => {
        return (
          <div key={post.id}>
            <Post user={user} post={post} />
            <div className="post__comment">
              <img className="user__avatar" src={user.avatar} alt="avatar" />
              <input type="text" placeholder="Напишите комментарий..." />
            </div>
          </div>
        );
      }) : "Пока ничего нет"}
    </main>
  );
}

HomePage.propTypes = {
  user: PropTypes.object.isRequired,
};
