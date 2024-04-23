import element from "../../assets/layout/element.svg";

export default function Heading({ title }: { title: string }) {
  return (
    <div className="w-full max-h-max bg-primary flex relative items-center justify-center -mt-7">
      <h2 className="absolute font-nunito font-bold text-3xl uppercase">
        {title}
      </h2>
      <img src={element} alt="Background Image" className="z-10 w-full max-h-96" />
    </div>
  );
}
