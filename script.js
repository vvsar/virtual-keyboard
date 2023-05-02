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
    'Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', { x: ['[', '{'] }, { x: [']', '}'] }, 'Del',
    'CapsLock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', { x: [';', ':'] }, { x: ['\'', '"'] }, { x: ['\\', '|'] }, 'Enter',
    'ShiftLeft', 'z', 'x', 'c', 'v', 'b', 'n', 'm', { x: [',', '<'] }, { x: ['.', '>'] }, { x: ['/', '?'] }, 'ShiftRight',
    'Control', 'Alt', 'Space', 'ArrowLeft', 'ArrowUp', 'ArrowRight', 'ArrowDown'],
  ru:
  ['ё', { x: ['1', '!'] }, { x: ['2', '"'] }, { x: ['3', '№'] }, { x: ['4', ';'] }, { x: ['5', '%'] }, { x: ['6', ':'] },
    { x: ['7', '?'] }, { x: ['8', '*'] }, { x: ['9', '('] }, { x: ['0', ')'] }, { x: ['-', '_'] }, { x: ['=', '+'] }, 'Backspace',
    'Tab', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', 'Del',
    'CapsLock', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', { x: ['\\', '/'] }, 'Enter',
    'ShiftLeft', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', { x: ['.', ','] }, 'ShiftRight',
    'Control', 'Alt', 'Space', 'ArrowLeft', 'ArrowUp', 'ArrowRight', 'ArrowDown'],
  codes:
  ['Backquote', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6',
    'Digit7', 'Digit8', 'Digit9', 'Digit0', 'Minus', 'Equal', 'Backspace',
    'Tab', 'KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'BracketLeft', 'BracketRight', 'Delete',
    'CapsLock', 'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Quote', 'Backslash', 'Enter',
    'ShiftLeft', 'KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM', 'Comma', 'Period', 'Slash', 'ShiftRight',
    'ControlLeft', 'AltLeft', 'Space', 'ArrowLeft', 'ArrowUp', 'ArrowRight', 'ArrowDown'],
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

  keyBoard.infoLIne = document.createElement('div');
  keyBoard.infoLIne.classList.add('info-line');
  const winLogo = document.createElement('img');
  winLogo.src = './assets/winlogo.png';
  winLogo.alt = 'Windows logo';
  winLogo.classList.add('win-logo');
  keyBoard.langSign = document.createElement('div');
  keyBoard.langSign.classList.add('lang-sign');
  keyBoard.langSign.textContent = (`${keyBoard.language}`).toUpperCase();
  const shiftInfo = document.createElement('span');
  shiftInfo.classList.add('shift-info');
  shiftInfo.textContent = 'En/Ru switch: Ctrl-Shift';
  keyBoard.infoLIne.append(winLogo, keyBoard.langSign, shiftInfo);
  
  keyBoard.keysContainer = document.createElement('div');
  keyBoard.keysContainer.classList.add('keys-container');
  
  document.body.append(keyBoard.textarea, keyBoard.infoLIne, keyBoard.keysContainer)
  keyBoard.keysContainer.appendChild(createKeys());
  keyBoard.textarea.focus();
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

function releaseCtrlAltShift() {
  document.querySelectorAll('.shift').forEach((el) => {
    el.isPressed = false;
    el.classList.remove('keyboard-key-pressed');
  });
  document.querySelector('.ctrl').isPressed = false;
  document.querySelector('.ctrl').classList.remove('keyboard-key-pressed');
  document.querySelector('.alt').isPressed = false;
  document.querySelector('.alt').classList.remove('keyboard-key-pressed');
}

function toggleEnRu() {
  if (keyBoard.language === 'en') {
    keyBoard.language = 'ru';
    localStorage.setItem('language', 'ru');
  } else {
    keyBoard.language = 'en';
    localStorage.setItem('language', 'en');
  }
  keyBoard.langSign.textContent = (`${keyBoard.language}`).toUpperCase();
  while (keyBoard.keysContainer.firstChild) {
    keyBoard.keysContainer.firstChild.remove();
  }
  keyBoard.keysContainer.appendChild(createKeys());
}

function createKeys() {
  const fragment = document.createDocumentFragment();

  const currentLayout = keySet[`${keyBoard.language}`];
  currentLayout.forEach((keyName) => {
    const keyElement = document.createElement('button');
    const key = new Key(keyName);
    keyElement.classList.add('keyboard-key');
    keyElement.isPressed = false;
    keyElement.code = keySet.codes[currentLayout.indexOf(keyName)];
    const insertLineBreak = [currentLayout[13], currentLayout[27],
        currentLayout[41], currentLayout[53]].indexOf(keyName) !== -1;
    if (keyName !== 'Control' && keyName !== 'Alt' && keyName !== 'ShiftLeft' && keyName !== 'ShiftRight') {
      keyElement.onmousedown = function() { keyElement.classList.add('keyboard-key-pressed'); };
      keyElement.onmouseup = function() { keyElement.classList.remove('keyboard-key-pressed'); };
    }
    if (typeof keyName !== 'object') {
      switch (keyName) {
        case 'Tab':
          keyElement.classList.add('keyboard-key-wide');
          keyElement.innerHTML = key.createIcon('tab');
          keyElement.addEventListener('click', () => {
            const selectionStart = keyBoard.textarea.selectionStart;
            const selectionEnd = keyBoard.textarea.selectionEnd;
            keyBoard.textarea.value = `${keyBoard.textarea.value.slice(0, selectionStart)}    ${keyBoard.textarea.value.slice(selectionEnd)}`;
            keyBoard.textarea.selectionStart = selectionStart + 4;
            keyBoard.textarea.selectionEnd = keyBoard.textarea.selectionStart;
            keyBoard.textarea.focus();
          });
          break;

        case 'Control':
          keyElement.classList.add('keyboard-key-wide');
          keyElement.innerHTML = '<span>Ctrl</span>';
          keyElement.classList.add('ctrl');
          keyElement.addEventListener('click', () => {
            keyElement.isPressed = true;
            keyElement.classList.add('keyboard-key-pressed');
            keyBoard.textarea.focus();
          });
          break;

        case 'Backspace':
          keyElement.classList.add('keyboard-key-wide');
          keyElement.innerHTML = key.createIcon('backspace');
          keyElement.addEventListener('click', () => {
            const selectionStart = keyBoard.textarea.selectionStart;
            const selectionEnd = keyBoard.textarea.selectionEnd;
            if (selectionStart === selectionEnd && !(selectionStart === 0 && selectionEnd === 0)) {
              keyBoard.textarea.value = keyBoard.textarea.value.slice(0, selectionStart - 1)
                  + keyBoard.textarea.value.slice(selectionEnd);
              keyBoard.textarea.selectionStart = selectionStart - 1;
              keyBoard.textarea.selectionEnd = keyBoard.textarea.selectionStart;
            } else {
              keyBoard.textarea.value = keyBoard.textarea.value.slice(0, selectionStart)
                  + keyBoard.textarea.value.slice(selectionEnd);
              keyBoard.textarea.selectionStart = selectionStart;
              keyBoard.textarea.selectionEnd = keyBoard.textarea.selectionStart;
            }
            keyBoard.textarea.focus();
          });
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
          keyElement.addEventListener('click', () => {
            const selectionStart = keyBoard.textarea.selectionStart;
            const selectionEnd = keyBoard.textarea.selectionEnd;
            if (selectionStart === selectionEnd) {
              keyBoard.textarea.value = keyBoard.textarea.value.slice(0, selectionStart)
                  + keyBoard.textarea.value.slice(selectionEnd + 1);
              keyBoard.textarea.selectionStart = selectionStart;
              keyBoard.textarea.selectionEnd = keyBoard.textarea.selectionStart;
            } else {
              keyBoard.textarea.value = keyBoard.textarea.value.slice(0, selectionStart)
                  + keyBoard.textarea.value.slice(selectionEnd);
              keyBoard.textarea.selectionStart = selectionStart;
              keyBoard.textarea.selectionEnd = keyBoard.textarea.selectionStart;
            }
            keyBoard.textarea.focus();
          });
          break;

        case 'ShiftLeft':
        case 'ShiftRight':
          keyElement.classList.add('keyboard-key-wide');
          keyElement.innerHTML = '<span>Shift</span>';
          keyElement.classList.add('shift');
          keyElement.addEventListener('click', () => {
            if (document.querySelector('.ctrl').isPressed) {
              keyElement.onmousedown = function() { keyElement.classList.add('keyboard-key-pressed'); };
              keyElement.onmouseup = function() { keyElement.classList.remove('keyboard-key-pressed'); };
              toggleEnRu();
              releaseCtrlAltShift();
            } else {
              keyElement.isPressed = true;
              keyElement.classList.add('keyboard-key-pressed');
            }
            keyBoard.textarea.focus();
          });
          break;

        case 'Alt':
          keyElement.classList.add('keyboard-key-wide');
          keyElement.innerHTML = '<span>Alt</span>';
          keyElement.classList.add('alt');
          keyElement.addEventListener('click', () => {
            keyElement.isPressed = true;
            keyElement.classList.add('keyboard-key-pressed');
            keyBoard.textarea.focus();
          });
          break;

        case 'Enter':
          keyElement.classList.add('keyboard-key-wide');
          keyElement.innerHTML = key.createIcon('keyboard_return');
          keyElement.addEventListener('click', () => {
            const selectionStart = keyBoard.textarea.selectionStart;
            const selectionEnd = keyBoard.textarea.selectionEnd;
            keyBoard.textarea.value = `${keyBoard.textarea.value.slice(0, selectionStart)}\n${keyBoard.textarea.value.slice(selectionEnd)}`;
            keyBoard.textarea.focus();
            keyBoard.textarea.selectionStart = selectionStart + 1;
            keyBoard.textarea.selectionEnd = keyBoard.textarea.selectionStart;
            keyBoard.textarea.focus();
          });
          break;

        case 'Space':
          keyElement.classList.add('keyboard-key-space');
          keyElement.innerHTML = key.createIcon('space_bar');
          keyElement.addEventListener('click', () => {
            const selectionStart = keyBoard.textarea.selectionStart;
            const selectionEnd = keyBoard.textarea.selectionEnd;
            keyBoard.textarea.value = `${keyBoard.textarea.value.slice(0, selectionStart)} ${keyBoard.textarea.value.slice(selectionEnd)}`;
            keyBoard.textarea.selectionStart = selectionStart + 1;
            keyBoard.textarea.selectionEnd = keyBoard.textarea.selectionStart;
            keyBoard.textarea.focus();
          });
          break;

        case 'ArrowLeft':
          keyElement.innerHTML = key.createIcon('arrow_back');
          keyElement.addEventListener('click', () => {
            const selectionStart = keyBoard.textarea.selectionStart;
            const selectionEnd = keyBoard.textarea.selectionEnd;
            if (selectionStart === 0 && selectionEnd === 0) keyBoard.textarea.focus();
            if (selectionStart === selectionEnd) {
              keyBoard.textarea.selectionStart = selectionStart - 1;
              keyBoard.textarea.selectionEnd = keyBoard.textarea.selectionStart;
            } else {
              keyBoard.textarea.selectionStart = selectionStart;
              keyBoard.textarea.selectionEnd = keyBoard.textarea.selectionStart;
            }
            releaseCtrlAltShift();
            keyBoard.textarea.focus();
          });
          break;

        case 'ArrowRight':
          keyElement.innerHTML = key.createIcon('arrow_forward');
          keyElement.addEventListener('click', () => {
            const selectionStart = keyBoard.textarea.selectionStart;
            const selectionEnd = keyBoard.textarea.selectionEnd;
            if (selectionStart === selectionEnd) {
              keyBoard.textarea.selectionStart = selectionStart + 1;
              keyBoard.textarea.selectionEnd = keyBoard.textarea.selectionStart;
            } else {
              keyBoard.textarea.selectionEnd = selectionEnd;
              keyBoard.textarea.selectionStart = keyBoard.textarea.selectionEnd;
            }
            releaseCtrlAltShift();
            keyBoard.textarea.focus();
          });
          break;

        case 'ArrowUp':
          keyElement.innerHTML = key.createIcon('arrow_upward');
          keyElement.addEventListener('click', () => {
            
          });
          break;

        case 'ArrowDown':
          keyElement.innerHTML = key.createIcon('arrow_downward');
          keyElement.addEventListener('click', () => {
            const selectionEnd = keyBoard.textarea.selectionEnd;
            let inRowCursorPosition;
            let previousLineBreak;
            let nextLineBreak = keyBoard.textarea.value.indexOf('\n', selectionEnd);
            let nextNextLineBreak = keyBoard.textarea.value.indexOf('\n', nextLineBreak + 1);
            if (keyBoard.textarea.value.lastIndexOf('\n', selectionEnd) < 0) {
              previousLineBreak = 0;
              inRowCursorPosition = selectionEnd;
            } else if (selectionEnd === keyBoard.textarea.value.lastIndexOf('\n', selectionEnd)) {
              previousLineBreak = keyBoard.textarea.value.lastIndexOf('\n', selectionEnd - 1) + 1;
              if (previousLineBreak < 0) {
                previousLineBreak = 0
              }
              inRowCursorPosition = selectionEnd - previousLineBreak;
            } else {
              previousLineBreak = keyBoard.textarea.value.lastIndexOf('\n', selectionEnd);
              inRowCursorPosition = selectionEnd - previousLineBreak - 1;
            }
            console.log(inRowCursorPosition, nextLineBreak, nextNextLineBreak);
            if (nextLineBreak >= 0) {
              if (nextNextLineBreak >= 0) {
                if (inRowCursorPosition < nextNextLineBreak - nextLineBreak) {
                  keyBoard.textarea.selectionEnd = nextLineBreak + inRowCursorPosition + 1;
                } else {
                  keyBoard.textarea.selectionEnd = nextNextLineBreak;
                }
              } else {
                if (inRowCursorPosition < keyBoard.textarea.value.length - nextLineBreak) {
                  keyBoard.textarea.selectionEnd = nextLineBreak + inRowCursorPosition + 1;
                } else {
                  keyBoard.textarea.selectionEnd = keyBoard.textarea.value.length;
                }
              }
              keyBoard.textarea.selectionStart = keyBoard.textarea.selectionEnd;
            }
            releaseCtrlAltShift();
            keyBoard.textarea.focus();
          });
          break;

        default:
          if (!keyBoard.capsLock) {
            keyElement.innerText = key.name.toLowerCase();
          } else {
            keyElement.innerText = key.name.toUpperCase();
          }
          keyElement.addEventListener('click', () => {
            const selectionStart = keyBoard.textarea.selectionStart;
            const selectionEnd = keyBoard.textarea.selectionEnd;
            if (keyBoard.capsLock && (document.querySelectorAll('.shift')[0].isPressed || document.querySelectorAll('.shift')[1].isPressed)) {
              keyBoard.textarea.value = `${keyBoard.textarea.value.slice(0, selectionStart)}${key.name.toLowerCase()}${keyBoard.textarea.value.slice(selectionEnd)}`;
            } else if (keyBoard.capsLock || document.querySelectorAll('.shift')[0].isPressed || document.querySelectorAll('.shift')[1].isPressed) {
              keyBoard.textarea.value = `${keyBoard.textarea.value.slice(0, selectionStart)}${key.name.toUpperCase()}${keyBoard.textarea.value.slice(selectionEnd)}`;
            } else {
              keyBoard.textarea.value = `${keyBoard.textarea.value.slice(0, selectionStart)}${key.name.toLowerCase()}${keyBoard.textarea.value.slice(selectionEnd)}`;
            }
            releaseCtrlAltShift();
            keyBoard.textarea.selectionStart = selectionStart + 1;
            keyBoard.textarea.selectionEnd = keyBoard.textarea.selectionStart;
            keyBoard.textarea.focus();
          });
          break;
      }
    } else {
      keyElement.innerText = key.name.x[0];
      const shiftSign = document.createElement('span');
      shiftSign.classList.add('keyboard-key-shift-sign');
      shiftSign.textContent = key.name.x[1];
      keyElement.appendChild(shiftSign);
      keyElement.addEventListener('click', () => {
        const selectionStart = keyBoard.textarea.selectionStart;
        const selectionEnd = keyBoard.textarea.selectionEnd;
        if (document.querySelectorAll('.shift')[0].isPressed || document.querySelectorAll('.shift')[1].isPressed) {
          keyBoard.textarea.value = `${keyBoard.textarea.value.slice(0, selectionStart)}${key.name.x[1]}${keyBoard.textarea.value.slice(selectionEnd)}`;
          releaseCtrlAltShift();
        } else {
          keyBoard.textarea.value = `${keyBoard.textarea.value.slice(0, selectionStart)}${key.name.x[0]}${keyBoard.textarea.value.slice(selectionEnd)}`;
        }
        keyBoard.textarea.selectionStart = selectionStart + 1;
        keyBoard.textarea.selectionEnd = keyBoard.textarea.selectionStart;
        keyBoard.textarea.focus();
      });
    }

    fragment.appendChild(keyElement);
    if (insertLineBreak) {
      fragment.appendChild(document.createElement('br'));
    }
  });

  return fragment;
}

window.addEventListener('keydown', (event) => {
  event.preventDefault();
  keyBoard.keysContainer.childNodes.forEach((el) => {
    if (el.code === event.code) {
      el.classList.add('keyboard-key-highlighted');
      el.click();
    }
  });
});

window.addEventListener('keyup', (event) => {
  event.preventDefault();
  keyBoard.keysContainer.childNodes.forEach((el) => {
    if (el.code === event.code) {
      el.classList.remove('keyboard-key-highlighted');
    }
  });
});

keyboardInit();

alert('Работа над кнопками ArrowUp и ArrowDown продолжается.');