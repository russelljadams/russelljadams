"use client";

import { useEffect, useRef, useCallback, useState } from "react";

interface Props {
  onBack: () => void;
}

export default function GGsHeartGame({ onBack }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const gameRef = useRef<Phaser.Game | null>(null);
  const [ready, setReady] = useState(false);

  const handleBack = useCallback(() => {
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    }
    onBack();
  }, [onBack]);

  useEffect(() => {
    let game: Phaser.Game | null = null;
    let destroyed = false;

    const init = async () => {
      const Phaser = (await import("phaser")).default;
      const { createGameConfig } = await import("@/lib/game/config");
      const { default: BootScene } = await import("@/lib/game/scenes/BootScene");
      const { default: PreloadScene } = await import("@/lib/game/scenes/PreloadScene");
      const { default: WorldMapScene } = await import("@/lib/game/scenes/WorldMapScene");
      const { default: Level1Scene } = await import("@/lib/game/scenes/Level1Scene");
      const { default: Level1_2Scene } = await import("@/lib/game/scenes/Level1_2Scene");
      const { default: Level1_3Scene } = await import("@/lib/game/scenes/Level1_3Scene");
      const { default: Boss1Scene } = await import("@/lib/game/scenes/Boss1Scene");
      const { default: Level1_4Scene } = await import("@/lib/game/scenes/Level1_4Scene");
      const { default: Level1_5Scene } = await import("@/lib/game/scenes/Level1_5Scene");
      const { default: Level1_6Scene } = await import("@/lib/game/scenes/Level1_6Scene");
      const { default: UIScene } = await import("@/lib/game/scenes/UIScene");
      const { default: LevelCompleteScene } = await import("@/lib/game/scenes/LevelCompleteScene");

      if (destroyed || !containerRef.current) return;

      const config = createGameConfig(containerRef.current);
      config.scene = [
        BootScene, PreloadScene, WorldMapScene,
        Level1Scene, Level1_2Scene, Level1_3Scene, Level1_4Scene, Level1_5Scene, Level1_6Scene, Boss1Scene,
        UIScene, LevelCompleteScene,
      ];

      game = new Phaser.Game(config);
      gameRef.current = game;
      game.events.on("back-to-dashboard", handleBack);
      setReady(true);
    };

    init();

    return () => {
      destroyed = true;
      if (game) {
        game.events.off("back-to-dashboard", handleBack);
        game.destroy(true);
      }
      gameRef.current = null;
    };
  }, [handleBack]);

  const goFullscreen = () => {
    const el = containerRef.current?.parentElement;
    if (!el) return;
    if (el.requestFullscreen) {
      el.requestFullscreen().catch(() => {});
    } else if ((el as any).webkitRequestFullscreen) {
      (el as any).webkitRequestFullscreen();
    }
    try { (screen.orientation as any)?.lock?.("landscape").catch(() => {}); } catch {}
  };

  return (
    <div className="flex flex-col items-center" style={{ background: "#1a1a2e", minHeight: "100%" }}>
      <div className="w-full flex items-center justify-between px-3 py-2" style={{ background: "#1a1a2e" }}>
        <button onClick={handleBack} className="text-sm px-3 py-2 rounded-lg"
          style={{ color: "#aaaacc", background: "rgba(255,255,255,0.08)" }}>← Back</button>
        {ready && (
          <button onClick={goFullscreen} className="text-sm px-3 py-2 rounded-lg"
            style={{ color: "#aaaacc", background: "rgba(255,255,255,0.08)" }}>⛶ Fullscreen</button>
        )}
      </div>
      <div ref={containerRef} style={{ width: "100%", flex: 1, minHeight: 0, overflow: "hidden", background: "#1a1a2e" }} />
    </div>
  );
}
