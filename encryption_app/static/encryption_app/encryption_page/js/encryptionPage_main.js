import { initFileUtils } from './partials/file_utils.js';
import { initCeasarCipher } from './partials/Cipher_utils.js';
import { initCryptoanalysisCaesarEncryptedMessage } from './partials/cryptoanalysis_utils.js';
import { initMenuUtils } from './partials/menu_utils.js'

export function init() {
    initFileUtils();
    initCeasarCipher();
    initCryptoanalysisCaesarEncryptedMessage();
    initMenuUtils();
}

// Проблема в том, что меняется содержимое страницы, а сами методы отсались, из-за чего новое != прошлому