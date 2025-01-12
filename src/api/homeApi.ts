//게시물 추가
import {
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  updateDoc,
  where
} from '@firebase/firestore';
import { QUERY_KEYS } from 'query/keys';
import { db } from 'shared/firebase';
import { PostType } from 'types/PostType';

// 전체 게시물 가져오기
const getPosts = async () => {
  const q = query(collection(db, QUERY_KEYS.POSTS), orderBy('createdAt', 'desc'));
  const querySnapshot = await getDocs(q);

  const posts: PostType[] = [];
  querySnapshot.forEach((doc) => {
    const postData = doc.data() as Omit<PostType, 'id'>;
    posts.push({ id: doc.id, ...postData });
  });
  return posts;
};

// 관리자게시물
const getAdminPosts = async () => {
  const q = query(
    collection(db, QUERY_KEYS.POSTS),
    where('role', '==', 'admin'),
    orderBy('createdAt', 'desc'),
    limit(4)
  );
  const querySnapshot = await getDocs(q);
  console.log(querySnapshot);
  const posts: PostType[] = [];
  querySnapshot.forEach((doc) => {
    const postData = doc.data() as Omit<PostType, 'id'>;
    posts.push({ id: doc.id, ...postData });
  });
  return posts;
};

// 인기게시물
const getPopularPosts = async () => {
  const q = query(
    collection(db, QUERY_KEYS.POSTS),
    where('role', '==', 'user'),
    orderBy('likeCount', 'desc'),
    orderBy('viewCount', 'desc'),
    limit(8)
  );
  const querySnapshot = await getDocs(q);
  const posts: PostType[] = [];
  querySnapshot.forEach((doc) => {
    const postData = doc.data() as Omit<PostType, 'id'>;
    posts.push({ id: doc.id, ...postData });
  });

  return posts;
};

export type UpdateLikedUsersType = {
  id: string;
  currentUserId: string;
};

// 좋아요 상태 변경
const updateLikedUsers = async ({ id, currentUserId }: UpdateLikedUsersType) => {
  if (id && currentUserId) {
    const postRef = doc(db, QUERY_KEYS.POSTS, id);
    const postSnap = await getDoc(postRef);

    if (postSnap.exists()) {
      const postData = postSnap.data();
      let likedUsers: string[] = postData?.likedUsers || [];

      if (currentUserId && likedUsers.includes(currentUserId)) {
        likedUsers = likedUsers.filter((uid) => uid !== currentUserId);
        await updateDoc(postRef, {
          likedUsers: arrayRemove(currentUserId)
        });
      } else {
        likedUsers = [...likedUsers, currentUserId];
        await updateDoc(postRef, {
          likedUsers: arrayUnion(currentUserId)
        });
      }

      await updateDoc(postRef, {
        likeCount: likedUsers.length
      });
    } else {
      console.log('Error: post.id가 없습니다.');
    }
  }
};

export type UsersWithLikeCount = Pick<PostType, 'uid' | 'likeCount' | 'viewCount'>;
export type likeCountPerUserType = {
  uid: string;
  totalLikes: number;
};

// TOP10 user list
const getTopUsers = async () => {
  const postRef = query(collection(db, 'posts'), where('role', '==', 'user'));
  const querySnapshot = await getDocs(postRef);

  const posts: UsersWithLikeCount[] = [];
  querySnapshot.forEach((doc) => {
    const docData = doc.data() as PostType;
    const post = {
      uid: docData.uid,
      likeCount: docData.likeCount,
      viewCount: docData.viewCount
    };
    posts.push(post);
  });

  // 좋아요 합계 계산
  const countPerUser = posts.reduce<Record<string, { totalLikes: number; totalViews: number }>>((acc, post) => {
    if (!acc[post.uid!]) {
      acc[post.uid!] = { totalLikes: 0, totalViews: 0 };
    }
    acc[post.uid!].totalLikes += post.likeCount!;
    acc[post.uid!].totalViews += post.viewCount!;
    return acc;
  }, {});

  // 객체를 배열로 변환
  const usersWithCounts = Object.entries(countPerUser).map(([uid, counts]) => ({
    uid,
    totalLikes: counts.totalLikes,
    totalViews: counts.totalViews
  }));

  //좋아요가 0인 유저 필터링
  const filteredUsers = usersWithCounts.filter((user) => user.totalLikes > 0);

  const topUsers: likeCountPerUserType[] = filteredUsers
    .sort((a, b) => {
      const sortedByLikes = b.totalLikes - a.totalLikes;
      if (sortedByLikes === 0) {
        return b.totalViews - a.totalViews;
      }
      return sortedByLikes;
    })
    .slice(0, 10);
  return topUsers;
};

export { getAdminPosts, getPopularPosts, getPosts, getTopUsers, updateLikedUsers };
