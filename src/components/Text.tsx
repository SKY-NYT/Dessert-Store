type TextVariant = "p1" | "p2" | "p3" | "p4" | "p4b";
interface TextProps {
  as?: React.ElementType;
  variant?: TextVariant;
  className?: string;
  children: React.ReactNode;
}

export function Text({
  as = "p",
  variant = "p3",
  className = "",
  children,
}: TextProps) {
  const styles = {
    p1: "text-p1",
    p2: "text-p2 ",
    p3: "text-p3",
    p4: "text-p4",
    p4b: "text-p4 font-semibold",
  };

  const Component = as;

  return (
    <Component className={`${styles[variant]} ${className}`}>
      {children}
    </Component>
  );
}
