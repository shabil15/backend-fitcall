import { Server as SocketIOServer } from "socket.io";
import http from "http";

class SocketManager {
  private io: SocketIOServer;

  constructor(server: http.Server) {
    this.io = new SocketIOServer(server, {
      cors: {
        origin: "*",
        methods: ["GET", "POST"],
      },
    });

    this.initialize();
  }

  private initialize() {
    this.io.on("connection", (socket) => {
      console.log("New client connected:", socket.id);

      socket.on("join-session", (sessionId, userId) => {
        this.joinSession(socket, sessionId, userId);
      });
 
      socket.on("disconnect", () => {
        this.handleDisconnect(socket);
      });

      // Handle signaling events
      socket.on("offer", (sessionId, offer) => {
        this.handleOffer(socket, sessionId, offer);
      });

      socket.on("answer", (sessionId, answer) => {
        this.handleAnswer(socket, sessionId, answer);
      });

      socket.on("ice-candidate", (sessionId, candidate) => {
        this.handleIceCandidate(socket, sessionId, candidate);
      });
    });
  }

  private joinSession(socket: any, sessionId: string, userId: string) {
    socket.join(sessionId);
    socket.to(sessionId).emit("user-connected", userId);
    console.log(`User ${userId} joined session ${sessionId}`);
  }

  private handleDisconnect(socket: any) {
    const rooms = Object.keys(socket.rooms);
    rooms.forEach((room) => {
      socket.to(room).emit("user-disconnected", socket.id);
    });
    console.log(`Client disconnected: ${socket.id}`);
  }

  private handleOffer(socket: any, sessionId: string, offer: any) {
    try {
      socket.to(sessionId).emit("offer", offer);
      console.log(`Offer sent to session ${sessionId}`);
    } catch (error) {
      console.error(`Error handling offer for session ${sessionId}:`, error);
    }
  }
  

  private handleAnswer(socket: any, sessionId: string, answer: any) {
    socket.to(sessionId).emit("answer", answer);
    console.log(`Answer sent to session ${sessionId}`);
  }

  private handleIceCandidate(socket: any, sessionId: string, candidate: any) {
    socket.to(sessionId).emit("ice-candidate", candidate);
    console.log(`ICE Candidate sent to session ${sessionId}`);
  }
}

export default SocketManager;
