var qest = [
    {//0
        ask: "Вы сидите в таверне, вам приносят,заказанный вами ужин, и вы приступаете к еде. Вдруг в таверну вбегает девушка и говорит, что на её деревню напало чудовище. Эта девушка просит вас о том, чтобы вы убили чудовище. Согласны ли вы отправиться в деревню, чтобы убить чудовище?",
        anser: "Да",
        ifTrue: 1,
        ifFalse: 2,
    },
    {//1
        ask: "Вы не смогли справиться с чудовищем, и оно вас убило."
    },
    {
        ask: "Вы отказали этой девушке и продолжили ужинать. Закончив трапезу, вы отправились домой и легли спать с полным осознанием ценности жизни и пониманием границ своих сил."
    }
]

var current = 0;

while (1) {
    var qestion = qest[current];
    var anser = qestion.ask;
    if (anser === qestion.answer1)
    {
        current = qestion.isTrue1;
    }
    if (anser === qestion.answer2)
    {
        current = qestion.isTrue2;
    }
}