function CryptoanalysisCaesarEncryptedMessage() {
    const encryptedMessage = document.getElementById('encryptedMessageOutput').value;
    const alphabetItems = document.querySelectorAll('.alphabet-item');
    var alphabetName = null;

    const cryptanalysisAnswer_key = document.getElementById("cryptanalysis-key");
    const cryptanalysisAnswer_encryptedMessage = document.getElementById("cryptanalysis-decrypted_message");

    alphabetItems.forEach(item => {
        if (item.classList.contains('selected')) {
            alphabetName = item.dataset.method;
        }
    })

    if (!alphabetName) {
        console.log("Alphabet_select_name: not select!")
        return;
    }
    if (encryptedMessage.length == 0) {
        console.log("DecryptedMessage: not found");
        return;
    }

    fetchCryptoanalysisCaesarEncryptedMessage(encryptedMessage, alphabetName, 
        cryptanalysisAnswer_key, cryptanalysisAnswer_encryptedMessage);
}

async function fetchCryptoanalysisCaesarEncryptedMessage(message, alphabet, cryptanalysisAnswerKey, cryptoanalysisAnswerEncryptedMessage) {
    try {
        const response = await fetch('/cryptoanalysisCaesarCipher/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                message: message,
                alphabet: alphabet,
            })
        });

        if (!response.ok) {
            console.log(`HTTP error! status: ${response.status}`);
            return;
        }

        const data = await response.json();

        cryptanalysisAnswerKey.textContent = data.breakCaesar_bestKey;
        cryptoanalysisAnswerEncryptedMessage.textContent = data.breakCaesar_decryptedMessage;

        update_table_monogramAlphabet(data.monogram_frequencies, "monogramAlphabetTable");
        update_table_cryptoanalysis(data.cryptanalysis, "cryptanalysisTable", data.breakCaesar_bestKey);
    } catch (error) {
        console.error('Error when sending data to the server:', error);
    }
}

function update_table_monogramAlphabet(data, id_element) {
    const parseDataObject = JSON.parse(data);
    const table_area = document.getElementById(id_element);

    if (!table_area) { 
        console.log(`getElementById: can not find object with id ${id_element}`); 
        return; 
    }

    table_area.innerHTML = "";
    if (parseDataObject && Object.keys(parseDataObject).length > 0) 
    {
        const tableMonogram = document.createElement("table");
        const theadMonogram = document.createElement("thead");
        const headerRowMonogram = document.createElement("tr");

        tableMonogram.className = "monogram-table";
        headerRowMonogram.innerHTML = "<th>Letter</th><th>Frequency</th>";
        theadMonogram.appendChild(headerRowMonogram);
        tableMonogram.appendChild(theadMonogram);
        
        const tbodyMonogram = document.createElement("tbody");

        for (const letter in parseDataObject) 
        {
            const frequency = parseDataObject[letter];
            const row = document.createElement("tr");

            row.innerHTML = `<td>${letter}</td><td>${frequency.toFixed(4)}</td>`;
            tbodyMonogram.appendChild(row);
        }

        tableMonogram.appendChild(tbodyMonogram);
        table_area.appendChild(tableMonogram);
    } else {
        table_area.textContent = "No monogram frequencies available.";
    }
}

function update_table_cryptoanalysis(data, id_element, best_key) {
    const parseDataObject = JSON.parse(data);
    const table_area = document.getElementById(id_element);

    if (!table_area) { 
        console.log(`getElementById: can not find object with id ${id_element}`); 
        return; 
    }

    table_area.innerHTML = "";
    if (parseDataObject && parseDataObject.key && parseDataObject.key.length > 0) 
    {
        const tableCryptanalysis = document.createElement("table");
        const theadCryptanalysis = document.createElement("thead");
        const headerRowCryptanalysis = document.createElement("tr");

        tableCryptanalysis.className = "cryptanalysis-table";
        headerRowCryptanalysis.innerHTML = "<th>Key</th><th>Decrypted Text</th><th>X²</th>";
        theadCryptanalysis.appendChild(headerRowCryptanalysis);
        tableCryptanalysis.appendChild(theadCryptanalysis);

        const tbodyCryptanalysis = document.createElement("tbody");

        for (let i = 0; i < parseDataObject.key.length; i++) 
        {
            const key = parseDataObject.key[i];
            const decryptedText = parseDataObject.decrypted_text[i];
            const x2 = parseDataObject.x2[i];

            const row = document.createElement("tr");

            if (i == best_key) {
                row.classList.add("best-key-row");
            }

            row.innerHTML = `<td>${key}</td><td>${decryptedText.substring(0, 30)}...</td><td>${x2.toFixed(4)}</td>`; 
            tbodyCryptanalysis.appendChild(row);
        }

        tableCryptanalysis.appendChild(tbodyCryptanalysis);
        table_area.appendChild(tableCryptanalysis);
    } else {
        table_area.textContent = "No cryptanalysis data available.";
    }
}

export function initCryptoanalysisCaesarEncryptedMessage() {
    const getCryptoanalysisButton = document.getElementById('get_cryptoanalysis');

    if (getCryptoanalysisButton) {
        getCryptoanalysisButton.addEventListener('click', function (event) {
            event.preventDefault();
            CryptoanalysisCaesarEncryptedMessage();
        });
    } else {
        console.error('get_cryptoanalysis-button not found');
    }
}