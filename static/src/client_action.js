import { Component } from "@odoo/owl";
import { registry } from "@web/core/registry";
import { Notebook } from "@web/core/notebook/notebook";
import { ClickValue } from "./click_value";
import { useClicker } from "./clicker_service";

class ClickerClientAction extends Component {
    static template = "awesome_clicker.ClientAction";
    static components = { ClickValue, Notebook };
    static props = ["*"]; // client action framework prop'lari alir -> hepsini kabul et

    setup() {
        // useClicker() reaktif modeli dondurur -> increment olunca ekran guncellenir
        this.clicker = useClicker();
    }
}

registry.category("actions").add("awesome_clicker.client_action", ClickerClientAction);
