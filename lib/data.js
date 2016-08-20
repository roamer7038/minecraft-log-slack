module.exports = {
    deaths: {
        lava: [
            {regex: /(.*?) tried to swim in lava while trying to escape (.*?)$/, trans: '$1 は $2 から逃れようと溶岩遊泳を試みた'},
            {regex: /(.*?) tried to swim in lava$/, trans: '$1 は溶岩遊泳を試みた'},
            {regex: /(.*?) discovered floor was lava$/, trans: '$1 は床が溶岩だったと気付いた'},
        ],
        fell: [
            {regex: /(.*?) fell from a high place$/, trans: '$1 は高い所から落ちた'},
            {regex: /(.*?) fell off a ladder$/, trans: '$1 ははしごから落ちた'},
            {regex: /(.*?) fell off some vines$/, trans: '$1 はツタから滑り落ちた'},
            {regex: /(.*?) fell out of the world$/, trans: '$1 は奈落の底へ落ちてしまった'},
            {regex: /(.*?) fell out of the water$/, trans: '$1 は水から落ちた'},
            {regex: /(.*?) fell into a patch of fire$/, trans: '$1 は火の海に落ちた'},
            {regex: /(.*?) fell into a patch of cacti$/, trans: '$1 はサボテンの上に落ちた'},
            {regex: /(.*?) fell from a high place and fell out of the world$/, trans: '$1 は奈落の底へ落ちてしまった'}
        ],
        shot: [
            {regex: /(.*?) was shot by (.*?) using (.*?)$/, trans: '$1 は $2 の $3 で射抜かれた'},
            {regex: /(.*?) was shot by arrow$/, trans: '$1 は矢に射抜かれた'},
            {regex: /(.*?) was shot by (.*?)$/, trans: '$1 は $2 に射抜かれた'},
            {regex: /(.*?) was shot off some vines by (.*?)$/, trans: '$1 は $2 によって命が尽きて落下した'},
            {regex: /(.*?) was shot off a ladder by (.*?)$/, trans: '$1 は $2 によって命が尽きて落下した'}
        ],
        killed: [
            {regex: /(.*?) was killed by magic$/, trans: '$1 は魔法で殺された'},
            {regex: /(.*?) was killed by (.*?) using magic$/, trans: '$1 は魔法を使う $2 に殺された'},
            {regex: /(.*?) was killed while trying to hurt (.*?)$/, trans: '$1 は $2 を傷つけようとして殺されました。'}
        ],
        slain: [
            {regex: /(.*?) was slain by (.*?) using (.*?)$/, trans: '$1 は $2  の $3 で殺害された'},
            {regex: /(.*?) was slain by (.*?)$/, trans: '$1 は $2  に殺害された'}
        ],
        was: [
            {regex: /(.*?) was squashed by a falling anvil$/, trans: '$1 は落下してきた金床に押しつぶされた'},
            {regex: /(.*?) was pricked to death$/, trans: '$1 は刺されて死んでしまった'},
            {regex: /(.*?) was pummeled by (.*?)$/, trans: '$1 は $2 によってぺしゃんこにされた'},
            {regex: /(.*?) was doomed to fall$/, trans: '$1 は $2 によって命が尽きて落下した'},
            {regex: /(.*?) was blown up by (.*?)$/, trans: '$1 は $2 に爆破されてしまった'},
            {regex: /(.*?) was blown from a high place by (.*?)$/, trans: '$1 は $2 によって命が尽きて落下した'},
            {regex: /(.*?) was burnt to a crisp whilst fighting (.*?)$/, trans: '$1 は $2 と戦いながらカリカリに焼けてしまった'},
            {regex: /(.*?) was knocked into the void by (.*?)$/, trans: '$1 は奈落の底へ落ちてしまった'},
            {regex: /(.*?) was fireballed by (.*?)$/, trans: '$1 は $2 に火だるまにされた'},
            {regex: /(.*?) was squashed by a falling block$/, trans: '$1 は落下してきたブロックに押しつぶされた'}
        ],
        walked: [
            {regex: /(.*?) walked into a cactus whilst trying to escape (.*?)$/, trans: '$1 は $2 から逃げようとしてサボテンにぶつかってしまった'},
            {regex: /(.*?) walked into a fire whilst fighting (.*?)$/, trans: '$1 は $2 と戦いながら火の中へ踏み入れてしまった'}
        ],
        drowned: [
            {regex: /(.*?) drowned whilst trying to escape (.*?)$/, trans: '$1 は $2 から逃れようとして溺れ死んでしまった'},
            {regex: /(.*?) drowned$/, trans: '$1 は溺れ死んでしまった'}
        ],
        death: [
            {regex: /(.*?) burned to death$/, trans: '$1 はこんがりと焼けてしまった'},
            {regex: /(.*?) starved to death$/, trans: '$1 は飢え死にしてしまった'}
        ],
        other: [
            {regex: /(.*?) died$/, trans: '$1 は死んでしまった'},
            {regex: /(.*?) suffocated in a wall$/, trans: '$1 は壁の中で窒息してしまった'},
            {regex: /(.*?) blew up$/, trans: '$1 は爆発に巻き込まれてしまった'},
            {regex: /(.*?) hit the ground too hard$/, trans: '$1 は地面と強く激突してしまった'},
            {regex: /(.*?) got finished off by (.*?) using (.*?)$/, trans: '$1 は $2  の $3 で殺害された'},
            {regex: /(.*?) went up in flames$/, trans: '$1 は炎に巻かれてしまった'},
            {regex: /(.*?) withered away$/, trans: '$1 は枯れ果ててしまった'}
        ]
    }
};