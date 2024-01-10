import { useQueries, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { downloadImageURL, getAdminHomeContents, getTopRankingPosts } from '../../api/homeApi';
import St from './style';
import { GoHeart } from 'react-icons/go';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './swiperStyle.css';
import usePostsQuery from '../../query/usePostsQuery';
import { QUERY_KEYS } from '../../query/keys';
import { auth } from '../../shared/firebase';

function Main() {
  const currentUser = auth.currentUser?.uid;

  const queryClient = useQueryClient();
  const navigate = useNavigate();

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
  const createdByMango = postQueries[0].data || [];
  const topRanking = postQueries[1].data || [];

  // 이미지URL 불러오기
  const imageQueries = useQueries({
    queries:
      topRanking?.map((post) => ({
        queryKey: ['imageURL', post.id],
        queryFn: () => downloadImageURL(post.id as string)
      })) || []
  });

  const { updateMutate } = usePostsQuery();

  const isLoadingAdminContents = postQueries[0].isLoading;
  const isLoadingTopRanking = postQueries[1].isLoading;

  // 망고 발행물 로딩
  if (isLoadingAdminContents) {
    return <div>Loading...</div>;
  }

  if (!createdByMango || createdByMango.length === 0) {
    return <div>No data found</div>;
  }

  // // 탑랭킹 로딩
  if (isLoadingTopRanking) {
    return <div>Loading...</div>;
  }

  if (!topRanking || topRanking.length === 0) {
    return <div>No data found</div>;
  }

  //

  // 각각 게시물 클릭시 detail로 이동
  const onClickMovToDetail = (id: string) => {
    navigate(`/detail/${id}`);
  };

  const onClickViewAllButton = () => {
    navigate('/viewAll');
  };

  //id 타입에 undefined들어가야하는 이유?
  const onClickLikeButton = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: string | undefined) => {
    e.stopPropagation();
    if (id) {
      // 'id'만 있는 PostType 객체생성
      const postToUpdate: PostType = { id };
      updateMutate(postToUpdate, {
        // 왜 invalidateQueries가 안되는 걸까 -- 해결
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: [QUERY_KEYS.USERPOSTS],
            exact: true
          });
        }
      });
    }
  };
  return (
    <St.Container>
      <St.AdminContentsSection>
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false
          }}
          pagination={{
            clickable: true
          }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          className="swiper"
        >
          {createdByMango?.map((item, idx) => {
            return (
              <SwiperSlide key={idx} onClick={() => onClickMovToDetail(item.id!)}>
                <img src={''} alt={`Slide ${idx}`} />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </St.AdminContentsSection>
      <St.TopRankingPosts>
        <St.Title>
          <h1>인기 게시물</h1>
          <button type="button" onClick={onClickViewAllButton}>
            전체보기
          </button>
        </St.Title>
        <St.PostsSlide>
          <St.ThumbnailsBox>
            <Swiper
              spaceBetween={10}
              slidesPerView={4}
              pagination={{
                clickable: true
              }}
              navigation={true}
              modules={[Pagination, Navigation]}
              breakpoints={{
                0: {
                  slidesPerView: 1
                },
                600: {
                  slidesPerView: 2,
                  spaceBetween: 20
                },
                800: {
                  slidesPerView: 3,
                  spaceBetween: 10
                },
                1080: {
                  slidesPerView: 4,
                  spaceBetween: 10
                }
              }}
              className="slides"
            >
              {topRanking!.map((item, idx) => {
                const imageQuery = imageQueries[idx];
                return (
                  <SwiperSlide key={idx} onClick={() => onClickMovToDetail(item.id!)}>
                    {imageQuery.isLoading ? (
                      <p>Loading image...</p>
                    ) : (
                      imageQuery.data && (
                        <>
                          <St.LikeButton type="button" onClick={(e) => onClickLikeButton(e, item.id)}>
                            {/* item.LikedUsers 배열 안에 currentUserId가 있을 경우 HeartFillIcon                            */}
                            {item.likedUsers?.includes(currentUser!) ? (
                              <>
                                {' '}
                                <St.HeartFillIcon />
                                <p>{item.likedUsers?.length}</p>
                              </>
                            ) : (
                              <>
                                <p>{item.likedUsers?.length}</p>
                                <St.HeartIcon />
                              </>
                            )}
                          </St.LikeButton>
                          <img src={imageQuery.data} alt={item.title} />
                        </>
                      )
                    )}
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </St.ThumbnailsBox>
        </St.PostsSlide>
      </St.TopRankingPosts>
    </St.Container>
  );
}

export default Main;
