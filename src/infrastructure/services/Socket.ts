// import { Server, Socket } from "socket.io";
// import { createServer as createHttpServer, Server as HttpServer } from "http";

// interface IUser {
//     userId: string;
//     socketId: string;
//   }

//   export class SocketManager{
//     private httpServer:HttpServer;
//     private io :Server;
//     private users:IUser[] = [];

//     constructor(httpServer:HttpServer) {
//         this.httpServer= httpServer;
//         this.io = new Server(this.httpServer,{
//             cors: {
//                 origin:"http://localhost:4000"
//             }
//         });

//         this.io.on("connection",this.handleConnection);
//     }

//     private handleConnection = (socket: Socket): void => {
        
//         console.log("a user connected.");
    
        
//         socket.on("addUser", (userId: string) => {
//           this.addUser(userId, socket.id);
//         });
    
       
//         socket.on("sendMessage", ({ senderId, receiverId, text }) => {
//             console.log('users',this.users);
            
//           const user = this.getUser(receiverId);
//           if (user) {
//             this.io.to(user.socketId).emit("getMessage", {
//               senderId,
//               text,
//             });
//           } else {
            
//             console.log("User not found!");
//           }
//         });

//           // when user disconnect
//     socket.on("disconnect", () => {
//         console.log("a user disconnected!");
//         this.removeUser(socket.id);
//         this.io.emit("getUsers", this.users);
//       });
//     };

//     addUser(userId: string, socketId: string): void {
//         if (!this.users.some((user) => user.userId === userId)) {
//           this.users.push({ userId, socketId });
//           this.io.emit("getUsers", this.users);
//           console.log("users",this.users)
//         }
//       }
//       removeUser(socketId: string): void {
//         this.users = this.users.filter((user) => user.socketId !== socketId);
//       }
    

//       getUser(userId: string): IUser | undefined {
//         return this.users.find((user) => user.userId === userId);
//       }
//   }

import { Server, Socket } from "socket.io";
import { createServer as createHttpServer, Server as HttpServer } from "http";

interface IUser {
  userId: string;
  socketId: string;
}

export class SocketManager {
  private httpServer: HttpServer;
  private io: Server;
  private users: IUser[] = [];

  constructor(httpServer: HttpServer) {
    this.httpServer = httpServer;
    this.io = new Server(this.httpServer, {
      cors: {
        origin: "http://localhost:4000", // Adjust the origin as per your frontend's URL
      },
    });

    this.io.on("connection", this.handleConnection);
  }

  private handleConnection = (socket: Socket): void => {
    console.log("A user connected.");

    socket.on("addUser", (userId: string) => {
      this.addUser(userId, socket.id);
    });

    socket.on("sendMessage", ({ senderId, receiverId, text }: { senderId: string, receiverId: string, text: string }) => {
      console.log('Users:', this.users);
      const user = this.getUser(receiverId);
      if (user) {
        this.io.to(user.socketId).emit("getMessage", {
          senderId,
          text,
        });
      } else {
        console.log("User not found!");
      }
    });

    socket.on("disconnect", () => {
      console.log("A user disconnected!");
      this.removeUser(socket.id);
      this.io.emit("getUsers", this.users);
    });
  };

  private addUser(userId: string, socketId: string): void {
    if (!this.users.some((user) => user.userId === userId)) {
      this.users.push({ userId, socketId });
      this.io.emit("getUsers", this.users);
      console.log("Users after adding:", this.users);
    }
  }

  private removeUser(socketId: string): void {
    this.users = this.users.filter((user) => user.socketId !== socketId);
    console.log("Users after removing:", this.users);
  }

  private getUser(userId: string): IUser | undefined {
    return this.users.find((user) => user.userId === userId);
  }
}
