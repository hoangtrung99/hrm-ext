import { PropsWithChildren } from "react";
import { Footer } from "./Footer";

type ContainerProps = PropsWithChildren<{
  isLoading?: boolean;
}>;

const Container: React.FC<ContainerProps> = ({ isLoading, children }) => {
  return (
    <div className="w-full h-full relative">
      <div className="prose p-3 flex flex-col">
        {children}
        {isLoading && (
          <progress className="progress w-full rounded-none absolute bottom-0 right-0" />
        )}
      </div>

      <Footer />
    </div>
  );
};

export { Container };
