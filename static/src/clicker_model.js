import { Reactive } from "@web/core/utils/reactive";
import { EventBus } from "@odoo/owl";

export const CURRENT_VERSION = 2;

export const MIGRATIONS = [
    {
        fromVersion: 1,
        toVersion: 2,
        apply(state) {
            state.trees.peach = 0;
            state.fruits.peach = 0;
        }
    }
];

export class ClickerModel extends Reactive {
    constructor(data = {}) {
        super();
        // Olay veriyolu (milestone bildirimleri icin)
        this.bus = new EventBus();

        this.version = data.version || 1;
        // migration uygula
        let currentData = data;
        if (currentData.version && currentData.version < CURRENT_VERSION) {
            for (let m of MIGRATIONS) {
                if (currentData.version === m.fromVersion) {
                    m.apply(currentData);
                    currentData.version = m.toVersion;
                }
            }
        }
        // --- Temel alanlarin baslangic degerleri (kaydedilmisse yukle) ---
        this.clicks = currentData.clicks || 0;
        this.level = currentData.level || 0;
        this.power = currentData.power || 1;
        this.clickBots = currentData.clickBots || 0;
        this.bigBots = currentData.bigBots || 0;
        this.trees = currentData.trees || { pear: 0, cherry: 0, peach: 0 }; // peach eklendi
        this.fruits = currentData.fruits || { pear: 0, cherry: 0, peach: 0 };
    }

    buyPower() {
        if (this.clicks < 50000) return;
        this.clicks -= 50000;
        this.power += 1;
    }

    increment(val) {
        this.clicks += val;
        this.checkLevel();
    }

    checkLevel() {
        if (this.level === 0 && this.clicks >= 1000) {
            this.level = 1;
            this.bus.trigger("MILESTONE_1k");
        }
        if (this.level === 1 && this.clicks >= 5000) this.level = 2;
        if (this.level === 2 && this.clicks >= 100000) this.level = 3;
        if (this.level === 3 && this.clicks >= 1000000) this.level = 4;
    }

    buyClickBot() {
        if (this.clicks < 1000) return false;
        this.clicks -= 1000;
        this.clickBots += 1;
        return true;
    }

    buyBigBot() {
        if (this.clicks < 5000) return false;
        this.clicks -= 5000;
        this.bigBots += 1;
        return true;
    }

    buyTree(type) {
        if (this.clicks < 1000000) return false;
        this.clicks -= 1000000;
        this.trees[type] += 1;
        return true;
    }

    getTotalTrees() {
        return this.trees.pear + this.trees.cherry;
    }
}
