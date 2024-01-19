import styled from 'styled-components';

const Container = styled.section`
  /* background-color: burlywood; */
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 40px;
  margin: 40px 0 150px 0; // 333 -> 150
  & h1 {
    color: #000;
    font-size: 28px;
    font-weight: 700;
  }
  & h3 {
    color: #ffa114;
    font-size: 17px;
    font-weight: 600;
  }
`;

const Title = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: flex-start;
  gap: 10px;
`;

const UserList = styled.div`
  /* background-color: #4e9903; */
  width: 85%; // 100%
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: auto auto;
  gap: 10px; // 40px
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  width: 100%;
  height: 200px;
  /* background-color: palegreen; */
`;

const ProfileImage = styled.div`
  width: 100px; //200px
  height: 100px; //200px
  border-radius: 50%;
  overflow: hidden;
  & img {
    width: 100%;
    height: 100%;
  }
`;

const UserName = styled.div`
  /* background-color: red; */
  display: flex;
  width: 100%;
  height: 32px;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  font-size: 14px;
  & img {
    width: 30px;
    height: 30px;
  }
`;

export default {
  Container,
  Title,
  UserList,
  UserInfo,
  ProfileImage,
  UserName
};
