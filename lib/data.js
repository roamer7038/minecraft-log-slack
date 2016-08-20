module.exports = {
    deaths: {
        lava: [
            {regex: /(.*?) tried to swim in lava while trying to escape (.*?)$/, trans: '(A) は (B) から逃れようと溶岩遊泳を試みた'},
            {regex: /(.*?) tried to swim in lava$/, trans: '(A) は溶岩遊泳を試みた'},
        ],
        fell: [
            {regex: /(.*?) fell from a high place$/, trans: '(A) は高い所から落ちた'},
            {regex: /(.*?) fell off a ladder$/, trans: '(A) ははしごから落ちた'},
            {regex: /(.*?) fell off some vines$/, trans: '(A) はツタから滑り落ちた'},
            {regex: /(.*?) fell out of the world$/, trans: '(A) は奈落の底へ落ちてしまった'},
            {regex: /(.*?) fell out of the water$/, trans: '(A) は水から落ちた'},
            {regex: /(.*?) fell into a patch of fire$/, trans: '(A) は火の海に落ちた'},
            {regex: /(.*?) fell into a patch of cacti$/, trans: '(A) はサボテンの上に落ちた'},
            {regex: /(.*?) fell from a high place and fell out of the world$/, trans: '(A) は奈落の底へ落ちてしまった'}
        ],
        shot: [
            {regex: /(.*?) was shot by arrow$/, trans: '(A) は矢に射抜かれた'},
            {regex: /(.*?) was shot by (.*?)$/, trans: '(A) は (B)  に射抜かれた'},
            {regex: /(.*?) was shot by (.*?) using (.*?)$/, trans: '(A) は (B) の (C) で射抜かれた'},
            {regex: /(.*?) was shot off some vines by (.*?)$/, trans: '(A) は (B) によって命が尽きて落下した'},
            {regex: /(.*?) was shot off a ladder by (.*?)$/, trans: '(A) は (B) によって命が尽きて落下した'}
        ],
        killed: [
            {regex: /(.*?) was killed by magic$/, trans: '(A) は魔法で殺された'},
            {regex: /(.*?) was killed by (.*?) using magic$/, trans: '(A) は魔法を使う (B) に殺された'},
            {regex: /(.*?) was killed while trying to hurt (.*?)$/, trans: '(A) は (B) を傷つけようとして殺されました。'}
        ],
        slain: [
            {regex: /(.*?) was slain by (.*?) using (.*?)$/, trans: '(A) は (B)  の (C) で殺害された'},
            {regex: /(.*?) was slain by (.*?)$/, trans: '(A) は (B)  に殺害された'}
        ],
        was: [
            {regex: /(.*?) was squashed by a falling anvil$/, trans: '(A) は落下してきた金床に押しつぶされた'},
            {regex: /(.*?) was pricked to death$/, trans: '(A) は刺されて死んでしまった'},
            {regex: /(.*?) was pummeled by (.*?)$/, trans: '(A) は (B) によってぺしゃんこにされた'},
            {regex: /(.*?) was doomed to fall$/, trans: '(A) は (B) によって命が尽きて落下した'},
            {regex: /(.*?) was blown up by (.*?)$/, trans: '(A) は (B) に爆破されてしまった'},
            {regex: /(.*?) was blown from a high place by (.*?)$/, trans: '(A) は (B) によって命が尽きて落下した'},
            {regex: /(.*?) was burnt to a crisp whilst fighting (.*?)$/, trans: '(A) は (B) と戦いながらカリカリに焼けてしまった'},
            {regex: /(.*?) was knocked into the void by (.*?)$/, trans: '(A) は奈落の底へ落ちてしまった'},
            {regex: /(.*?) was fireballed by (.*?)$/, trans: '(A) は (B) に火だるまにされた'},
            {regex: /(.*?) was squashed by a falling block$/, trans: '(A) は落下してきたブロックに押しつぶされた'}
        ],
        walked: [
            {regex: /(.*?) walked into a cactus whilst trying to escape (.*?)$/, trans: '(A) は (B) から逃げようとしてサボテンにぶつかってしまった'},
            {regex: /(.*?) walked into a fire whilst fighting (.*?)$/, trans: '(A) は (B) と戦いながら火の中へ踏み入れてしまった'}
        ],
        drowned: [
            {regex: /(.*?) drowned whilst trying to escape (.*?)$/, trans: '(A) は (B) から逃れようとして溺れ死んでしまった'},
            {regex: /(.*?) drowned$/, trans: '(A) は溺れ死んでしまった'}
        ],
        death: [
            {regex: /(.*?) burned to death$/, trans: '(A) はこんがりと焼けてしまった'},
            {regex: /(.*?) starved to death$/, trans: '(A) は飢え死にしてしまった'}
        ],
        other: [
            {regex: /(.*?) died$/, trans: '(A) は死んでしまった'},
            {regex: /(.*?) suffocated in a wall$/, trans: '(A) は壁の中で窒息してしまった'},
            {regex: /(.*?) blew up$/, trans: '(A) は爆発に巻き込まれてしまった'},
            {regex: /(.*?) hit the ground too hard$/, trans: '(A) は地面と強く激突してしまった'},
            {regex: /(.*?) got finished off by (.*?) using (.*?)$/, trans: '(A) は (B)  の (C) で殺害された'},
            {regex: /(.*?) went up in flames$/, trans: '(A) は炎に巻かれてしまった'},
            {regex: /(.*?) withered away$/, trans: '(A) は枯れ果ててしまった'}
        ]
    }
};