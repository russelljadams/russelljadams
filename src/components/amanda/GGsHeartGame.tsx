"use client";

import { useEffect, useRef, useCallback } from "react";

interface Props {
  onBack: () => void;
}

export default function GGsHeartGame({ onBack }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const gameRef = useRef<Phaser.Game | null>(null);

  const handleBack = useCallback(() => {
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
      const { default: Level1Scene } = await import("@/lib/game/scenes/Level1Scene");
      const { default: UIScene } = await import("@/lib/game/scenes/UIScene");
      const { default: LevelCompleteScene } = await import("@/lib/game/scenes/LevelCompleteScene");

      if (destroyed || !containerRef.current) return;

      const config = createGameConfig(containerRef.current);
      config.scene = [BootScene, PreloadScene, Level1Scene, UIScene, LevelCompleteScene];

      game = new Phaser.Game(config);
      gameRef.current = game;

      // Listen for back-to-dashboard event
      game.events.on("back-to-dashboard", handleBack);
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

  return (
    <div className="flex flex-col items-center gap-3">
      <button
        onClick={onBack}
        className="self-start text-sm px-3 py-1.5 rounded-lg transition-colors"
        style={{
          color: "#C4AFA5",
          background: "rgba(245, 230, 224, 0.5)",
        }}
      >
        ← Back to games
      </button>
      <div
        ref={containerRef}
        style={{
          width: "100%",
          maxWidth: 960,
          aspectRatio: "16 / 9",
          borderRadius: 12,
          overflow: "hidden",
          background: "#1a1a2e",
        }}
      />
      <p className="text-xs text-center" style={{ color: "#C4AFA5" }}>
        Arrow keys or touch controls • ↑/Space = Jump • X = Attack
      </p>
    </div>
  );
}
