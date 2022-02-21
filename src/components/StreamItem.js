import styled from "styled-components";
import React, { useEffect, useRef } from "react";
import { Image, Text } from "../elements";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPauseCircle, faPlayCircle } from "@fortawesome/free-solid-svg-icons";
import WaveSurfer from "wavesurfer.js";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getPlayer, isPlaying } from "../redux/track";
import { useSelector } from "react-redux";
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
    margin-bottom: 1em;
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
    height: 60px;
    position: relative;
  }
`;

const StreamItem = ({ stream }) => {
  const audioPlayer = useRef(null);
  const playingTrack = useSelector(({ track }) => track.now_playing);
  const dispatch = useDispatch();

  useEffect(() => {
    audioPlayer.current = WaveSurfer.create({
      container: audioPlayer.current,
      waveColor: "#666666",
      progressColor: "#FF5C00",
      cursorColor: "white",
      barWidth: 1.5,
      height: 60,
      width: 100,
      barRadius: true,
      barGap: 1.5,
      scrollParent: false,
    });

    audioPlayer.current.load(stream.musicUrl);
  }, []);

  const playToggle = () => {
    if (stream.musicId === playingTrack?.musicId) {
      audioPlayer.current?.pause();
      dispatch(isPlaying(null));
      // dispatch(getPlayer(null));
      return;
    }
    dispatch(isPlaying(stream));
    // dispatch(getPlayer(audioPlayer.current));
  };

  if (stream.musicId === playingTrack?.musicId) {
    audioPlayer.current.play();
    // let timer = setInterval(
    //   () => console.log(audioPlayer.current.getCurrentTime()),
    //   1000
    // );
    // console.log(audioPlayer.current.getDuration());
  } else {
    audioPlayer.current?.pause();
    // clearInterval(timer);
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
              <div>
                <div id="waveform" ref={audioPlayer}></div>
                {/* <img
                  alt="음파음파"
                  src="https://ifh.cc/g/vHkMNs.png"
                  style={{
                    width: "100%",
                    height: "112px",
                  }}
                /> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </StreamItemBlock>
  );
};

export default StreamItem;
