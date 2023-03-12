import { Github } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <div className="absolute bottom-[8px] w-full flex justify-center">
      <a
        href="https://github.com/hoangtrung99"
        target="_blank"
        className="flex flex-row items-center justify-start"
        rel="noreferrer"
      >
        <Github size={16} />
        <span className="ml-1 prose prose-sm font-medium">hoangtrung99</span>
      </a>
    </div>
  );
};

export { Footer };
