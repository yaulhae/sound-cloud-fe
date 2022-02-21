import styled from "styled-components";
import React, { useEffect, useRef } from "react";
import Template from "../common/Template";
import { Grid, Image, Text } from "../elements";
import { useState } from "react";
import { Settings } from "../common/settings";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlayCircle } from "@fortawesome/free-solid-svg-icons";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Howl } from "howler";
import { makeStyles } from "@material-ui/core/styles";
import Controls from "../common/Controls";
import music from "./y2mate.com-IFeelItComing.mp3";
import { colors } from "@material-ui/core";

const useStyles = makeStyles({
  playerWrapper: {
    width: "100%",
    position: "relative",
  },
});

const MainPageBlock = styled.div`
  padding: 50px 30px 40px 30px;
  .layout_container {
    position: relative;
    margin-top: 10px;
  }
  .layout_left {
    width: 70%;
    border-right: 1px solid #eeeeee;
    padding: 1.5em 1.5em 0 0;
  }
  .layout_right {
    width: 30%;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    margin-top: 30px;
    padding: 0 50px;
    color: gray;
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
    top: 20%;
    transform: translate(112%);
    color: #f50;
    opacity: 0;
  }
  .Inimage {
    :hover {
      opacity: 1;
    }
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

  return (
    <Template>
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
                            size="15%"
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
                          size="15%"
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
                          size="15%"
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
                          size="15%"
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
                          size="15%"
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
          <div className="layout_right">Listening history</div>
        </div>
      </MainPageBlock>
    </Template>
  );
};
const Test = styled.div`
  width: 100%;
  height: 5rem;
  &:nth-of-type(1) {
    background-color: green;
  }
  &:nth-of-type(2) {
    background-color: black;
  }
  &:nth-of-type(3) {
    background-color: white;
  }
  &:nth-of-type(4) {
    background-color: red;
  }
  &:nth-of-type(5) {
    background-color: blue;
  }
`;
export default MainPage;
