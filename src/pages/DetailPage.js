import styled from "styled-components";
import React, { useRef } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import { usePalette } from "react-palette";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { WaveForm } from "../elements/index";

import formatTime from "../common/formatTime";
import TemplateRyu from "../common/TemplateRyu";

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

import { getPlayTime } from "../redux/track";

const DetailPage = () => {
  const { musicId } = useParams();

  const dispatch = useDispatch();

  const timerRef = useRef(null);

  const audio_player = useSelector(({ track }) => track.audio_player);
  const music = useSelector(({ music }) => music?.music?.music);
  const commentList = useSelector(({ music }) => music?.music?.commentList);
  const commentTime = useSelector(({ music }) => music?.music?.commentTime);

  const { data } = usePalette(music?.imageUrl);

  const darkMuted = data.darkMuted;
  const vibrant = data.vibrant;

  const commentInput = React.useRef();

  const enterKey = () => {
    if (window.event.keyCode === 13) {
      const commentContent = commentInput.current.value;
      if (!commentContent) return;
      const ctTime = commentTime ? parseInt(commentTime) : 0;

      const commentObj = {
        userId: "6",
        commentContent,
        commentTime: ctTime,
      };

      dispatch(musicActions.createCommentAPI(commentObj, musicId));
      commentInput.current.value = "";
      return;
    }
  };

  React.useEffect(() => {
    dispatch(musicActions.getOneMusicAPI(musicId));
    console.log(musicId);
    if (audio_player) {
      timerRef.current = setInterval(() => {
        dispatch(getPlayTime(Math.floor(audio_player?.getCurrentTime())));
      }, 1000);
    }
    return () => {
      clearInterval(timerRef.current);
    };
  }, [music]);

  // React.useEffect(() => {
  //     if (music) return;
  //     console.log('재렌더링');
  //     dispatch(musicActions.getOneMusicAPI(1));
  // }, []);
  // 뭐야 얘 없어도 되잖아..

  // console.log(music);
  // console.log(commentList);
  // store의 값을 확인하고 싶으면 useEffect 밖에서.....

  // 새로고침 드디어 해결!!!!!!!!!!!!!!!
  if (!music) {
    dispatch(musicActions.getOneMusicAPI(musicId));
    return <></>;
  } else
    return (
      <TemplateRyu>
        <DetailPageBlock>
          <PlayerWrapper
            style={{
              background: `linear-gradient(100deg, ${darkMuted}, ${vibrant})`,
            }}
          >
            <LeftWrapper>
              <PlayButtonWrapper>
                <PlayButton></PlayButton>
                <TitleArtistWrapper>
                  <Title>{music?.musicTitle}</Title>
                  <Artist>{music?.artistName}</Artist>
                </TitleArtistWrapper>
                <Created>
                  {moment(
                    music?.createdAt.split(" ")[0].replaceAll("-", ""),
                    "YYYYMMDD"
                  ).fromNow()}
                </Created>
              </PlayButtonWrapper>
              <WaveForm musicId={musicId} />
            </LeftWrapper>
            <MusicCover
              style={{
                backgroundImage: `url(${music?.imageUrl})
`,
              }}
            />
          </PlayerWrapper>
          <InfoWrapper>
            <InputWrapper>
              <InputContainer>
                <UserImage />
                <CommentInput
                  placeholder="Write a comment"
                  onKeyUp={enterKey}
                  ref={commentInput}
                />
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
                  {commentList?.map((comment, idx) => {
                    const fromNow = moment(
                      comment?.createdAt.split(" ")[0].replaceAll("-", ""),
                      "YYYYMMDD"
                    ).fromNow();
                    return (
                      <CommentContainer key={idx}>
                        <UserImage
                          shape="cir"
                          src={comment.UserImage}
                          key={idx}
                        />
                        <ContentWrapper>
                          <UserName>
                            {comment.commentUser}
                            <span
                              style={{
                                color: "#ccc",
                                fontSize: "0.9em",
                              }}
                            >
                              {" "}
                              at{" "}
                            </span>
                            {formatTime(comment.commentTime)}
                          </UserName>
                          <Comment>{comment.commentContent}</Comment>
                        </ContentWrapper>
                        <CommentCreated>
                          {fromNow.includes("hours") ? "Today" : fromNow}
                        </CommentCreated>
                      </CommentContainer>
                    );
                  })}
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

  background-image: ${(props) =>
    props.src ? `url(${props.src})` : "url('https://ifh.cc/g/8lDrUd.jpg')"};

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
  margin: 10px 0 20px 0;
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
  font-size: 0.85em;
`;

const CommentCreated = styled.div`
  position: absolute;
  right: 0;
  top: 10px;
  color: #999;
`;

export default DetailPage;
