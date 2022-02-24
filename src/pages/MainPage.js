import styled from "styled-components";
import React, { Component, useEffect, useRef } from "react";
import Template from "../common/Template";
import { Grid, Image, Text } from "../elements";
import { useState } from "react";
import "../index.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import Slider from "react-slick";
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
import { Howl } from "howler";
import { makeStyles } from "@material-ui/core/styles";

// import music from "./y2mate.com-IFeelItComing.mp3";
import { colors } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { actionsCreators as playlistActions } from "../redux/playlist";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getPlayTime } from "../redux/track";

const MainPageBlock = styled.div`
  .layout_container {
    position: relative;
    margin-top: 10px;
  }
  .layout_left {
    width: 70%;
    border-right: 1px solid #eeeeee;
    padding: 1.5em 1.5em 0 0;
  }

  .layout_bottom {
    border-bottom: 1px solid #eeeeee;
    margin: 40px 80px 40px 0;
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
    font-size: 1rem;
  }
  .artist_title {
    font-size: 0.9rem;
  }
  .Album_down {
    display: flex;
    flex-direction: column;
  }
  .flex_box {
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;

    margin-right: 20px;
  }
  .flex-container {
    display: flex;
  }
  .font {
    font-size: 15px;
    color: gray;
  }
  .Inimage {
    text-align: center;
    position: absolute;
    top: 27%;
    transform: translate(120%);
    color: #f50;
    opacity: 0;
  }
  .Inimage {
    :hover {
      opacity: 1;
    }
  }
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
  .google {
    background-image: url("https://www.iconspng.com/images/google-play-badge.jpg");
  }
  .slick-dots li.slick-active button:before {
    opacity: 0;
  }
  .slick-dots li button:before {
    opacity: 0;
  }
  .slick-prev:before,
  .slick-next:before {
    color: #e2e2e2;
    position: absolute;
    bottom: 35px;
    z-index: 1000;
    right: -9px;
    font-size: 36px;
  }
  .slick-prev,
  .slick-next {
    z-index: 1;
    font-size: 40px;
  }
`;

const MainPage = (props) => {
  const dispatch = useDispatch();
  const Charts = useSelector(({ playlist }) => playlist.top5List);
  const timerRef = useRef(null);
  const audio_player = useSelector(({ track }) => track.audio_player);

  React.useEffect(() => {
    timerRef.current = setInterval(() => {
      dispatch(getPlayTime(Math.floor(audio_player?.getCurrentTime())));
    }, 1000);
    return () => {
      clearInterval(timerRef.current);
    };
  }, []);

  // const [Charts, setCharts] = useState([
  //   {
  //     imageUrl:
  //       "https://image.bugsm.co.kr/album/images/original/5766/576613.jpg?version=undefined",
  //     name: "Jazz & Blues",
  //     rank: "Top 50",
  //   },
  //   {
  //     imageUrl:
  //       "https://image.bugsm.co.kr/album/images/original/5451/545138.jpg?version=undefined",
  //     name: "YERINB",
  //     rank: "top 50",
  //   },
  //   {
  //     imageUrl:
  //       "https://image.bugsm.co.kr/album/images/original/203568/20356818.jpg?version=undefined",
  //     name: "Hip-hop & Rap",
  //     rank: "Top 50",
  //   },
  //   {
  //     imageUrl:
  //       "https://image.bugsm.co.kr/album/images/original/8598/859812.jpg?version=undefined",
  //     name: "Hip-hop & Rap",
  //     rank: "Top 50",
  //   },
  //   {
  //     imageUrl:
  //       "https://image.bugsm.co.kr/album/images/original/8598/859812.jpg?version=undefined",
  //     name: "Hip-hop & Rap",
  //     rank: "Top 50",
  //   },
  //   {
  //     imageUrl:
  //       "https://scontent-ssn1-1.xx.fbcdn.net/v/t31.18172-8/11133935_1609356205963402_6754719463200097210_o.jpg?_nc_cat=103&ccb=1-5&_nc_sid=e3f864&_nc_ohc=9k86Hr8bbS0AX9ZA1WJ&_nc_ht=scontent-ssn1-1.xx&oh=00_AT-Nbx4-mfZWpv5UJ-TS47KQP90rIt6lEP5MMOnRIeDVOA&oe=623BAB80",
  //     name: "Hip-hop & Rap",
  //     rank: "Top 50",
  //   },
  //   {
  //     imageUrl:
  //       "https://scontent-ssn1-1.xx.fbcdn.net/v/t31.18172-8/11133935_1609356205963402_6754719463200097210_o.jpg?_nc_cat=103&ccb=1-5&_nc_sid=e3f864&_nc_ohc=9k86Hr8bbS0AX9ZA1WJ&_nc_ht=scontent-ssn1-1.xx&oh=00_AT-Nbx4-mfZWpv5UJ-TS47KQP90rIt6lEP5MMOnRIeDVOA&oe=623BAB80",
  //     name: "Hip-hop & Rap",
  //     rank: "Top 50",
  //   },
  //   {
  //     imageUrl:
  //       "https://scontent-ssn1-1.xx.fbcdn.net/v/t31.18172-8/11133935_1609356205963402_6754719463200097210_o.jpg?_nc_cat=103&ccb=1-5&_nc_sid=e3f864&_nc_ohc=9k86Hr8bbS0AX9ZA1WJ&_nc_ht=scontent-ssn1-1.xx&oh=00_AT-Nbx4-mfZWpv5UJ-TS47KQP90rIt6lEP5MMOnRIeDVOA&oe=623BAB80",
  //     name: "Hip-hop & Rap",
  //     rank: "Top 50",
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
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
  };
  return (
    <Template>
      <MainPageBlock>
        <div className="layout_container">
          <div className="layout_left">
            {/* ///////
             */}
            <div className="flex_box">
              <Text size="2rem" margin="0 0 1em 0">
                Recently Played
              </Text>
            </div>

            <div>
              <Slider {...settings}>
                <div>
                  <p>
                    <Grid>
                      <div>
                        <div className="flex-container">
                          {Charts?.allMusicList?.map((stream, idx) => {
                            return (
                              <div
                                className="flex_box"
                                onClick={() => {
                                  console.log(stream.musicId);
                                }}
                                key={idx}
                              >
                                <div className="box_hover">
                                  <Link to={`/detail/${stream.musicId}`}>
                                    <Image
                                      shape="rectangle"
                                      size="160px"
                                      src={stream.imageUrl}
                                    />
                                  </Link>
                                  <div className="Inimage">
                                    <FontAwesomeIcon
                                      icon={faPlayCircle}
                                      size="3x"
                                      onClick={() => {}}
                                    />
                                  </div>
                                </div>

                                <p className="artist_name">{stream.name}</p>
                                <p className="artist_title">{stream.rank}</p>
                              </div>
                            );
                          })}
                        </div>
                        <div className="layout_bottom "></div>
                      </div>
                    </Grid>
                  </p>
                </div>
                <div></div>
              </Slider>
            </div>

            {/* //// */}
            <div className="flex_box">
              <Text size="2rem" margin="0 0 1em 0">
                <p>Charts New & hot</p>
                <p className="font">Up-and-coming tracks on SoundCloud</p>
              </Text>
            </div>
            <div>
              <Slider {...settings}>
                <div>
                  <p>
                    <Grid>
                      <div>
                        <div className="flex-container">
                          {Charts?.topMusicList?.map((stream, idx) => {
                            return (
                              <div className="flex_box" key={idx}>
                                <div className="box_hover">
                                  <Link to={`/detail/${stream.musicId}`}>
                                    <Image
                                      shape="rectangle"
                                      size="160px"
                                      src={stream.imageUrl}
                                    />
                                  </Link>
                                  <div className="Inimage">
                                    <FontAwesomeIcon
                                      icon={faPlayCircle}
                                      size="3x"
                                      onClick={() => {}}
                                    />
                                  </div>
                                </div>
                                <p className="artist_name">{stream.name}</p>
                                <p className="artist_title">{stream.rank}</p>
                              </div>
                            );
                          })}
                        </div>
                        <div className="layout_bottom "></div>
                      </div>
                    </Grid>
                  </p>
                </div>
                <div></div>
              </Slider>
            </div>

            <div className="flex_box">
              <Text size="2rem" margin="0 0 1em 0">
                <p>Sleep</p>
                <p className="font">
                  {" "}
                  Popular playlists from the SoundCloud community
                </p>
              </Text>
            </div>
            <div>
              <Slider {...settings}>
                <div>
                  <p>
                    <Grid>
                      <div>
                        <div className="flex-container">
                          {Charts?.topMusicList?.map((stream, idx) => {
                            return (
                              <div className="flex_box" key={idx}>
                                <div className="box_hover">
                                  <Link to={`/detail/${stream.musicId}`}>
                                    <Image
                                      shape="rectangle"
                                      size="160px"
                                      src={stream.imageUrl}
                                    />
                                  </Link>
                                  <div className="Inimage">
                                    <FontAwesomeIcon
                                      icon={faPlayCircle}
                                      size="3x"
                                      onClick={() => {}}
                                    />
                                  </div>
                                </div>
                                <p className="artist_name">{stream.name}</p>
                                <p className="artist_title">{stream.rank}</p>
                              </div>
                            );
                          })}
                        </div>
                        <div className="layout_bottom "></div>
                      </div>
                    </Grid>
                  </p>
                </div>
                <div></div>
              </Slider>
            </div>

            <div className="flex_box">
              <Text size="2rem" margin="0 0 1em 0">
                <p>Charts:Top 50</p>
                <p className="font">
                  {" "}
                  The most played tracks on SoundCloud this week
                </p>
              </Text>
            </div>
            <div>
              <Slider {...settings}>
                <div>
                  <p>
                    <Grid>
                      <div>
                        <div className="flex-container">
                          {Charts?.topMusicList?.map((stream, idx) => {
                            return (
                              <div className="flex_box" key={idx}>
                                <div className="box_hover">
                                  <Link to={`/detail/${stream.musicId}`}>
                                    <Image
                                      shape="rectangle"
                                      size="160px"
                                      src={stream.imageUrl}
                                    />
                                  </Link>
                                  <div className="Inimage">
                                    <FontAwesomeIcon
                                      icon={faPlayCircle}
                                      size="3x"
                                      onClick={() => {}}
                                    />
                                  </div>
                                </div>
                                <p className="artist_name">{stream.name}</p>
                                <p className="artist_title">{stream.rank}</p>
                              </div>
                            );
                          })}
                        </div>
                        <div className="layout_bottom "></div>
                      </div>
                    </Grid>
                  </p>
                </div>
                <div></div>
              </Slider>
            </div>

            <div className="flex_box">
              <Text size="2rem" margin="0 0 1em 0">
                <p>Workout</p>
                <p className="font">
                  {" "}
                  Popular playlists from the SoundCloud community
                </p>
              </Text>
            </div>
            <div>
              <Slider {...settings}>
                <div>
                  <p>
                    <Grid>
                      <div>
                        <div className="flex-container">
                          {Charts?.topMusicList?.map((stream, idx) => {
                            return (
                              <div className="flex_box" key={idx}>
                                <div className="box_hover">
                                  <Link to={`/detail/${stream.musicId}`}>
                                    <Image
                                      shape="rectangle"
                                      size="160px"
                                      src={stream.imageUrl}
                                    />
                                  </Link>
                                  <div className="Inimage">
                                    <FontAwesomeIcon
                                      icon={faPlayCircle}
                                      size="3x"
                                      onClick={() => {}}
                                    />
                                  </div>
                                </div>
                                <p className="artist_name">{stream.name}</p>
                                <p className="artist_title">{stream.rank}</p>
                              </div>
                            );
                          })}
                        </div>
                        <div className="layout_bottom "></div>
                      </div>
                    </Grid>
                  </p>
                </div>
                <div></div>
              </Slider>
            </div>

            <div className="flex_box">
              <Text size="2rem" margin="0 0 1em 0">
                <p>Party</p>
                <p className="font">
                  Popular playlists from the SoundCloud community
                </p>
              </Text>
            </div>
            <div>
              <Slider {...settings}>
                <div>
                  <p>
                    <Grid>
                      <div>
                        <div className="flex-container">
                          {Charts?.hiphopCategoryMusic?.map((stream, idx) => {
                            return (
                              <div className="flex_box" key={idx}>
                                <div className="box_hover">
                                  <Link to={`/detail/${stream.musicId}`}>
                                    <Image
                                      shape="rectangle"
                                      size="160px"
                                      src={stream.imageUrl}
                                    />
                                  </Link>
                                  <div className="Inimage">
                                    <FontAwesomeIcon
                                      icon={faPlayCircle}
                                      size="3x"
                                      onClick={() => {}}
                                    />
                                  </div>
                                </div>
                                <p className="artist_name">{stream.name}</p>
                                <p className="artist_title">{stream.rank}</p>
                              </div>
                            );
                          })}
                        </div>
                        <div className="layout_bottom "></div>
                      </div>
                    </Grid>
                  </p>
                </div>
                <div></div>
              </Slider>
            </div>

            <div className="flex_box">
              <Text size="2rem" margin="0 0 1em 0">
                <p>Relax</p>
                <p className="font">
                  Popular playlists from the SoundCloud community
                </p>
              </Text>
            </div>
            <div>
              <Slider {...settings}>
                <div>
                  <p>
                    <Grid>
                      <div>
                        <div className="flex-container">
                          {Charts?.rockCategoryMusic?.map((stream, idx) => {
                            return (
                              <div className="flex_box" key={idx}>
                                <div className="box_hover">
                                  <Link to={`/detail/${stream.musicId}`}>
                                    <Image
                                      shape="rectangle"
                                      size="160px"
                                      src={stream.imageUrl}
                                    />
                                  </Link>
                                  <div className="Inimage">
                                    <FontAwesomeIcon
                                      icon={faPlayCircle}
                                      size="3x"
                                      onClick={() => {}}
                                    />
                                  </div>
                                </div>
                                <p className="artist_name">{stream.name}</p>
                                <p className="artist_title">{stream.rank}</p>
                              </div>
                            );
                          })}
                        </div>
                        <div className="layout_bottom "></div>
                      </div>
                    </Grid>
                  </p>
                </div>
                <div></div>
              </Slider>
            </div>

            <div className="flex_box">
              <Text size="2rem" margin="0 0 1em 0">
                <p>Study</p>
                <p className="font">
                  Popular playlists from the SoundCloud community
                </p>
              </Text>
            </div>
            <div>
              <Slider {...settings}>
                <div>
                  <p>
                    <Grid>
                      <div>
                        <div className="flex-container">
                          {Charts?.hiphopCategoryMusic?.map((stream, idx) => {
                            return (
                              <div className="flex_box" key={idx}>
                                <div className="box_hover">
                                  <Link to={`/detail/${stream.musicId}`}>
                                    <Image
                                      shape="rectangle"
                                      size="160px"
                                      src={stream.imageUrl}
                                    />
                                  </Link>
                                  <div className="Inimage">
                                    <FontAwesomeIcon
                                      icon={faPlayCircle}
                                      size="3x"
                                      onClick={() => {}}
                                    />
                                  </div>
                                </div>
                                <p className="artist_name">{stream.name}</p>
                                <p className="artist_title">{stream.rank}</p>
                              </div>
                            );
                          })}
                        </div>
                        <div className="layout_bottom "></div>
                      </div>
                    </Grid>
                  </p>
                </div>
                <div></div>
              </Slider>
            </div>

            <div className="flex_box">
              <Text size="2rem" margin="0 0 1em 0">
                <p>Chill</p>
                <p className="font">
                  Popular playlists from the SoundCloud community
                </p>
              </Text>
            </div>
            <div>
              <Slider {...settings}>
                <div>
                  <p>
                    <Grid>
                      <div>
                        <div className="flex-container">
                          {Charts?.rockCategoryMusic?.map((stream, idx) => {
                            return (
                              <div className="flex_box" key={idx}>
                                <div className="box_hover">
                                  <Link to={`/detail/${stream.musicId}`}>
                                    <Image
                                      shape="rectangle"
                                      size="160px"
                                      src={stream.imageUrl}
                                    />
                                  </Link>
                                  <div className="Inimage">
                                    <FontAwesomeIcon
                                      icon={faPlayCircle}
                                      size="3x"
                                      onClick={() => {}}
                                    />
                                  </div>
                                </div>
                                <p className="artist_name">{stream.name}</p>
                                <p className="artist_title">{stream.rank}</p>
                              </div>
                            );
                          })}
                        </div>
                        <div className="layout_bottom "></div>
                      </div>
                    </Grid>
                  </p>
                </div>
                <div></div>
              </Slider>
            </div>

            {/* ///////////// */}
          </div>
          <div className="layout_right">
            <div className="layout_fixed">
              <div className="right_container" style={{ marginBottom: "em" }}>
                <Grid
                  is_flex="flex"
                  padding="0 0 0.3em 0"
                  margin="0 0 1.5em 0"
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
                  margin="0 0 1.5em 0"
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
                  <Grid
                    is_flex="flex"
                    padding="0 0 0.3em 0"
                    margin="0 0 1em 0"
                    border_bottom="1px solid rgba(0,0,0,0.1)"
                  >
                    <div className="history_calendar">
                      <Text>Go mobile</Text>
                    </div>
                    <div className="google"></div>
                  </Grid>
                  <img
                    src="https://www.sarahwerner.com/wp-content/uploads/2013/11/get-it-on-google-play.png"
                    size="15px"
                  />
                </Grid>
              </div>
            </div>
          </div>
        </div>
      </MainPageBlock>
    </Template>
  );
};

export default MainPage;
