// Auto-generated code. Do not edit.
namespace myTiles {
    //% fixedInstance jres blockIdentity=images._tile
    export const transparency16 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile1 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile2 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile4 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile3 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile5 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile6 = image.ofBuffer(hex``);

    helpers._registerFactory("tilemap", function(name: string) {
        switch(helpers.stringTrim(name)) {
            case "level":
            case "level1":return tiles.createTilemap(hex`1100110003030303030303030303030303030303030302000000000000000000000000000103030003000300030003000300030003000303000000000000000000000000000000030300030003000300030003000300030003030000000000000000000001000000000303000300030003000300030003000300030300000000010000000000000000000003030003000300030003000300030003000303000000000000000000000000000000030300030003000300030003000300030003030000000000000000000001000000000303000300030003000300030003000300030300000100000000000000000000000003030003000300030003000300030003000303000000000000010000000000000000040303030303030303030303030303030303`, img`
2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
2 . . . . . . . . . . . . . . . 2 
2 . 2 . 2 . 2 . 2 . 2 . 2 . 2 . 2 
2 . . . . . . . . . . . . . . . 2 
2 . 2 . 2 . 2 . 2 . 2 . 2 . 2 . 2 
2 . . . . . . . . . . . . . . . 2 
2 . 2 . 2 . 2 . 2 . 2 . 2 . 2 . 2 
2 . . . . . . . . . . . . . . . 2 
2 . 2 . 2 . 2 . 2 . 2 . 2 . 2 . 2 
2 . . . . . . . . . . . . . . . 2 
2 . 2 . 2 . 2 . 2 . 2 . 2 . 2 . 2 
2 . . . . . . . . . . . . . . . 2 
2 . 2 . 2 . 2 . 2 . 2 . 2 . 2 . 2 
2 . . . . . . . . . . . . . . . 2 
2 . 2 . 2 . 2 . 2 . 2 . 2 . 2 . 2 
2 . . . . . . . . . . . . . . . . 
2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
`, [myTiles.transparency16,myTiles.tile1,myTiles.tile2,sprites.dungeon.floorLight2,myTiles.tile6], TileScale.Sixteen);
            case "level0":
            case "level2":return tiles.createTilemap(hex`1000100000000000000000000000000000000000000000000000000000000000000000000000000000000000000002000000000000000300000000000000000000000000000000000000000000000000000000000000000000000101000000000000000000000000000001000000000000000000000000000001000000000000000000000000000001000000000000000000000000000000010101010101000000000000000000000000000000010100000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000`, img`
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
`, [myTiles.transparency16,sprites.castle.tileGrass2,myTiles.tile1,myTiles.tile2], TileScale.Sixteen);
        }
        return null;
    })

    helpers._registerFactory("tile", function(name: string) {
        switch(helpers.stringTrim(name)) {
            case "transparency16":return transparency16;
            case "ghost spawn":
            case "tile1":return tile1;
            case "player spawn":
            case "tile2":return tile2;
            case "empty":
            case "tile4":return tile4;
            case "bricks":
            case "tile3":return tile3;
            case "wall":
            case "tile5":return tile5;
            case "portal":
            case "tile6":return tile6;
        }
        return null;
    })

}
// Auto-generated code. Do not edit.
