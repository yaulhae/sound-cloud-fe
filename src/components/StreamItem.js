import styled from "styled-components";
import React, { useEffect, useRef } from "react";
import { Grid, Image, Text } from "../elements";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsis,
  faHeart,
  faPaperclip,
  faPauseCircle,
  faPlay,
  faPlayCircle,
  faRepeat,
  faShareFromSquare,
} from "@fortawesome/free-solid-svg-icons";
import WaveSurfer from "wavesurfer.js";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getAudioPlayer, getPlayButton, isPlaying } from "../redux/track";
import { useSelector } from "react-redux";
import { getPlayTime } from "../redux/track";
import { getEndTime } from "../redux/track";

<script src="//cdnjs.cloudflare.com/ajax/libs/wavesurfer.js/1.4.0/wavesurfer.min.js"></script>;
<script src="https://unpkg.com/wavesurfer.js"></script>;

const StreamItemBlock = styled.div`
  .stream_item {
    margin-bottom: 3em;
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
    font-size: 2.5rem;
    margin-right: 0.2em;
  }
  .artist_name {
    color: #999;
    font-size: 0.8rem;
  }
  .artist_title {
    font-size: 1rem;
    line-height: 1.2;
  }
  #waveform {
  }
  .waveform_container {
    position: relative;
    height: 50px;
    overflow: hidden;
    -webkit-box-reflect: below 1px -webkit-gradient(linear, left top, left
          bottom, from(transparent), color-stop(0.7, #ffffff00), to(rgb(255 255
              255 / 100%)));
    margin-bottom: 2em;
  }
  .comment_list {
    display: flex;
    /* display: flex;
    position: absolute;
    bottom: 0;
    left: 0; */
  }
  .comment_container {
    display: flex;
    align-items: center;
    padding: 0.3em 0.4em;
    background: #f2f2f2;
    border: 1px solid #e5e5e5;
  }
  .comment_input {
    font-size: 12px;
    cursor: pointer;
    border: 1px solid #e5e5e5;
    outline: none;
    background: #fff;
    border-radius: 0 4px 4px 0;
    width: 100%;
    padding: 0 0 0 0.5em;
  }
  .sound_content {
    position: relative;
  }
  .stream_comment {
    display: flex;
    font-size: 12px;
  }
  .show {
    display: block !important;
  }
`;

const StreamItem = ({ stream }) => {
  const audioPlayer = useRef(null);
  const timeRef = useRef(null);
  const now_playtime = useSelector(({ track }) => track.now_playtime);
  const playingTrack = useSelector(({ track }) => track.now_playing);
  const dispatch = useDispatch();
  const [endTime, setEndTime] = useState(null);
  useEffect(() => {
    audioPlayer.current = WaveSurfer.create({
      container: audioPlayer.current,
      // waveColor: "#666666",
      // progressColor: "#FF5C00",
      // cursorColor: "white",
      // barWidth: 1.5,
      // height: 60,
      // width: 100,
      // barRadius: 1,
      // barGap: 1.5,
      // scrollParent: false,
      barWidth: 2,
      barRadius: 1,
      barGap: 2,
      barMinHeight: 1,
      cursorWidth: 1,
      backend: "WebAudio",
      height: 100,
      progressColor: "#FE6E00",
      responsive: true,
      waveColor: "#C4C4C4",
      cursorColor: "transparent",
    });

    audioPlayer.current.load(stream.musicUrl);
    audioPlayer.current.on("ready", () => {
      setEndTime(audioPlayer.current.getDuration());
    });
  }, []);

  const playToggle = () => {
    if (stream.musicId === playingTrack?.musicId) {
      audioPlayer.current?.pause();
      dispatch(isPlaying(null));
      // dispatch(getPlayer(null));
      return;
    }
    dispatch(isPlaying(stream));
    dispatch(getAudioPlayer(audioPlayer.current));
  };

  if (stream.musicId === playingTrack?.musicId) {
    audioPlayer.current?.play();
    clearInterval(timeRef.current);
    timeRef.current = setInterval(() =>
      dispatch(getPlayTime(Math.floor(audioPlayer.current?.getCurrentTime())))
    );
    dispatch(getEndTime(Math.floor(audioPlayer.current?.getDuration())));
  } else {
    audioPlayer.current?.pause();
    console.log("도착함?");
    clearInterval(timeRef.current);
  }

  return (
    <StreamItemBlock>
      <div className="stream_item">
        <div className="top">
          <div className="top_user">
            <Image />
            <div>
              <Text size="0.7rem" color="rgba(0,0,0,0.6)">
                {stream.userName}
              </Text>
              <Text color="rgba(0,0,0,0.6)">{stream.content}</Text>
            </div>
          </div>
        </div>

        <div className="middle">
          <div className="middle_music">
            <div className="middle_music_coverImg">
              <Image shape="rectangle" size="160px" src={stream.imageUrl} />
            </div>
            <div className="middle_music_artist">
              <div className="middle_user">
                <div className="play_icon" onClick={playToggle}>
                  {stream.musicId === playingTrack?.musicId ? (
                    <FontAwesomeIcon icon={faPauseCircle} />
                  ) : (
                    <FontAwesomeIcon icon={faPlayCircle} />
                  )}
                </div>
                <div>
                  <p className="artist_name">{stream.artistName}</p>
                  <p className="artist_title">{stream.musicTitle}</p>
                </div>
              </div>
              <div className="sound_content">
                <div className="waveform_container">
                  <div id="waveform" ref={audioPlayer}></div>
                </div>
                <div className="comment_container">
                  <Image shape="rectangle" size="20px" />
                  <input
                    type="text"
                    placeholder="Write a comment"
                    className="comment_input"
                  />
                </div>
                <div
                  className="comment_list"
                  style={{
                    position: "absolute",
                    bottom: "60px",
                    left: "0",
                  }}
                >
                  {stream.commentListDtos?.map((c, idx) => {
                    const left = (Number(c.commentTime) / endTime) * 648;
                    return (
                      <div
                        className="comment_item"
                        style={{
                          position: "absolute",
                          left: left,
                        }}
                        key={idx}
                      >
                        <Image shape="rectangle" size="12px" key={idx} />
                      </div>
                    );
                  })}
                </div>

                <div
                  className="comment_list"
                  style={{
                    position: "absolute",
                    bottom: "50px",
                    left: "0",
                  }}
                >
                  {stream.commentListDtos?.map((c, idx) => {
                    const left = (Number(c.commentTime) / endTime) * 648;
                    console.log(now_playtime, c.commentTime);
                    return (
                      <div
                        className={
                          now_playtime === Number(c.commentTime) &&
                          stream.musicId === playingTrack?.musicId
                            ? "comment_item show"
                            : "comment_item"
                        }
                        style={{
                          width: "160px",
                          position: "absolute",
                          left: left,
                          display: "none",
                        }}
                        key={idx}
                      >
                        <div className="stream_comment">
                          <Text color="#FE6E00" margin="0 0.6em 0 0">
                            {c.commentUser}
                          </Text>
                          <Text>{c.commentContent}</Text>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </StreamItemBlock>
  );
};

export default StreamItem;
