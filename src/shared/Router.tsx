import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Layout from 'layouts/Layout';
import About from 'pages/about/About';
import Auth from 'pages/auth/Auth';
import ByMango from 'pages/bymango/ByMango';
import Community from 'pages/community/Community';
import Detail from 'pages/detail/Detail';
import Home from 'pages/home/Home';
import MyPage from 'pages/mypage/MyPage';
import Write from 'pages/write/Write';
import ProtectedRoute from './ProtectedRoute';
import React, { Suspense } from 'react';
const LazyHome = React.lazy(() => import('pages/home/Home'));
const LazyAbout = React.lazy(() => import('pages/about/About'));
const LazyAuth = React.lazy(() => import('pages/auth/Auth'));
const LazyByMango = React.lazy(() => import('pages/bymango/ByMango'));
const LazyCommunity = React.lazy(() => import('pages/community/Community'));
const LazyDetail = React.lazy(() => import('pages/detail/Detail'));
const LazyMypage = React.lazy(() => import('pages/mypage/MyPage'));
const LazyWrite = React.lazy(() => import('pages/write/Write'));

export default function Router() {
  return (
    <BrowserRouter>
      <Layout>
        <Suspense>
          <Routes>
            <Route path="/" element={<LazyHome />} />
            <Route path="/community" element={<LazyCommunity />} />
            <Route path="/bymango" element={<LazyByMango />} />
            <Route path="/auth" element={<LazyAuth />} />
            <Route path="/detail/:id" element={<LazyDetail />} />
            <Route path="/about" element={<LazyAbout />} />
            <Route path="*" element={<Navigate replace to="/" />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/mypage" element={<LazyMypage />} />
              <Route path="/write" element={<LazyWrite key={new Date().getTime()} />} />
            </Route>
          </Routes>
        </Suspense>
      </Layout>
      <ReactQueryDevtools />
    </BrowserRouter>
  );
}
