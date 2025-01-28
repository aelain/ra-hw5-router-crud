import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import HomePage from './components/HomePage';
import NewPost from './components/NewPost';
import PostView from './components/PostView';
import EditPost from './components/EditPost';
import NotFound from './components/NotFound';
import avatar from './assets/avatar.jpg';

export default function App() {
  const user = {
    name: 'Ilnaz Gilyazov',
    avatar: avatar,
  };

  return (
    <Router>
      <div className="page">
        <Routes>
          <Route path="/" exact element={<HomePage user={user} />} />
          <Route path="/posts/new" element={<NewPost user={user} />} />
          <Route path="/posts/:id" element={<PostView user={user} />} />
          <Route path="/posts/:id/edit" element={<EditPost user={user} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}
