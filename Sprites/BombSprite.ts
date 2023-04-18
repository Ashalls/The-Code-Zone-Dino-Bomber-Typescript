class BombManager {
    public bombs: BombSprite[];
}

class ExplosionSprite extends BaseSprite{

    constructor() {
        super(assets.image`bomb`, SpriteKind.Projectile);
    }

    public spawn_explosion(tile: any): void {
        this.createSprite();
        tiles.placeOnTile(this.sprite, tile)
        let frame_len = 100
        let anim_len = assets.animation`explosion`.length
        this.sprite.lifespan = frame_len * anim_len
        animation.runImageAnimation(this.sprite, assets.animation`explosion`, frame_len, false)
    }
}

class BombSprite extends BaseSprite {
    public bombRange: number = 1;
    public bombManager: BombManager;

    constructor(playerImage: Image, bombManager: BombManager) {
        super(playerImage);
        this.bombManager = bombManager;
        this.createSprite();
    }

    public blowUp(): void {
        let bomb = this.bombManager.bombs.shift()
        for (let tile of tilesAdvanced.getAdjacentTiles(bomb.sprite.tilemapLocation(), this.bombRange + 1)) {
            if (tiles.tileAtLocationEquals(tile, assets.tile`wall`)) {
                continue
            }
            
            new ExplosionSprite().spawn_explosion(tile);
            if (tiles.tileAtLocationEquals(tile, assets.tile`bricks`)) {
                this.destroy_bricks(tile)
            }
        }
    }
    
    private destroy_bricks(tile: any) {
        tiles.setTileAt(tile, assets.tile`empty`)
        tiles.setWallAt(tile, false)
    }
}