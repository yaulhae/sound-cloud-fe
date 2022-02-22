import styled from "styled-components";
import React, { useEffect, useRef } from "react";
import Template from "../common/Template";
import { Grid, Image, Text } from "../elements";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendar,
  faComment,
  faEllipsis,
  faHeart,
  faMusic,
  faPeopleCarry,
  faPlay,
  faPlayCircle,
  faRefresh,
  faUserGroup,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import StreamItem from "../components/StreamItem";
import PlayBar from "../common/PlayBar";
import { useDispatch, useSelector } from "react-redux";
import { getStreamList, getStreamListFB } from "../redux/stream";
import { insPlayingFB } from "../redux/track";

const StreamPageBlock = styled.div`
  padding: 50px 30px 40px 30px;
  .layout_container {
    position: relative;
  }
  .layout_left {
    width: 72%;
    border-right: 1px solid rgba(0, 0, 0, 0.06);
    padding: 2em 1.5em 0 0;
    @media screen and (max-width: 1239px) {
      width: 68%;
    }
    @media screen and (max-width: 1079px) {
      width: 66%;
    }
  }
  .layout_right {
    position: absolute;
    width: 30%;
    top: 0;
    right: 0;
    bottom: 0;
  }
  .layout_fixed {
    position: fixed;
    width: 300px;
    margin-left: 52px;
    color: #999;
    font-size: 0.85rem;
    top: 90px;
    @media screen and (max-width: 1239px) {
      margin-left: 6px;
    }
    @media screen and (max-width: 1079px) {
      margin-left: -18px;
    }
  }
  .history_calendar {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .listening_item {
    display: flex;
    line-height: 1.3em;
    align-items: center;
    margin-bottom: 1.5em;
    .left {
      margin-right: 0em;
    }
    .icon_button {
      &:nth-child(1) {
        margin-right: 1em;
      }
      min-width: 25px;
      min-height: 25px;
      border: 1px solid rgba(0, 0, 0, 0.1);
    }
    .right {
      flex: 1;
      span {
        font-size: 0.75rem;
        margin-right: 0.5em;
      }
    }
  }
  .icon_margin {
    margin-right: 0.2em;
  }
  .follow_container {
    border: 1px solid #e5e5e5;
    color: black;
    padding: 0.1em 0.2em 0 0.6em;
    border-radius: 4px;
    font-size: 0.8rem;
    margin-top: 0.2em;
  }
`;

const StreamPage = () => {
  const now_playing = useSelector(({ track }) => track.now_playing);
  const streamList = useSelector(({ stream }) => stream?.streamList);
  const dispatch = useDispatch();

  // const [streamList, setStreamList] = useState([
  //   {
  //     userName: "야울해",
  //     content: "빈지노는 빈집털이",
  //     musicId: 1,
  //     musicTitle: "아쿠아맨",
  //     artistName: "빈지노",
  //     imageUrl: "https://ifh.cc/g/tIjE7w.jpg",
  //     musicUrl: music1,
  //     playCnt: 23,
  //   },
  //   {
  //     userName: "야울해",
  //     content: "청각의 쾌감",
  //     musicId: 2,
  //     musicTitle: "원플러스원",
  //     artistName: "수란",
  //     imageUrl: "https://ifh.cc/g/e14DnE.jpg",
  //     musicUrl: music2,
  //     playCnt: 23,
  //   },
  //   {
  //     userName: "야울해",
  //     content: "우아우아 우아해~",
  //     musicId: 3,
  //     musicTitle: "발레리",
  //     artistName: "에이미와인하우스",
  //     imageUrl: "https://ifh.cc/g/b7nNRH.jpg",
  //     musicUrl: music3,
  //     playCnt: 14,
  //   },
  //   {
  //     userName: "야울해",
  //     content: "빈지노는 빈집털이",
  //     musicId: 4,
  //     musicTitle: "아쿠아맨",
  //     artistName: "빈지노",
  //     imageUrl: "https://ifh.cc/g/tIjE7w.jpg",
  //     musicUrl: music4,
  //     playCnt: 23,
  //   },
  //   {
  //     userName: "야울해",
  //     content: "빈지노는 빈집털이",
  //     musicId: 4,
  //     musicTitle: "아쿠아맨",
  //     artistName: "빈지노",
  //     imageUrl: "https://ifh.cc/g/tIjE7w.jpg",
  //     musicUrl: music4,
  //     playCnt: 23,
  //   },
  // ]);

  const [artistList, setArtistList] = useState([
    {
      userName: "야울해",
      content: "빈지노는 빈집털이",
      musicId: 1,
      musicTitle: "we Up",
      artistName: "백예린",
      imageUrl: "https://ifh.cc/g/eaN2xY.jpg",
      playCnt: 23,
    },
    {
      userName: "야울해",
      content: "청각의 쾌감",
      musicId: 2,
      musicTitle: "팔레트",
      artistName: "아이유",
      imageUrl: "https://ifh.cc/g/YjDa08.jpg",
      playCnt: 23,
    },
    {
      userName: "야울해",
      content: "청각의 쾌감",
      musicId: 2,
      musicTitle: "나의 사춘기에게",
      artistName: "더 위켄드",
      imageUrl: "https://ifh.cc/g/5uKkIN.jpg",
      playCnt: 23,
    },
  ]);

  const [playedList, setPlayedList] = useState([
    {
      userName: "야울해",
      content: "빈지노는 빈집털이",
      musicId: 1,
      musicTitle: "we Up",
      artistName: "창모",
      imageUrl: "https://ifh.cc/g/LGJU5L.jpg",
      playCnt: 23,
    },
    {
      userName: "야울해",
      content: "청각의 쾌감",
      musicId: 2,
      musicTitle: "팔레트",
      artistName: "아이유",
      imageUrl: "https://ifh.cc/g/eqxZz2.jpg",
      playCnt: 23,
    },
    {
      userName: "야울해",
      content: "청각의 쾌감",
      musicId: 2,
      musicTitle: "나의 사춘기에게",
      artistName: "볼빨간사춘기",
      imageUrl: "https://ifh.cc/g/AkV2eQ.jpg",
      playCnt: 23,
    },
  ]);

  useEffect(() => {
    dispatch(getStreamListFB());
  }, []);

  return (
    <Template>
      <StreamPageBlock>
        <div className="layout_container">
          <div className="layout_left">
            <Text size="1.125rem" color="#999" margin="0 0 1em 0">
              Hear the latest posts from the people you’re following:
            </Text>
            <Grid>
              <div className="stream_list">
                {streamList?.map((stream, idx) => {
                  return <StreamItem stream={stream} key={idx} />;
                })}
              </div>
            </Grid>
          </div>
          <div className="layout_right">
            <div className="layout_fixed">
              <div className="right_container" style={{ marginBottom: "em" }}>
                <Grid
                  is_flex="flex"
                  padding="0 0 0.3em 0"
                  margin="0 0 0.7em 0"
                  border_bottom="1px solid rgba(0,0,0,0.1)"
                >
                  <div className="history_calendar">
                    <FontAwesomeIcon
                      icon={faPeopleCarry}
                      style={{ marginRight: "0.5em" }}
                    />
                    <Text>Artists you should follow</Text>
                  </div>
                  <Text>Refresh list</Text>
                </Grid>
                <Grid>
                  <div
                    className="listening_list"
                    style={{ marginBottom: "1.8em" }}
                  >
                    {artistList.map((stream, idx) => {
                      return (
                        <div
                          className="listening_item"
                          key={idx}
                          style={{ marginBottom: "1.5em" }}
                        >
                          <div className="left">
                            <Image size="50px" src={stream.imageUrl} />
                          </div>
                          <div className="right" style={{ marginTop: "0.6em" }}>
                            <Text
                              size="0.9rem"
                              margin="0 0 0.7em 0"
                              color="black"
                              line_height="0.1"
                            >
                              {stream.artistName}
                            </Text>
                            <Grid is_flex="flex">
                              <div>
                                <FontAwesomeIcon
                                  icon={faUserGroup}
                                  className="icon_margin"
                                />
                                <span style={{ fontSize: "11px" }}>57.5K</span>
                                <FontAwesomeIcon
                                  icon={faMusic}
                                  className="icon_margin"
                                />{" "}
                                <span style={{ fontSize: "11px" }}>7</span>
                              </div>
                              <div className="follow_container">
                                <FontAwesomeIcon
                                  icon={faUserPlus}
                                  style={{ marginRight: "0.4em" }}
                                />
                                <span>Follow</span>
                              </div>
                            </Grid>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </Grid>
              </div>
              <div className="right_container">
                <Grid
                  is_flex="flex"
                  padding="0 0 0.3em 0"
                  margin="0 0 1em 0"
                  border_bottom="1px solid rgba(0,0,0,0.1)"
                >
                  <div className="history_calendar">
                    <FontAwesomeIcon
                      icon={faCalendar}
                      style={{ marginRight: "0.5em" }}
                    />
                    <Text>Listening history</Text>
                  </div>
                  <Text>View all</Text>
                </Grid>
                <Grid>
                  <div className="listening_list">
                    {playedList.map((stream, idx) => {
                      return (
                        <div className="listening_item" key={idx}>
                          <div
                            className="left"
                            style={{ marginRight: "0.8em" }}
                          >
                            <Image
                              shape="rectangle"
                              size="50px"
                              src={stream.imageUrl}
                            />
                          </div>
                          <div className="right">
                            <Text size="0.75rem">{stream.artistName}</Text>
                            <Grid>
                              <Text color="black">{stream.musicTitle}</Text>
                            </Grid>
                            <Grid>
                              <FontAwesomeIcon
                                icon={faPlay}
                                className="icon_margin"
                              />
                              <span>57.5K</span>

                              <FontAwesomeIcon
                                icon={faHeart}
                                className="icon_margin"
                              />
                              <span>4863</span>

                              <FontAwesomeIcon
                                icon={faRefresh}
                                className="icon_margin"
                              />
                              <span>155</span>

                              <FontAwesomeIcon
                                icon={faComment}
                                className="icon_margin"
                              />
                              <span>300</span>
                            </Grid>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </Grid>
              </div>
            </div>
          </div>
        </div>
      </StreamPageBlock>
    </Template>
  );
};

export default StreamPage;
