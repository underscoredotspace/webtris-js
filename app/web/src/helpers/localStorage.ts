import { RoomId } from "../../../types";

type RoomDetails = {
    roomId: RoomId;
    isHost?: boolean;
};

type JSONRecord =
    | Record<string, string | number | boolean>
    | Array<string | number | boolean>;

const save = async (key: string, value: JSONRecord): Promise<void> => {
    window.localStorage.setItem(key, JSON.stringify(value));
};

const load = async <T extends JSONRecord>(key: string): Promise<T> => {
    const value = window.localStorage.getItem(key);
    if (!value) {
        throw "no such key";
    }

    return JSON.parse(value);
};

const remove = async (key: string) => {
    window.localStorage.removeItem(key);
};

export const saveRoom = async (roomDetails: RoomDetails): Promise<void> =>
    save("room", roomDetails);

export const getSavedRoom = async (): Promise<RoomDetails> =>
    load<RoomDetails>("room");

export const deleteSavedRoom = async (): Promise<void> => remove("room");
