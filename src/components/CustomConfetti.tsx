import Confetti from "react-confetti";

function CustomConfetti({
  width,
  height,
  drawHearts = false,
}: {
  width: number;
  height: number;
  drawHearts?: boolean;
}) {
  return (
    <Confetti
      width={width}
      height={height}
      colors={
        drawHearts
          ? ["#FF6B6B", "#FF9A8D", "#FF8A80", "#FFB6A5", "#FF7F50", "#f73b3b"]
          : ["#FDD017", "#f2d5a6", "#D4AF37", "#b7a46e", "#CD7F32", "#B68D40"]
      }
      drawShape={
        drawHearts
          ? (ctx) => {
              // Central point and scale factor
              const centerX = 0;
              const centerY = 0;
              const scale = 30; // Smaller scale for confetti-sized heart

              // Calculate key points based on the central point and scale
              const topCurveHeight = scale * 0.3;
              const bottomCurveHeight = scale * 0.7;

              // Draw heart shape
              ctx.beginPath();
              ctx.moveTo(centerX, centerY);
              ctx.bezierCurveTo(
                centerX - scale / 2,
                centerY - topCurveHeight,
                centerX - scale,
                centerY + topCurveHeight,
                centerX,
                centerY + bottomCurveHeight
              );
              ctx.bezierCurveTo(
                centerX + scale,
                centerY + topCurveHeight,
                centerX + scale / 2,
                centerY - topCurveHeight,
                centerX,
                centerY
              );
              ctx.fill();
              ctx.stroke();
            }
          : undefined
      }
    />
  );
}

export default CustomConfetti;
