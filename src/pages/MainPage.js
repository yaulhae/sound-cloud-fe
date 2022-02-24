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
    display: flex;
    width: 50%;
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
  .slick-track {
    max-width: 1000px !important ;
  }
  .slick-prev,
  .slick-next {
    z-index: 1;
    font-size: 40px;
  }
  .font-color {
    color: #42a5f5;
  }
  .font-color2 {
    color: black;
  }
`;

const MainPage = (props) => {
  const dispatch = useDispatch();
  const Charts = useSelector(({ playlist }) => playlist.top5List);

  React.useEffect(() => {
    dispatch(playlistActions.getTopListFB());
    console.log(props.history);
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
                                      size="140px"
                                      src={stream.imageUrl}
                                    />
                                  </Link>
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
                                      size="140px"
                                      src={stream.imageUrl}
                                    />
                                  </Link>
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
                                      size="140px"
                                      src={stream.imageUrl}
                                    />
                                  </Link>
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
                                      size="140px"
                                      src={stream.imageUrl}
                                    />
                                  </Link>
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
                                      size="140px"
                                      src={stream.imageUrl}
                                    />
                                  </Link>
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
                                      size="140px"
                                      src={stream.imageUrl}
                                    />
                                  </Link>
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
                                      size="140px"
                                      src={stream.imageUrl}
                                    />
                                  </Link>
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
                                      size="140px"
                                      src={stream.imageUrl}
                                    />
                                  </Link>
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
                                      size="140px"
                                      src={stream.imageUrl}
                                    />
                                  </Link>
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
                  </Grid>

                  <a href="https://play.google.com/store/apps/details?id=com.soundcloud.android&hl=us&referrer=utm_source%3Dsoundcloud%26utm_medium%3Dweb%26utm_campaign%3Dweb_xsell_discover_page">
                    <div className="google">
                      <img src="data:image/png;base64,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" />
                      <img src="data:image/png;base64,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" />
                    </div>
                  </a>
                  <Grid
                    is_flex="flex"
                    padding="0 0 1em 0"
                    margin="0 0 1em 0"
                    border_bottom="1px solid rgba(0,0,0,0.1)"
                  >
                    <div className="history_calendar"></div>
                  </Grid>
                  <Text>
                    Legal ⁃ Privacy ⁃ Cookie Policy ⁃ Cookie Manager ⁃ Imprint ⁃
                    Creator Resources ⁃ Blog ⁃ Charts ⁃
                    <span className="font-color">Language:</span>
                    <span className="font-color2">English (US)</span>
                  </Text>
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
