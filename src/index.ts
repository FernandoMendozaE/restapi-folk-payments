import app from './app'
import './database/database'
import './database/database-mongoose'

app.listen(app.get('port'))

console.log('Server running on port', app.get('port'))
