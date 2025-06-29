export class InstanceManager {
  private static currentInstance: InstanceManager;
  public identifier: string;

  private constructor(identifier: string) {
    this.identifier = identifier;
    console.log("New instance initialized");
    Object.freeze(this);
  }

  public static getCurrentInstance(identifier: string): InstanceManager {
    if (!InstanceManager.currentInstance) {
      InstanceManager.currentInstance = new InstanceManager(identifier);
    } else {
      console.log("Using existing instance");
    }

    return InstanceManager.currentInstance;
  }

  public displayMessage() {
    console.log(`Message from ${this.identifier}`);
  }
}

console.log("instance manager");
const firstInstance = InstanceManager.getCurrentInstance("Primary");
firstInstance.displayMessage();

const secondInstance = InstanceManager.getCurrentInstance("Secondary");
secondInstance.displayMessage();

console.log(firstInstance === secondInstance);
console.log("_____________________________________");
