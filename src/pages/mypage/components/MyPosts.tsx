import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';
import { getMyPosts } from 'api/myPostAPI';
import { AuthContext } from 'context/AuthContext';
import { QUERY_KEYS } from 'query/keys';
import { PostContainer } from 'pages/community/components/communityPostList/style';
import PostCard from './PostCard/PostCard';

// 내 게시물 가져오기
const MyPosts = () => {
  const authContext = useContext(AuthContext);
  const authCurrentUser = authContext!.currentUser;

  //test
  const {
    data: myPosts,
    isLoading,
    error
  } = useQuery({
    queryKey: [QUERY_KEYS.POSTS, 'myPosts'],
    queryFn: getMyPosts,
    enabled: !!authCurrentUser
    // staleTime: 60_000
  });

  if (error) {
    console.error('데이터를 불러오지 못했습니다', error);
  }

  return (
    <>
      <PostContainer>
        {myPosts?.length! === 0 ? (
          <div>내 게시물이 없습니다</div>
        ) : (
          myPosts?.map((post) => <PostCard key={post.id} post={post} />)
        )}
      </PostContainer>
    </>
  );
};
export default MyPosts;
