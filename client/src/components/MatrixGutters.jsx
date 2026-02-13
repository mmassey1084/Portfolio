import { useEffect, useRef, useState } from "react";

export default function MatrixGutters({
  gutterWidthPx = 80, 
  characterFontSize = 16,
  fallSpeedMultiplier = 0.9,
  characterOpacity = 0.55,
  zIndex = 0,
  minDesktopWidthPx = 1024,
}) {
  const leftGutterCanvasRef = useRef(null);
  const rightGutterCanvasRef = useRef(null);
  const animationFrameRef = useRef(null);

  const [isDesktopViewport, setIsDesktopViewport] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.innerWidth >= minDesktopWidthPx;
  });


  useEffect(() => {
    const handleResize = () => {
      setIsDesktopViewport(window.innerWidth >= minDesktopWidthPx);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [minDesktopWidthPx]);

  useEffect(() => {
 
    const leftCanvas = leftGutterCanvasRef.current;
    const rightCanvas = rightGutterCanvasRef.current;

    if (!isDesktopViewport) {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);

      [leftCanvas, rightCanvas].forEach((canvas) => {
        if (!canvas) return;
        const context = canvas.getContext("2d");
        context.clearRect(0, 0, canvas.width, canvas.height);
      });

      return;
    }

    const characterSet =
      "アイウエオカキクケコサシスセソタチツテトナニヌネノ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ#$%&*+<>";

    const canvases = [leftCanvas, rightCanvas].filter(Boolean);
    const canvasContexts = canvases.map((canvas) => canvas.getContext("2d"));

    let dropPositionsPerCanvas = [];

    const resizeCanvases = () => {
      const viewportHeight = window.innerHeight;

      canvases.forEach((canvas) => {
        const devicePixelRatio = window.devicePixelRatio || 1;

        canvas.style.width = `${gutterWidthPx}px`;
        canvas.style.height = `${viewportHeight}px`;
        canvas.width = Math.floor(gutterWidthPx * devicePixelRatio);
        canvas.height = Math.floor(viewportHeight * devicePixelRatio);

        const context = canvas.getContext("2d");
        context.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
        context.font = `${characterFontSize}px monospace`;
        context.textBaseline = "top";
      });

      dropPositionsPerCanvas = canvases.map(() => {
        const columnCount = Math.floor(gutterWidthPx / characterFontSize);
        return Array.from({ length: columnCount }, () => Math.floor(Math.random() * 40));
      });
    };

    const drawFrame = () => {
      canvasContexts.forEach((context, canvasIndex) => {
        const viewportHeight = window.innerHeight;
        const columnCount = dropPositionsPerCanvas[canvasIndex].length;

        // Fade previous frame for trail effect
        context.fillStyle = "rgba(0, 0, 0, 0.12)";
        context.fillRect(0, 0, gutterWidthPx, viewportHeight);

        context.fillStyle = `rgba(120, 255, 120, ${characterOpacity})`;
        context.font = `${characterFontSize}px monospace`;

        for (let columnIndex = 0; columnIndex < columnCount; columnIndex++) {
          const randomCharacter =
            characterSet[Math.floor(Math.random() * characterSet.length)];

          const xPosition = columnIndex * characterFontSize;
          const yPosition =
            dropPositionsPerCanvas[canvasIndex][columnIndex] * characterFontSize;

          context.fillText(randomCharacter, xPosition, yPosition);

          if (yPosition > viewportHeight && Math.random() > 0.975) {
            dropPositionsPerCanvas[canvasIndex][columnIndex] = 0;
          }

          dropPositionsPerCanvas[canvasIndex][columnIndex] += fallSpeedMultiplier;
        }
      });

      animationFrameRef.current = requestAnimationFrame(drawFrame);
    };

    resizeCanvases();
    drawFrame();
    window.addEventListener("resize", resizeCanvases);

    return () => {
      window.removeEventListener("resize", resizeCanvases);
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [
    isDesktopViewport,
    gutterWidthPx,
    characterFontSize,
    fallSpeedMultiplier,
    characterOpacity,
  ]);

  
  if (!isDesktopViewport) return null;

  return (
    <>
      <canvas
        ref={leftGutterCanvasRef}
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          pointerEvents: "none",
          zIndex,
        }}
      />
      <canvas
        ref={rightGutterCanvasRef}
        style={{
          position: "fixed",
          right: 0,
          top: 0,
          pointerEvents: "none",
          zIndex,
        }}
      />
    </>
  );
}

