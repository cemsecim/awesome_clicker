import { Component } from "@odoo/owl";
import { registry } from "@web/core/registry";
import { Dropdown } from "@web/core/dropdown/dropdown";
import { DropdownItem } from "@web/core/dropdown/dropdown_item";
import { useClicker } from "./clicker_service";
import { ClickValue } from "./click_value";

class ClickerSystrayItem extends Component {
    static template = "awesome_clicker.SystrayDropdown";
    static components = { Dropdown, DropdownItem, ClickValue };
    static props = {}; // systray ogesi prop almaz (OWL dev modu zorunlu kilar)
    setup() { this.clicker = useClicker(); }
}
registry.category("systray").add("awesome_clicker.SystrayItem", { Component: ClickerSystrayItem });
