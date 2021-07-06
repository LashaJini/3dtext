import * as dat from "dat.gui";

export default function gui({material, axes}) {
  const gui = new dat.GUI();

  gui.add(material, "wireframe");
  gui.add(axes, "visible").name("Enables Axes");
}
