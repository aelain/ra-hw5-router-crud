import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import createRequest from '../createRequest';
import NotFound from './NotFound';

export default function EditPost({ user }) {
  const navigate = useNavigate();
  const [text, setText] = useState();
  const location = useLocation();
  const idEnd = location.pathname.indexOf('e') - 1;
  const id = location.pathname.slice(7, idEnd);
  const back = location.pathname.slice(0, idEnd);
  const isId = Number.isInteger(Number(id));

  useEffect(() => {
    if (isId) {
      createRequest({
        url: 'http://localhost:7070/posts/' + id,
        method: 'GET',
      }).then(data => {
        if (data.post) {
          setText(data.post.content);
        }
      });
    }
  }, [isId, setText, id]);

  const handleSave = event => {
    event.preventDefault();
    const { target } = event;
    const formData = new FormData(target);
    formData.append('content', text);
    const data = Object.fromEntries(formData);
    data.content = data.content.replace(/[<>{}]/g, '');

    createRequest({
      url: 'http://localhost:7070/posts/' + id,
      method: 'PUT',
      headers: {
        'Content-Type': 'applicaton/json'
      },
      body: JSON.stringify(data),
    });

    event.target.reset();
    navigate('/posts/' + id);
  }

  if (text) {
    return (
      <article className="edit-post">
        <ul className="new__menu">
          <li>Редактировать публикацию</li>
          <li>
            <Link to={back}>&#9587;</Link>
          </li>
        </ul>

        <form onSubmit={handleSave}>
          <div className="edit-post__text">
            <img className="author__avatar" src={user.avatar} alt="avatar" />
            <textarea value={text} onInput={event => setText(event.target.value)} />
          </div>
          <article className="article__buttons">
            <button className="btn__ok">Сохранить</button>
          </article>
        </form>
      </article>
    );
  } else {
    return (
      <NotFound />
    )
  }

}

EditPost.propTypes = {
  user: PropTypes.object.isRequired,
};
