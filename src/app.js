import cors from "cors"
import express from "express"

const app = express()

app.use(cors())
app.use(express.json())

const serverUsers = []
const tweets = []

app.post('/sign-up', (req, res) => {

    //função pra diferencias usuarios

    const { username, avatar } = req.body

    const newUser = {
        id: serverUsers.length + 1,
        username,
        avatar
    }

    serverUsers.push(newUser)
    res.send("OK")
})

app.get('/sign-up', (req, res) => {
    res.send(serverUsers)
})

app.get('/tweets', (req, res) => {

    const posts = []
    console.log(tweets)
    console.log(tweets.length)
    if (tweets.length > 10) {
        
        for(let i = 0; i < 10; i++){
            posts.push(tweets[i])
        }

        res.send(posts)

    } else {
        res.send(tweets)
    }
})

app.post('/tweets', (req, res) => {

    const { username, tweet } = req.body
    let avatar = ""

    if (tweet.length === 0 || username.length === 0) {  //validações
        res.send("os campos vazios não são aceitos ")
    }

    if (serverUsers.length === 0) {
        return res.send("UNAUTHORIZED")
    }

    for (let i = 0; i < serverUsers.length; i++) {

        if (!serverUsers[i].username) {
            return res.send("UNAUTHORIZED")
        }

    }                                                   //validações

    for (let i = 0; i < serverUsers.length; i++) {

        if (serverUsers[i].username === username){
            avatar = serverUsers[i].avatar
        }

    }

    tweets.push(
        {
            username,
            avatar,
            tweet
        }
    )
    return res.send("OK")

})


const PORT = 5000
app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
})