import { Server as SocketIOServer, Socket } from "socket.io";
import http from "http";

interface IUser {
  userId: string;
  socketId: string;
}

class SocketManager {
  private io: SocketIOServer;
  private sessions: Map<string, Set<string>>;
  private users: IUser[] = [];

  constructor(server: http.Server) {
    this.io = new SocketIOServer(server, {
      cors: {
        origin: "*",
        methods: ["GET", "POST"],
      },
    });

    this.sessions = new Map();

    this.initialize();
  }

  private initialize() {
    this.io.on("connection", (socket) => {
      console.log("New client connected:", socket.id);

      // Video call related events
      socket.on("join-session", (sessionId) => {
        this.joinSession(socket, sessionId);
      });

      socket.on("disconnect", () => {
        this.handleDisconnect(socket);
      });

      socket.on("offer", (sessionId, offer) => {
        this.handleOffer(socket, sessionId, offer);
      });

      socket.on("answer", (sessionId, answer) => {
        this.handleAnswer(socket, sessionId, answer);
      });

      socket.on("ice-candidate", (sessionId, candidate) => {
        this.handleIceCandidate(socket, sessionId, candidate);
      });

      // Chat related events
      socket.on("addUser", (userId: string) => {
        this.addUser(userId, socket.id);
      });

      socket.on("sendMessage", ({ senderId, receiverId, text }) => {
        this.handleSendMessage(senderId, receiverId, text);
      });
    });
  }

  // Video call related methods
  private joinSession(socket: Socket, sessionId: string) {
    Object.keys(socket.rooms).forEach((room) => {
      if (room !== socket.id) {
        socket.leave(room);
      }
    });

    socket.join(sessionId);

    if (!this.sessions.has(sessionId)) {
      this.sessions.set(sessionId, new Set());
    }

    const session = this.sessions.get(sessionId);
    session?.add(socket.id);

    socket.to(sessionId).emit("user-connected", socket.id);
    console.log(`User ${socket.id} joined session ${sessionId}`);
  }

  private handleDisconnect(socket: Socket) {
    // Handle video call session disconnection
    const rooms = Object.keys(socket.rooms);
    rooms.forEach((room) => {
      if (room !== socket.id) {
        socket.to(room).emit("partner-disconnected");
        const session = this.sessions.get(room);
        session?.delete(socket.id);
        if (session && session.size === 0) {
          this.sessions.delete(room);
        }
      }
    });

    // Handle chat disconnection
    this.removeUser(socket.id);
    this.io.emit("getUsers", this.users);
    console.log(`Client disconnected: ${socket.id}`);
  }

  private handleOffer(socket: Socket, sessionId: string, offer: any) {
    if (this.validateSession(socket, sessionId)) {
      socket.to(sessionId).emit("offer", offer);
      console.log(`Offer sent to session ${sessionId}`);
    } else {
      console.error(`Invalid session for offer. Socket ID: ${socket.id}, Session ID: ${sessionId}`);
    }
  }

  private handleAnswer(socket: Socket, sessionId: string, answer: any) {
    if (this.validateSession(socket, sessionId)) {
      socket.to(sessionId).emit("answer", answer);
      console.log(`Answer sent to session ${sessionId}`);
    } else {
      console.error(`Invalid session for answer. Socket ID: ${socket.id}, Session ID: ${sessionId}`);
    }
  }

  private handleIceCandidate(socket: Socket, sessionId: string, candidate: any) {
    if (this.validateSession(socket, sessionId)) {
      socket.to(sessionId).emit("ice-candidate", candidate);
      console.log(`ICE Candidate sent to session ${sessionId}`);
    } else {
      console.error(`Invalid session for ICE Candidate. Socket ID: ${socket.id}, Session ID: ${sessionId}`);
    }
  }

  private validateSession(socket: Socket, sessionId: string): boolean {
    const session = this.sessions.get(sessionId);
    return session?.has(socket.id) ?? false;
  }

  // Chat related methods
  private addUser(userId: string, socketId: string): void {
    if (!this.users.some((user) => user.userId === userId)) {
      this.users.push({ userId, socketId });
      this.io.emit("getUsers", this.users);
    }
  }

  private removeUser(socketId: string): void {
    this.users = this.users.filter((user) => user.socketId !== socketId);
  }

  private getUser(userId: string): IUser | undefined {
    return this.users.find((user) => user.userId === userId);
  }

  private handleSendMessage(senderId: string, receiverId: string, text: string) {
    const user = this.getUser(receiverId);
    if (user) {
      this.io.to(user.socketId).emit("getMessage", {
        senderId,
        text,
      });
    } else {
      console.log("User not found!");
    }
  }
}

export default SocketManager;
