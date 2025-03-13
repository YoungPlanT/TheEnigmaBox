import { initFileUtils } from './partials/file_utils.js';
import { initCeasarCipher } from './partials/Cipher_utils.js';
import { initCryptoanalysisCaesarEncryptedMessage } from './partials/cryptoanalysis_utils.js';

export function init() {
    initFileUtils();
    initCeasarCipher();
    initCryptoanalysisCaesarEncryptedMessage();
}