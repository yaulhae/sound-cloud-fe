import { useEffect } from "react";
import styled from "styled-components";
import WaveSurfer from "wavesurfer.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlayCircle,
  faStopCircle,
  faVolumeXmark,
  faAnglesRight,
} from "@fortawesome/free-solid-svg-icons";
import ReactAudioPlayer from "react-audio-player";
import music from "./y2mate.com-IFeelItComing.mp3";

const AppBlock = styled.div`
  #waveform {
    margin-top: 100px;
    cursor: pointer;
    :hover {
      opacity: 0.5;
    }
  }
  .play_icon {
    color: #f50;
    margin-right: 0.2em;
  }
`;

function Test() {
  var wavesurfer;

  useEffect(() => {
    wavesurfer = WaveSurfer.create({
      container: "#waveform",
      progressColor: "#FF5C00",
      waveColor: "#bdbdbd",
      cursorColor: "rgba(0,0,0,0.2)",
      barWidth: 4,
      fillParent: true,
      height: 50,
      scrollParent: false,
    });

    wavesurfer.on("ready", function () {
      wavesurfer.play();
    });

    wavesurfer.load(music);
    console.log(setInterval(() => wavesurfer.getCurrentTime(), 1000));
    console.log(wavesurfer.getCursorColor());
    console.log(wavesurfer.getDuration());
  });

  return (
    <AppBlock>
      <div id="waveform"></div>
      <div className="play_icon">
        <FontAwesomeIcon
          icon={faPlayCircle}
          size="3x"
          onClick={() => wavesurfer.play()}
        />

        <FontAwesomeIcon
          icon={faStopCircle}
          size="3x"
          onClick={() => wavesurfer.pause()}
        />

        <FontAwesomeIcon
          icon={faVolumeXmark}
          size="3x"
          onClick={() => wavesurfer.toggleMute()}
        />

        <FontAwesomeIcon
          icon={faAnglesRight}
          size="3x"
          onClick={() => wavesurfer.skipForward()}
        ></FontAwesomeIcon>
      </div>
    </AppBlock>
  );
}

export default Test;
