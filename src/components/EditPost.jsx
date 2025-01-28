import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useRef } from 'react';

export default function EditPost({ user, post }) {
  const textRef = useRef();
  textRef.current.value = post.content;

  return (
    <article className="edit-post">
      <ul className="new__menu">
        <li>Редактировать публикацию</li>
        <li>
          <Link to="/">&#9587;</Link>
        </li>
      </ul>

      <form>
        <div className="edit-post__text">
          <img className="author__avatar" src={user.avatar} alt="avatar" />
          <textarea ref={textRef} />
        </div>
        <article className="article__buttons">
          <button className="btn__ok">Сохранить</button>
        </article>
      </form>
    </article>
  );
}

EditPost.propTypes = {
  user: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
};
