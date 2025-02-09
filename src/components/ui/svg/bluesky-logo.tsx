export function BlueskyLogo({
  height,
  width,
}: {
  height: number;
  width: number;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={height}
      width={width}
      version="1.1"
    >
      <path
        d="m 10.179 3.3022 c 4.9872 3.7441 10.3515 11.3355 12.321 15.4095 c 1.9696 -4.0737 7.3336 -11.6655 12.321 -15.4095 c 3.5985 -2.7016 9.429 -4.7919 9.429 1.8596 c 0 1.3284 -0.7616 11.1592 -1.2083 12.7552 c -1.5527 5.5488 -7.2108 6.964 -12.2438 6.1075 c 8.7975 1.4973 11.0355 6.4569 6.2023 11.4165 c -9.1792 9.4192 -13.1932 -2.3633 -14.2222 -5.3825 c -0.1885 -0.5535 -0.2768 -0.8124 -0.2781 -0.5922 c -0.0013 -0.2202 -0.0895 0.0388 -0.2781 0.5922 c -1.0286 3.0191 -5.0425 14.802 -14.2222 5.3825 c -4.8333 -4.9596 -2.5954 -9.9195 6.2023 -11.4165 c -5.0331 0.8566 -10.6913 -0.5587 -12.2438 -6.1075 c -0.4467 -1.5961 -1.2083 -11.427 -1.2083 -12.7552 c 0 -6.6515 5.8307 -4.5612 9.429 -1.8596 z"
        fill="#1185fe"
      />
    </svg>
  );
}
