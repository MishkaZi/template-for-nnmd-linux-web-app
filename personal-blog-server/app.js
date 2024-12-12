const http = require('http');
const { MongoClient } = require('mongodb');

const PORT = process.env.PORT || 3001;
const MONGO_URL = process.env.MONGO_URL;

const client = new MongoClient(MONGO_URL);

const server = http.createServer(async (req, res) => {
    if (req.url === '/products' && req.method === 'GET') {
        try {
            await client.connect();
            const db = client.db();
            const products = await db.collection('products').find().toArray();

            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(products));
        } catch (err) {
            console.error('Error:', err.message);
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Internal Server Error');
        }
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
    }
});

server.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
});
