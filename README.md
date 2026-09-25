# Awesome Clicker (`awesome_clicker`)

Odoo 19 module built by following the official **"Build a clicker game"** tutorial
from the *Master the Odoo web framework* series. A frontend (OWL) exercise: a
clicker game living in the Odoo web client.

## Features
- OWL components, services and a reactive model
- A **systray** item showing the current click/tree counts
- A client action with the game board (buy ClickBots, BigBots, Power, Trees)
- Uses `registry` categories (`services`, `systray`, `actions`, `command_provider`)
- `localStorage` persistence and an `EventBus` milestone effect

## Requirements
- Odoo **19.0**
- Depends on: `web` (backend JS assets require it)

## Install
1. Copy the `awesome_clicker` folder into your addons path.
2. Update the apps list and install **Awesome Clicker**.
3. Open the systray cookie icon (top bar) to play.

## License
LGPL-3
