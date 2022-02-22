import styled from "styled-components";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBackwardStep,
  faForwardStep,
  faHeart,
  faListOl,
  faPause,
  faPlay,
  faRotate,
  faShuffle,
  faUserPlus,
  faVolumeHigh,
} from "@fortawesome/free-solid-svg-icons";
import { Image, Text } from "../elements";
import { useSelector } from "react-redux";
import track, { isPlaying } from "../redux/track";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const PlayBarBlock = styled.div`
  position: fixed;
  bottom: 0;
  right: 0;
  left: 0;
  height: 49px;
  background: #f2f2f2;
  z-index: 100;
  border-top: 1px solid #cecece;
  border-bottom: 1px solid #cecece;
  .playPlayer_container {
    width: 1240px;
    height: 100%;
    margin: 0 auto;
    display: flex;
    align-items: center;
    svg {
      margin-right: 1.5em;
      cursor: pointer;
      &:nth-child(1) {
        margin-left: 1em;
      }
      &:nth-child(5) {
        margin-right: 3em;
      }
    }
  }
  .progressBar_container {
    flex-grow: 1;
    display: flex;
    align-items: center;
    .start_time {
      margin-right: 1em;
      font-size: 12px;
    }
    .progressBar {
      margin-right: 1em;
    }
    .end_time {
      margin-right: 3em;
      font-size: 12px;
    }
    .sound_icon {
      margin-right: 2em;
    }
  }
  .progressBar {
    flex-grow: 1;
    .progress {
      background: #f50;
      height: 1px;
      width: 160px; //지우기
    }
    .backProgress {
      background: #ccc;
      height: 1px;
    }
  }
  .track_info {
    display: flex;
    align-items: center;
    width: 360px;
    font-size: 12px;
    .image_cover {
      margin-right: 0.5em;
    }
    .info {
      margin-right: 4em;
      width: 170px;
    }
    .list_icon {
      margin-right: 1em;
    }
  }
`;

const PlayBar = () => {
  const now_playing = useSelector(({ track }) => track.now_playing);
  const now_playtime = useSelector(({ track }) => track.now_playtime);
  const now_endTime = useSelector(({ track }) => track.now_endTime);
  const audioPlayer = useSelector(({ track }) => track.audio_player);
  const [playing, setPlaying] = useState(true);

  const dispatch = useDispatch();

  var playTime_min = Math.floor(now_playtime / 60);
  var playTime_sec = now_playtime % 60;
  let new_playTime = `${playTime_min}:${playTime_sec}`;

  var endTime_min = Math.floor(now_endTime / 60);
  var endTime_sec = now_endTime % 60;
  let new_endTime = `${endTime_min}:${endTime_sec}`;

  const pauseMusic = () => {
    audioPlayer.pause();
    setPlaying(false);
  };

  const playMusic = () => {
    audioPlayer.play();
    setPlaying(true);
  };

  const skipForward = () => {
    audioPlayer.skipForward(5);
  };

  const skipBackward = () => {
    audioPlayer.skipBackward(5);
  };

  useEffect(() => {});
  return (
    <PlayBarBlock>
      <div className="playPlayer_container">
        <div className="playerIcon_container">
          <FontAwesomeIcon icon={faBackwardStep} onClick={skipBackward} />
          {playing ? (
            <FontAwesomeIcon icon={faPause} onClick={pauseMusic} />
          ) : (
            <FontAwesomeIcon icon={faPlay} onClick={playMusic} />
          )}
          <FontAwesomeIcon icon={faForwardStep} onClick={skipForward} />
          <FontAwesomeIcon icon={faShuffle} />
          <FontAwesomeIcon icon={faRotate} />
        </div>
        <div className="progressBar_container">
          <span className="start_time">{new_playTime}</span>
          <div className="progressBar">
            <div className="progress"></div>
            <div className="backProgress"></div>
          </div>
          <span className="end_time">{new_endTime}</span>
          <FontAwesomeIcon icon={faVolumeHigh} className="sound_icon" />
        </div>
        <div className="track_info">
          <div className="image_cover">
            <Image size="32px" shape="rectangle" src={now_playing?.imageUrl} />
          </div>
          <div className="info">
            <Text>{now_playing?.artistName}</Text>
            <Text>{now_playing?.musicTitle}</Text>
          </div>
          <div className="icon_wrapper">
            <FontAwesomeIcon icon={faHeart} />
            <FontAwesomeIcon icon={faUserPlus} />
            <FontAwesomeIcon icon={faListOl} className="list_icon" />
          </div>
        </div>
      </div>
    </PlayBarBlock>
  );
};

export default PlayBar;
