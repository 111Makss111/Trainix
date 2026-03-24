import { Phone3D } from "./Phone3D";

export function HeroVisual() {
  return (
    <div className="relative  flex w-full max-w-[520px] items-center justify-center lg:justify-end">
      <div className="relative aspect-[10/12] w-full max-w-[350px]">
        <div className="absolute inset-0">
          <Phone3D />
        </div>
      </div>
    </div>
  );
}
