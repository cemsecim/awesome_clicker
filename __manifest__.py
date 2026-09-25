{
    "name": "Awesome Clicker",
    "version": "1.0",
    "application": False,  # veya True yapsan da olur, App listesinde çıkması için
    "depends": ["web"],
    "author": "Adın",
    "assets": {
        "web.assets_backend": [
            "awesome_clicker/static/src/utils.js",
            "awesome_clicker/static/src/click_rewards.js",
            "awesome_clicker/static/src/clicker_model.js",
            "awesome_clicker/static/src/click_value.js",
            "awesome_clicker/static/src/click_value.xml",
            "awesome_clicker/static/src/clicker_service.js",
            "awesome_clicker/static/src/clicker_systray_item.js",
            "awesome_clicker/static/src/clicker_systray_item.xml",
            "awesome_clicker/static/src/client_action.js",
            "awesome_clicker/static/src/client_action.xml",
            "awesome_clicker/static/src/form_controller_patch.js",
        ],
    },
    "license": "LGPL-3",
}
