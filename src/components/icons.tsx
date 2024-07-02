type IconProps = React.HTMLAttributes<SVGElement>

export const Icons = {
  logo: ({ ...props }: IconProps) => (
    <svg
      width={50}
      height={39}
      viewBox="0 0 50 39"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M16.5 2h21.08L22.083 24.973H1L16.5 2z"
        className="ccompli1"
        fill="currentColor"
      />
      <path
        d="M17.422 27.102L11.42 36h22.082L49 13.027H32.702l-9.496 14.075h-5.784z"
        className="ccustom"
        fill="currentColor"
      />
    </svg>
  ),
}
