//_ server component -> client component 로 전환
"use client";

import { useRef, useState } from "react";
import Image from "next/image";

import classes from "./image-picker.module.css";

export default function ImagePicker({ label, name }) {
  //_ useState --> client 측 (상단에 'use client' 추가)
  const [pickedImage, setPickedImage] = useState();
  const imageInput = useRef(); // html 태그와 연결하기 위해

  //_ 함수 --> client 측 (상단에 'use client' 추가)
  function handlePickClick() {
    // .current : 실제로 연결된 요소에 접근가능하게 함
    imageInput.current.click();
  }

  function handleImageChange(event) {
    // event.target -> input 태그
    const file = event.target.files[0];

    if (!file) {
      setPickedImage(null);
      return;
    }

    // FileReader : JS 내장 클래스
    const fileReader = new FileReader();

    // data URL 얻기
    fileReader.onload = () => {
      // fileReader.result(data URL)에 접근한 결과로 state에 저장
      setPickedImage(fileReader.result);
    };

    fileReader.readAsDataURL(file);
  }

  return (
    <div className={classes.picker}>
      <label htmlFor={name}>{label}</label>
      <div className={classes.controls}>
        <div className={classes.preview}>
          {!pickedImage && <p>No image picked yet.</p>}
          {pickedImage && (
            <Image
              src={pickedImage}
              alt="The image selected by the user."
              fill // 크기 높이 알 수 없으므로
            />
          )}
        </div>

        <input
          className={classes.input}
          type="file"
          id={name}
          accept="image/png, image/jpeg"
          name={name}
          ref={imageInput}
          onChange={handleImageChange}
          required // 필수 (이미지 선택되지 않은 경우, form 제출 불가)
          // multiple 속성 추가하면 여러 이미지 선택가능
        />

        <button
          className={classes.button}
          type="button"
          // button type 으로 설정해야 주변 form 을 제출하지 않음
          onClick={handlePickClick}
        >
          Pick an Image
        </button>
      </div>
    </div>
  );
}
