import settings from "../../settings";
import { AQUA, BOLD, GRAY, STRIKETHROUGH, WHITE } from "../../utils/formatting";
import { drawLineFromCrosshair, getArea } from "../../utils/functions";
import { pogData } from "../../utils/pogData";
import { createWaypoint } from "../../utils/functions";
import RenderLibV2 from "../../../RenderLibV2";

let inCH = false

register('worldLoad', () => {
    setTimeout(() => inCH = TabList.getNames().join('').includes('Crystal Hollows'), 3000);
})

let coords = ['meow'];
if (pogData.selectedRoute) coords = pogData.routeWaypoints.find(array => (array[0] == pogData.selectedRoute));

register('command', (...args) => {
    if (args == undefined) {
        ChatLib.chat(ChatLib.getChatBreak(`${STRIKETHROUGH}-`));
        ChatLib.chat(ChatLib.getCenteredText(`${AQUA + BOLD}Saved Crystal Hollow Routes:`));
        ChatLib.chat('');
        if (pogData.routeWaypoints.length == 0) ChatLib.chat(ChatLib.getCenteredText(`No routes saved!`));
        else pogData.routeWaypoints.forEach(route => ChatLib.chat(ChatLib.getCenteredText(`"${route[0]}"`)));
        ChatLib.chat('');
        ChatLib.chat(ChatLib.getChatBreak(`${STRIKETHROUGH}-`));
        return;
    }

    switch(args[0]) {
        case 'help':
            ChatLib.chat(ChatLib.getChatBreak(`${STRIKETHROUGH}-`));
            ChatLib.chat(ChatLib.getCenteredText(`${AQUA + BOLD}Crystal Hollows Route Waypoints:`));
            ChatLib.chat('');
            ChatLib.chat(`${AQUA}/routewaypoints [name]${WHITE}- View routes coordinates. Leave name blank to view all routes`);
            ChatLib.chat(`${AQUA}/routewaypoints save [name]${WHITE}- Save current route.`);
            ChatLib.chat(`${AQUA}/routewaypoints load [name]${WHITE}- Delete a saved route.`);
            ChatLib.chat(`${AQUA}/routewaypoints unload ${WHITE}- Unloads current route.`);
            ChatLib.chat(`${AQUA}/routewaypoints delete [name]${WHITE}- View current saved routes.`);
            ChatLib.chat(`${AQUA}/routewaypoints add [index] ${WHITE}- Add current coordinates to route, leave index blank to add last.`);
            ChatLib.chat(`${AQUA}/routewaypoints remove [index] ${WHITE}- Delete coordinates at index, leave blank to remove last.`);
            ChatLib.chat(`${AQUA}/routewaypoints help ${WHITE}- Brings up this message.`);
            ChatLib.chat(ChatLib.getChatBreak(`${STRIKETHROUGH}-`));
        case 'add':
            if (!args[1]) {
                let ids = coords.slice(1).map(array => array[3]).sort((a, b) => {return a - b});
                
                let missing = undefined;
                for (let index = 0; index < ids.length; index++) {
                    let id = ids[index];
                    
                    if (id > index + 1) {
                        missing = index + 1;
                        break;
                    }
                }

                if (missing == undefined) missing = ids.length + 1;
                
                coords.push([Math.floor(Player.getX()), Math.floor(Player.getY() - 1), Math.floor(Player.getZ()), missing]);
            }
            else if (parseInt(args[1])) {
            
                let exists = false;

                coords.forEach(coord => {
                    if (coord[3] == parseInt(args[1])) {
                        exists = true;
                        ChatLib.chat(`${GRAY}[${AQUA}TurtleAddons${GRAY}] ${WHITE}${parseInt(args[1])} already exists.`);
                    }
                })

                if (!exists) coords.push([Math.floor(Player.getX()), Math.floor(Player.getY() - 1), Math.floor(Player.getZ()), parseInt(args[1])]);
            }
            break;
        case 'remove':
            if (!args[1] || !parseInt(args[1])) ChatLib.chat(`${GRAY}[${AQUA}TurtleAddons${GRAY}] ${WHITE}Enter a valid number.`);
            else if (parseInt(args[1])) {
                let index = coords.findIndex(array => array[3] == parseInt(args[1]));
                coords.splice(index, 1);
            }
            break;
        case 'save':
            let exists = false;
            let hasName = true;

            pogData.routeWaypoints.forEach(route => {
                if (route[0] == args[1]) {
                    ChatLib.chat(`${GRAY}[${AQUA}TurtleAddons${GRAY}] ${WHITE}"${args[1]}" already exists.`);
                    exists = true;
                }
            })
            if (exists) return;

            if (!args[1]) {
                ChatLib.chat(`${GRAY}[${AQUA}TurtleAddons${GRAY}] ${WHITE}Enter a route name.`);
                hasName = false;
            }
            if (!hasName) return;

            coords[0] = args[1];
            pogData.routeWaypoints.push(coords);
            pogData.save();
            ChatLib.chat(`${GRAY}[${AQUA}TurtleAddons${GRAY}] ${WHITE}Saved "${coords[0]}"!`);

            break;
        case 'load':
            let found = false;

            pogData.routeWaypoints.forEach(route => {
                if (route[0] == args[1]) {
                    coords = route;
                    found = true;
                    ChatLib.chat(`${GRAY}[${AQUA}TurtleAddons${GRAY}] ${WHITE}Loaded "${args[1]}"!`);
                    pogData.selectedRoute = args[1];
                    pogData.save();
                }
            })

            if (!found) ChatLib.chat(`${GRAY}[${AQUA}TurtleAddons${GRAY}] ${WHITE}"${args[1]}" does not exist.`);

            break;
        case 'unload':
        case 'clear':
            coords = ['meow'];
            pogData.selectedRoute = undefined;
            pogData.save();
            ChatLib.chat(`${GRAY}[${AQUA}TurtleAddons${GRAY}] ${WHITE}Unloaded route waypoints.`);
            break;
        case 'delete':
            let deleteIndex = undefined;

            pogData.routeWaypoints.forEach((route, index) => {
                if (route[0] == args[1]) {
                    found = true;
                    deleteIndex = index;
                    ChatLib.chat(deleteIndex);
                }
            })

            if (deleteIndex !== undefined) {
                pogData.routeWaypoints.splice(deleteIndex, 1);
                if (pogData.selectedRoute == args[1]) pogData.selectedRoute = undefined;
                pogData.save();

                if (args[1] == coords[0]) coords = ['meow'];
                ChatLib.chat(`${GRAY}[${AQUA}TurtleAddons${GRAY}] ${WHITE}Deleted "${args[1]}"!`);
            }

            if (!found) ChatLib.chat(`${GRAY}[${AQUA}TurtleAddons${GRAY}] ${WHITE}"${args[1]}" does not exist.`);
            break;
        default:
            pogData.routeWaypoints.forEach(route => {
                if (route[0] == args[0]) {
                    found = true;
                    ChatLib.chat(ChatLib.getChatBreak(`${STRIKETHROUGH}-`));
                    ChatLib.chat(ChatLib.getCenteredText(`${GRAY}[${AQUA}TurtleAddons${GRAY}] ${WHITE}"${args[0]}".`));
                    ChatLib.chat('');
                    route.forEach((coord, index) => {
                        if (index == 0) return;
                        ChatLib.chat(ChatLib.getCenteredText(`${coord[3]} | ${coord[0]}, ${coord[1]}, ${coord[2]}`));
                    })
                    ChatLib.chat('');
                    ChatLib.chat(ChatLib.getChatBreak(`${STRIKETHROUGH}-`));
                }
            })
            if (!found) ChatLib.chat(`${GRAY}[${AQUA}TurtleAddons${GRAY}] ${WHITE}"${args[0]}" does not exist.`);
            break;
    }
}).setName('routewaypoints')

register('renderWorld', () => {
    tempCoordsHolder = coords.slice(1);
    tempCoordsHolder.sort((a, b) => a[3] - b[3]);

    tempCoordsHolder.forEach(coord => {
        createWaypoint(coord[0], coord[1], coord[2], 0.2, 0.2, 1, 0.25, 1, false);
        Tessellator.drawString(coord[3], coord[0] + 0.5, coord[1] + 0.5, coord[2] + 0.5, Renderer.WHITE, true, 0.05, false);
    })

    if (settings.routeWaypointLines) {
        tempCoordsHolder.forEach((coord, index) => {
            if (index > 0) {
                RenderLibV2.drawLine(coord[0] + 0.5, coord[1] + 0.5, coord[2] + 0.5, tempCoordsHolder[index - 1][0] + 0.5, tempCoordsHolder[index - 1][1] + 0.5, tempCoordsHolder[index - 1][2] + 0.5, 0.2, 0.2, 1, 1, true);
            }
        })
    }

    if (settings.routeWaypointCrosshairLines) {
        let nearestCoord = undefined;
        let minDistance = Infinity;

        tempCoordsHolder.forEach(coord => {
            let distance = Player.asPlayerMP().distanceTo(coord[0], coord[1], coord[2]);

            if (distance < minDistance) {
                minDistance = distance;
                nearestCoord = coord;
            }
        })

        let index = undefined;

        if (nearestCoord) {
            index = tempCoordsHolder.findIndex(coord => coord[0] == nearestCoord[0] && coord[1] == nearestCoord[1] && coord[2] == nearestCoord[2]);
            if (tempCoordsHolder[index + 1]) drawLineFromCrosshair(tempCoordsHolder[index + 1][0] + 0.5, tempCoordsHolder[index + 1][1] + 0.5, tempCoordsHolder[index + 1][2] + 0.5, 0.2, 0.2, 1, 1);
        }
    }
})