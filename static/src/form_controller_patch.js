import { patch } from "@web/core/utils/patch";
import { FormController } from "@web/views/form/form_controller";
import { getReward } from "./click_rewards";

patch(FormController.prototype, {
    setup() {
        super.setup();
        // %1 şans
        if (Math.random() < 0.01) {
            const clicker = this.env.services["awesome_clicker.clicker"];
            const reward = getReward(clicker);
            if (reward) {
                this.env.services.notification.add(`Bonus: ${reward.description}`, {
                    type: "success",
                    sticky: true,
                    buttons: [{
                        name: "Collect",
                        primary: true,
                        onClick: () => {
                            reward.apply(clicker);
                            this.env.services.action.doAction({
                                type: "ir.actions.client",
                                tag: "awesome_clicker.client_action",
                                target: "new",
                            });
                        }
                    }]
                });
            }
        }
    }
});
