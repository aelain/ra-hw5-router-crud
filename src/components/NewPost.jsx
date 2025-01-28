import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import createRequest from '../createRequest';

export default function NewPost({ user }) {
  const handleSubmit = event => {
    event.preventDefault();
    const { target } = event;
    const formData = new FormData(target);
    formData.append('id', 0);
    formData.append('created', new Date());
    const data = Object.fromEntries(formData);
    data.content = data.content.replace(/[<>{}]/g, '');

    createRequest({
      url: 'http://localhost:7070/posts',
      method: 'POST',
      headers: {
        'Content-Type': 'applicaton/json'
      },
      body: JSON.stringify(data),
    });
    event.target.reset();
    window.location.assign('/');
  };

  return (
    <form className="new" onSubmit={event => handleSubmit(event)}>
      <ul className="new__menu">
        <li>Публикация</li>
        <li>Фото/видео</li>
        <li>Прямой эфир</li>
        <li>Еще</li>
        <li>
          <Link to="/">&#9587;</Link>
        </li>
      </ul>

      <div className='new__text'>
        <img className="author__avatar" src={user.avatar} alt="avatar" />
        <textarea type="text" name='content' placeholder="Текст поста..." />
      </div>
      <article className='article__buttons'>

        <button className="btn__ok">
          Опубликовать
        </button>
      </article>
    </form>
  );
}

NewPost.propTypes = {
  user: PropTypes.object.isRequired,
};
