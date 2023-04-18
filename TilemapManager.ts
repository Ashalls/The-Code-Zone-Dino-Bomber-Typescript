class TilemapManager{
    public tileMap: tiles.TileMapData;
    public backgroundColour: number;
    public player: PlayerSprite;

    constructor(tileMap: tiles.TileMapData, backgroundColour: number, player: PlayerSprite){
        this.tileMap = tileMap;
        this.backgroundColour = backgroundColour;
        this.player = player;
    }

    private place_bricks(): void {
        let player_spawn = tiles.getTilesByType(assets.tile`player spawn`)[0]
        let adjacent_tiles = tilesAdvanced.getAdjacentTiles(player_spawn, 2)
        for (let tile of tiles.getTilesByType(assets.tile`empty`)) {
            if (tilesAdvanced.tileIsInList(tile, adjacent_tiles)) {
                continue
            }
            
            if (randint(1, 10) == 1) {
                tiles.setTileAt(tile, assets.tile`bricks`)
                tiles.setWallAt(tile, true)
            }
        }
    }
    
    private place_sprites(): void {
        let ghost: EnemySprite;
        for (let enemy_tile of tiles.getTilesByType(assets.tile`ghost spawn`)) {
            ghost = new EnemySprite(assets.image`ghost`);
            tiles.placeOnTile(ghost.sprite, enemy_tile)
            tiles.setTileAt(enemy_tile, assets.tile`empty`)
            ghost.handle_ghost_movement();
        }
        tiles.placeOnRandomTile(this.player.sprite, assets.tile`player spawn`)
        tiles.setTileAt(this.player.sprite.tilemapLocation(), assets.tile`empty`)
    }
    
    public build_level() {
        tiles.setCurrentTilemap(this.tileMap)
        scene.setBackgroundColor(this.backgroundColour);
        this.place_bricks()
        this.place_sprites()
    }
}