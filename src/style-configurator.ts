export class StyleConfigurator {
  private textSize: string = "12px";
  private textColor: string = "#fff";
  private bgColor: string = "#000";
  private spacing?: string;
  private margins?: string;
  private outline?: string;
  private cornerRadius?: string;

  // ---------- Text configuration ----------
  setTextSize(size: string) {
    this.textSize = size;
    return this;
  }

  setTextColor(color: string) {
    this.textColor = color;
    return this;
  }

  setBgColor(color: string) {
    this.bgColor = color;
    return this;
  }

  // ---------- Layout configuration ----------
  setSpacing(spacing: string) {
    this.spacing = spacing;
    return this;
  }

  setMargins(margins: string) {
    this.margins = margins;
    return this;
  }

  setOutline(outline: string) {
    this.outline = outline;
    return this;
  }

  setCornerRadius(radius: string) {
    this.cornerRadius = radius;
    return this;
  }

  // ---------- Build & Display ----------
  build() {
    const styleArray: string[] = [];

    styleArray.push(`font-size: ${this.textSize}`);
    styleArray.push(`color: ${this.textColor}`);
    styleArray.push(`background-color: ${this.bgColor}`);

    if (this.spacing) styleArray.push(`padding: ${this.spacing}`);
    if (this.margins) styleArray.push(`margin: ${this.margins}`);
    if (this.outline) styleArray.push(`border: ${this.outline}`);
    if (this.cornerRadius) styleArray.push(`border-radius: ${this.cornerRadius}`);

    return {
      display: (message: string) => {
        console.log(`%c${message}`, styleArray.join("; "));
      },
    };
  }
}

new StyleConfigurator()
  .setTextSize("18px")
  .setTextColor("black")
  .setBgColor("yellow")
  .setSpacing("10px")
  .setMargins("10px")
  .setOutline("2px dashed red")
  .setCornerRadius("8px")
  .build()
  .display("🎨 Styled Message with Configurator Pattern");
