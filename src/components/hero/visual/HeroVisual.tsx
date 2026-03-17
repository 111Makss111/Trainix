import { Phone3D } from "./Phone3D";

export function HeroVisual() {
  return (
    <div className="relative mx-auto flex w-full max-w-[520px] items-center justify-center lg:justify-end">
      <div className="relative aspect-[11/12] w-full max-w-[500px]">
        <div className="absolute inset-0">
          <Phone3D />
        </div>
      </div>
    </div>
  );
}
