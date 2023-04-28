class Keyboard {
  constructor() {
    this.textarea = null;
    this.keysContainer = null;
    this.infoLine = null;
    this.language = '';
    this.langSign = null;
    this.cursorPos = 0;
    this.capsLock = false;
  }
}

const keyBoard = new Keyboard();

function keyboardInit() {
  keyBoard.textarea = document.createElement('textarea');
  keyBoard.textarea.classList.add('text-input');
  
  keyBoard.keysContainer = document.createElement('div');
  keyBoard.keysContainer.classList.add('keys-container');
  
  document.body.append(keyBoard.textarea, keyBoard.keysContainer)
}

keyboardInit();