import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import Post from './Post';
import createRequest from '../createRequest';
import NotFound from './NotFound';

export default function PostView({ user }) {
  const navigate = useNavigate();
  const [post, setPost] = useState();
  const location = useLocation();
  const id = location.pathname.slice(7);

  useEffect(() => {
    createRequest({
      url: 'http://localhost:7070/posts/' + id,
      method: 'GET',
    }).then(data => setPost(data.post));
  }, [setPost, id]);

  const postFound = post && Object.keys(post).length !== 0;

  const handleDelete = event => {
    event.preventDefault();
    const { target } = event;
    const formData = new FormData(target);
    formData.append('id', id);
    const data = Object.fromEntries(formData);
    data.id = data.id.replace(/\//g, '');

    createRequest({
      url: 'http://localhost:7070/posts/' + id,
      method: 'DELETE',
      headers: {
        'Content-Type': 'applicaton/json'
      },
      body: JSON.stringify(data),
    });

    event.target.reset();
    navigate('/');
  }

  if (postFound) {
    return (
      <form onSubmit={handleDelete}>
        <Post user={user} post={post} />
        <article className="article__buttons">
          <Link to="edit"><button type="button" className="btn__ok">Изменить</button></Link>
          <button className="btn__delete">Удалить</button>
        </article>
      </form>
    );
  } else {
    return (
      <NotFound />
    );
  }
}

PostView.propTypes = {
  user: PropTypes.object.isRequired,
};
