import { describe, expect, test, vi } from "vitest";

import { getPlayersInRoom, players } from "./game";

describe("getPlayersInRoom", () => {
    test("should return empty map", () => {
        const result = getPlayersInRoom("banana");
        expect(result).toEqual(new Map());
    });

    test("should return a player", () => {
        players.set("asdf", { name: "colin", room_id: "banana" });
        players.set("fdsa", { name: "neeko", room_id: "orange" });

        const result = getPlayersInRoom("banana");
        expect(result).toEqual(
            new Map([["asdf", { name: "colin", room_id: "banana" }]]),
        );
    });
});
