const config_FileReader = {
    ACCEPTED_FILE_TYPES: ['text/plain'],
    ACCEPTED_FILE_EXTENSIONS: ['.txt'],
    MAX_FILE_SIZE: 1024*1024*5,
};

function placeholder(field) {
    console.log(`${field}: this function is currently under development.`);
    alert(`${field}: this function is currently under development.`);
}

function readFileAsync(file) {
    return new Promise((resolve, reject) => {
        let reader = new FileReader();

        reader.onload = () => {
            resolve(reader.result);
        };

        reader.onerror = () => {
            reject(reader.error);
        };

        reader.readAsText(file);
    });
}

async function handleFileUpload(file) {
    const inputMessage = document.getElementById('messageInput');

    if (!config_FileReader.ACCEPTED_FILE_TYPES.includes(file.type) 
        && !config_FileReader.ACCEPTED_FILE_EXTENSIONS.some(ext => file.name.endsWith(ext))) {
        alert("FileReader: The selected file does not have the expected file extension or type.");
        return;
    }

    if (file.size > config_FileReader.MAX_FILE_SIZE) {
        alert("FileReader: File size exceeds the maximum allowed size.");
        return;
    }

    try {
        const fileContent = await readFileAsync(file);
        inputMessage.value = fileContent.replace(/[\r\n]+/g, ' ');
    } catch (error) {
        console.error("FileReader error:", error);
        alert("FileReader: An error occurred while reading the file.");
    }
}

function fileReaderFunction(event) {
    const upload_input = document.getElementById('upload_file_input');

    upload_input.click();

    upload_input.onchange = () => {
        if (!upload_input.files || upload_input.files.length === 0) {
            console.log("FileReader: no file selected!");
            return;
        }

        const file = upload_input.files[0];
        handleFileUpload(file);
    }
}

export function initFileUtils() {
    const loadFileButton = document.getElementById('load_file_button');
    const dowloadFileButton = document.getElementById('dowload_cryptanalysis_button');

    dowloadFileButton ? dowloadFileButton.addEventListener('click', placeholder) : console.log('dowload_cryptanalysis_button not found');
    loadFileButton ? loadFileButton.addEventListener('click', fileReaderFunction) : console.log('load_file_button not found');
}