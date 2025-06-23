
import React, { useState, useRef, useEffect, useCallback, memo } from "react";
import Draggable from "react-draggable";
import type { DraggableEvent, DraggableData } from "react-draggable";
import domtoimage from "dom-to-image";

interface PhotoStyleState {
  width: number;
  height: number;
  rotate: number;
  scale: number;
}

type MouseOrTouchEvent =
  | React.MouseEvent<HTMLDivElement>
  | React.TouchEvent<HTMLDivElement>;
type DocumentInteractionEvent = MouseEvent | TouchEvent;

const MIN_PHOTO_DIMENSION = 50;
const INITIAL_PHOTO_SCALE_FACTOR = 0.6;
const DEFAULT_PHOTO_DIMENSION = 200;
const DOWNLOAD_EXPORT_SCALE_FACTOR = 2;

const PhotoFrames: React.FC = () => {
  const [frameImageUrl, setFrameImageUrl] = useState<string | null>(null);
  const [userImageUrl, setUserImageUrl] = useState<string | null>(null);

  const [photoStyle, setPhotoStyle] = useState<PhotoStyleState>({
    width: DEFAULT_PHOTO_DIMENSION,
    height: DEFAULT_PHOTO_DIMENSION,
    rotate: 0,
    scale: 1,
  });
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isResizing, setIsResizing] = useState(false);
  const [isRotating, setIsRotating] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const [savedState, setSavedState] = useState<{
    position: { x: number; y: number };
    photoStyle: PhotoStyleState;
  } | null>(null);
  const [isLocked, setIsLocked] = useState(false);

  const photoRef = useRef<HTMLDivElement>(null);
  const frameBoundaryRef = useRef<HTMLDivElement>(null);

  const resetInteractionsAndSavedState = useCallback(() => {
    setSavedState(null);
    setIsLocked(false);
    setIsDownloading(false);
  }, []);

  const handleFrameUpload = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.files && event.target.files.length > 0) {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
          setFrameImageUrl(e.target?.result as string);
          resetInteractionsAndSavedState();
        };
        reader.onerror = () => {
          alert("Failed to load frame image file.");
          setFrameImageUrl(null);
        };
        reader.readAsDataURL(file);
        event.target.value = "";
      }
    },
    [resetInteractionsAndSavedState]
  );

  const handleUserPhotoUpload = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.files && event.target.files.length > 0) {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
          const dataUrl = e.target?.result as string;
          setUserImageUrl(dataUrl);
          resetInteractionsAndSavedState();

          const img = new Image();
          img.onload = () => {
            const photoAspectRatio =
              img.width > 0 && img.height > 0 ? img.width / img.height : 1;
            let newPhotoWidth = img.width;
            let newPhotoHeight = img.height;

            if (frameBoundaryRef.current) {
              const boundaryContentWidth = frameBoundaryRef.current.clientWidth;
              const boundaryContentHeight =
                frameBoundaryRef.current.clientHeight;
              const targetWidth =
                boundaryContentWidth * INITIAL_PHOTO_SCALE_FACTOR;
              const targetHeight =
                boundaryContentHeight * INITIAL_PHOTO_SCALE_FACTOR;

              if (newPhotoWidth / newPhotoHeight > targetWidth / targetHeight) {
                newPhotoWidth = targetWidth;
                newPhotoHeight = newPhotoWidth / photoAspectRatio;
              } else {
                newPhotoHeight = targetHeight;
                newPhotoWidth = newPhotoHeight * photoAspectRatio;
              }
            } else {
              if (photoAspectRatio > 1) {
                newPhotoWidth = DEFAULT_PHOTO_DIMENSION * photoAspectRatio;
                newPhotoHeight = DEFAULT_PHOTO_DIMENSION;
              } else {
                newPhotoWidth = DEFAULT_PHOTO_DIMENSION;
                newPhotoHeight = DEFAULT_PHOTO_DIMENSION / photoAspectRatio;
              }
            }

            if (
              newPhotoWidth < MIN_PHOTO_DIMENSION ||
              newPhotoHeight < MIN_PHOTO_DIMENSION
            ) {
              if (photoAspectRatio >= 1) {
                newPhotoWidth = Math.max(newPhotoWidth, MIN_PHOTO_DIMENSION);
                newPhotoHeight = newPhotoWidth / photoAspectRatio;
                if (newPhotoHeight < MIN_PHOTO_DIMENSION) {
                  newPhotoHeight = MIN_PHOTO_DIMENSION;
                  newPhotoWidth = newPhotoHeight * photoAspectRatio;
                }
              } else {
                newPhotoHeight = Math.max(newPhotoHeight, MIN_PHOTO_DIMENSION);
                newPhotoWidth = newPhotoHeight * photoAspectRatio;
                if (newPhotoWidth < MIN_PHOTO_DIMENSION) {
                  newPhotoWidth = MIN_PHOTO_DIMENSION;
                  newPhotoHeight = newPhotoWidth / photoAspectRatio;
                }
              }
            }
            newPhotoWidth = Math.max(MIN_PHOTO_DIMENSION, newPhotoWidth);
            newPhotoHeight = Math.max(MIN_PHOTO_DIMENSION, newPhotoHeight);

            const finalWidth = Math.round(newPhotoWidth);
            const finalHeight = Math.round(newPhotoHeight);

            setPhotoStyle({
              width: finalWidth,
              height: finalHeight,
              rotate: 0,
              scale: 1,
            });

            if (frameBoundaryRef.current) {
              const boundaryClientWidth = frameBoundaryRef.current.clientWidth;
              const boundaryClientHeight =
                frameBoundaryRef.current.clientHeight;
              setPosition({
                x: Math.round((boundaryClientWidth - finalWidth) / 2),
                y: Math.round((boundaryClientHeight - finalHeight) / 2),
              });
            } else {
              setPosition({ x: 0, y: 0 });
            }
          };
          img.onerror = () => {
            alert(
              "Could not process uploaded photo. Please try a different one."
            );
            setUserImageUrl(null);
          };
          img.src = dataUrl;
        };
        reader.onerror = () => {
          alert("Failed to load user photo file.");
          setUserImageUrl(null);
        };
        reader.readAsDataURL(file);
        event.target.value = "";
      }
    },
    [resetInteractionsAndSavedState]
  );

  const handleDrag = useCallback(
    (_e: DraggableEvent, data: DraggableData) => {
      if (isLocked || isDownloading) return;
      setPosition({ x: Math.round(data.x), y: Math.round(data.y) });
    },
    [isLocked, isDownloading]
  );

  const handleResize = useCallback(
    (e: MouseOrTouchEvent, direction: string) => {
      if (isLocked || isDownloading) return;
      e.preventDefault();
      e.stopPropagation();
      setIsResizing(true);
      const initialClientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const initialClientY = "touches" in e ? e.touches[0].clientY : e.clientY;
      const startWidth = photoStyle.width;
      const startHeight = photoStyle.height;
      const aspectRatio =
        startHeight === 0 || startWidth === 0 ? 1 : startWidth / startHeight;

      const onMouseMove = (moveEvent: DocumentInteractionEvent) => {
        const clientX =
          "touches" in moveEvent
            ? moveEvent.touches[0].clientX
            : moveEvent.clientX;
        const clientY =
          "touches" in moveEvent
            ? moveEvent.touches[0].clientY
            : moveEvent.clientY;
        let newWidth = startWidth;
        let newHeight = startHeight;
        const deltaX = clientX - initialClientX;
        const deltaY = clientY - initialClientY;

        if (direction.includes("e")) newWidth = startWidth + deltaX;
        if (direction.includes("w")) newWidth = startWidth - deltaX;
        if (direction.includes("s")) newHeight = startHeight + deltaY;
        if (direction.includes("n")) newHeight = startHeight - deltaY;

        if (direction.length === 2) {
          if (Math.abs(deltaX) >= Math.abs(deltaY)) {
            newHeight =
              aspectRatio === 0 || !isFinite(aspectRatio)
                ? newWidth
                : newWidth / aspectRatio;
          } else {
            newWidth =
              aspectRatio === 0 || !isFinite(aspectRatio)
                ? newHeight
                : newHeight * aspectRatio;
          }
        } else {
          if (direction.includes("e") || direction.includes("w")) {
            newHeight =
              aspectRatio === 0 || !isFinite(aspectRatio)
                ? newWidth
                : newWidth / aspectRatio;
          } else if (direction.includes("s") || direction.includes("n")) {
            newWidth =
              aspectRatio === 0 || !isFinite(aspectRatio)
                ? newHeight
                : newHeight * aspectRatio;
          }
        }

        const maxResizeDim =
          Math.max(window.innerWidth, window.innerHeight) * 2;
        let clampedWidth = Math.max(
          MIN_PHOTO_DIMENSION,
          Math.min(newWidth, maxResizeDim)
        );
        let clampedHeight =
          aspectRatio === 0 || !isFinite(aspectRatio)
            ? clampedWidth
            : clampedWidth / aspectRatio;
        if (clampedHeight < MIN_PHOTO_DIMENSION) {
          clampedHeight = MIN_PHOTO_DIMENSION;
          clampedWidth =
            aspectRatio === 0 || !isFinite(aspectRatio)
              ? clampedHeight
              : clampedHeight * aspectRatio;
        } else if (clampedHeight > maxResizeDim) {
          clampedHeight = maxResizeDim;
          clampedWidth =
            aspectRatio === 0 || !isFinite(aspectRatio)
              ? clampedHeight
              : clampedHeight * aspectRatio;
        }
        clampedWidth = Math.max(
          MIN_PHOTO_DIMENSION,
          Math.min(clampedWidth, maxResizeDim)
        );
        clampedHeight =
          aspectRatio === 0 || !isFinite(aspectRatio)
            ? clampedWidth
            : clampedWidth / aspectRatio;
        clampedHeight = Math.max(
          MIN_PHOTO_DIMENSION,
          Math.min(clampedHeight, maxResizeDim)
        );
        if (
          direction.length === 2 &&
          isFinite(aspectRatio) &&
          aspectRatio !== 0
        ) {
          if (Math.abs(deltaX) >= Math.abs(deltaY)) {
            clampedHeight = clampedWidth / aspectRatio;
          } else {
            clampedWidth = clampedHeight * aspectRatio;
          }
          clampedWidth = Math.max(
            MIN_PHOTO_DIMENSION,
            Math.min(clampedWidth, maxResizeDim)
          );
          clampedHeight = Math.max(
            MIN_PHOTO_DIMENSION,
            Math.min(clampedHeight, maxResizeDim)
          );
        }
        setPhotoStyle((prev) => ({
          ...prev,
          width: Math.round(clampedWidth),
          height: Math.round(clampedHeight),
        }));
      };
      const onMouseUp = () => {
        setIsResizing(false);
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", onMouseUp);
        document.removeEventListener("touchmove", onMouseMove);
        document.removeEventListener("touchend", onMouseUp);
      };
      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
      document.addEventListener("touchmove", onMouseMove);
      document.addEventListener("touchend", onMouseUp);
    },
    [photoStyle.width, photoStyle.height, isLocked, isDownloading]
  );

  const handleRotate = useCallback(
    (e: MouseOrTouchEvent) => {
      if (isLocked || isDownloading) return;
      e.preventDefault();
      e.stopPropagation();
      if (!photoRef.current) return;
      setIsRotating(true);
      const rect = photoRef.current.getBoundingClientRect();
      const elementCenterX = rect.left + rect.width / 2;
      const elementCenterY = rect.top + rect.height / 2;
      const initialClientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const initialClientY = "touches" in e ? e.touches[0].clientY : e.clientY;
      const startPointerAngleRad = Math.atan2(
        initialClientY - elementCenterY,
        initialClientX - elementCenterX
      );
      const startElementAngleRad = (photoStyle.rotate * Math.PI) / 180;
      const angleOffsetRad = startPointerAngleRad - startElementAngleRad;
      const onMouseMove = (moveEvent: DocumentInteractionEvent) => {
        const clientX =
          "touches" in moveEvent
            ? moveEvent.touches[0].clientX
            : moveEvent.clientX;
        const clientY =
          "touches" in moveEvent
            ? moveEvent.touches[0].clientY
            : moveEvent.clientY;
        const currentPointerAngleRad = Math.atan2(
          clientY - elementCenterY,
          clientX - elementCenterX
        );
        const newRotationRad = currentPointerAngleRad - angleOffsetRad;
        let newRotationDeg = (newRotationRad * 180) / Math.PI;
        setPhotoStyle((prev) => ({ ...prev, rotate: newRotationDeg }));
      };
      const onMouseUp = () => {
        setIsRotating(false);
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", onMouseUp);
        document.removeEventListener("touchmove", onMouseMove);
        document.removeEventListener("touchend", onMouseUp);
      };
      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
      document.addEventListener("touchmove", onMouseMove);
      document.addEventListener("touchend", onMouseUp);
    },
    [photoStyle.rotate, isLocked, isDownloading]
  );

  const handleZoom = useCallback(
    (e: React.MouseEvent<HTMLButtonElement> | WheelEvent, zoomIn: boolean) => {
      if (isLocked || isDownloading) return;
      e.preventDefault();
      setPhotoStyle((prev) => ({
        ...prev,
        scale: parseFloat(
          Math.max(
            0.1,
            Math.min(prev.scale + (zoomIn ? 0.1 : -0.1), 10)
          ).toFixed(2)
        ),
      }));
    },
    [isLocked, isDownloading]
  );

  const handleWheel = useCallback(
    (e: WheelEvent) => {
      if (isLocked || isDownloading) return;
      if (photoRef.current && photoRef.current.contains(e.target as Node)) {
        e.preventDefault();
        handleZoom(e, e.deltaY < 0);
      }
    },
    [handleZoom, isLocked, isDownloading]
  );

  useEffect(() => {
    const currentPhotoRefVal = photoRef.current;
    if (
      currentPhotoRefVal &&
      userImageUrl &&
      frameImageUrl &&
      !isLocked &&
      !isDownloading
    ) {
      currentPhotoRefVal.addEventListener("wheel", handleWheel, {
        passive: false,
      });
      return () => {
        if (currentPhotoRefVal) {
          currentPhotoRefVal.removeEventListener("wheel", handleWheel);
        }
      };
    } else if (currentPhotoRefVal && (isLocked || isDownloading)) {
      currentPhotoRefVal.removeEventListener("wheel", handleWheel);
    }
  }, [handleWheel, userImageUrl, frameImageUrl, isLocked, isDownloading]);

  const handleSaveLockToggle = useCallback(() => {
    if (isLocked) {
      setIsLocked(false);
      alert("View unlocked for editing.");
    } else {
      setSavedState({
        position: { ...position },
        photoStyle: { ...photoStyle },
      });
      setIsLocked(true);
      alert(
        "View saved and locked. You can now download or unlock to edit again."
      );
    }
  }, [isLocked, position, photoStyle]);

  const handleDownload = useCallback(async () => {
    if (!frameBoundaryRef.current || !photoRef.current) {
      alert("Required elements not found. Please ensure images are loaded.");
      return;
    }
    if (!userImageUrl || !frameImageUrl) {
      alert("Please upload both a frame and your photo.");
      return;
    }
    if (!savedState) {
      alert("Please save the view before downloading.");
      return;
    }

    setIsDownloading(true);

    const originalPhotoStyle = { ...photoStyle };
    const originalPosition = { ...position };

    setPhotoStyle(savedState.photoStyle);
    setPosition(savedState.position);

    await new Promise((resolve) => setTimeout(resolve, 100));

    const nodeToCapture = frameBoundaryRef.current;
    if (!nodeToCapture) {
      alert("Frame boundary element not found for download.");
      setIsDownloading(false);
      if (!isLocked) {
        setPhotoStyle(originalPhotoStyle);
        setPosition(originalPosition);
      }
      return;
    }

    const handles = nodeToCapture.querySelectorAll<HTMLElement>(
      ".resize-handle, .rotate-handle"
    );
    handles.forEach((handle) => (handle.style.display = "none"));

    const options = {
      bgcolor: "rgba(0,0,0,0)",
      width: nodeToCapture.offsetWidth * DOWNLOAD_EXPORT_SCALE_FACTOR,
      height: nodeToCapture.offsetHeight * DOWNLOAD_EXPORT_SCALE_FACTOR,
      style: {
        transform: `scale(${DOWNLOAD_EXPORT_SCALE_FACTOR})`,
        transformOrigin: "top left",
      },
    };

    try {
      const dataUrl = await domtoimage.toPng(nodeToCapture, options);
      const link = document.createElement("a");
      link.download = "framed-photo.png";
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Download failed using dom-to-image:", error);
      alert(
        `Download failed: ${
          error instanceof Error ? error.message : String(error)
        }`
      );
    } finally {
      handles.forEach((handle) => (handle.style.display = ""));
      if (!isLocked) {
        setPhotoStyle(originalPhotoStyle);
        setPosition(originalPosition);
      }
      setIsDownloading(false);
    }
  }, [savedState, userImageUrl, frameImageUrl, isLocked, photoStyle, position]);

  const imagesUploaded = userImageUrl && frameImageUrl;
  let placeholderMessage = "Upload a frame and your photo to begin.";
  if (frameImageUrl && !userImageUrl)
    placeholderMessage = "Now, upload your photo.";
  else if (!frameImageUrl && userImageUrl)
    placeholderMessage = "Please upload a frame image.";

  const currentDisplayPosition =
    isLocked && savedState ? savedState.position : position;
  const currentDisplayPhotoStyle =
    isLocked && savedState ? savedState.photoStyle : photoStyle;

  const interactiveImageRendering =
    currentDisplayPhotoStyle.scale > 1.5 ? "auto" : "pixelated";
  const finalImageRendering = isDownloading
    ? "auto"
    : interactiveImageRendering;

  return (
    <div className="font-sans photo-frame-app-container p-6 sm:p-8 bg-[#232323] min-h-screen flex flex-col items-center text-[#E0E0E0]">
      <h3 className="text-3xl sm:text-4xl font-bold mb-8 sm:mb-10 text-center">
        Zoom Photo <span style={{ color: "#fcda00" }}>Studio</span>
      </h3>
      <div className="mb-8 flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6 w-full">
        {[
          {
            id: "frameUpload",
            label: frameImageUrl ? "Change Frame" : "Upload Frame",
            action: handleFrameUpload,
          },
          {
            id: "photoUpload",
            label: userImageUrl ? "Change Photo" : "Upload Photo",
            action: handleUserPhotoUpload,
          },
        ].map((upload) => (
          <div key={upload.id}>
            <label
              htmlFor={upload.id}
              className="inline-block text-center px-6 py-3 bg-transparent border-2 border-[#fcda00] text-[#fcda00] rounded-md shadow-sm hover:bg-[#fcda00] hover:text-[#232323] transition-colors duration-200 cursor-pointer text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#fcda00] focus:ring-offset-2 focus:ring-offset-[#232323]"
            >
              {upload.label}
            </label>
            <input
              type="file"
              id={upload.id}
              accept="image/*"
              onChange={upload.action}
              className="hidden"
            />
          </div>
        ))}
      </div>
      <div
        ref={frameBoundaryRef}
        className="photo-frame-boundary relative w-[350px] h-[350px] sm:w-[450px] sm:h-[450px] md:w-[500px] md:h-[500px] bg-[#2D2D2D] shadow-xl overflow-hidden flex justify-center items-center"
      >
        {imagesUploaded &&
        currentDisplayPosition &&
        currentDisplayPhotoStyle ? (
          <>
            {frameImageUrl && (
              <img
                src={frameImageUrl}
                alt="Decorative Frame"
                className="absolute inset-0 w-full h-full object-contain pointer-events-none z-20"
                onError={() => {
                  alert("Frame image error.");
                  setFrameImageUrl(null);
                }}
              />
            )}
            {userImageUrl && (
              <Draggable
                nodeRef={photoRef as React.RefObject<HTMLElement>}
                position={currentDisplayPosition}
                onDrag={handleDrag}
                disabled={isLocked || isResizing || isRotating || isDownloading}
                bounds="parent"
              >
                <div
                  ref={photoRef}
                  className={`photo-manipulator-container absolute select-none z-10 ${
                    isLocked || isDownloading ? "cursor-default" : "cursor-grab"
                  }`}
                  style={{
                    width: currentDisplayPhotoStyle.width,
                    height: currentDisplayPhotoStyle.height,
                    transform: `rotate(${currentDisplayPhotoStyle.rotate}deg) scale(${currentDisplayPhotoStyle.scale})`,
                    transformOrigin: "center center",
                    transition:
                      isResizing || isRotating || isDownloading
                        ? "none"
                        : "transform 0.1s ease-out, width 0.1s ease-out, height 0.1s ease-out",
                    imageRendering: finalImageRendering,
                  }}
                >
                  <img
                    src={userImageUrl}
                    alt="User photo"
                    className="user-photo w-full h-full object-contain pointer-events-none"
                    style={{
                      imageRendering: finalImageRendering,
                    }}
                    onError={() => {
                      alert("User photo error.");
                      setUserImageUrl(null);
                    }}
                  />
                  {!(isLocked || isDownloading) && (
                    <>
                      {["nw", "ne", "sw", "se"].map((dir) => (
                        <div
                          key={dir}
                          className="resize-handle absolute w-5 h-5 rounded-sm z-30 border-2 border-[#232323] transition-transform hover:scale-125"
                          style={{
                            backgroundColor: "#fcda00",
                            top: dir.includes("n") ? "-10px" : undefined,
                            bottom: dir.includes("s") ? "-10px" : undefined,
                            left: dir.includes("w") ? "-10px" : undefined,
                            right: dir.includes("e") ? "-10px" : undefined,
                            cursor: `${dir}-resize`,
                          }}
                          onMouseDown={(e) => handleResize(e, dir)}
                          onTouchStart={(e) => handleResize(e, dir)}
                          role="button"
                          aria-label={`Resize ${dir}`}
                          tabIndex={0}
                        />
                      ))}
                      <div
                        className="rotate-handle absolute w-5 h-5 rounded-full z-30 border-2 border-[#232323] cursor-alias transition-transform hover:scale-125"
                        style={{
                          top: -25,
                          left: "calc(50% - 10px)",
                          backgroundColor: "#fcda00",
                        }}
                        onMouseDown={handleRotate}
                        onTouchStart={handleRotate}
                        role="button"
                        aria-label="Rotate handle"
                        tabIndex={0}
                      />
                    </>
                  )}
                </div>
              </Draggable>
            )}
          </>
        ) : (
          <div className="flex justify-center items-center h-full p-4">
            <p className="text-[#A0A0A0] text-lg text-center leading-relaxed">
              {placeholderMessage}
            </p>
          </div>
        )}
      </div>
      <div className="controls mt-8 sm:mt-10 flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4 w-full">
        <button
          key="save-lock-toggle-btn"
          className={`px-6 py-3 text-sm font-bold rounded-md shadow-md transition-all duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#232323] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:hover:scale-100 ${
            isLocked
              ? "bg-orange-500 hover:bg-orange-600 focus:ring-orange-400 text-white"
              : "bg-[#fcda00] text-[#232323] hover:bg-yellow-400 focus:ring-yellow-300"
          }`}
          onClick={handleSaveLockToggle}
          aria-label={
            isLocked ? "Unlock and edit view" : "Save and lock current view"
          }
          disabled={!imagesUploaded || isDownloading}
        >
          {isLocked ? "Unlock & Edit View" : "Save & Lock View"}
        </button>
        <button
          key="download-btn"
          className={`px-6 py-3 text-sm font-bold bg-[#fcda00] text-[#232323] rounded-md shadow-md hover:bg-yellow-400 focus:bg-yellow-400 transition-all duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:ring-offset-2 focus:ring-offset-[#232323] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:hover:scale-100`}
          onClick={handleDownload}
          aria-label="Download framed photo"
          disabled={!imagesUploaded || !savedState || isDownloading}
        >
          {isDownloading ? "Downloading..." : "Download"}
        </button>
      </div>
      <footer className="mt-10 sm:mt-12 text-center text-xs text-[#707070]">
        <p>© {new Date().getFullYear()} Zoom Photo Studio.</p>
      </footer>
    </div>
  );
};
export default memo(PhotoFrames);
