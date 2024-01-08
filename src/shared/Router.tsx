import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from '../layouts/Layout';
import About from '../pages/About';
import Auth from '../pages/Auth';
import Detail from '../pages/Detail';
import Home from '../pages/Home';
import MyPage from '../pages/MyPage';
import ViewAll from '../pages/ViewAll';
import Write from '../pages/Write';

export default function Router() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/viewAll" element={<ViewAll />} />
          <Route path="/write" element={<Write />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}