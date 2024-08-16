import shortUniqueId from "short-unique-id";
import { PlayerId, RoomDetails, RoomId } from "../types";

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
export const rooms: Rooms = new Map();
export const players: Players = new Map();

export const getRoom = (roomId: RoomId): Room | undefined => rooms.get(roomId);

export const getPlayersInRoom = (roomId: string): Players => {
    const playerEntries = Array.from(players.entries());

    return playerEntries.reduce<Players>((acc, [id, player]) => {
        console.log("player", player, roomId);
        if (player?.room_id === roomId) {
            acc.set(id, player);
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
): Promise<Array<RoomDetails>> => {
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

    return Array.from(getPlayersInRoom(roomId).entries()).map(
        ([id, player]) => ({
            playerName: player?.name ?? "",
            isHost: id === room.host_id,
        }),
    );
};

export const leaveRoom = async (playerId: PlayerId): Promise<Player> => {
    const player = players.get(playerId);
    if (!player) {
        throw "no such player";
    }

    players.delete(playerId);
    return player;
};

export const deleteRoom = async (roomId: RoomId): Promise<void> => {
    players.forEach((player, playerId) => {
        if (player?.room_id === roomId) {
            players.delete(playerId);
        }
    });
    rooms.delete(roomId);
};
