"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader.js";

type CommunitySceneProps = {
  isVisible: boolean;
};

function disposeGroup(root: THREE.Object3D | null) {
  if (!root) {
    return;
  }

  root.traverse((child) => {
    const mesh = child as THREE.Mesh;

    if (!mesh.isMesh) {
      return;
    }

    mesh.geometry.dispose();

    const materials = Array.isArray(mesh.material)
      ? mesh.material
      : [mesh.material];

    materials.forEach((material) => {
      const standardMaterial = material as THREE.MeshStandardMaterial & {
        map?: THREE.Texture | null;
        normalMap?: THREE.Texture | null;
        aoMap?: THREE.Texture | null;
        roughnessMap?: THREE.Texture | null;
        metalnessMap?: THREE.Texture | null;
      };

      standardMaterial.map?.dispose();
      standardMaterial.normalMap?.dispose();
      standardMaterial.aoMap?.dispose();
      standardMaterial.roughnessMap?.dispose();
      standardMaterial.metalnessMap?.dispose();
      material.dispose();
    });
  });
}

export function CommunityScene({ isVisible }: CommunitySceneProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">(
    "loading",
  );

  useEffect(() => {
    const mountNode = mountRef.current;

    if (!mountNode) {
      return;
    }

    let frameId = 0;
    let mixer: THREE.AnimationMixer | null = null;
    let modelRoot: THREE.Group | null = null;
    let primaryAction: THREE.AnimationAction | null = null;
    let secondaryAction: THREE.AnimationAction | null = null;
    let clipDuration = 0;
    let isCrossfading = false;
    let crossfadeProgress = 0;
    let shouldRender = true;

    const isMobile = window.matchMedia("(max-width: 1023px)").matches;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const loopCrossfadeDuration = prefersReducedMotion
      ? 0.45
      : isMobile
        ? 0.9
        : 0.7;

    const clock = new THREE.Clock();
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(28, 1, 0.1, 100);
    camera.position.set(0.28, 1.7, 6.5);
    camera.lookAt(0, 1.45, 0);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: !isMobile,
      powerPreference: isMobile ? "default" : "high-performance",
    });
    renderer.setPixelRatio(
      Math.min(window.devicePixelRatio, isMobile ? 1.15 : 1.75),
    );
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = isMobile ? 1.06 : 1.12;
    renderer.shadowMap.enabled = !isMobile;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.domElement.className = "h-full w-full";

    mountNode.appendChild(renderer.domElement);

    const keyTarget = new THREE.Object3D();
    keyTarget.position.set(0, 1.4, 0);
    scene.add(keyTarget);

    const hemisphereLight = new THREE.HemisphereLight(0xffebc7, 0x090d11, 2.1);
    scene.add(hemisphereLight);

    const keyLight = new THREE.SpotLight(0xffddb1, 150, 28, Math.PI / 5, 0.35);
    keyLight.position.set(3.6, 5.6, 4.6);
    keyLight.castShadow = !isMobile;
    keyLight.shadow.mapSize.set(isMobile ? 512 : 1024, isMobile ? 512 : 1024);
    keyLight.shadow.bias = -0.00008;
    keyLight.target = keyTarget;
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xffffff, 0.75);
    fillLight.position.set(-2.8, 2.4, 4.4);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0x8dffc6, 0.42);
    rimLight.position.set(-2.2, 4.2, -3.4);
    scene.add(rimLight);

    const floorShadow = new THREE.Mesh(
      new THREE.CircleGeometry(2.35, 64),
      new THREE.ShadowMaterial({ opacity: 0.26 }),
    );
    floorShadow.rotation.x = -Math.PI / 2;
    floorShadow.position.y = 0.015;
    floorShadow.receiveShadow = true;
    scene.add(floorShadow);

    const softGlow = new THREE.Mesh(
      new THREE.CircleGeometry(2.6, 64),
      new THREE.MeshBasicMaterial({
        color: 0x73ff9f,
        opacity: 0.055,
        transparent: true,
      }),
    );
    softGlow.rotation.x = -Math.PI / 2;
    softGlow.position.y = 0.02;
    scene.add(softGlow);

    const manager = new THREE.LoadingManager();
    manager.setURLModifier((url) => {
      const normalizedUrl = url.replace(/\\/g, "/");
      const filename = normalizedUrl.split("/").pop() ?? normalizedUrl;

      if (/\.(jpg|jpeg|png|webp)$/i.test(filename)) {
        return `/models/anime/tex/${filename}`;
      }

      return url;
    });

    const loader = new FBXLoader(manager);

    loader.load(
      "/models/anime/rp_sophia_animated_003_idling.fbx",
      (asset) => {
        modelRoot = asset;

        asset.traverse((child) => {
          const mesh = child as THREE.Mesh;

          if (!mesh.isMesh) {
            return;
          }

          mesh.castShadow = true;
          mesh.receiveShadow = true;

          const materials = Array.isArray(mesh.material)
            ? mesh.material
            : [mesh.material];

          materials.forEach((material) => {
            const standardMaterial = material as THREE.MeshStandardMaterial & {
              map?: THREE.Texture | null;
              normalMap?: THREE.Texture | null;
            };

            if (standardMaterial.map) {
              standardMaterial.map.colorSpace = THREE.SRGBColorSpace;
            }

            if ("roughness" in standardMaterial) {
              standardMaterial.roughness = 0.9;
            }

            if ("metalness" in standardMaterial) {
              standardMaterial.metalness = 0.03;
            }

            if (standardMaterial.normalMap) {
              standardMaterial.normalMap.colorSpace = THREE.NoColorSpace;
              standardMaterial.normalScale = new THREE.Vector2(0.65, 0.65);
            }

            standardMaterial.needsUpdate = true;
          });
        });

        const initialBounds = new THREE.Box3().setFromObject(asset);
        const initialSize = initialBounds.getSize(new THREE.Vector3());
        const targetHeight = 3.3;
        const scale = targetHeight / Math.max(initialSize.y, 0.001);
        asset.scale.setScalar(scale);

        const scaledBounds = new THREE.Box3().setFromObject(asset);
        const scaledCenter = scaledBounds.getCenter(new THREE.Vector3());
        const scaledSize = scaledBounds.getSize(new THREE.Vector3());

        asset.position.set(
          -scaledCenter.x,
          -scaledBounds.min.y,
          -scaledCenter.z,
        );
        asset.position.x += isMobile ? 0.02 : -0.08;
        asset.rotation.y = isMobile ? 0.18 : 0.24;

        camera.position.set(isMobile ? 0.02 : 0.2, scaledSize.y * 0.54, 6.15);
        camera.lookAt(0, scaledSize.y * 0.5, 0);

        if (asset.animations.length > 0) {
          mixer = new THREE.AnimationMixer(asset);

          const baseClip = asset.animations[0];
          const loopClip = baseClip.clone();
          const alternateClip = baseClip.clone();
          alternateClip.name = `${baseClip.name}_alt`;

          primaryAction = mixer.clipAction(loopClip);
          secondaryAction = mixer.clipAction(alternateClip);
          clipDuration = loopClip.duration;

          primaryAction.setLoop(THREE.LoopOnce, 1);
          primaryAction.clampWhenFinished = true;
          primaryAction.enabled = true;
          primaryAction.play();

          secondaryAction.setLoop(THREE.LoopOnce, 1);
          secondaryAction.clampWhenFinished = true;
          secondaryAction.enabled = false;
          secondaryAction.setEffectiveWeight(0);
        }

        scene.add(asset);
        setStatus("ready");
      },
      undefined,
      () => {
        setStatus("error");
      },
    );

    const resize = () => {
      const width = mountNode.clientWidth;
      const height = mountNode.clientHeight;

      if (width === 0 || height === 0) {
        return;
      }

      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    const observer = new ResizeObserver(resize);
    observer.observe(mountNode);
    resize();

    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        shouldRender = entry.isIntersecting || entry.intersectionRatio > 0.08;
      },
      {
        threshold: [0, 0.08, 0.2],
      },
    );
    visibilityObserver.observe(mountNode);

    const renderFrame = () => {
      if (document.visibilityState !== "visible" || !shouldRender) {
        frameId = window.requestAnimationFrame(renderFrame);
        return;
      }

      const delta = Math.min(clock.getDelta(), 1 / 30);

      if (
        mixer &&
        primaryAction &&
        secondaryAction &&
        clipDuration > loopCrossfadeDuration
      ) {
        if (
          !isCrossfading &&
          clipDuration - primaryAction.time <= loopCrossfadeDuration
        ) {
          isCrossfading = true;
          crossfadeProgress = 0;

          secondaryAction.reset();
          secondaryAction.enabled = true;
          secondaryAction.paused = false;
          secondaryAction.setLoop(THREE.LoopOnce, 1);
          secondaryAction.clampWhenFinished = true;
          secondaryAction.setEffectiveWeight(0);
          secondaryAction.play();
        }

        if (isCrossfading) {
          crossfadeProgress = Math.min(
            crossfadeProgress + delta / loopCrossfadeDuration,
            1,
          );

          primaryAction.setEffectiveWeight(1 - crossfadeProgress);
          secondaryAction.setEffectiveWeight(crossfadeProgress);
        }

        mixer.update(delta);

        if (isCrossfading && crossfadeProgress >= 1) {
          primaryAction.stop();
          primaryAction.reset();
          primaryAction.enabled = false;
          primaryAction.setEffectiveWeight(0);

          const nextPrimary = secondaryAction;
          const nextSecondary = primaryAction;

          primaryAction = nextPrimary;
          secondaryAction = nextSecondary;
          primaryAction.setEffectiveWeight(1);
          isCrossfading = false;
          crossfadeProgress = 0;
        }
      } else {
        mixer?.update(delta);
      }

      renderer.render(scene, camera);
      frameId = window.requestAnimationFrame(renderFrame);
    };

    renderFrame();

    return () => {
      observer.disconnect();
      visibilityObserver.disconnect();
      window.cancelAnimationFrame(frameId);

      disposeGroup(modelRoot);

      floorShadow.geometry.dispose();
      (floorShadow.material as THREE.Material).dispose();
      softGlow.geometry.dispose();
      (softGlow.material as THREE.Material).dispose();

      renderer.dispose();
      mountNode.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      className={`relative mx-auto min-h-[380px] w-full max-w-[560px] overflow-hidden rounded-[28px] transition-all duration-[950ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${isVisible ? "translate-x-0 opacity-100 blur-0" : "-translate-x-8 opacity-0 blur-md"} sm:min-h-[500px] lg:max-w-none lg:min-h-[640px]`}
    >
      <div
        ref={mountRef}
        className="absolute inset-0"
        aria-label="3D animated community model"
      />

      {status !== "ready" ? (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="rounded-full border border-white/8 bg-black/24 px-4 py-2 text-sm text-white/58 backdrop-blur-md">
            {status === "loading"
          ? "Завантажуємо сцену"
              : "Сцену не вдалося завантажити"}
          </div>
        </div>
      ) : null}
    </div>
  );
}
