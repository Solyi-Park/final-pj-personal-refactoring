import St from './style'
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getPosts } from './test/posts';
import { useNavigate } from 'react-router-dom';

function Main() {
  const queryClient = useQueryClient();
  const navigate = useNavigate()


  const { data } = useQuery({
    queryKey: ['posts'],
    queryFn: getPosts,
  });
  // data에는 아이디 값이 있는데 왜 comments에는 아이디 값이 없지? uuid를 써야하나
  console.log('data ====>', data);


  const onClickViewAllButton = () => {
    navigate('/pageList') //쿼리스트링 ViewAll 어떤지
  };
  const onClickTopRankingAdminPosts = () => {};
  const onClickRecommendation = () => {};
  const onClickSharing = () => {};

  return (
    <St.Container>
      <St.AdminSection>
        <img src="" alt="" />
        <St.PrevNextBottons>
          <button>prev</button>
          <button>next</button>
        </St.PrevNextBottons>
      </St.AdminSection>
      <St.TopRankingPosts>
        <St.Title>
          <h1>User Pick???</h1>
          <button type="button" onClick={onClickViewAllButton}>
            전체보기
          </button>
        </St.Title>
        <St.Nav>
          {/* 전체가 탑랭킹 게시물로 표시된다면 인기 게시물 카테고리가 필요한지 고려 필요 */}
          <button type="button" onClick={onClickTopRankingAdminPosts}>
            관리자 게시물
          </button>
          <button type="button">인기 게시물</button>
          <button type="button" onClick={onClickRecommendation}>
            환경보호 제품 추천
          </button>
          <button type="button" onClick={onClickSharing}>
            제품 나눔
          </button>
        </St.Nav>
        <St.PostsSlide>
          <St.ThumbnailsBox>
            <li>
              <img src="" alt="img1" />
            </li>
            <li>
              <img src="" alt="img2" />
            </li>
            <li>
              <img src="" alt="img3" />
            </li>
            <li>
              <img src="" alt="img4" />
            </li>
          </St.ThumbnailsBox>
          <div>
            <button>prev</button>
            <button>next</button>
          </div>
        </St.PostsSlide>
      </St.TopRankingPosts>
      {/* <section>
        <h1>Top 10</h1>
        <ul>
            <li>user1</li>
            <li>user2</li>
            <li>user3</li>
            <li>user4</li>
            <li>user5</li>
            <li>user6</li>
            <li>user7</li>
            <li>user8</li>
            <li>user9</li>
            <li>user10</li>
        </ul>
      </section> */}
    </St.Container>
  );
}

export default Main;
