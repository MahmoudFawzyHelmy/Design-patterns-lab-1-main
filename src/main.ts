import { InstanceManager } from "./instance-manager";
import { createNumberSequence } from "./sequence-generator";
import { StyleConfigurator } from "./style-configurator";
import "./style.css";

// UI Manager class to handle all interactions
class UIManager {
  private static instance: UIManager;
  
  private constructor() {
    this.initializeEventListeners();
    this.setupAnimations();
  }
  
  public static getInstance(): UIManager {
    if (!UIManager.instance) {
      UIManager.instance = new UIManager();
    }
    return UIManager.instance;
  }
  
  private initializeEventListeners(): void {
    // Singleton Pattern Demo
    const createInstanceBtn = document.getElementById('create-instance');
    const checkInstanceBtn = document.getElementById('check-instance');
    const singletonOutput = document.getElementById('singleton-output');
    
    if (createInstanceBtn && checkInstanceBtn && singletonOutput) {
      createInstanceBtn.addEventListener('click', () => {
        this.demoSingletonPattern(singletonOutput);
      });
      
      checkInstanceBtn.addEventListener('click', () => {
        this.checkSingletonInstance(singletonOutput);
      });
    }
    
    // Iterator Pattern Demo
    const generateSequenceBtn = document.getElementById('generate-sequence');
    const iteratorOutput = document.getElementById('iterator-output');
    
    if (generateSequenceBtn && iteratorOutput) {
      generateSequenceBtn.addEventListener('click', () => {
        this.demoIteratorPattern(iteratorOutput);
      });
    }
    
    // Builder Pattern Demo
    const applyStyleBtn = document.getElementById('apply-style');
    const builderOutput = document.getElementById('builder-output');
    
    if (applyStyleBtn && builderOutput) {
      applyStyleBtn.addEventListener('click', () => {
        this.demoBuilderPattern(builderOutput);
      });
    }
  }
  
  private setupAnimations(): void {
    // Add entrance animations
    const cards = document.querySelectorAll('.pattern-card');
    cards.forEach((card, index) => {
      (card as HTMLElement).style.animationDelay = `${index * 0.1}s`;
    });
    
    // Add hover effects
    cards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        card.classList.add('hover');
      });
      
      card.addEventListener('mouseleave', () => {
        card.classList.remove('hover');
      });
    });
  }
  
  private demoSingletonPattern(outputElement: HTMLElement): void {
    outputElement.innerHTML = '';
    
    // Create first instance
    const firstInstance = InstanceManager.getCurrentInstance("Primary Instance");
    this.addOutput(outputElement, `✅ Created first instance: ${firstInstance.identifier}`);
    
    // Create second instance (should be the same)
    const secondInstance = InstanceManager.getCurrentInstance("Secondary Instance");
    this.addOutput(outputElement, `🔄 Attempted to create second instance: ${secondInstance.identifier}`);
    
    // Check if they're the same
    const areSame = firstInstance === secondInstance;
    this.addOutput(outputElement, `🔍 Instances are the same: ${areSame ? 'YES' : 'NO'}`);
    
    // Display messages
    this.addOutput(outputElement, `📢 First instance message:`);
    firstInstance.displayMessage();
    
    this.addOutput(outputElement, `📢 Second instance message:`);
    secondInstance.displayMessage();
    
    // Add visual feedback
    this.addSuccessAnimation(outputElement);
  }
  
  private checkSingletonInstance(outputElement: HTMLElement): void {
    outputElement.innerHTML = '';
    
    const instances = [
      InstanceManager.getCurrentInstance("Check 1"),
      InstanceManager.getCurrentInstance("Check 2"),
      InstanceManager.getCurrentInstance("Check 3")
    ];
    
    this.addOutput(outputElement, `🔍 Checking ${instances.length} instances...`);
    
    const allSame = instances.every(instance => instance === instances[0]);
    this.addOutput(outputElement, `✅ All instances are identical: ${allSame ? 'YES' : 'NO'}`);
    
    instances.forEach((instance, index) => {
      this.addOutput(outputElement, `Instance ${index + 1}: ${instance.identifier} (ID: ${instance.hashCode()})`);
    });
    
    this.addInfoAnimation(outputElement);
  }
  
  private demoIteratorPattern(outputElement: HTMLElement): void {
    outputElement.innerHTML = '';
    
    const startValue = parseInt((document.getElementById('start-value') as HTMLInputElement)?.value || '1');
    const endValue = parseInt((document.getElementById('end-value') as HTMLInputElement)?.value || '10');
    const increment = parseInt((document.getElementById('increment') as HTMLInputElement)?.value || '2');
    
    this.addOutput(outputElement, `🎯 Creating sequence: ${startValue} to ${endValue} with step ${increment}`);
    
    const sequence = createNumberSequence(startValue, endValue, increment);
    const results: number[] = [];
    
    let result = sequence.next();
    let count = 0;
    
    while (!result.completed && count < 100) { // Safety limit
      results.push(result.value);
      result = sequence.next();
      count++;
    }
    
    this.addOutput(outputElement, `📊 Generated ${results.length} numbers:`);
    this.addOutput(outputElement, `[${results.join(', ')}]`);
    
    if (result.completed) {
      this.addOutput(outputElement, `✅ Sequence completed successfully`);
    }
    
    // Add visual representation
    this.addSequenceVisualization(outputElement, results);
    
    this.addSuccessAnimation(outputElement);
  }
  
  private demoBuilderPattern(outputElement: HTMLElement): void {
    outputElement.innerHTML = '';
    
    const textSize = (document.getElementById('text-size') as HTMLSelectElement)?.value || '16px';
    const textColor = (document.getElementById('text-color') as HTMLInputElement)?.value || '#ffffff';
    const bgColor = (document.getElementById('bg-color') as HTMLInputElement)?.value || '#1a1a1a';
    
    this.addOutput(outputElement, `🎨 Building style configuration...`);
    this.addOutput(outputElement, `📏 Text Size: ${textSize}`);
    this.addOutput(outputElement, `🎨 Text Color: ${textColor}`);
    this.addOutput(outputElement, `🖼️ Background: ${bgColor}`);
    
    const configurator = new StyleConfigurator()
      .setTextSize(textSize)
      .setTextColor(textColor)
      .setBgColor(bgColor)
      .setSpacing('15px')
      .setMargins('10px')
      .setOutline('2px solid #6366f1')
      .setCornerRadius('8px');
    
    const styleBuilder = configurator.build();
    
    this.addOutput(outputElement, `✨ Style configuration built successfully!`);
    
    // Create a demo element to show the style
    const demoElement = document.createElement('div');
    demoElement.style.cssText = `
      font-size: ${textSize};
      color: ${textColor};
      background-color: ${bgColor};
      padding: 15px;
      margin: 10px 0;
      border: 2px solid #6366f1;
      border-radius: 8px;
      text-align: center;
    `;
    demoElement.textContent = '🎨 This is how your styled text looks!';
    
    outputElement.appendChild(demoElement);
    
    // Display the styled message in console
    styleBuilder.display('🎨 Styled Message with Builder Pattern');
    
    this.addSuccessAnimation(outputElement);
  }
  
  private addOutput(element: HTMLElement, message: string): void {
    const line = document.createElement('div');
    line.textContent = message;
    line.style.marginBottom = '4px';
    element.appendChild(line);
    element.scrollTop = element.scrollHeight;
  }
  
  private addSequenceVisualization(element: HTMLElement, numbers: number[]): void {
    const container = document.createElement('div');
    container.style.cssText = `
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-top: 10px;
      padding: 10px;
      background: rgba(99, 102, 241, 0.1);
      border-radius: 8px;
    `;
    
    numbers.forEach(num => {
      const badge = document.createElement('span');
      badge.textContent = num.toString();
      badge.style.cssText = `
        background: linear-gradient(135deg, #6366f1, #8b5cf6);
        color: white;
        padding: 4px 8px;
        border-radius: 12px;
        font-size: 12px;
        font-weight: 600;
        min-width: 24px;
        text-align: center;
      `;
      container.appendChild(badge);
    });
    
    element.appendChild(container);
  }
  
  private addSuccessAnimation(element: HTMLElement): void {
    element.style.animation = 'pulse 0.5s ease-in-out';
    setTimeout(() => {
      element.style.animation = '';
    }, 500);
  }
  
  private addInfoAnimation(element: HTMLElement): void {
    element.style.animation = 'slideIn 0.3s ease-out';
    setTimeout(() => {
      element.style.animation = '';
    }, 300);
  }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
  console.log('🚀 Design Patterns Lab initialized');
  
  // Initialize UI Manager
  const uiManager = UIManager.getInstance();
  
  // Add some initial content
  const outputs = document.querySelectorAll('.output');
  outputs.forEach(output => {
    if (output instanceof HTMLElement) {
      output.innerHTML = 'Click the buttons above to see the design patterns in action! 🎯';
    }
  });
  
  // Add welcome message
  console.log('%c🎨 Welcome to Design Patterns Lab!', 'color: #6366f1; font-size: 18px; font-weight: bold;');
  console.log('%cExplore the interactive demonstrations above to learn about different design patterns.', 'color: #8b5cf6; font-size: 14px;');
});

// Export for potential external use
export { UIManager };
