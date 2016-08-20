module.exports = {
    deaths: {
        lava: [
            {regex: /(.*?) tried to swim in lava while trying to escape (.*?)/, trans: ''},
            {regex: /(.*?) tried to swim in lava/, trans: ''},
        ],
        fell: [
            {regex: /(.*?) fell from a high place/, trans: ''},
            {regex: /(.*?) fell off a ladder/, trans: ''},
            {regex: /(.*?) fell off some vines/, trans: ''},
            {regex: /(.*?) fell out of the world/, trans: ''},
            {regex: /(.*?) fell out of the water/, trans: ''},
            {regex: /(.*?) fell into a patch of fire/, trans: ''},
            {regex: /(.*?) fell into a patch of cacti/, trans: ''},
            {regex: /(.*?) fell from a high place and fell out of the world/, trans: ''}
        ],
        shot: [
            {regex: /(.*?) was shot by arrow/, trans: ''},
            {regex: /(.*?) was shot by (.*?)/, trans: ''},
            {regex: /(.*?) was shot by (.*?) using (.*?)/, trans: ''},
            {regex: /(.*?) was shot off some vines by (.*?)/, trans: ''},
            {regex: /(.*?) was shot off a ladder by (.*?)/, trans: ''}
        ],
        killed: [
            {regex: /(.*?) was killed by magic/, trans: ''},
            {regex: /(.*?) was killed by (.*?) using magic/, trans: ''},
            {regex: /(.*?) was killed while trying to hurt (.*?)/, trans: ''}
        ],
        slain: [
            {regex: /(.*?) was slain by (.*?) using (.*?)/, trans: ''},
            {regex: /(.*?) was slain by (.*?)/, trans: ''}
        ],
        was: [
            {regex: /(.*?) was squashed by a falling anvil/, trans: ''},
            {regex: /(.*?) was pricked to death/, trans: ''},
            {regex: /(.*?) was pummeled by (.*?)/, trans: ''},
            {regex: /(.*?) was doomed to fall/, trans: ''},
            {regex: /(.*?) was blown up by (.*?)/, trans: ''},
            {regex: /(.*?) was blown from a high place by (.*?)/, trans: ''},
            {regex: /(.*?) was burnt to a crisp whilst fighting (.*?)/, trans: ''},
            {regex: /(.*?) was knocked into the void by (.*?)/, trans: ''},
            {regex: /(.*?) was fireballed by (.*?)/, trans: ''},
            {regex: /(.*?) was squashed by a falling block/, trans: ''}
        ],
        walked: [
            {regex: /(.*?) walked into a cactus whilst trying to escape (.*?)/, trans: ''},
            {regex: /(.*?) walked into a fire whilst fighting (.*?)/, trans: ''}
        ],
        drowned: [
            {regex: /(.*?) drowned whilst trying to escape (.*?)/, trans: ''},
            {regex: /(.*?) drowned/, trans: ''}
        ],
        death: [
            {regex: /(.*?) burned to death/, trans: ''},
            {regex: /(.*?) starved to death/, trans: ''}
        ],
        other: [
            {regex: /(.*?) died/, trans: ''},
            {regex: /(.*?) suffocated in a wall/, trans: ''},
            {regex: /(.*?) blew up/, trans: ''},
            {regex: /(.*?) hit the ground too hard/, trans: ''},
            {regex: /(.*?) got finished off by (.*?) using (.*?)/, trans: ''},
            {regex: /(.*?) went up in flames/, trans: ''},
            {regex: /(.*?) withered away/, trans: ''}
        ]
    }
};