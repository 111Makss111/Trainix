type ContainerProps = {
  children: React.ReactNode;
};

export function Container({ children }: ContainerProps) {
  return (
    <div className="mx-auto w-full max-w-[1440px] px-3 sm:px-4 lg:px-6">
      <div className="relative overflow-hidden rounded-[28px] border border-white/8 bg-white/5 backdrop-transparent">
        {children}
      </div>
    </div>
  );
}
