import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import WaveSurfer from "wavesurfer.js";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPause } from "@fortawesome/free-solid-svg-icons";

import "../waveForm.css";

import formatTime from "../common/formatTime";
import { actionsCreators as musicActions } from "../redux/music";
import {
  getAudioPlayer,
  getEndTime,
  getPlayingInfo,
  getPlayTime,
} from "../redux/track";

const WaveForm = (props) => {
  const dispatch = useDispatch();

  const music = useSelector(({ music }) => music?.music?.music);
  const audio_player = useSelector(({ track }) => track.audio_player);
  const timer = useSelector(({ track }) => track.timer);
  const player = useRef(null);
  const timerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [curTime, setCurTime] = useState("0:00");
  const [endTime, setEndTime] = useState(null);
  useEffect(() => {
    player.current = WaveSurfer.create({
      container: player.current,
      barWidth: 2,
      barRadius: 1,
      barGap: 2,
      barMinHeight: 1,
      cursorWidth: 1,
      // backend: 'MediaElementWebAudio',  이 녀석 때문에 에러났음
      backend: "WebAudio",
      height: 180,
      progressColor: "#FE6E00",
      responsive: true,
      waveColor: "#C4C4C4",
      cursorColor: "transparent",
    });

    player.current.load(music?.musicUrl || "url");

    player.current?.on("ready", () => {
      setDuration(formatTime(player.current?.getDuration()));
      setEndTime(player.current.getDuration());
    });

    player.current?.on("audioprocess", function () {
      setCurTime(formatTime(player.current.getCurrentTime()));
      const time = player.current.getCurrentTime();
      dispatch(musicActions.getCommentTime(time));
    });
  }, []);

  const handlePlay = () => {
    if (!player.current.isPlaying()) {
      if (audio_player?.isPlaying()) {
        audio_player?.pause();
        clearInterval(timer);
      }
      console.log("play");
      dispatch(getPlayingInfo(music));
      dispatch(getAudioPlayer(player.current));
      dispatch(getPlayTime(Math.floor(player.current?.getCurrentTime())));
      timerRef.current = setInterval(() => {
        dispatch(getPlayTime(Math.floor(player.current?.getCurrentTime())));
      }, 1000);
      dispatch(getEndTime(Math.floor(endTime)));
      player.current.play();
      dispatch(musicActions.musicHistoryAPI(props.musicId));
    } else {
      console.log("pause");
      player.current.pause();
      dispatch(getPlayingInfo(null));
      dispatch(getAudioPlayer(null));
      clearInterval(timerRef.current);
    }
  };

  /*if (audio_player) {
    timerRef.current = setInterval(() => {
      dispatch(getPlayTime(Math.floor(audio_player?.getCurrentTime())));
    }, 1000);
  }
  return () => {
    clearInterval(timerRef.current);
  };*/

  // console.log(music);

  return (
    <WaveformContianer>
      <PlayButton onClick={handlePlay}>
        {!player.current?.isPlaying() ? (
          <FontAwesomeIcon icon={faPlay} size="2x" />
        ) : (
          <FontAwesomeIcon icon={faPause} size="2x" />
        )}
      </PlayButton>
      <Wave id="waveform" ref={player} />
      <CurTimeLabel>{curTime}</CurTimeLabel>
      <DurationLabel>{duration}</DurationLabel>
    </WaveformContianer>
  );
};

WaveForm.defaultProps = {
  url: null,
};

const PlayButton = styled.button`
  position: absolute;
  top: 22px;
  left: 0px;
  opacity: 1;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: none;
  outline: none;
  cursor: pointer;
  padding-bottom: 3px;
  color: white;
`;

const WaveformContianer = styled.div`
  height: 100px;
  width: 100%;
  background: transparent;
  gap: 2rem;
  margin-bottom: 28px;
`;

const Wave = styled.div`
  width: 100%;
  height: 90px;
  overflow: hidden;
  -webkit-box-reflect: below 1px -webkit-gradient(linear, left top, left bottom, from(transparent), color-stop(0.7, #ffffff00), to(rgb(255
            255 255 / 100%)));
`;

const CurTimeLabel = styled.div`
  position: absolute;
  bottom: 38px;
  z-index: 2;
  line-height: 1;
  background: black;
  color: #9d9d9d;
  font-size: 0.7em;
  padding: 2px 2px 0px;
  mix-blend-mode: multiply;
`;
const DurationLabel = styled.div`
  position: absolute;
  right: 0px;
  bottom: 38px;
  z-index: 2;
  line-height: 1;
  background: black;
  color: #9d9d9d;
  font-size: 0.7em;
  padding: 2px 2px 0px;
  mix-blend-mode: multiply;
`;

export default WaveForm;
