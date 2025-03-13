function placeholder() {
    console.log('DowloadCryptanalysis: this function is currently under development.');
}

function fileReaderFunction(event) {
    const inputMessage = document.getElementById('messageInput');
    const upload_input = document.getElementById('upload_file_input');

    upload_input.click();
    upload_input.addEventListener('change', () => {
        if (!upload_input.files) {
            console.log("FileReadef: file did not be selecte!");
            return;
        }

        let file = upload_input.files[0];
        if (file.type === 'text/plain' || file.name.endsWith('.txt')) {
            let reader = new FileReader();
            console.log(reader);
            reader.readAsText(file);
            
            reader.onload = function() {
                inputMessage.value = reader.result.replace(/[\r\n]+/g, ' ');
                console.log(reader.result);
            };
        
            reader.onerror = function() {
                console.log(reader.error);
            };
        } else {
            console.log("FileReader: the selected file does not have the expected file extension");
        }
    })
}

export function initFileUtils() {
    const loadFileButton = document.getElementById('load_file_button');
    const dowloadFileButton = document.getElementById('dowload_cryptanalysis_button');
    
    if (dowloadFileButton) {
        dowloadFileButton.addEventListener('click', placeholder);
    } else {
        console.log('dowload_cryptanalysis_button not found')
    }

    if (loadFileButton) {
        loadFileButton.addEventListener('click', function (event) {       
            fileReaderFunction(event);
        });
    } else {
        console.log('load_file_button not found');
    }
}