//  sprites
let dino = sprites.create(assets.image`dino`, SpriteKind.Player)
controller.moveSprite(dino)
scene.cameraFollowSprite(dino)
dino.setScale(0.75, ScaleAnchor.Middle)
//  variables 
let level_assets = [assets.tilemap`level`, assets.tilemap`level0`]
//  tweak
let level = 1
//  add
let ghost_speed = 30
let bomb_count = 1
let fuse_time = 2000
let bomb_range = 1
let bombs : Sprite[] = []
let throw_length = 2
//  added
//  setup
info.setScore(0)
scene.setBackgroundColor(9)
function place_bricks() {
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

function place_sprites() {
    let ghost: Sprite;
    for (let enemy_tile of tiles.getTilesByType(assets.tile`ghost spawn`)) {
        ghost = sprites.create(assets.image`ghost`, SpriteKind.Enemy)
        tiles.placeOnTile(ghost, enemy_tile)
        tiles.setTileAt(enemy_tile, assets.tile`empty`)
        handle_ghost_movement(ghost, enemy_tile)
    }
    tiles.placeOnRandomTile(dino, assets.tile`player spawn`)
    tiles.setTileAt(dino.tilemapLocation(), assets.tile`empty`)
}

function build_level() {
    tiles.setCurrentTilemap(level_assets[level - 1])
    //  tweak
    place_bricks()
    place_sprites()
}

build_level()
controller.B.onEvent(ControllerButtonEvent.Pressed, function throw_bomb() {
    if (bombs.length > bomb_count - 1) {
        return
    }
    
    if (dino.vx == 0 && dino.vy == 0) {
        place_bomb()
        return
    }
    
    let bomb = sprites.create(assets.image`bomb`)
    bombs.push(bomb)
    bomb.setPosition(dino.x, dino.y)
    bomb.setVelocity(dino.vx * 2, dino.vy * 2)
    while (spriteutils.distanceBetween(dino, bomb) < throw_length * 16) {
        pause(100)
    }
    bomb.setVelocity(0, 0)
    bomb.lifespan = fuse_time
    timer.after(fuse_time, blow_up)
})
function place_bomb() {
    if (bombs.length > bomb_count - 1) {
        return
    }
    
    let bomb = sprites.create(assets.image`bomb`)
    bombs.push(bomb)
    tiles.placeOnTile(bomb, dino.tilemapLocation())
    bomb.lifespan = fuse_time
    timer.after(fuse_time, blow_up)
}

controller.A.onEvent(ControllerButtonEvent.Pressed, place_bomb)
function spawn_explosion(tile: any) {
    let explosion = sprites.create(assets.image`bomb`, SpriteKind.Projectile)
    tiles.placeOnTile(explosion, tile)
    let frame_len = 100
    let anim_len = assets.animation`explosion`.length
    explosion.lifespan = frame_len * anim_len
    animation.runImageAnimation(explosion, assets.animation`explosion`, frame_len, false)
}

function destroy_bricks(tile: any) {
    tiles.setTileAt(tile, assets.tile`empty`)
    tiles.setWallAt(tile, false)
}

function blow_up() {
    let bomb = bombs.shift()
    for (let tile of tilesAdvanced.getAdjacentTiles(bomb.tilemapLocation(), bomb_range + 1)) {
        if (tiles.tileAtLocationEquals(tile, assets.tile`wall`)) {
            continue
        }
        
        spawn_explosion(tile)
        if (tiles.tileAtLocationEquals(tile, assets.tile`bricks`)) {
            destroy_bricks(tile)
        }
        
    }
}

function handle_ghost_movement(ghost: Sprite, location: tiles.Location) {
    let y_vel: number;
    let x_vel: number;
    if (ghost.vx != 0) {
        y_vel = randint(0, 1) * ghost_speed * 2 - ghost_speed
        ghost.setVelocity(0, y_vel)
    } else {
        x_vel = randint(0, 1) * ghost_speed * 2 - ghost_speed
        ghost.setVelocity(x_vel, 0)
    }
    
}

scene.onHitWall(SpriteKind.Enemy, handle_ghost_movement)
//  removed a couple of lines
sprites.onOverlap(SpriteKind.Enemy, SpriteKind.Projectile, function destroy_ghost(ghost: Sprite, bomb: Sprite) {
    info.changeScoreBy(1000)
    ghost.destroy()
})
function hit(player: any, other: any) {
    game.over(false)
}

sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, hit)
sprites.onOverlap(SpriteKind.Player, SpriteKind.Projectile, hit)

function next_level(dino: any, portal: any) {
    
    if (sprites.allOfKind(SpriteKind.Enemy).length < 1) {
        level += 1
        build_level()
    }
    
}

//  scene.on_overlap_tile(SpriteKind.player, assets.tile("portal"), next_level)
function ghost_behaviour(ghost: Sprite) {
    let ghost_pos: tiles.Location;
    let start_col: number;
    let start_row: number;
    let path: tiles.Location[];
    if (spriteutils.distanceBetween(ghost, dino) < 80) {
        ghost_pos = ghost.tilemapLocation()
        start_col = sprites.readDataNumber(ghost, "start_col")
        start_row = sprites.readDataNumber(ghost, "start_row")
        if (ghost_pos.col == start_col && ghost_pos.row == start_row) {
            return
        }
        
        sprites.setDataNumber(ghost, "start_col", ghost_pos.col)
        sprites.setDataNumber(ghost, "start_row", ghost_pos.row)
        path = scene.aStar(ghost_pos, dino.tilemapLocation())
        scene.followPath(ghost, path, ghost_speed)
    } else if (ghost.vx == 0 && ghost.vy == 0) {
        handle_ghost_movement(ghost, ghost.tilemapLocation())
    }
    
}

game.onUpdate(function tick() {
    for (let ghost of sprites.allOfKind(SpriteKind.Enemy)) {
        ghost_behaviour(ghost)
    }
})
