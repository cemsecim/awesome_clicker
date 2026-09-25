import { choose } from "./utils";

export const rewards = [
    { description: "10 clicks", apply(c) { c.increment(10) }, maxLevel: 1 },
    { description: "Get 1 ClickBot", apply(c) { c.clickBots += 1 }, minLevel: 1, maxLevel: 3 },
    { description: "Increase power!", apply(c) { c.power += 1 }, minLevel: 3 },
];

export function getReward(clicker) {
    const filtered = rewards.filter(r => {
        if (r.minLevel !== undefined && clicker.level < r.minLevel) return false;
        if (r.maxLevel !== undefined && clicker.level > r.maxLevel) return false;
        return true;
    });
    return choose(filtered);
}
