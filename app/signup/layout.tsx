export default function SignInLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
        <div>
            This is layout of signin 
            {children}
        </div>
    );
  }
  