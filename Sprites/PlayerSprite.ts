class PlayerSprite extends BaseSprite {
    public throwLength: number = 2;
    public fuseTime: number = 2000;
    public bombCount: number = 1;

    private bombManager: BombManager;

    constructor(playerImage: Image) {
        super(playerImage, SpriteKind.Player);
        this.bombManager = new BombManager();
        this.createSprite();
        this.playerEvents();
    }

    private playerEvents(): void{
        controller.B.onEvent(ControllerButtonEvent.Pressed, function() {
            if (this.bombManager.bombs.length > this.bomb_count - 1) {
                return
            }
            
            if (this.sprite.vx == 0 && this.sprite.vy == 0) {
                this.placeBomb()
                return
            }
            
            let bomb = new BombSprite(assets.image`bomb`, this.bombManager);
            this.bombManager.bombs.push(bomb)
            bomb.sprite.setPosition(this.sprite.x, this.sprite.y)
            bomb.sprite.setVelocity(this.sprite.vx * 2, this.sprite.vy * 2)
            while (spriteutils.distanceBetween(this.sprite, bomb.sprite) < this.throw_length * 16) {
                pause(100)
            }
            bomb.sprite.setVelocity(0, 0)
            bomb.sprite.lifespan = this.fuse_time
            timer.after(this.fuse_time, function () {
                bomb.blowUp();
            });
        });

        controller.A.onEvent(ControllerButtonEvent.Pressed, this.placeBomb)
    }

    private placeBomb(): void {
        if (this.bombManager.bombs.length > this.bombCount - 1) {
            return
        }
        
        let bomb = new BombSprite(assets.image`bomb`, this.bombManager);
        this.bombManager.bombs.push(bomb)
        tiles.placeOnTile(bomb.sprite, this.sprite.tilemapLocation())
        bomb.sprite.lifespan = this.fuseTime;
        timer.after(this.fuseTime, function () {
            bomb.blowUp();
        });
    }
}