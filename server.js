import express from 'express';
import bodyParser from 'body-parser';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config(); 

const app = express();
app.use(bodyParser.json()); 
app.use(express.static('public')); 

const PORT = process.env.PORT || 3000;
const API_BASE_URL = process.env.API_BASE_URL;
const mediaUrl = process.env.MEDIA_URL;

const fetchFromGreenAPI = async (url, method = 'GET', data = {}) => {
    try {
        const response = await axios({ url, method, data });
        return response.data;
    } catch (error) {
        console.error('Error:', error.message);
        throw new Error('Failed to perform the request.');
    }
};


app.post('/api/getSettings', async (req, res) => {
    const { idInstance, apiTokenInstance } = req.body;
    const url = `${API_BASE_URL}/waInstance${idInstance}/getSettings/${apiTokenInstance}`;
    try {
        const data = await fetchFromGreenAPI(url);
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/getStateInstance', async (req, res) => {
    const { idInstance, apiTokenInstance } = req.body;
    const url = `${API_BASE_URL}/waInstance${idInstance}/getStateInstance/${apiTokenInstance}`;
    try {
        const data = await fetchFromGreenAPI(url);
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/sendMessage', async (req, res) => {
    const { idInstance, apiTokenInstance, chatId, message } = req.body;
    const url = `${API_BASE_URL}/waInstance${idInstance}/sendMessage/${apiTokenInstance}`;
    try {
        const data = await fetchFromGreenAPI(url, 'POST', { chatId, message });
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/sendFileByUrl', async (req, res) => {
    const { idInstance, apiTokenInstance, chatId, url,fileName, caption } = req.body;
    const apiEndpoint = `${mediaUrl}/waInstance${idInstance}/sendFileByUrl/${apiTokenInstance}`;
    try {
        const data = await fetchFromGreenAPI(apiEndpoint, 'POST', { chatId, url, fileName, caption });
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
