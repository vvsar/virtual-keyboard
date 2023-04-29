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

class Key {
  constructor(name) {
    this.name = name;
    this.icon = null;
  }
  createIcon(iconName) {
    this.icon = `<span class="material-icons">${iconName}</span>`;
    return this.icon;
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
  if (localStorage.getItem('language')) {
    keyBoard.language = localStorage.getItem('language');
  } else {
    keyBoard.language = 'en';
    localStorage.setItem('language', 'en');
  }

  keyBoard.textarea = document.createElement('textarea');
  keyBoard.textarea.classList.add('text-input');
  
  keyBoard.keysContainer = document.createElement('div');
  keyBoard.keysContainer.classList.add('keys-container');
  
  document.body.append(keyBoard.textarea, keyBoard.keysContainer)
  keyBoard.keysContainer.appendChild(createKeys());
}

function toggleCapsLock() {
  keyBoard.capsLock = !keyBoard.capsLock;
  keyBoard.keysContainer.childNodes.forEach((el) => {
    if (el.childElementCount === 0) {
      if (keyBoard.capsLock) {
        el.innerText = el.innerText.toUpperCase();
      } else {
        el.innerText = el.innerText.toLowerCase();
      }
    }
  });
}

function createKeys() {
  const fragment = document.createDocumentFragment();

  const currentLayout = keySet[`${keyBoard.language}`];
  currentLayout.forEach((keyName) => {
    const keyElement = document.createElement('button');
    const key = new Key(keyName);
    keyElement.classList.add('keyboard-key');
    keyElement.isPressed = false;
    const insertLineBreak = [currentLayout[13], currentLayout[27],
        currentLayout[40], currentLayout[52]].indexOf(keyName) !== -1;
    if (keyName !== 'Control' && keyName !== 'Alt' && keyName !== 'ShiftLeft' && keyName !== 'ShiftRight') {
      keyElement.onmousedown = function() { keyElement.classList.add('keyboard-key-pressed'); };
      keyElement.onmouseup = function() { keyElement.classList.remove('keyboard-key-pressed'); };
    }
    if (typeof keyName !== 'object') {
      switch (keyName) {
        case 'Control':
          keyElement.classList.add('keyboard-key-wide');
          keyElement.innerHTML = '<span>Ctrl</span>';
          keyElement.classList.add('ctrl');
          break;

        case 'Backspace':
          keyElement.classList.add('keyboard-key-wide');
          keyElement.innerHTML = key.createIcon('backspace');
          break;

        case 'CapsLock':
          keyElement.classList.add('keyboard-key-wide', 'keyboard-key-caps');
          keyElement.innerHTML = '<span>CapsLock</span>';
          if (keyBoard.capsLock) keyElement.classList.add('keyboard-key-caps-active');
          keyElement.addEventListener('click', () => {
            toggleCapsLock();
            keyElement.classList.toggle('keyboard-key-caps-active', keyBoard.capsLock);
            keyBoard.textarea.focus();
          });
          break;

        case 'Del':
          keyElement.innerHTML = '<span>Del</span>';
          break;

        case 'ShiftLeft':
        case 'ShiftRight':
          keyElement.classList.add('keyboard-key-wide');
          keyElement.innerHTML = '<span>Shift</span>';
          keyElement.classList.add('shift');
          break;

        case 'Alt':
          keyElement.classList.add('keyboard-key-wide');
          keyElement.innerHTML = '<span>Alt</span>';
          keyElement.classList.add('alt');
          break;

        case 'Enter':
          keyElement.classList.add('keyboard-key-wide');
          keyElement.innerHTML = key.createIcon('keyboard_return');
          break;

        case 'Space':
          keyElement.classList.add('keyboard-key-space');
          keyElement.innerHTML = key.createIcon('space_bar');
          break;

        case 'ArrowLeft':
          keyElement.innerHTML = key.createIcon('arrow_back');
          break;

        case 'ArrowRight':
          keyElement.innerHTML = key.createIcon('arrow_forward');
          break;

        case 'ArrowUp':
          keyElement.innerHTML = key.createIcon('arrow_upward');
          
          break;

        case 'ArrowDown':
          keyElement.innerHTML = key.createIcon('arrow_downward');
          break;

        default:
          if (!keyBoard.capsLock) {
            keyElement.innerText = key.name.toLowerCase();
          } else {
            keyElement.innerText = key.name.toUpperCase();
          }
          break;
      }
    } else {
      keyElement.innerText = key.name.x[0];
      const shiftSign = document.createElement('span');
      shiftSign.classList.add('keyboard-key-shift-sign');
      shiftSign.textContent = key.name.x[1];
      keyElement.appendChild(shiftSign);
    }

    fragment.appendChild(keyElement);
    if (insertLineBreak) {
      fragment.appendChild(document.createElement('br'));
    }
  });

  return fragment;
}

keyboardInit();