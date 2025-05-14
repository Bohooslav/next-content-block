const indigoRoseBorder = `
  border-2
  border-transparent
  rounded-2xl

  [background-image:linear-gradient(white,_white),_linear-gradient(to_right,_theme(colors.indigo.50),_theme(colors.rose.100))]
  [background-origin:padding-box,_border-box]
  [background-clip:padding-box,_border-box]
`;

const variantClasses = {
  primary: `
    bg-gradient-to-r
    from-indigo-700
    to-indigo-300
    text-white border-none rounded-lg
    px-4 py-2
    transition-shadow
    hover:shadow-xl hover:shadow-indigo-500/50
    `,
  secondary: `${indigoRoseBorder}
    py-1 pl-2 pr-4
  `,
  icon: indigoRoseBorder,
};

export function Button({
  children,
  variant = "secondary",
  className,
  ...props
}: {
  children?: React.ReactNode;
  variant?: "primary" | "secondary" | "icon";
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      className={`
        flex alight-items justify-center p-1 gap-2 font-semibold
        ${variantClasses[variant]}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
}
