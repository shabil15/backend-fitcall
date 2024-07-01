import { Server as SocketIOServer } from "socket.io";
import http from "http";


class SocketManager {
  private io: SocketIOServer;
  private sessions: Map<string, Set<string>>; // Map to track session participants

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

      socket.on("join-session", (sessionId) => {
        this.joinSession(socket, sessionId);
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

  private joinSession(socket: any, sessionId: string) {
    // Leave all current rooms to ensure socket only stays in one session at a time
    Object.keys(socket.rooms).forEach(room => {
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

  private handleDisconnect(socket: any) {
    const rooms = Object.keys(socket.rooms);
    rooms.forEach((room) => {
      if (room !== socket.id) { // Exclude default room which is the socket's own room
        socket.to(room).emit("partner-disconnected"); // Notify other participants
        const session = this.sessions.get(room);
        session?.delete(socket.id);
        if (session && session.size === 0) {
          this.sessions.delete(room);
        }
      }
    });
    console.log(`Client disconnected: ${socket.id}`);
  }

  private handleOffer(socket: any, sessionId: string, offer: any) {
    if (this.validateSession(socket, sessionId)) {
      socket.to(sessionId).emit("offer", offer);
      console.log(`Offer sent to session ${sessionId}`);
    } else {
      console.error(`Invalid session for offer. Socket ID: ${socket.id}, Session ID: ${sessionId}`);
    }
  }

  private handleAnswer(socket: any, sessionId: string, answer: any) {
    if (this.validateSession(socket, sessionId)) {
      socket.to(sessionId).emit("answer", answer);
      console.log(`Answer sent to session ${sessionId}`);
    } else {
      console.error(`Invalid session for answer. Socket ID: ${socket.id}, Session ID: ${sessionId}`);
    }
  }

  private handleIceCandidate(socket: any, sessionId: string, candidate: any) {
    if (this.validateSession(socket, sessionId)) {
      socket.to(sessionId).emit("ice-candidate", candidate);
      console.log(`ICE Candidate sent to session ${sessionId}`);
    } else {
      console.error(`Invalid session for ICE Candidate. Socket ID: ${socket.id}, Session ID: ${sessionId}`);
    }
  }

  private validateSession(socket: any, sessionId: string): boolean {
    const session = this.sessions.get(sessionId);
    return session?.has(socket.id) ?? false;
  }
}

export default SocketManager;
