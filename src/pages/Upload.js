import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import apis from '../api/api';

import TemplateRyu from '../common/TemplateRyu';

const Upload = props => {
    const [musicFile, setMusicFile] = useState(null);

    const title = useRef();
    const artist = useRef();
    const category = useRef();

    const [imgBase64, setImgBase64] = useState([]);
    const [imgFile, setImgFile] = useState(null);

    const handleMusicFile = event => {
        if (!event.target.files) window.alert('음악파일을 선택해주세요');
        setMusicFile(event.target.files);
    };

    const handleImageFile = event => {
        console.log(event.target.files);
        setImgFile(event.target.files);
        setImgBase64([]);

        for (var i = 0; i < event.target.files.length; i++) {
            if (event.target.files[i]) {
                let reader = new FileReader();
                reader.readAsDataURL(event.target.files[i]);
                reader.onloadend = () => {
                    const base64 = reader.result;
                    console.log(base64);
                    if (base64) {
                        var base64Sub = base64.toString();

                        setImgBase64(imgBase64 => [...imgBase64, base64Sub]);
                    }
                };
            }
        }
    };

    const WriteBoard = async () => {
        const fd = new FormData();

        const music = musicFile[0];
        const musicTitle = title.current.value;
        const artistName = artist.current.value;
        const musicCategory = category.current.value;

        if (!music || !musicTitle || !artistName || !musicCategory) {
            window.alert('모든 필드를 입력해야 합니다');
        }

        fd.append('music', music);
        fd.append('musicTitle', musicTitle);
        fd.append('artistName', artistName);
        fd.append('musicCategory', musicCategory);

        Object.values(imgFile).forEach(file => fd.append('image', file));

        await apis
            .post('/music', fd, {
                headers: {
                    'Content-Type': `multipart/form-data; `,
                },
            })
            .then(res => {
                if (res.data) {
                    console.log(res.data);
                }
                props.history.replace('/');
            })
            .catch(err => console.log(err));
    };

    return (
        <TemplateRyu>
            <div style={{ height: '90px' }}></div>
            <UploadBox>
                {!musicFile ? (
                    <>
                        <TitleBtnContainer>
                            <h1
                                style={{
                                    fontSize: '22px',
                                    fontFamily: 'Interstate',
                                    fontWeight: '350',
                                }}
                            >
                                Drag and drop your tracks & albums here
                            </h1>
                            <BtnMusicUpload htmlFor="music">
                                or choose files to upload
                            </BtnMusicUpload>
                            <input
                                style={{ display: 'none' }}
                                type="file"
                                id="music"
                                onChange={handleMusicFile}
                                multiple="multiple"
                                name="multipartFile"
                            />
                        </TitleBtnContainer>
                        <aside style={{ fontSize: '12px' }}>
                            Provide FLAC, WAV, ALAC, or AIFF for highest audio
                            quality.
                        </aside>{' '}
                    </>
                ) : (
                    <>
                        <InfoContainer>
                            <div style={{ position: 'relative' }}>
                                <ImageUploader htmlFor="image">
                                    Upload image
                                </ImageUploader>
                                <input
                                    style={{ display: 'none' }}
                                    type="file"
                                    id="image"
                                    onChange={handleImageFile}
                                    multiple="multiple"
                                    name="image"
                                />
                                <ImgPre src={imgBase64[0]}></ImgPre>
                            </div>
                            <InputWrapper>
                                <InputContainer>
                                    <span>Title</span>
                                    <TextInput ref={title}></TextInput>
                                </InputContainer>
                                <InputContainer>
                                    <span>artist</span>
                                    <TextInput ref={artist}></TextInput>
                                </InputContainer>
                                <InputContainer>
                                    <span>category</span>
                                    <Category ref={category}>
                                        <option value={'rock'}>rock</option>
                                        <option value={'hiphop'}>hiphop</option>
                                    </Category>
                                </InputContainer>
                            </InputWrapper>
                        </InfoContainer>
                        <SubmitBox>
                            <BtnCancle
                                onClick={() => props.history.replace('/')}
                            >
                                Cancle
                            </BtnCancle>
                            <BtnSave onClick={WriteBoard}>Save</BtnSave>
                        </SubmitBox>
                    </>
                )}
            </UploadBox>
        </TemplateRyu>
    );
};

const InfoContainer = styled.div`
    display: flex;
    padding: 14px 25px 0;
`;

const ImageUploader = styled.label`
    cursor: pointer;
    position: absolute;
    bottom: 10%;
    padding: 2px 11px 2px 10px;
    font-size: 14px;
    left: 30%;
    color: #333;
    border-color: rgba(0, 0, 0, 0.3);
    background-color: #e5e5e5;
    border-radius: 3px;
`;

const ImgPre = styled.img`
    width: 260px;
    height: 260px;
    background-color: black;
`;

const InputWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex: 1;
`;

const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-left: 20px;
`;

const TextInput = styled.input`
    width: 100%;
    padding: 2px 7px;
    border-radius: 4px;
    border: 1px solid #ccc;
    transition: border-color 0.1s;
`;

const Category = styled.select`
    padding: 2px 7px;
    border-radius: 4px;
    border: 1px solid #ccc;
    transition: border-color 0.1s;
`;

const SubmitBox = styled.div`
    display: flex;
    justify-content: flex-end;
    border-top: 1px solid #f2f2f2;
    margin-top: 20px;
    padding: 20px;
`;

const UploadBox = styled.div`
    border: 1px solid #f2f2f2;
    border-radius: 2px;
    margin: -30px auto 0;
    padding: 30px 0 0 0;
    width: 800px;
    box-shadow: 0 2px 12px -5px rgba(0, 0, 0, 0.1);
    text-align: center;
`;

const BtnCancle = styled.button`
    margin-right: 20px;
    height: 26px;
    font-size: 14px;
    line-height: 20px;
    white-space: nowrap;
    font-family: Interstate, Lucida Grande, Lucida Sans Unicode, Lucida Sans,
        Garuda, Verdana, Tahoma, sans-serif;
    font-weight: 100;
    text-align: center;
    vertical-align: baseline;
`;

const BtnSave = styled.button`
    height: 26px;
    padding: 2px 11px 2px 10px;
    border: 1px solid #e5e5e5;
    border-radius: 3px;
    font-size: 14px;
    line-height: 20px;
    white-space: nowrap;
    font-family: Interstate, Lucida Grande, Lucida Sans Unicode, Lucida Sans,
        Garuda, Verdana, Tahoma, sans-serif;
    font-weight: 100;
    text-align: center;
    vertical-align: baseline;
    background-color: #f50;
    border-color: #f50;
    color: #fff;
`;

const TitleBtnContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 100px 0;
`;

const BtnMusicUpload = styled.label`
    cursor: pointer;
    display: block;
    margin: 16px 0 12px;
    width: 300px;
    background-color: #f50;
    border-color: #f50;
    color: #fff;
    font-size: 16px;
    line-height: 18px;
    padding: 10px 15px;
    height: 40px;
    border-radius: 3px;
`;

export default Upload;
