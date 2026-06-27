import type { SVGProps } from "react";

const SQL = (props: SVGProps<SVGSVGElement>) => (
  <svg
    role="img"
    viewBox="0 0 24 24"
    fill="currentColor"
    {...props}
  >
    <title>SQL</title>
    <defs>
      <mask id="sql-mask">
        <rect x="0" y="0" width="24" height="24" fill="#ffffff" />
        <text
          x="12"
          y="15.5"
          fill="#000000"
          fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
          fontSize="6.5"
          fontWeight="900"
          textAnchor="middle"
        >
          SQL
        </text>
      </mask>
    </defs>
    <path
      d="M12 2C6.48 2 2 3.12 2 4.5v15C2 20.88 6.48 22 12 22s10-1.12 10-2.5v-15C22 3.12 17.52 2 12 2zm0 3C7.58 5 4 4.1 4 3s3.58-2 8-2 8 .9 8 2-3.58 2-8 2zm0 6c-4.42 0-8-.9-8-2V5.5c1.88.9 4.8 1.5 8 1.5s6.12-.6 8-1.5V7c0 1.1-3.58 2-8 2zm0 5c-4.42 0-8-.9-8-2v-2.5c1.88.9 4.8 1.5 8 1.5s6.12-.6 8-1.5v2.5c0 1.1-3.58 2-8 2z"
      mask="url(#sql-mask)"
    />
  </svg>
);

export { SQL };
export default SQL;
