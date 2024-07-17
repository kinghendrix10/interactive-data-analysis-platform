// WebSocket connection
const socket = new WebSocket('ws://localhost:3000');

socket.addEventListener('open', (event) => {
    console.log('WebSocket connection established');
});

socket.addEventListener('message', (event) => {
    console.log('Message from server:', event.data);
    // Handle incoming WebSocket messages
});

// File upload functionality
const fileInput = document.getElementById('file-input');
const uploadButton = document.getElementById('upload-file');

uploadButton.addEventListener('click', () => {
    const file = fileInput.files[0];
    if (file) {
        const formData = new FormData();
        formData.append('file', file);

        axios.post('/api/upload', formData)
            .then(response => {
                console.log('File uploaded successfully:', response.data);
                updateDocumentList();
            })
            .catch(error => {
                console.error('Error uploading file:', error);
            });
    }
});

// Query processing functionality
const queryInput = document.getElementById('query-input');
const sendQueryButton = document.getElementById('send-query');
const chatWindow = document.getElementById('chat-window');

sendQueryButton.addEventListener('click', () => {
    const query = queryInput.value;
    if (query) {
        axios.post('/api/query', { query })
            .then(response => {
                console.log('Query processed:', response.data);
                displayChatMessage('User', query);
                displayChatMessage('Assistant', response.data.generatedCode);
                updateCodeEditor(response.data.generatedCode);
            })
            .catch(error => {
                console.error('Error processing query:', error);
            });
    }
});

function displayChatMessage(sender, message) {
    const messageElement = document.createElement('div');
    messageElement.innerHTML = `<strong>${sender}:</strong> ${message}`;
    chatWindow.appendChild(messageElement);
    chatWindow.scrollTop = chatWindow.scrollHeight;
}

// Visualization functionality
const visualizationArea = document.getElementById('visualization-area');

function updateVisualization(data, chartType) {
    axios.get('/api/visualization', { params: { data: JSON.stringify(data), chartType } })
        .then(response => {
            console.log('Visualization generated:', response.data);
            Plotly.newPlot(visualizationArea, response.data.chart);
        })
        .catch(error => {
            console.error('Error generating visualization:', error);
        });
}

// Code execution functionality
const codeEditor = document.getElementById('code-editor');
const executeCodeButton = document.getElementById('execute-code');

executeCodeButton.addEventListener('click', () => {
    const code = codeEditor.value;
    if (code) {
        axios.post('/api/execute', { code })
            .then(response => {
                console.log('Code executed:', response.data);
                displayChatMessage('System', `Code execution result: ${response.data.output}`);
            })
            .catch(error => {
                console.error('Error executing code:', error);
            });
    }
});

function updateCodeEditor(code) {
    codeEditor.value = code;
}

// Document list functionality
const documentList = document.getElementById('document-list');

function updateDocumentList() {
    axios.get('/api/documents')
        .then(response => {
            console.log('Documents retrieved:', response.data);
            documentList.innerHTML = '';
            response.data.documents.forEach(doc => {
                const li = document.createElement('li');
                li.textContent = doc.name;
                documentList.appendChild(li);
            });
        })
        .catch(error => {
            console.error('Error retrieving documents:', error);
        });
}

// Initial setup
updateDocumentList();

// Navigation functionality
const navLinks = document.querySelectorAll('nav a');
const sections = document.querySelectorAll('main section');

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').slice(1);
        sections.forEach(section => {
            section.style.display = section.id === targetId ? 'block' : 'none';
        });
    });
});

// Show the overview section by default
sections.forEach(section => {
    section.style.display = section.id === 'overview' ? 'block' : 'none';
});
