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

const keySet = {
  en:
  [{ x: ['`', '~'] }, { x: ['1', '!'] }, { x: ['2', '@'] }, { x: ['3', '#'] }, { x: ['4', '$'] }, { x: ['5', '%'] }, { x: ['6', '^'] },
    { x: ['7', '&'] }, { x: ['8', '*'] }, { x: ['9', '('] }, { x: ['0', ')'] }, { x: ['-', '_'] }, { x: ['=', '+'] }, 'Backspace',
    'CapsLock', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', { x: ['[', '{'] }, { x: [']', '}'] }, 'Del',
    'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', { x: [';', ':'] }, { x: ['\'', '"'] }, { x: ['\\', '|'] }, 'Enter',
    'ShiftLeft', 'z', 'x', 'c', 'v', 'b', 'n', 'm', { x: [',', '<'] }, { x: ['.', '>'] }, { x: ['/', '?'] }, 'ShiftRight',
    'Control', 'Alt', 'Space', 'ArrowLeft', 'ArrowUp', 'ArrowRight', 'ArrowDown'],
  ru:
  ['ё', { x: ['1', '!'] }, { x: ['2', '"'] }, { x: ['3', '№'] }, { x: ['4', ';'] }, { x: ['5', '%'] }, { x: ['6', ':'] },
    { x: ['7', '?'] }, { x: ['8', '*'] }, { x: ['9', '('] }, { x: ['0', ')'] }, { x: ['-', '_'] }, { x: ['=', '+'] }, 'Backspace',
    'CapsLock', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', 'Del',
    'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', { x: ['\\', '/'] }, 'Enter',
    'ShiftLeft', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', { x: ['.', ','] }, 'ShiftRight',
    'Control', 'Alt', 'Space', 'ArrowLeft', 'ArrowUp', 'ArrowRight', 'ArrowDown'],
};

const keyBoard = new Keyboard();

function keyboardInit() {
  keyBoard.textarea = document.createElement('textarea');
  keyBoard.textarea.classList.add('text-input');
  
  keyBoard.keysContainer = document.createElement('div');
  keyBoard.keysContainer.classList.add('keys-container');
  
  document.body.append(keyBoard.textarea, keyBoard.keysContainer)
}

keyboardInit();