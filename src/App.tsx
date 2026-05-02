/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Articles from './pages/Articles';
import Activities from './pages/Activities';
import Repository from './pages/Repository';
import TemplateDetail from './pages/TemplateDetail';
import ArticleDetail from './pages/ArticleDetail';
import ActivityDetail from './pages/ActivityDetail';
import Contact from './pages/Contact';
import { ThemeProvider } from './context/ThemeContext';

export default function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="tentang-kami" element={<About />} />
            <Route path="artikel" element={<Articles />} />
            <Route path="artikel/:id" element={<ArticleDetail />} />
            <Route path="kegiatan" element={<Activities />} />
            <Route path="kegiatan/:id" element={<ActivityDetail />} />
            <Route path="repository" element={<Repository />} />
            <Route path="repository/:id" element={<TemplateDetail />} />
            <Route path="hubungi-kami" element={<Contact />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}
