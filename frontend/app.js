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
                displayChatMessage('Assistant', response.data
