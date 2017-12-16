/**
 * Created by administrator on 20/07/2016.
 */
var cgDto = new Array(4);

var DataTool = {
    newGuid: function () {
        var guid = "";
        for (var i = 1; i <= 32; i++) {
            var n = Math.floor(Math.random() * 16.0).toString(16);
            guid += n;
            if ((i == 8) || (i == 12) || (i == 16) || (i == 20))
                guid += "-";
        }
        return guid;
    },
    newString: function () {
        return Math.random().toString(36).substr(2);
    },
    new8String: function () {
        return this.newString().substr(0, 7);
    },
    new358String: function () {
        var result = "";
        for (var i = 0; i < 10; i++) {
            result += this.newString();
        }
        return result;
    },
    newDate: function () {
        var date = new Date(),
            year = date.getFullYear(),
            month = date.getMonth() + 1,
            day = date.getDay(),
            hour = date.getHours(),
            minute = date.getMinutes();
        return year + "/" + month + "/" + day + " " + hour + ":" + minute;
    },
    createDate: function (replies) {
        if (replies.length == 0) {
            return;
        } else {
            for (var i = 0; i < replies.length; i++) {
                var reply = {
                    Id: this.newGuid(),
                    Content: "Content" + this.new358String(),
                    Replies: new Array(Math.ceil(Math.random() * 4)),
                    CreateTimeStr: this.newDate(),
                    CreatedByStr: this.new8String(),
                    ModifyTimeStr: this.newDate(),
                    ModifyByStr: this.new8String(),
                }
                replies.push(reply);
                this.createDate(reply.Replies);
            }
            return replies;
        }
    }
};


var cgDto = [
    {
        //cc-gc-Panel对应
        "Id": "ffe45626-977f-2a80-8ee3-f191c7b39e15",
        "Content": "Contentg1ixrl63z9is88uacneb9ms4ijye3dkpmx2loriccv29o7ds4iipbtysf2pik5h3shmb6e0zfrcyaiiyawf7sv9i7xeosejnhfrj8nw78rhfnkqueahojo22zkt9vx4fyc3dwaprh1wh5ozp8pvi5ye3oatzldneyfbfnp4ruj714i0n0ynpdgw2szbbl57862p22o6rqj6sur3abshawdwb84bihpvitipwmjoeh4q4k2e0qjdzpvi",
        //cc-gc-Lv1对应
        "ReplyTimes": 12,
        "Replies": [
            {
                "Id": "170adfc6-3bb2-d7b7-7f8f-c963ec4fce7f",
                "Content": "Contentd1o1ynty3wz9med4mwgrjm7vidvfn8p1br9bhfzup38xwjc3dil0165mtlnriuru3yv2fd8ia4iofuum79km1v7n23cquhwr8uxrco7r3zqk6ug1c3s5rq98s38frzcg4gp6l4aw64ebdwyduz0k9wbrlgdwujoi58azmjhxe0zfrdv53yag597q8fdb2dewuoqd7viottc64szmjliscnrmlw8w7b955jx3xl5jzxv5tn2gfsvgc766r",
                "ReplyTimes": 4,
                "Replies": [
                    {
                        "Id": "81509116-c680-fac1-aeef-ce8e62f99768",
                        "Content": "Contentfzny4lff3wgntvlgr5ygphkt9b70kf2see5ab74c93lkglditxpu35urfdc28qmbhloko6r3qtjlyjbygdxhif7kpi84lhaorlff7krombblx5k161jusug14iakdcfk05jkk9ucj0ptgxu07ldilsmn3raddbp32c6wrkfenrk9w42usveo019vwpvftwtutyb91nt5ol3rx3z9730gj0gjozjjorpntnzt9d5xajbf2g7wybq33di",
                        "Replies": [
                            {
                                "Id": "5f925bd5-c3c5-f815-7dc1-21a3a4141b4b",
                                "Content": "Contentu7omrwwcuxb52knk6om7psyviupj8l70twkdyiab3in6pw4s4i1z5i0rq4a86kdgrz7ngynwmiym2uh7vee86rjt8hgg3f2yb9sz22andyk01iff2h3y95jc3di0rpgjcap1ugy8x94vntyxbhuxrymhxagw700owdg1yr885mie9uh76kwus1dfucgjh8ttvs4i4dht4l9s2gkrkhbdqbbcpu8frgjous9v0aagr2cda5dq3680k9",
                                "Replies": [
                                    {
                                        "Id": "49ed382d-1166-7943-9e88-9f615357330e",
                                        "Content": "Contentuusgo42o84vdm70ywrtuzncdi07bnxvus0w5jfcgu0y59418aor8rb4ptpyvuxruivynf4zn0zfrz5cb4wl44xfgmia13v1gu8frgil0rmdmraf12p7pg7ygsc3di6y6gc67yp2iq595szmvwtxogvi08andt9lpf8fh1jwcyiuqbbj4idxii64ek4hfto5rw3kx58w7b97841csbt7bwkzykn3gayhz1tt9hwubthoe6vziuf2bqj788semi",
                                        "Replies": [],
                                        "CreateTimeStr": "2016/7/4 11:5",
                                        "CreatedByStr": "wpll229",
                                        "ModifyTimeStr": "2016/7/4 11:5",
                                        "ModifyByStr": "vizgho6"
                                    }
                                ],
                                "CreateTimeStr": "2016/7/4 11:5",
                                "CreatedByStr": "8g4lm7g",
                                "ModifyTimeStr": "2016/7/4 11:5",
                                "ModifyByStr": "uxnogif"
                            }
                        ],
                        "CreateTimeStr": "2016/7/4 11:5",
                        "CreatedByStr": "bpkmcoi",
                        "ModifyTimeStr": "2016/7/4 11:5",
                        "ModifyByStr": "ikkr5fr"
                    }
                ],
                "CreateTimeStr": "2016/7/4 11:5",
                "CreatedByStr": "lbzruhf",
                "ModifyTimeStr": "2016/7/4 11:5",
                "ModifyByStr": "tcoltqm"
            }
        ],
        "CreateTimeStr": "2016/7/4 11:5",
        "CreatedByStr": "6bygg2i",
        "ModifyTimeStr": "2016/7/4 11:5",
        "ModifyByStr": "r22i9um"
    },
    {
        "Id": "ffe45626-977f-5a80-8ee3-f191c7b39e15",
        "Content": "Contentg1ixrl63z9is88uacneb9ms4ijye3dkpmx2loriccv29o7ds4iipbtysf2pik5h3shmb6e0zfrcyaiiyawf7sv9i7xeosejnhfrj8nw78rhfnkqueahojo22zkt9vx4fyc3dwaprh1wh5ozp8pvi5ye3oatzldneyfbfnp4ruj714i0n0ynpdgw2szbbl57862p22o6rqj6sur3abshawdwb84bihpvitipwmjoeh4q4k2e0qjdzpvi",
        "Replies": [
            {
                "Id": "170adfc6-3bb2-d6b7-7f8f-c963ec4fce7f",
                "Content": "Contentd1o1ynty3wz9med4mwgrjm7vidvfn8p1br9bhfzup38xwjc3dil0165mtlnriuru3yv2fd8ia4iofuum79km1v7n23cquhwr8uxrco7r3zqk6ug1c3s5rq98s38frzcg4gp6l4aw64ebdwyduz0k9wbrlgdwujoi58azmjhxe0zfrdv53yag597q8fdb2dewuoqd7viottc64szmjliscnrmlw8w7b955jx3xl5jzxv5tn2gfsvgc766r",
                "Replies": [
                    {
                        "Id": "81509116-c670-fac1-aeef-ce8e62f99768",
                        "Content": "Contentfzny4lff3wgntvlgr5ygphkt9b70kf2see5ab74c93lkglditxpu35urfdc28qmbhloko6r3qtjlyjbygdxhif7kpi84lhaorlff7krombblx5k161jusug14iakdcfk05jkk9ucj0ptgxu07ldilsmn3raddbp32c6wrkfenrk9w42usveo019vwpvftwtutyb91nt5ol3rx3z9730gj0gjozjjorpntnzt9d5xajbf2g7wybq33di",
                        "Replies": [
                            {
                                "Id": "5f925bd5-c3g5-f815-7dc1-21a3a4141b4b",
                                "Content": "Contentu7omrwwcuxb52knk6om7psyviupj8l70twkdyiab3in6pw4s4i1z5i0rq4a86kdgrz7ngynwmiym2uh7vee86rjt8hgg3f2yb9sz22andyk01iff2h3y95jc3di0rpgjcap1ugy8x94vntyxbhuxrymhxagw700owdg1yr885mie9uh76kwus1dfucgjh8ttvs4i4dht4l9s2gkrkhbdqbbcpu8frgjous9v0aagr2cda5dq3680k9",
                                "Replies": [
                                    {
                                        "Id": "49ed582d-1166-7943-9e88-9f615357330e",
                                        "Content": "Contentuusgo42o84vdm70ywrtuzncdi07bnxvus0w5jfcgu0y59418aor8rb4ptpyvuxruivynf4zn0zfrz5cb4wl44xfgmia13v1gu8frgil0rmdmraf12p7pg7ygsc3di6y6gc67yp2iq595szmvwtxogvi08andt9lpf8fh1jwcyiuqbbj4idxii64ek4hfto5rw3kx58w7b97841csbt7bwkzykn3gayhz1tt9hwubthoe6vziuf2bqj788semi",
                                        "Replies": [],
                                        "CreateTimeStr": "2016/7/4 11:5",
                                        "CreatedByStr": "wpll229",
                                        "ModifyTimeStr": "2016/7/4 11:5",
                                        "ModifyByStr": "vizgho6"
                                    }
                                ],
                                "CreateTimeStr": "2016/7/4 11:5",
                                "CreatedByStr": "8g4lm7g",
                                "ModifyTimeStr": "2016/7/4 11:5",
                                "ModifyByStr": "uxnogif"
                            }
                        ],
                        "CreateTimeStr": "2016/7/4 11:5",
                        "CreatedByStr": "bpkmcoi",
                        "ModifyTimeStr": "2016/7/4 11:5",
                        "ModifyByStr": "ikkr5fr"
                    }
                ],
                "CreateTimeStr": "2016/7/4 11:5",
                "CreatedByStr": "lbzruhf",
                "ModifyTimeStr": "2016/7/4 11:5",
                "ModifyByStr": "tcoltqm"
            }
        ],
        "ReplyTimes": 12,
        "CreateTimeStr": "2016/7/4 11:5",
        "CreatedByStr": "6bygg2i",
        "ModifyTimeStr": "2016/7/4 11:5",
        "ModifyByStr": "r22i9um"
    }
]

var reflush = {
    "Id": "ffe45636-977f-2a80-8ee3-f191c7b39e15",
    "Content": "Contentg1ixrl63z9is88uacneb9ms4ijye3dkpmx2loriccv29o7ds4iipbtysf2pik5h3shmb6e0zfrcyaiiyawf7sv9i7xeosejnhfrj8nw78rhfnkqueahojo22zkt9vx4fyc3dwaprh1wh5ozp8pvi5ye3oatzldneyfbfnp4ruj714i0n0ynpdgw2szbbl57862p22o6rqj6sur3abshawdwb84bihpvitipwmjoeh4q4k2e0qjdzpvi",
    "ReplyTimes": 12,
    "Replies": [
        {
            "Id": "170adfc6-3bb2-d7b7-7f8f-c963ec4fce7f",
            "Content": "Contentd1o1ynty3wz9med4mwgrjm7vidvfn8p1br9bhfzup38xwjc3dil0165mtlnriuru3yv2fd8ia4iofuum79km1v7n23cquhwr8uxrco7r3zqk6ug1c3s5rq98s38frzcg4gp6l4aw64ebdwyduz0k9wbrlgdwujoi58azmjhxe0zfrdv53yag597q8fdb2dewuoqd7viottc64szmjliscnrmlw8w7b955jx3xl5jzxv5tn2gfsvgc766r",
            "ReplyTimes": 4,
            "Replies": [
                {
                    "Id": "81509116-c650-fac1-aeef-ce8e62f99768",
                    "Content": "Contentfzny4lff3wgntvlgr5ygphkt9b70kf2see5ab74c93lkglditxpu35urfdc28qmbhloko6r3qtjlyjbygdxhif7kpi84lhaorlff7krombblx5k161jusug14iakdcfk05jkk9ucj0ptgxu07ldilsmn3raddbp32c6wrkfenrk9w42usveo019vwpvftwtutyb91nt5ol3rx3z9730gj0gjozjjorpntnzt9d5xajbf2g7wybq33di",
                    "Replies": [
                        {
                            "Id": "5f925bd5-c5c5-f815-7dc1-21a3a4141b4b",
                            "Content": "Contentu7omrwwcuxb52knk6om7psyviupj8l70twkdyiab3in6pw4s4i1z5i0rq4a86kdgrz7ngynwmiym2uh7vee86rjt8hgg3f2yb9sz22andyk01iff2h3y95jc3di0rpgjcap1ugy8x94vntyxbhuxrymhxagw700owdg1yr885mie9uh76kwus1dfucgjh8ttvs4i4dht4l9s2gkrkhbdqbbcpu8frgjous9v0aagr2cda5dq3680k9",
                            "Replies": [
                                {
                                    "Id": "494d382d-1166-7943-9e88-9f615357330e",
                                    "Content": "Contentuusgo42o84vdm70ywrtuzncdi07bnxvus0w5jfcgu0y59418aor8rb4ptpyvuxruivynf4zn0zfrz5cb4wl44xfgmia13v1gu8frgil0rmdmraf12p7pg7ygsc3di6y6gc67yp2iq595szmvwtxogvi08andt9lpf8fh1jwcyiuqbbj4idxii64ek4hfto5rw3kx58w7b97841csbt7bwkzykn3gayhz1tt9hwubthoe6vziuf2bqj788semi",
                                    "Replies": [],
                                    "CreateTimeStr": "2016/7/4 11:5",
                                    "CreatedByStr": "post5",
                                    "ModifyTimeStr": "2016/7/4 11:5",
                                    "ModifyByStr": "post5"
                                }
                            ],
                            "CreateTimeStr": "2016/7/4 11:5",
                            "CreatedByStr": "post4",
                            "ModifyTimeStr": "2016/7/4 11:5",
                            "ModifyByStr": "post4"
                        }
                    ],
                    "CreateTimeStr": "2016/7/4 11:5",
                    "CreatedByStr": "post3",
                    "ModifyTimeStr": "2016/7/4 11:5",
                    "ModifyByStr": "post3"
                }
            ],
            "CreateTimeStr": "2016/7/4 11:5",
            "CreatedByStr": "post2",
            "ModifyTimeStr": "2016/7/4 11:5",
            "ModifyByStr": "post2"
        }
    ],
    "CreateTimeStr": "2016/7/4 11:5",
    "CreatedByStr": "post1",
    "ModifyTimeStr": "2016/7/4 11:5",
    "ModifyByStr": "post1"
}


$(function () {
    $$page.cc_cg("getReplies", cgDto);
});