import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import apis from '../api/api';

import Template from '../common/Template';

const Upload = props => {
    const [musicFile, setMusicFile] = useState(null);

    const title = useRef();
    const artist = useRef();
    const category = useRef();

    const [imgBase64, setImgBase64] = useState([]);
    const [imgFile, setImgFile] = useState(null);

    const handleMusicFile = event => {
        console.log(event.target.files);
        setMusicFile(event.target.files);
    };

    const handleImageFile = event => {
        console.log(event.target.files);
        setImgFile(event.target.files);
        //fd.append("file", event.target.files)
        setImgBase64([]);
        for (var i = 0; i < event.target.files.length; i++) {
            if (event.target.files[i]) {
                let reader = new FileReader();
                reader.readAsDataURL(event.target.files[i]); // 1. 파일을 읽어 버퍼에 저장합니다.
                // 파일 상태 업데이트
                reader.onloadend = () => {
                    // 2. 읽기가 완료되면 아래코드가 실행됩니다.
                    const base64 = reader.result;
                    console.log(base64);
                    if (base64) {
                        //  images.push(base64.toString())
                        var base64Sub = base64.toString();

                        setImgBase64(imgBase64 => [...imgBase64, base64Sub]);
                        //  setImgBase64(newObj);
                        // 파일 base64 상태 업데이트
                        //  console.log(images)
                    }
                };
            }
        }
    };

    const WriteBoard = async () => {
        const fd = new FormData();

        fd.append('music', musicFile[0]);
        fd.append('musicTitle', title.current.value);
        fd.append('artistName', artist.current.value);
        fd.append('musicCategory', category.current.value);
        Object.values(imgFile).forEach(file => fd.append('image', file));

        // FormData의 key 확인
        for (let key of fd.keys()) {
            console.log(key);
        }

        // FormData의 value 확인
        for (let value of fd.values()) {
            console.log(value);
        }

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
            })
            .catch(err => console.log(err));
    };

    return (
        <Template>
            <FormContainer>
                <label htmlFor="multipartFile">음악</label>
                <input
                    type="file"
                    id="music"
                    onChange={handleMusicFile}
                    multiple="multiple"
                    name="multipartFile"
                />
                <label htmlFor="image">이미지</label>
                <input
                    type="file"
                    id="image"
                    onChange={handleImageFile}
                    multiple="multiple"
                    name="image"
                />
                <input name="text" id="title" placeholder="Title" ref={title} />
                <input
                    name="text"
                    id="artist"
                    placeholder="artist"
                    ref={artist}
                />
                <input
                    name="text"
                    id="category"
                    placeholder="category"
                    ref={category}
                />
                <button
                    onClick={WriteBoard}
                    style={{
                        border: '2px solid black',
                        width: '700px',
                        fontSize: '40px',
                    }}
                >
                    {imgBase64.map(item => {
                        return (
                            <img
                                src={item}
                                style={{ width: '100%', height: 'auto' }}
                                alt="미리보기"
                            />
                        );
                    })}
                    작성완료
                </button>
            </FormContainer>
        </Template>
    );
};

// form-data 형식 (Key : Value)
// multipartFile : ${음악파일}//
// musicTitle : ${타이틀명}//
// artistName : ${아티스트명}//
// musicCategory : ${음악카테고리}//
// imageUrl : ${이미지파일}

const FormContainer = styled.div`
    margin-top: 70px;
`;

export default Upload;
