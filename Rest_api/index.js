const express = require('express')
const userdata = require('./MOCK_DATA.json')
const fs = require('fs')
const { error } = require('console')



const app = express()
app.use(express.urlencoded({ extended: false }))

app.get('/api/users', (req, res) => {
    res.json(userdata)
})

app.get('/users', (req, res) => {
    const html = `
    <ul>
    ${userdata.map((user) => `<li>${user.firstname} ${user.lastname}</li>`
    ).join('')}
    </ul>
    `
    res.send(html)
})
app.get('/users/:userid', (req, res) => {
    const id = Number(req.params.userid)
    const user = userdata.find((user) => user.id === id)
    return res.json(user)
})


app.post('/api/users', (req, res) => {
    const body = req.body
    userdata.push({ ...body, id: userdata.length + 1 })
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(userdata), (error, data) => {
        return res.json({ status: "success", id: userdata.length })
    })

})


app.listen(8000, () => {
    console.log('app is running on port 8000')
})

