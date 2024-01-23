import React, { useEffect, useRef } from 'react';

interface FaceTrackerComponentProps {
  videoEl: React.RefObject<HTMLVideoElement>;
}

export const FaceTracker: React.FC<FaceTrackerComponentProps> = ({
  videoEl,
}) => {
  const timeout = useRef<NodeJS.Timeout>();
  const faceTracker = useRef<HTMLDivElement>(null);
  const sdk_w = useRef<number>();
  const sdk_h = useRef<number>();

  useEffect(() => {
    function handleFaceEvents(evt: CustomEvent) {
      if (evt.detail && evt.detail.rects && evt.detail.rects.length > 0) {
        const $vid = videoEl.current;
        if (!$vid || !faceTracker.current) return;

        const scale_w = $vid.offsetWidth / sdk_w.current!;
        const scale_h = $vid.offsetHeight / sdk_h.current!;

        const y_diff = $vid.offsetHeight - sdk_h.current! * 2;
        const x_diff = $vid.offsetWidth - sdk_w.current! * 2;

        const offset_x = Math.round(x_diff / 2);
        const offset_y = Math.round(y_diff / 2);
        faceTracker.current.style.width =
          Math.round(evt.detail.rects[0].width * scale_w) + 'px';
        faceTracker.current.style.height =
          Math.round(evt.detail.rects[0].height * scale_h) + 'px';
        faceTracker.current.style.top =
          Math.round(evt.detail.rects[0].y * scale_h) +
          (y_diff > x_diff ? offset_y : 0) +
          'px';
        faceTracker.current.style.left =
          Math.round(evt.detail.rects[0].x * scale_w) +
          (y_diff < x_diff ? offset_x : 0) +
          'px';
        faceTracker.current.style.display = 'block';
        resetTimeout();
      }
    }

    function setSdkDimensions(evt: CustomEvent) {
      sdk_w.current = evt.detail.width;
      sdk_h.current = evt.detail.height;
    }

    function resetTimeout() {
      if (timeout.current) clearTimeout(timeout.current);
      timeout.current = setTimeout(() => {
        setAllToZero();
      }, 3000);
    }

    function setAllToZero() {
      if (faceTracker.current) faceTracker.current.style.display = 'none';
    }

    if (videoEl.current) {
      window.addEventListener(
        'CY_FACE_DETECTOR_RESULT',
        handleFaceEvents as EventListener
      );
      window.addEventListener(
        'CY_CAMERA_RESULT',
        setSdkDimensions as EventListener
      );
    }

    return () => {
      window.removeEventListener(
        'CY_FACE_DETECTOR_RESULT',
        handleFaceEvents as EventListener
      );
      window.removeEventListener(
        'CY_CAMERA_RESULT',
        setSdkDimensions as EventListener
      );
    };
  }, [videoEl]);

  return (
    <>
      <div style={{ position: 'absolute', border: '2px solid #ff871d3b' }}>
        <div
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            left: 0,
            top: 0,
          }}
          ref={faceTracker}
        ></div>
      </div>
    </>
  );
};
