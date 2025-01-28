import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default function Post({ user, post }) {
  return (
    <article className="post">
      <Link to={post.id ? `/posts/${post.id}` : ""}>
        <div className="author">
          <img className="author__avatar" src={user.avatar} alt="avatar" />
          <div className="author__description">
            <div className="author__name">{user.name}</div>
            <div className="author__data">
              <span className='author__data_detailing'>Основатель группы</span>
              <span>{post.created}</span>
            </div>
          </div>
        </div>

        <p className="post__paragraph">
          {post.content}
        </p>
      </Link>

      <div className="post__actions">
        <button className="btn__action">Нравится</button>
        <button className="btn__action">Комментировать</button>
      </div>
    </article>
  );
}

Post.propTypes = {
  user: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
};
