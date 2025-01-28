import PropTypes from 'prop-types';
import { useLocation, Link } from 'react-router-dom';
import Post from './Post';
import createRequest from '../createRequest';

export default function PostView({ user }) {
  const location = useLocation();
  const id = location.pathname.slice(7);

  const post = createRequest({
    url: 'http://localhost:7070/posts/' + id,
    method: 'GET',
  });

  if (post) {
    return (
      <div>
        <Post user={user} post={post} />
        <article className="article__buttons">
          <Link to="edit"><button type="button" className="btn__ok">Изменить</button></Link>
          <button type="button" className="btn__delete">Удалить</button>
        </article>
      </div>
    );
  }
}

PostView.propTypes = {
  user: PropTypes.object.isRequired,
};
