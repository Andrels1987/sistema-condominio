import React, { useState } from "react";
import Webcam from "react-webcam";

const videoConstraints = {
  width: 150,
  height: 150,
  facingMode: "environment",
};

const Profile = ({ setData, data }) => {
  const [isLigada, setIsLigada] = useState(false);
  const webcamRef = React.useRef(null);
  const capture = React.useCallback(() => {
    const pictureSrc = webcamRef.current.getScreenshot();
    setData(pictureSrc);
  });

  return (
    <div className="picture">
      <div>
        {!isLigada ? (
          <img src="../../logo192.png" alt="logo" />
        ) : data === "" ? (
          <Webcam
            className="webcam"
            audio={false}
            height={200}
            ref={webcamRef}
            width={200}
            screenshotFormat="image/jpeg"
            videoConstraints={videoConstraints}
          />
        ) : (
          <img src={data} alt="face" />
        )}
      </div>

      <div>
        {data !== "" ? (
          <button
            onClick={(e) => {
              e.preventDefault();
              setData("");
              setIsLigada(true);
            }}
            className="btn btn-primary"
          >
            Tentar novamente
          </button>
        ) : (
          <div className="btn_capturar">
            <button
              onClick={(e) => {
                e.preventDefault();
                setIsLigada(!isLigada);
              }}
              className="btn btn-danger"
            >
              {isLigada ? "Desligar Camera" : "Ligar Camera"}
            </button>
            <button
              disabled={!isLigada}
              onClick={(e) => {
                e.preventDefault();
                capture();
              }}
              className="btn btn-danger"
            >
              Tirar foto
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
