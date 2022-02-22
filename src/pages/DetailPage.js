import styled from "styled-components";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TemplateRyu from "../common/TemplateRyu";
import { WaveForm } from "../elements/index";

import {
  faHeart,
  faRepeat,
  faShareFromSquare,
  faPaperclip,
  faEllipsis,
  faPlay,
  faMessage,
} from "@fortawesome/free-solid-svg-icons";

import { actionsCreators as musicActions } from "../redux/music";

const DetailPage = () => {
  const dispatch = useDispatch();
  const music = useSelector(({ music }) => music?.music?.music);
  const commentList = useSelector(
    ({ music }) => music?.music.music.commentList
  );

  React.useEffect(() => {
    dispatch(musicActions.getOneMusicAPI());
    //dispatch를 쓴다는 건? 액션을 발동시킨다. 액션을 발동시켰으면, 리듀서로 가죠! 우리가 thunk를 쓴다는 건 이 과정에서 변화가 생기죠!
    // 페이지에서 dispatch 액션객체 발생이 아닌 액션객체FB발생 => 서버에 한 번 들리고올게 그때 DB에 있는 내용 정보들도 가져올게! 이제서야 액션객체 한 번 써줄게! 왜냐고? 내가 서버에서 정보가져왔으니까, 리듀서에 넣어줄게! 리듀서에 넣는냐고? 모니터 화면에 즉각적인 변화, 눈에 보이는 변화를 줄게. 왜 줄 수 있냐고? 위에서 selector를 쓰잖아.
  }, []);

  return (
    <TemplateRyu>
      <DetailPageBlock>
        <PlayerWrapper>
          <LeftWrapper>
            <PlayButtonWrapper>
              <PlayButton></PlayButton>
              <TitleArtistWrapper>
                <Title>{music?.musicTitle}</Title>
                <Artist>{music?.artistName}</Artist>
              </TitleArtistWrapper>
              <Created>{music?.createdAt}</Created>
            </PlayButtonWrapper>
            <WaveForm url={music?.musicUrl} />
          </LeftWrapper>
          <MusicCover>MusicImg</MusicCover>
        </PlayerWrapper>
        <InfoWrapper>
          <InputWrapper>
            <InputContainer>
              <UserImage />
              <CommentInput placeholder="Write a comment" />
            </InputContainer>
            <ButtonWrapper>
              <BorderButton>
                <FontAwesomeIcon icon={faHeart} />
              </BorderButton>
              <BorderButton>
                <FontAwesomeIcon icon={faRepeat} />
              </BorderButton>
              <BorderButton>
                <FontAwesomeIcon icon={faShareFromSquare} />
              </BorderButton>
              <BorderButton>
                <FontAwesomeIcon icon={faPaperclip} />
              </BorderButton>
              <BorderButton>
                <FontAwesomeIcon icon={faEllipsis} />
              </BorderButton>
              <TextWrapper>
                <FontAwesomeIcon icon={faPlay} />
                <PlayCount>0</PlayCount>
              </TextWrapper>
            </ButtonWrapper>
          </InputWrapper>
          <Column>
            <ArtistWrapper>
              <ArtistImage></ArtistImage>
              <div>{music?.artistName}</div>
            </ArtistWrapper>
            <CommentWrapper>
              <CommentCountContainer>
                <FontAwesomeIcon icon={faMessage} />
                <CommentCount>{commentList?.length} comments</CommentCount>
              </CommentCountContainer>
              <CommentList>
                <CommentContainer>
                  <UserImage shape="cir"></UserImage>
                  <ContentWrapper>
                    <UserName>
                      User Name{" "}
                      <span
                        style={{
                          color: "#ccc",
                          fontSize: "0.9em",
                        }}
                      >
                        at
                      </span>{" "}
                      0:34
                    </UserName>
                    <Comment>CommentComent...</Comment>
                  </ContentWrapper>
                  <CommentCreated>1 year ago</CommentCreated>
                </CommentContainer>
              </CommentList>
            </CommentWrapper>
          </Column>
        </InfoWrapper>
      </DetailPageBlock>
    </TemplateRyu>
  );
};

const DetailPageBlock = styled.div`
  /* font-size: 0.9em; */
`;

const PlayerWrapper = styled.div`
  display: flex;
  height: 380px;
  background-color: green;
`;

const LeftWrapper = styled.div`
  position: relative;
  width: 100%;
  margin: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const PlayButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100px;
`;

const PlayButton = styled.div`
  width: 60px;
  height: 60px;
  background-color: #f30;
  border-radius: 50%;
`;

const TitleArtistWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 6px;
  height: 60px;
  color: white;
`;

const Title = styled.div`
  background-color: black;
  font-size: 1.5em;
  height: 30px;
  line-height: 1.4;
  width: fit-content;
  padding: 0px 8px;
`;

const Artist = styled.div`
  background-color: black;
  color: #ccc;
  width: fit-content;
  line-height: 1.8;
  height: 25px;
  padding: 0px 8px;
`;

const Created = styled.div`
  position: absolute;
  right: 0;
  top: 18px;
  color: white;
`;

const MusicCover = styled.div`
  min-width: 340px;
  height: 340px;
  margin: 20px 20px 20px 0px;
  background-color: lightblue;
`;

const InfoWrapper = styled.div`
  margin-top: 20px;
  font-size: 0.9em;
`;

const InputWrapper = styled.div`
  height: 90px;
  border-bottom: 1px solid #e5e5e5;
`;
const InputContainer = styled.div`
  display: flex;
  align-items: center;
  height: 40px;
  background: #f2f2f2;
  border: 1px solid #e5e5e5;
`;
const CommentInput = styled.input`
  width: 100%;
  margin: 4px 6px;
  padding: 2px 0px 0px 6px;
  border-radius: 4px;
  border: 1px solid #e5e5e5;
`;

const UserImage = styled.div`
  width: 40px;
  height: 40px;
  background-image: url("https://ifh.cc/g/8lDrUd.jpg");
  background-size: cover;
  border-radius: ${(props) => (props.shape === "cir" ? "50%" : null)};
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 14px;
`;

const BorderButton = styled.button`
  margin-right: 6px;
  padding: 2px 9px;
  border: 1px solid #e5e5e5;
  border-radius: 3px;
  background-color: #fff;
  cursor: pointer;
  color: #333;
  font-size: 14px;
  line-height: 20px;
  white-space: nowrap;
`;

const TextWrapper = styled.div`
  font-weight: 400;
  font-size: 14px;
  color: #999;
  margin-left: auto;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const PlayCount = styled.span`
  margin-left: 6px;
  height: 20px;
`;

const Column = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 20px;
`;

const ArtistWrapper = styled.div`
  min-height: 100vh;
  width: 18.5%;
`;

const ArtistImage = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background-image: url("https://ifh.cc/g/8lDrUd.jpg");
  background-size: cover;
  margin-bottom: 6px;
`;

const CommentWrapper = styled.div`
  width: 81.5%;
  min-height: 100vh;
`;

const CommentCountContainer = styled.div`
  color: #999;
  border-bottom: 1px solid #e5e5e5;
  padding-bottom: 6px;
`;

const CommentCount = styled.span`
  margin: 0 0 6px 6px;
`;

const CommentList = styled.div`
  margin-top: 6px;
`;

const CommentContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  /* width: 100%;
    height: 100px; */
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0 10px;
`;

const UserName = styled.div`
  color: #999;
  margin-bottom: -6px;
`;

const Comment = styled.div`
  font-size: 0.9em;
`;

const CommentCreated = styled.div`
  position: absolute;
  right: 0;
  top: 10px;
  color: #999;
`;

export default DetailPage;
