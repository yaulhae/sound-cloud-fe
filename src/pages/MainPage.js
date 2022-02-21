import styled from "styled-components";
import React, { Component, useEffect, useRef } from "react";
import Template from "../common/Template";
import { Grid, Image, Text } from "../elements";
import { useState } from "react";
import { Settings } from "../common/settings";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
import Controls from "../common/Controls";
import music from "./y2mate.com-IFeelItComing.mp3";
import { colors } from "@material-ui/core";

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
    top: 21%;
    transform: translate(145%);
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
      margin-top: 0.8em;
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
`;

const MainPage = () => {
  const [Charts, setCharts] = useState([
    {
      imageUrl:
        "https://image.bugsm.co.kr/album/images/original/5766/576613.jpg?version=undefined",
      name: "Jazz & Blues",
      rank: "Top 50",
    },
    {
      imageUrl:
        "https://image.bugsm.co.kr/album/images/original/5451/545138.jpg?version=undefined",
      name: "YERINB",
      rank: "top 50",
    },
    {
      imageUrl:
        "https://image.bugsm.co.kr/album/images/original/203568/20356818.jpg?version=undefined",
      name: "Hip-hop & Rap",
      rank: "Top 50",
    },
    {
      imageUrl:
        "https://image.bugsm.co.kr/album/images/original/8598/859812.jpg?version=undefined",
      name: "Hip-hop & Rap",
      rank: "Top 50",
    },
  ]);

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
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <Template>
      {/* <div>
        <h2> Single Item</h2>
        <Slider {...settings}>
          <div>
            <h3>1</h3>
          </div>
          <div>
            <h3>2</h3>
          </div>
          <div>
            <h3>3</h3>
          </div>
          <div>
            <h3>4</h3>
          </div>
          <div>
            <h3>5</h3>
          </div>
          <div>
            <h3>6</h3>
          </div>
        </Slider>
      </div> */}
      <MainPageBlock>
        <div className="layout_container">
          <div className="layout_left">
            <div className="flex_box">
              <Text size="2rem" margin="0 0 1em 0">
                Recently Played
              </Text>
              <Grid>
                <div className="flex-container">
                  {Charts.map((stream, idx) => {
                    return (
                      <div className="flex_box">
                        <div className="box_hover">
                          <Image
                            shape="rectangle"
                            size="160px"
                            src={stream.imageUrl}
                          />
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
              </Grid>
            </div>
            <div className="flex_box">
              <Text size="2rem" margin="0 0 1em 0">
                <p>Charts: Top 50</p>
                <p className="font">
                  The most played tracks on SoundCloud this week
                </p>
              </Text>
              <Grid>
                <div className="flex-container">
                  {Charts.map((stream, idx) => {
                    return (
                      <div className="flex_box">
                        <Image
                          shape="rectangle"
                          size="160px"
                          src={stream.imageUrl}
                        />
                        <div className="Inimage">
                          <FontAwesomeIcon
                            icon={faPlayCircle}
                            size="3x"
                            onClick={() => {}}
                          />
                        </div>
                        <p className="artist_name">{stream.name}</p>
                        <p className="artist_title">{stream.rank}</p>
                      </div>
                    );
                  })}
                </div>
                <div className="layout_bottom "></div>
              </Grid>
            </div>
            <div className="flex_box">
              <Text size="2rem" margin="0 0 1em 0">
                <p>Charts:New & hot</p>
                <p className="font">Up-and-coming tracks on SoundCloud</p>
              </Text>
              <Grid>
                <div className="flex-container">
                  {Charts.map((stream, idx) => {
                    return (
                      <div className="flex_box">
                        <Image
                          shape="rectangle"
                          size="160px"
                          src={stream.imageUrl}
                        />
                        <div className="Inimage">
                          <FontAwesomeIcon
                            icon={faPlayCircle}
                            size="3x"
                            onClick={() => {}}
                          />
                        </div>
                        <p className="artist_name">{stream.name}</p>
                        <p className="artist_title">{stream.rank}</p>
                      </div>
                    );
                  })}
                </div>
                <div className="layout_bottom "></div>
              </Grid>
            </div>
            <div className="flex_box">
              <Text size="2rem" margin="0 0 1em 0">
                <p>Study</p>
                <p className="font">
                  Popular playlists from the SoundCloud community
                </p>
              </Text>
              <Grid>
                <div className="flex-container">
                  {Charts.map((stream, idx) => {
                    return (
                      <div className="flex_box">
                        <Image
                          shape="rectangle"
                          size="160px"
                          src={stream.imageUrl}
                        />
                        <div className="Inimage">
                          <FontAwesomeIcon
                            icon={faPlayCircle}
                            size="3x"
                            onClick={() => {}}
                          />
                        </div>
                        <p className="artist_name">{stream.name}</p>
                        <p className="artist_title">{stream.rank}</p>
                      </div>
                    );
                  })}
                </div>
                <div className="layout_bottom "></div>
              </Grid>
            </div>

            <div className="flex_box">
              <Text size="2rem" margin="0 0 1em 0">
                <p>Chill</p>
                <p className="font">
                  Popular playlists from the SoundCloud community{" "}
                </p>
              </Text>
              <Grid>
                <div className="flex-container">
                  {Charts.map((stream, idx) => {
                    return (
                      <div className="flex_box">
                        <Image
                          shape="rectangle"
                          size="160px"
                          src={stream.imageUrl}
                        />
                        <div className="Inimage">
                          <FontAwesomeIcon
                            icon={faPlayCircle}
                            size="3x"
                            onClick={() => {}}
                          />
                        </div>
                        <p className="artist_name">{stream.name}</p>
                        <p className="artist_title">{stream.rank}</p>
                      </div>
                    );
                  })}
                </div>

                <div className="layout_bottom "></div>
              </Grid>
            </div>
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
                          style={{ marginBottom: "0.5em" }}
                        >
                          <div className="left">
                            <Image size="50px" src={stream.imageUrl} />
                          </div>
                          <div className="right">
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
                  <img src="https://www.sarahwerner.com/wp-content/uploads/2013/11/get-it-on-google-play.png" />
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
