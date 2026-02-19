export const MCClasses = Object.freeze({
  ENTITY: Object.freeze({
    ARMOR_STAND: Java.type("net.minecraft.entity.decoration.ArmorStandEntity").class,
    MAGMA_CUBE: Java.type("net.minecraft.entity.mob.MagmaCubeEntity").class
  }),
  BLOCK_ENTITY: Object.freeze({
    PISTON: Java.type("net.minecraft.block.entity.PistonBlockEntity").class,
    CHEST: Java.type("net.minecraft.tileentity.TileEntityChest").class
  }),
  PACKET: Object.freeze({

  })
})
