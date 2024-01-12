import React from 'react';
import St from './style';
import { useQueries, useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '../../query/keys';
import { getLikePosts } from '../../api/myPostAPI';
import { auth } from '../../shared/firebase';
import { downloadImageURL, getAdminHomeContents, getTopRankingPosts } from '../../api/homeApi';

const LikesPosts = () => {
  const { data: posts } = useQuery({
    queryKey: [QUERY_KEYS.POSTS],
    queryFn: getLikePosts
  });
  // console.log('이거이거이거 ===>', posts);

  const postQueries = useQueries({
    queries: [
      {
        queryKey: ['adminContents'],
        queryFn: getAdminHomeContents
      },
      {
        queryKey: [QUERY_KEYS.USERPOSTS],
        queryFn: getTopRankingPosts
      }
    ]
  });

  //필터된 posts 목록 (망고관리자 게시물은 임시로 둔다.)
  // const createdByMango = postQueries[0].data || [];
  const myPosts = postQueries[1].data || [];

  // 이미지URL 불러오기
  const imageQueries = useQueries({
    queries:
      posts?.map((post) => ({
        queryKey: ['imageURL', post.id],
        queryFn: () => downloadImageURL(post.id as string)
      })) || []
  });

  function removeImageTags(htmlContent: string) {
    return htmlContent.replace(/<img[^>]*>|<p[^>]*>(?:\s*<br[^>]*>\s*|)\s*<\/p>/g, '');
  }

  return (
    <div>
      Likes Posts
      {/* <St.LikesWrapper>
        <St.MyLikes>
          <St.LikesPostImg>Img</St.LikesPostImg>
          <St.LikesPostText>text text</St.LikesPostText>
        </St.MyLikes>
        <St.MyLikes>
          <St.LikesPostImg>Img</St.LikesPostImg>
          <St.LikesPostText>text text</St.LikesPostText>
        </St.MyLikes>
        <St.MyLikes>
          <St.LikesPostImg>Img</St.LikesPostImg>
          <St.LikesPostText>text text</St.LikesPostText>
        </St.MyLikes>
        <St.MyLikes>
          <St.LikesPostImg>Img</St.LikesPostImg>
          <St.LikesPostText>text text</St.LikesPostText>
        </St.MyLikes>
        <St.MyLikes>
          <St.LikesPostImg>Img</St.LikesPostImg>
          <St.LikesPostText>text text</St.LikesPostText>
        </St.MyLikes>
        <St.MyLikes>
          <St.LikesPostImg>Img</St.LikesPostImg>
          <St.LikesPostText>text text</St.LikesPostText>
        </St.MyLikes>
      </St.LikesWrapper>
      <St.MyPostsWrapper>
        <St.MyPostTextBox> */}
      {posts?.map((item, idx) => {
        const imageQuery = imageQueries[idx];
        return (
          <St.PostText>
            <>
              <img src={imageQuery.data!} />
              <div>{item.title}</div>
              <St.MyPostImg dangerouslySetInnerHTML={{ __html: removeImageTags(item?.content || '') }} />
            </>
          </St.PostText>
        );
      })}
      {/* </St.MyPostTextBox>
      </St.MyPostsWrapper> */}
    </div>
  );
};

export default LikesPosts;
