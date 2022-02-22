import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import WaveSurfer from 'wavesurfer.js';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause } from '@fortawesome/free-solid-svg-icons';

import '../waveForm.css';

import formatTime from '../common/formatTime';

const WaveForm = props => {
    const music = useSelector(({ music }) => music?.music?.music);

    const player = useRef(null);

    const [isPlaying, setIsPlaying] = useState(false);
    const [duration, setDuration] = useState(0);
    const [curTime, setCurTime] = useState('0:00');

    useEffect(() => {
        player.current = WaveSurfer.create({
            container: player.current,
            barWidth: 2,
            barRadius: 1,
            barGap: 2,
            barMinHeight: 1,
            cursorWidth: 1,
            // backend: 'MediaElementWebAudio',  이 녀석 때문에 에러났음
            backend: 'WebAudio',
            height: 180,
            progressColor: '#FE6E00',
            responsive: true,
            waveColor: '#C4C4C4',
            cursorColor: 'transparent',
        });

        player.current.load(music?.musicUrl || 'url');

        player.current?.on('ready', () => {
            setDuration(formatTime(player.current?.getDuration()));
        });

        player.current?.on('audioprocess', function () {
            setCurTime(formatTime(player.current.getCurrentTime()));
        });
    }, []);

    const handlePlay = () => {
        setIsPlaying(!isPlaying);
        if (!isPlaying) {
            console.log('play');
            player.current.play();
        } else {
            console.log('pause');
            player.current.pause();
        }
    };

    console.log(music);

    return (
        <WaveformContianer>
            <PlayButton onClick={handlePlay}>
                {!isPlaying ? (
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
    -webkit-box-reflect: below 1px -webkit-gradient(linear, left top, left
                bottom, from(transparent), color-stop(0.7, #ffffff00), to(rgb(255
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
