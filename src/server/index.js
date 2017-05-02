import express from 'express'
import React from 'react'
import { StaticRouter, browserHistory } from 'react-router'
import ReactDOMServer from 'react-dom/server'
import path from 'path'
import fs from 'fs'
import App from '../shared/components/App'

const app = express()
const context = {}

const staticPath = path.join(__dirname, '../../build/public/static')
app.use('/static', express.static(staticPath))
app.get('*', (req, res) => {
  const RenderedContent = ReactDOMServer.renderToString(
    <StaticRouter
      location={req.url}
      context={context}
      history={browserHistory}
    >
      <App />
    </StaticRouter>
  )

  fs.readFile('./build/public/index.html', 'utf-8', function (err, data) {
    let RenderedPage = ''
    if (err) {
      res.status(500).send(500)
    } else {
      RenderedPage = data
      if (!RenderedContent) {
        res.status(404).send(404)
      }
      RenderedPage = RenderedPage.replace('{{SSR}}', RenderedContent)
      res.status(200).send(RenderedPage)
    }
  })
})
app.listen(4000, () => console.log('Demo app listening on port 4000'))
console.log('Listening on http://localhost:4000')