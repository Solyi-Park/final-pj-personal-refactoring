import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { getUser } from '../api/authApi';
import { QUERY_KEYS } from '../query/keys';
import { roleState } from '../recoil/users';
import { auth } from '../shared/firebase';
import { UserType } from '../types/UserType';

function useRoleCheck() {
  const [role, setRole] = useRecoilState(roleState);

  // role이 비어있는 경우 다시 넣기
  const { data: user, refetch } = useQuery<UserType | undefined>({
    queryKey: [QUERY_KEYS.USERS, auth.currentUser?.uid],
    queryFn: () => (auth.currentUser ? getUser(auth.currentUser?.uid) : undefined),
    enabled: role === ''
  });

  useEffect(() => {
    if (role === '') {
      refetch();
    }
    if (user) {
      setRole(user.role);
    }
  }, [role, refetch, setRole, user]);

  // role 돌려주기
  return role;
}

export default useRoleCheck;