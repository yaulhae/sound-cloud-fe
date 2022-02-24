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
  faVolumeXmark,
} from "@fortawesome/free-solid-svg-icons";
import { Image, Text } from "../elements";
import { useSelector } from "react-redux";
import { getAudioPlayer, getPlayingInfo } from "../redux/track";
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
    padding: 1.5em 0;
    .progress {
      position: relative;
      background: #f50;
      height: 1px;
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
  input[type="range"] {
    width: 100%;
  }
`;

const PlayBar = () => {
  const dispatch = useDispatch();

  const startTime = useSelector(({ track }) => track.now_playtime);
  const timer = useSelector(({ track }) => track.timer);
  const audioPlayer = useSelector(({ track }) => track.audio_player);
  const playingInfo = useSelector(({ track }) => track.playing_info);
  const [muteStatus, setMuteStatus] = useState(false);

  const now_endTime = useSelector(({ track }) => track.now_endTime);

  var playTime_min = Math.floor(startTime / 60);
  var playTime_sec = startTime % 60;
  let new_playTime = `${playTime_min}:${playTime_sec}`;

  var endTime_min = Math.floor(now_endTime / 60);
  var endTime_sec = now_endTime % 60;
  let new_endTime = `${endTime_min}:${endTime_sec}`;

  const progressRatio = (startTime / now_endTime) * 100;

  const pauseMusic = () => {
    audioPlayer.pause();
    dispatch(getPlayingInfo(null));
    dispatch(getAudioPlayer(null));
    clearInterval(timer);
  };

  const playMusic = () => {
    audioPlayer.play();
  };

  const skipForward = () => {
    audioPlayer.skipForward(5);
  };

  const skipBackward = () => {
    audioPlayer.skipBackward(5);
  };

  const mute = () => {
    audioPlayer.toggleMute();
    setMuteStatus(!muteStatus);
  };

  const progressControl = (e) => {
    const x = e.clientX - e.target.getBoundingClientRect().left;
    const x_ratio = Math.floor(
      (x / e.target.getBoundingClientRect().width) * 100
    );
    audioPlayer.seekTo(x_ratio / 100);

    const mouseMove = (e) => {
      const x = e.clientX - e.target.getBoundingClientRect().left;
      const x_ratio = Math.floor(
        (x / e.target.getBoundingClientRect().width) * 100
      );
      audioPlayer.seekTo(x_ratio / 100);
    };
    const mouseUp = () => {
      e.target.removeEventListener("mousemove", mouseMove);
      e.target.removeEventListener("mouseup", mouseUp);
    };

    e.target.addEventListener("mousemove", mouseMove);
    e.target.addEventListener("mouseup", mouseUp);
  };

  return (
    <PlayBarBlock>
      <div className="playPlayer_container">
        <div className="playerIcon_container">
          <FontAwesomeIcon icon={faBackwardStep} onClick={skipBackward} />
          {audioPlayer?.isPlaying() ? (
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
          <div className="progressBar" onMouseDown={progressControl}>
            <div
              className="progress"
              style={{ width: `${progressRatio}%` }}
            ></div>

            <div className="backProgress"></div>
          </div>
          <span className="end_time">{new_endTime}</span>
          {muteStatus ? (
            <FontAwesomeIcon
              icon={faVolumeXmark}
              className="sound_icon"
              onClick={mute}
            />
          ) : (
            <FontAwesomeIcon
              icon={faVolumeHigh}
              className="sound_icon"
              onClick={mute}
            />
          )}
        </div>

        <div className="track_info">
          <div className="image_cover">
            <Image size="32px" shape="rectangle" src={playingInfo?.imageUrl} />
          </div>
          <div className="info">
            <Text>{playingInfo?.artistName}</Text>
            <Text>{playingInfo?.musicTitle}</Text>
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
