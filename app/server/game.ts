import shortUniqueId from "short-unique-id";
import { PlayerId, RoomId } from "../types";

const id = new shortUniqueId({ length: 5 });
const generate = () => id.rnd();

interface Room {
    host_id: PlayerId;
    max_players: number;
}
interface Player {
    name: string;
    room_id: RoomId;
}

type Players = Map<PlayerId, Player | undefined>;
type Rooms = Map<RoomId, Room | undefined>;
const rooms: Rooms = new Map();
const players: Players = new Map();

export const getRoom = (roomId: RoomId): Room | undefined => rooms[roomId];

export const getPlayersInRoom = (roomId: string): Players => {
    const playersInRoom: [string, Player | undefined][] =
        Object.entries(players);

    return playersInRoom.reduce<Players>((acc, [id, player]) => {
        if (player?.room_id === roomId) {
            acc[id] = player;
        }

        return acc;
    }, new Map());
};

const alreadyInARoom = (playerId: PlayerId): boolean => players.has(playerId);

export const createRoom = async (
    playerName: Player["name"],
    playerId: string,
): Promise<RoomId> => {
    if (alreadyInARoom(playerId)) {
        throw "already in room";
    }

    const roomId = generate();
    rooms.set(roomId, { host_id: playerId, max_players: 5 });
    players.set(playerId, { name: playerName, room_id: roomId });

    return roomId;
};

export const joinRoom = async (
    roomId: RoomId,
    playerName: Player["name"],
    playerId: PlayerId,
): Promise<void> => {
    if (alreadyInARoom(playerId)) {
        throw "already in room";
    }

    const room = getRoom(roomId);
    if (!room) {
        throw "no such room";
    }

    const roomPlayers = getPlayersInRoom(roomId);
    if (roomPlayers.size >= room.max_players) {
        throw "room full";
    }

    players.set(playerId, { name: playerName, room_id: roomId });
};

export const leaveRoom = async (playerId: PlayerId): Promise<void> => {
    players.delete(playerId);
};

export const deleteRoom = async (roomId: RoomId): Promise<void> => {
    players.forEach((player, playerId) => {
        if (player?.room_id === roomId) {
            players.delete(playerId);
        }
    });
    rooms.delete(roomId);
};
