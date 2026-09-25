import { registry } from "@web/core/registry";
import { browser } from "@web/core/browser/browser";
import { useState } from "@odoo/owl";
import { useService } from "@web/core/utils/hooks";
import { ClickerModel } from "./clicker_model";

export const clickerService = {
    dependencies: ["effect", "notification"],
    start(env, { effect, notification }) {

        const saved = browser.localStorage.getItem("awesome_clicker");
        const data = saved ? JSON.parse(saved) : {};
        const model = new ClickerModel(data); // ClickerModel zaten Reactive'den turuyor
        model.bus.addEventListener("MILESTONE_1k", () => {
            effect.add({
                type: "rainbow_man",
                message: "You unlocked ClickBots! Now you can buy robots.",
            });
        });
        // interval burada
        setInterval(() => {
            model.clicks += model.clickBots * 10 * model.power; // power çarpanı
            model.clicks += model.bigBots * 100 * model.power;
            // bot üretimi...
            browser.localStorage.setItem("awesome_clicker", JSON.stringify(model));
        }, 10000);
        // İŞTE BURASI - 16. Trees için
        setInterval(() => {
            for (let type in model.trees) {
                model.fruits[type] += model.trees[type]; // her ağaç 1 meyve
            }
        }, 30000);
        return model;
    },
};

// 1) Servisi kaydet -> 'awesome_clicker.clicker' adiyla env.services'te erisilebilir
registry.category("services").add("awesome_clicker.clicker", clickerService);

// 2) Kolay erisim hook'u: bilesenlerde  this.clicker = useClicker()
export function useClicker() {
    // useState -> bileseni reaktif modele abone eder; degisince yeniden render olur
    return useState(useService("awesome_clicker.clicker"));
}

registry.category("command_provider").add("awesome_clicker", {
    provide: (env) => {
        const clicker = env.services["awesome_clicker.clicker"];
        return [
            {
                name: "Open Clicker Game",
                action: () => env.services.action.doAction({ type: "ir.actions.client", tag: "awesome_clicker.client_action", target: "new" }),
            },
            {
                name: "Buy 1 ClickBot",
                action: () => clicker.buyClickBot(),
            },
        ];
    },
});
