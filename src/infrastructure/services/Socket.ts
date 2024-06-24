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
        origin: "http://localhost:4000",
      },
    });

    this.io.on("connection", this.handleConnection);
  }

  private handleConnection = (socket: Socket): void => {
    console.log("Socket connected", socket.id);

    socket.on("room:join", (data) => this.handleRoomJoin(socket, data));
    socket.on('user:call', (data) => this.handleUserCall(socket, data));
    socket.on("call:accepted", (data) => this.handleCallAccepted(socket, data));
    socket.on("peer:nego:needed", (data) => this.handlePeerNegoNeeded(socket, data));
    socket.on("peer:nego:done", (data) => this.handlePeerNegoDone(socket, data));
    socket.on('startScreenShare', (data) => this.handleStartScreenShare(socket, data));
    socket.on('stopScreenShare', (data) => this.handleStopScreenShare(socket, data));
    socket.on("addUser", (userId) => this.handleAddUser(socket, userId));
    socket.on("sendMessage", (data) => this.handleSendMessage(socket, data));
    socket.on("disconnect", () => this.handleDisconnect(socket));
  };

  private handleRoomJoin(socket: Socket, data: any): void {
    const { trainer, room } = data;
    this.io.to(room).emit("user:joined", { trainer, id: socket.id });
    socket.join(room);
    this.io.to(socket.id).emit("room:join", data);
  }

  private handleUserCall(socket: Socket, { to, offer }: any): void {
    console.log("user:call");
    this.io.to(to).emit("incomming:call", { from: socket.id, offer });
  }

  private handleCallAccepted(socket: Socket, { to, ans }: any): void {
    this.io.to(to).emit("call:accepted", { from: socket.id, ans });
  }

  private handlePeerNegoNeeded(socket: Socket, { to, offer }: any): void {
    this.io.to(to).emit("peer:nego:needed", { from: socket.id, offer });
  }

  private handlePeerNegoDone(socket: Socket, { to, ans }: any): void {
    console.log(`Peer negotiation done from ${socket.id} to ${to}, ans:`, ans);
    this.io.to(to).emit("peer:nego:final", { from: socket.id, ans });
  }

  private handleStartScreenShare(socket: Socket, { to }: any): void {
    console.log(`User ${socket.id} started screen share for ${to}`);
    this.io.to(to).emit('startScreenShare', { from: socket.id });
  }

  private handleStopScreenShare(socket: Socket, { to }: any): void {
    console.log(`User ${socket.id} stopped screen share for ${to}`);
    this.io.to(to).emit('stopScreenShare', { from: socket.id });
  }

  private handleAddUser(socket: Socket, userId: string): void {
    this.addUser(userId, socket.id);
    this.io.emit("getUsers", this.users);
  }

  private handleSendMessage(socket: Socket, { senderId, receiverId, text, image }: any): void {
    const user = this.getUser(receiverId);
    if (user) {
      this.io.to(user.socketId).emit("getMessage", {
        senderId,
        text,
        image
      });
    }
  }

  private handleDisconnect(socket: Socket): void {
    console.log("user disconnected");
    this.removeUser(socket.id);
    this.io.emit("getUsers", this.users);
  }

  private addUser(userId: string, socketId: string): void {
    if (!this.users.some(user => user.userId === userId)) {
      this.users.push({ userId, socketId });
    }
  }

  private removeUser(socketId: string): void {
    this.users = this.users.filter(user => user.socketId !== socketId);
  }

  private getUser(userId: string): IUser | undefined {
    return this.users.find(user => user.userId === userId);
  }
}
