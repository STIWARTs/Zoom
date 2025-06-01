import { Server } from "socket.io"

let connections = {} // This will hold the connections for each room
let messages = {}    // This will store the messages for each room
let timeOnline = {}  // This will store the time each user has been online

export const connectToSocket = (server) => { // Function to connect socket.io to the server
    const io = new Server(server, { // Create a new instance of socket.io
        cors: { // Configure CORS for socket.io -- this is important for allowing cross-origin requests 
            origin: "*",
            methods: ["GET", "POST"], 
            allowedHeaders: ["*"],
            credentials: true
        }
    });


    io.on("connection", (socket) => { // Listen for new connections - when a new user connects to the server

        console.log("SOMETHING CONNECTED")

        socket.on("join-call", (path) => { // Listen for the "join-call" event - when a user joins a call

            if (connections[path] === undefined) {
                connections[path] = []
            }
            connections[path].push(socket.id) 

            timeOnline[socket.id] = new Date();

            // connections[path].forEach(elem => {
            //     io.to(elem)
            // })

            //or

            for (let a = 0; a < connections[path].length; a++) { 
                io.to(connections[path][a]).emit("user-joined", socket.id, connections[path]) // Notify all users in the room that a new user has joined
            }

            if (messages[path] !== undefined) {
                for (let a = 0; a < messages[path].length; ++a) {
                    io.to(socket.id).emit("chat-message", messages[path][a]['data'], // Send the chat messages to the new user
                        messages[path][a]['sender'], messages[path][a]['socket-id-sender']) 
                }
            }

        })

        socket.on("signal", (toId, message) => { // Listen for the "signal" event - when a user sends a signal to another user
            io.to(toId).emit("signal", socket.id, message);
        })

        socket.on("chat-message", (data, sender) => { // Listen for the "chat-message" event - when a user sends a chat message

            const [matchingRoom, found] = Object.entries(connections) 
                .reduce(([room, isFound], [roomKey, roomValue]) => { 


                    if (!isFound && roomValue.includes(socket.id)) {
                        return [roomKey, true];
                    }

                    return [room, isFound];

                }, ['', false]);

            if (found === true) {
                if (messages[matchingRoom] === undefined) {
                    messages[matchingRoom] = []
                }

                messages[matchingRoom].push({ 'sender': sender, "data": data, "socket-id-sender": socket.id })
                console.log("message", matchingRoom, ":", sender, data)

                connections[matchingRoom].forEach((elem) => {
                    io.to(elem).emit("chat-message", data, sender, socket.id)
                })
            }

        })

        socket.on("disconnect", () => { // Listen for the "disconnect" event - when a user disconnects from the server

            var diffTime = Math.abs(timeOnline[socket.id] - new Date())

            var key

            for (const [k, v] of JSON.parse(JSON.stringify(Object.entries(connections)))) { // k-room, v-persons

                for (let a = 0; a < v.length; ++a) {
                    if (v[a] === socket.id) {
                        key = k

                        for (let a = 0; a < connections[key].length; ++a) {
                            io.to(connections[key][a]).emit('user-left', socket.id)
                        }

                        var index = connections[key].indexOf(socket.id)

                        connections[key].splice(index, 1)


                        if (connections[key].length === 0) {
                            delete connections[key]
                        }
                    }
                }

            }


        })


    })


    return io;
}

