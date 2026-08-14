const express = require("express")
const aiRoutes = require('./routes/ai.routes')
const cors =  require('cors')
const app = express()

app.get("/", (req, res)=>{
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>AI Code Review Studio</title>
            <style>
                * { margin: 0; padding: 0; box-sizing: border-box; }
                body {
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    min-height: 100vh;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .container {
                    background: white;
                    padding: 50px;
                    border-radius: 10px;
                    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
                    text-align: center;
                    max-width: 600px;
                }
                h1 {
                    color: #667eea;
                    margin-bottom: 15px;
                    font-size: 2.5em;
                }
                p {
                    color: #555;
                    font-size: 1.1em;
                    line-height: 1.6;
                    margin-bottom: 20px;
                }
                .api-status {
                    background: #f0f0f0;
                    padding: 20px;
                    border-radius: 8px;
                    margin: 20px 0;
                    border-left: 4px solid #667eea;
                }
                .status-badge {
                    display: inline-block;
                    background: #4CAF50;
                    color: white;
                    padding: 8px 16px;
                    border-radius: 20px;
                    font-weight: bold;
                    margin-top: 10px;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>🚀 AI Code Review Studio</h1>
                <p>Welcome to the AI-powered Code Review Platform</p>
                <div class="api-status">
                    <p><strong>API Status:</strong></p>
                    <span class="status-badge">✓ Running</span>
                </div>
                <p style="color: #888; font-size: 0.95em; margin-top: 30px;">
                    Use the /ai endpoint to access the code review services
                </p>
            </div>
        </body>
        </html>
    `)
})

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())

app.use('/ai', aiRoutes);

module.exports = app