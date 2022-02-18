import styled from "styled-components";
import React from "react";
import Template from "../common/Template";
import { Grid, Image, Text } from "../elements";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlayCircle } from "@fortawesome/free-solid-svg-icons";

const DetailPageBlock = styled.div`
  padding: 50px 30px 40px 30px;
  .layout_container {
    position: relative;
  }
  .layout_left {
    width: 70%;
    border-right: 1px solid black;
    padding: 1.5em 1.5em 0 0;
  }
  .layout_right {
    width: 30%;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
  }
  .stream_item {
    margin-bottom: 2em;
  }
  .top_user {
    display: flex;
    align-items: center;
  }
  .middle_music {
    display: flex;
  }
  .middle_user {
    display: flex;
    align-items: center;
  }
  .middle_music_artist {
    flex: 1;
  }
  .top {
    margin-bottom: 1em;
  }
  .middle_music_coverImg {
    margin-right: 1em;
  }
  .play_icon {
    color: #f50;
    font-size: 2rem;
    margin-right: 0.2em;
  }
  .artist_name {
    font-size: 0.7rem;
  }
  .artist_title {
    font-size: 0.9rem;
  }
`;

const DetailPage = () => {
  const [streamList, setStreamList] = useState([
    {
      userName: "야울해",
      content: "빈지노는 빈집털이",
      musicId: 1,
      musicTitle: "아쿠아맨",
      artistName: "빈지노",
      imageUrl: "https://ifh.cc/g/tIjE7w.jpg",
      playCnt: 23,
    },
    {
      userName: "야울해",
      content: "청각의 쾌감",
      musicId: 2,
      musicTitle: "원플러스원",
      artistName: "수란",
      imageUrl: "https://ifh.cc/g/e14DnE.jpg",
      playCnt: 23,
    },
    {
      userName: "야울해",
      content: "우아우아 우아해~",
      musicId: 3,
      musicTitle: "발레리",
      artistName: "에이미와인하우스",
      imageUrl: "https://ifh.cc/g/b7nNRH.jpg",
      playCnt: 14,
    },
    {
      userName: "야울해",
      content: "빈지노는 빈집털이",
      musicId: 1,
      musicTitle: "아쿠아맨",
      artistName: "빈지노",
      imageUrl: "https://ifh.cc/g/tIjE7w.jpg",
      playCnt: 23,
    },
    {
      userName: "야울해",
      content: "청각의 쾌감",
      musicId: 2,
      musicTitle: "원플러스원",
      artistName: "수란",
      imageUrl: "https://ifh.cc/g/e14DnE.jpg",
      playCnt: 23,
    },
    {
      userName: "야울해",
      content: "우아우아 우아해~",
      musicId: 3,
      musicTitle: "발레리",
      artistName: "에이미와인하우스",
      imageUrl: "https://ifh.cc/g/b7nNRH.jpg",
      playCnt: 14,
    },
    {
      userName: "야울해",
      content: "빈지노는 빈집털이",
      musicId: 1,
      musicTitle: "아쿠아맨",
      artistName: "빈지노",
      imageUrl: "https://ifh.cc/g/tIjE7w.jpg",
      playCnt: 23,
    },
    {
      userName: "야울해",
      content: "청각의 쾌감",
      musicId: 2,
      musicTitle: "원플러스원",
      artistName: "수란",
      imageUrl: "https://ifh.cc/g/e14DnE.jpg",
      playCnt: 23,
    },
    {
      userName: "야울해",
      content: "우아우아 우아해~",
      musicId: 3,
      musicTitle: "발레리",
      artistName: "에이미와인하우스",
      imageUrl: "https://ifh.cc/g/b7nNRH.jpg",
      playCnt: 14,
    },
  ]);
  return (
    <Template>
      <DetailPageBlock>
        <div className="layout_container">
          <div className="layout_left">
            <Text size="1.125rem" color="#999" margin="0 0 1em 0">
              Hear the latest posts from the people you’re following:
            </Text>
            <Grid>
              <div className="stream_list">
                {streamList.map((stream, idx) => {
                  return (
                    <div className="stream_item">
                      <div className="top">
                        <div className="top_user">
                          <Image />
                          <div>
                            <Text size="0.7rem">{stream.userName}</Text>
                            <Text>{stream.content}</Text>
                          </div>
                        </div>
                      </div>

                      <div className="middle">
                        <div className="middle_music">
                          <div className="middle_music_coverImg">
                            <Image
                              shape="rectangle"
                              size="15%"
                              src={stream.imageUrl}
                            />
                          </div>
                          <div className="middle_music_artist">
                            <div className="middle_user">
                              <div className="play_icon">
                                <FontAwesomeIcon icon={faPlayCircle} />
                              </div>
                              <div>
                                <p className="artist_name">
                                  {stream.artistName}
                                </p>
                                <p className="artist_title">
                                  {stream.musicTitle}
                                </p>
                              </div>
                            </div>
                            <div>
                              <img
                                alt="음파음파"
                                src="https://ifh.cc/g/vHkMNs.png"
                                style={{
                                  width: "100%",
                                  height: "112px",
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Grid>
          </div>
          <div className="layout_right">안녕</div>
        </div>
      </DetailPageBlock>
    </Template>
  );
};

export default DetailPage;
