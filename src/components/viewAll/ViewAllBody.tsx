import St from './style';
import { getAdminPostList, getCategoryPosts } from '../../api/pageListApi';
import { useState } from 'react';
import PostList from './PostList';
import { QUERY_KEYS } from '../../query/keys';
import PostListAdmin from './PostListAdmin';

export type Category = 'knowHow' | 'recommendation' | 'sharing' | 'habit';
export type SortList = 'popularity' | 'latest';
function ViewAllBody() {
  const [category, setCategory] = useState<Category>('knowHow');
  const [sortBy, setSortBy] = useState<SortList>('latest');
  return (
    <>
      <St.MangoDiv>
        <St.MangoWord>Mango</St.MangoWord>
        <St.MangoOutWord>의 컨텐츠</St.MangoOutWord>
      </St.MangoDiv>
      <St.MangoSUbWord>누구나, 어디서나 쉽게 따라할 수 있는 습관을 만들어 나가요.</St.MangoSUbWord>

      <St.MainSubWrapper>
        <PostListAdmin queryKey={[QUERY_KEYS.ADMIN]} queryFn={getAdminPostList('admin')} sortBy={sortBy} />
      </St.MainSubWrapper>

      <St.MainSubWrapper>
        <St.CategoryWrapper>
          <St.ButtonWrapper>
            <St.Button onClick={() => setCategory('knowHow')}>친환경 노하우</St.Button>
            <St.Button onClick={() => setCategory('recommendation')}>제품 추천</St.Button>
            <St.Button onClick={() => setCategory('sharing')}>제품 나눔</St.Button>
            <St.Button onClick={() => setCategory('habit')}>습관 인증</St.Button>
          </St.ButtonWrapper>

          <St.SortWrapper>
            <li>
              <a href="#none" onClick={() => setSortBy('popularity')}>
                인기순
              </a>
            </li>

            <li>
              <a href="#none" onClick={() => setSortBy('latest')}>
                최신순
              </a>
            </li>
          </St.SortWrapper>
        </St.CategoryWrapper>
        <PostList queryKey={[category]} queryFn={getCategoryPosts(category)} sortBy={sortBy} />
      </St.MainSubWrapper>
    </>
  );
}
export default ViewAllBody;
