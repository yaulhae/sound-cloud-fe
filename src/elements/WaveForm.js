import React, { Component } from "react";
import styled from "styled-components";
import WaveSurfer from "wavesurfer.js";

import "../waveForm.css";

class Waveform extends Component {
  state = {
    playing: false,
    duration: 0,
    curTime: 0,
  };

  componentDidMount() {
    const track = document.querySelector("#track");
    const container = document.querySelector("#waveform");

    this.waveform = WaveSurfer.create({
      container: container,
      barWidth: 2,
      barRadius: 1,
      barGap: 2,
      barMinHeight: 1,
      cursorWidth: 1,
      backend: "WebAudio",
      height: 180,
      progressColor: "#FE6E00",
      responsive: true,
      waveColor: "#C4C4C4",
      cursorColor: "transparent",
    });

    this.waveform.load(track);

    this.waveform.on("ready", () => {
      const h = parseInt(this.waveform.getDuration() / 3600)
        ? parseInt(this.waveform.getDuration() / 3600) + " :"
        : "";
      const m = parseInt((this.waveform.getDuration() % 3600) / 60);
      const s = parseInt(this.waveform.getDuration() % 60);
      this.setState({ duration: `${h} ${m} : ${s}` });
    });

    setInterval(() => {
      if (this.state.playing) {
        this.setState({
          curTime: parseInt(this.waveform.getCurrentTime()),
        });
        console.log(this.state.curTime);
      }
    }, 1000);
  }

  handlePlay = () => {
    this.setState({ playing: !this.state.playing });
    !this.state.playing ? this.waveform.play() : this.waveform.pause();
  };

  render() {
    const url = "/sample/03 너의 우주.mp3";

    return (
      <WaveformContianer>
        <PlayButton onClick={this.handlePlay}>
          {!this.state.playing ? "Play" : "Pause"}
        </PlayButton>
        <Wave id="waveform" />
        <audio id="track" src={url} />
        <CurTimeLabel>{this.state.curTime}</CurTimeLabel>
        <DurationLabel>{this.state.duration}</DurationLabel>
      </WaveformContianer>
    );
  }
}
const PlayButton = styled.button`
  position: absolute;
  top: 20px;
  left: 0px;
  opacity: 1;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: none;
  outline: none;
  cursor: pointer;
  padding-bottom: 3px;
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
  left: 1px;
  z-index: 2;
`;
const DurationLabel = styled.div`
  position: absolute;
  right: 1px;
  z-index: 2;
`;

export default Waveform;
