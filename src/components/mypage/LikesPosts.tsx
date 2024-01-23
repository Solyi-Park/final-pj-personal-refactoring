import { useQueries, useQuery } from '@tanstack/react-query';
import { getAdminPosts, getPopularPosts } from '../../api/homeApi';
import { getLikePosts } from '../../api/myPostAPI';
import Cs from '../viewAll/style';

import { QUERY_KEYS } from '../../query/keys';
import PostCard from './PostCard/PostCard';

const LikesPosts = () => {
  const { data: likePosts } = useQuery({
    queryKey: ['posts', { likedPosts: true }],
    queryFn: getLikePosts
  });
  console.log('이거이거이거 ===>', likePosts);

  const postQueries = useQueries({
    queries: [
      {
        queryKey: ['adminContents'],
        queryFn: getAdminPosts
      },
      {
        queryKey: [QUERY_KEYS.USERPOSTS],
        queryFn: getPopularPosts
      }
    ]
  });

  //필터된 posts 목록 (망고관리자 게시물은 임시로 둔다.)
  // const createdByMango = postQueries[0].data || [];
  // const myPosts = postQueries[1].data || [];

  // 이미지URL 불러오기
  // const imageQueries = useQueries({
  //   queries:
  //     likePosts?.map((post) => ({
  //       queryKey: ['imageURL', post.id],
  //       queryFn: () => downloadImageURL(post.id as string)
  //     })) || []
  // });

  // function removeImageTags(htmlContent: string) {
  //   return htmlContent.replace(/<img[^>]*>|<p[^>]*>(?:\s*<br[^>]*>\s*|)\s*<\/p>/g, '');
  // }

  return (
    <Cs.Contents>
      {likePosts?.length! > 0 ? (
        likePosts?.map((post) => {
          return <PostCard key={post.id} post={post} />;
        })
      ) : (
        <p style={{ display: 'flex', justifyContent: 'center' }}>좋아요 누른 게시물이 없습니다.</p>
      )}
    </Cs.Contents>
  );
};

export default LikesPosts;
