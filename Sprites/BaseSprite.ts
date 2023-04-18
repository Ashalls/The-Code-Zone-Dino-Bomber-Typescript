abstract class BaseSprite {
    public sprite: Sprite;
    private spriteImage: Image;
    public spriteKind: any;

    constructor(spriteImage: Image, spriteKind?: any) {
        this.spriteImage = spriteImage;

        if (spriteKind) {
            this.spriteKind = spriteKind;
        }
    }

    public createSprite(): void {
        if (this.sprite) {
            this.sprite = sprites.create(this.spriteImage, this.spriteKind);
        } else {
            this.sprite = sprites.create(this.spriteImage);
        }
    }
}