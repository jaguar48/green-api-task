
      
        const apiCall = async (endpoint, payload) => {
            const responseField = document.getElementById('response');
            try {
                const response = await fetch(`/api/${endpoint}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload),
                });
                const data = await response.json();
                responseField.value = JSON.stringify(data, null, 2);
            } catch (err) {
                responseField.value = `Error: ${err.message}`;
            }
        };

        
        document.getElementById('btnGetSettings').addEventListener('click', () => {
            const idInstance = document.getElementById('idInstance').value;
            const apiTokenInstance = document.getElementById('apiTokenInstance').value;
            apiCall('getSettings', { idInstance, apiTokenInstance });
        });

        document.getElementById('btnGetState').addEventListener('click', () => {
            const idInstance = document.getElementById('idInstance').value;
            const apiTokenInstance = document.getElementById('apiTokenInstance').value;
            apiCall('getStateInstance', { idInstance, apiTokenInstance });
        });

        document.getElementById('btnSendMessage').addEventListener('click', () => {
            const idInstance = document.getElementById('idInstance').value;
            const apiTokenInstance = document.getElementById('apiTokenInstance').value;
            const chatId = prompt('Enter Chat ID:');
            const message = prompt('Enter Message:');
            apiCall('sendMessage', { idInstance, apiTokenInstance, chatId, message });
        });

        document.getElementById('btnSendFile').addEventListener('click', () => {
            const idInstance = document.getElementById('idInstance').value;
            const apiTokenInstance = document.getElementById('apiTokenInstance').value;
            const chatId = prompt('Enter Chat ID:');
            const url = prompt('Enter File URL:');
            const fileName = prompt('Enter File Name:');
            const caption = prompt('Enter Caption:');
            apiCall('sendFileByUrl', { idInstance, apiTokenInstance, chatId, url, fileName, caption });
        });
   