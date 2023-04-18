class EnemySprite extends BaseSprite {
    public ghostSpeed: number = 30;

    constructor(enemyImage: Image) {
        super(enemyImage, SpriteKind.Enemy);
        this.createSprite();
        scene.onHitWall(SpriteKind.Enemy, this.handle_ghost_movement)
        this.sprite.data = this;
    }

    public handle_ghost_movement() {
        let y_vel: number;
        let x_vel: number;
        if (this.sprite.vx != 0) {
            y_vel = randint(0, 1) * this.ghostSpeed * 2 - this.ghostSpeed
            this.sprite.setVelocity(0, y_vel)
        } else {
            x_vel = randint(0, 1) * this.ghostSpeed * 2 - this.ghostSpeed
            this.sprite.setVelocity(x_vel, 0)
        }
    }
    
    public ghost_behaviour(dino: Sprite) {
        let ghost_pos: tiles.Location;
        let start_col: number;
        let start_row: number;
        let path: tiles.Location[];
        if (spriteutils.distanceBetween(this.sprite, dino) < 80) {
            ghost_pos = this.sprite.tilemapLocation()
            start_col = sprites.readDataNumber(this.sprite, "start_col")
            start_row = sprites.readDataNumber(this.sprite, "start_row")
            if (ghost_pos.col == start_col && ghost_pos.row == start_row) {
                return
            }
            
            sprites.setDataNumber(this.sprite, "start_col", ghost_pos.col)
            sprites.setDataNumber(this.sprite, "start_row", ghost_pos.row)
            path = scene.aStar(ghost_pos, dino.tilemapLocation())
            scene.followPath(this.sprite, path, this.ghostSpeed)
        } else if (this.sprite.vx == 0 && this.sprite.vy == 0) {
            this.handle_ghost_movement()
        }
        
    }
}