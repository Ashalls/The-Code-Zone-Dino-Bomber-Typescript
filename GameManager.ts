class GameManager {
    // configurable game state
    public level: number = 0;

    private dino: PlayerSprite;
    private tileMap: TilemapManager;
    private tileMapLevels: tiles.TileMapData[];

    constructor(tilemapsToLoad: tiles.TileMapData[]) {
        this.createPlayerSprite();
        this.setupScene();
        this.onOverlaps();
        this.onUpdateIntervals();
        this.onUpdate();
        this.levelManager();

        this.tileMapLevels = tilemapsToLoad;
    }

    private createPlayerSprite(): void {
        this.dino = new PlayerSprite(assets.image`dino`);
        controller.moveSprite(this.dino.sprite);
        scene.cameraFollowSprite(this.dino.sprite);
        this.dino.sprite.setScale(0.75, ScaleAnchor.Middle);
    }

    private setupScene(): void {
        info.setScore(0)
        this.tileMap = new TilemapManager(this.tileMapLevels[this.level], 9, this.dino);
        this.tileMap.build_level();
    }

    private onOverlaps(): void {
        sprites.onOverlap(SpriteKind.Enemy, SpriteKind.Projectile, function destroy_ghost(ghost: Sprite, bomb: Sprite) {
            info.changeScoreBy(1000)
            ghost.destroy()
        })
        function hit(player: Sprite, other: Sprite) {
            game.over(false)
        }
        
        sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, hit)
        sprites.onOverlap(SpriteKind.Player, SpriteKind.Projectile, hit)
    }

    private onUpdateIntervals(): void {
        // Update intervals go here
    }

    private onUpdate(): void {
        for (let ghost of sprites.allOfKind(SpriteKind.Enemy)) {
            ghost.data.handleBehaviour(this.dino.sprite);
        }
    }

    private levelManager(): void {
        scene.onOverlapTile(SpriteKind.Player, assets.tile`portal`, function () {
            if (sprites.allOfKind(SpriteKind.Enemy).length < 1) {
                this.level += 1
                this.tileMap = new TilemapManager(this.tileMapLevels[this.level], 9, this.dino);
                this.tileMap.build_level();
            }
        })
    }
}