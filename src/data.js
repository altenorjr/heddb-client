import moment from 'moment';
import unique from 'sugar/array/unique';
import './setup';

export const bands = [{
    id: 'obijuba',
    name: 'Obijubá',
    bio: 'Os humildes mas não menos talentosos músicos da Obijubá Blues unem-se na difícil missão de levar blues para o público brasileiro. Qual tempero será usado? Pimenta? Coentro? Salsinha? Eis a incógnita.',
    pic: 'https://scontent.fgru5-1.fna.fbcdn.net/v/t31.0-8/19402198_1549803521756520_4627523060734335179_o.jpg?oh=20f2513f1ecb9b1a4ab1babb3acc792a&oe=5A0523D2',
    social: ['https://www.facebook.com/obijuba', 'https://twitter.com/obijuba', 'https://www.instagram.com/obijuba/'],
    location: {
        state: 'SP',
        city: 'São Paulo',
        map: 'https://www.google.com/maps/place/Selva+Club/@-23.5515095,-46.6528317,17z/data=!3m1!4b1!4m5!3m4!1s0x94ce584a87c560df:0xffe8a5234579cedc!8m2!3d-23.5515095!4d-46.650643?hl=pt-BR'
    }
}, {
    id: 'adriano-grindberg',
    name: 'Adriano Grinberg',
    bio: 'Aos 16 anos, ao piano, já acompanhava grandes artistas como o cantor J.J. Jackson, Irmandade do Blues, Corey Harris (EUA), John Pizzarelli (EUA), André Christovam, Lancaster, Big Time Sarah (EUA), Deitra Farr (EUA) e a lendária Blue Jeans, com a qual gravou um DVD com Magic Slim. Em 2004 abriu três vezes os shows de B.B. King em São Paulo.',
    pic: 'https://scontent.fgru5-1.fna.fbcdn.net/v/t1.0-9/13344720_10209883393824854_6833665226371025447_n.jpg?oh=c325d95202c20fa265f63d089f646148&oe=59FA4571',
    social: ['https://www.facebook.com/obijuba', 'https://twitter.com/obijuba', 'https://www.instagram.com/obijuba/'],
    location: {
        state: 'SP',
        city: 'São Paulo',
        map: 'https://www.google.com/maps/place/Selva+Club/@-23.5515095,-46.6528317,17z/data=!3m1!4b1!4m5!3m4!1s0x94ce584a87c560df:0xffe8a5234579cedc!8m2!3d-23.5515095!4d-46.650643?hl=pt-BR'
    }
}, {
    id: 'alex-dupas',
    name: 'Alex Dupas',
    bio: '18 de carreira, fundou a Jazz Q. é Blues,  esteve na Orquestra de gaitas do conserv. Souza Lima e na banda Jafer Blue. Atualmente na Black Garoa Blues Band, já dividiu palco com grandes nomes como: J. J. Jackson, Peter Mad Cat, Dr. Feel Good, Maurício Sahady, Igor Prado, Bee Scott',
    pic: 'https://scontent.fgru5-1.fna.fbcdn.net/v/t1.0-9/10156060_627674030646981_5838362020994565101_n.jpg?oh=ad3261ba5587245b57a42111099c0934&oe=5A3589F2',
    social: ['https://www.facebook.com/obijuba', 'https://twitter.com/obijuba', 'https://www.instagram.com/obijuba/'],
    location: {
        state: 'SP',
        city: 'São Paulo',
        map: 'https://www.google.com/maps/place/Selva+Club/@-23.5515095,-46.6528317,17z/data=!3m1!4b1!4m5!3m4!1s0x94ce584a87c560df:0xffe8a5234579cedc!8m2!3d-23.5515095!4d-46.650643?hl=pt-BR'
    }
}, {
    id: 'big-chico',
    name: 'Big Chico',
    bio: 'Big Chico é, hoje, um dos grandes nomes do blues nacional. Com 20 anos de carreira já se apresentou em todo o Brasil e países como E.U.A., Europa, Chile e Argentina. gravou 05 CD\'s e 2 DVD\'s, o 3º. que o terceiro CD foi gravado nos E.U.A.e o segundo DVD na Argentina.',
    pic: 'https://scontent.fgru5-1.fna.fbcdn.net/v/t1.0-9/1779097_597579493651371_32269556_n.jpg?oh=4677db64b2c2a5ebdf323d9605997b86&oe=59FD05E3',
    social: ['https://www.facebook.com/obijuba', 'https://twitter.com/obijuba', 'https://www.instagram.com/obijuba/'],
    location: {
        state: 'SP',
        city: 'São Paulo',
        map: 'https://www.google.com/maps/place/Selva+Club/@-23.5515095,-46.6528317,17z/data=!3m1!4b1!4m5!3m4!1s0x94ce584a87c560df:0xffe8a5234579cedc!8m2!3d-23.5515095!4d-46.650643?hl=pt-BR'
    }
}, {
    id: 'blues-etilicos',
    name: 'Blues Etílicos',
    bio: 'Blues Etílicos é a marca mais forte do blues nacional. Desde meados dos anos 80, a banda formada por Flávio Guimarães, Greg Wilson, Otávio Rocha, Pedro Strasser e Cláudio Bedran vem produzindo uma extensa obra autoral, além de gravar homenagens às suas principais influências, tendo lançado doze CDs e um DVD.',
    pic: 'https://scontent.fgru5-1.fna.fbcdn.net/v/t1.0-9/11140113_481966585292616_7581932249387360929_n.jpg?oh=f26ec878b1af48be11629f22aae4ed9e&oe=59F30606',
    social: ['https://www.facebook.com/obijuba', 'https://twitter.com/obijuba', 'https://www.instagram.com/obijuba/'],
    location: {
        state: 'RJ',
        city: 'Rio de Janeiro',
        map: 'https://www.google.com/maps/place/Selva+Club/@-23.5515095,-46.6528317,17z/data=!3m1!4b1!4m5!3m4!1s0x94ce584a87c560df:0xffe8a5234579cedc!8m2!3d-23.5515095!4d-46.650643?hl=pt-BR'
    }
}];

export const bandStates = () => [
    {
        text: 'Todos os Estados',
        value: 'all',
        count: bands.length
    },
    ...unique(bands.map((band) => band.location.state))
        .map((state) => stateInfo(state))
        .map(({ text, value, genderArticle }) => ({
            text,
            value,
            genderArticle,
            count: bands.filter(band => band.location.state === value).length
        }))
];

export const venues = [{
    name: 'The Orleans Music Bar',
    address: 'Rua Girassol, 398',
    phone: '(11) 3031-1780',
    location: {
        state: 'SP',
        city: 'São Paulo',
        map: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3682.5947819094777!2d-47.05388148461997!3d-22.631602285152344!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94c8ee9ba88dfa89%3A0x6131fced4b748be!2sBier+Trunk+Pub+Bar!5e0!3m2!1spt-BR!2sbr!4v1501479888146'
    }
}, {
    name: 'Jardim das Delícias Bar & Bistrô',
    address: 'Rua Belmiro Braga, 96',
    phone: '(11) 3032-6878',
    location: {
        state: 'SP',
        city: 'São Paulo',
        map: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3682.5947819094777!2d-47.05388148461997!3d-22.631602285152344!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94c8ee9ba88dfa89%3A0x6131fced4b748be!2sBier+Trunk+Pub+Bar!5e0!3m2!1spt-BR!2sbr!4v1501479888146'
    }
}, {
    name: 'PBier Trunk Pub Bar',
    address: 'R. Campo de Pouso, 1162',
    phone: '(19) 3802-4550',
    location: {
        state: 'SP',
        city: 'Holambra',
        map: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3682.5947819094777!2d-47.05388148461997!3d-22.631602285152344!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94c8ee9ba88dfa89%3A0x6131fced4b748be!2sBier+Trunk+Pub+Bar!5e0!3m2!1spt-BR!2sbr!4v1501479888146'
    }
}];

export const events = [{
    band: bands[0],
    venue: venues[1],
    date: new Date(2017, 7, 6, 21, 30, 0, 0),
    links: ['https://www.facebook.com/events/1856140748032125/']
}, {
    band: bands[3],
    venue: venues[0],
    date: new Date(2017, 8, 6, 21, 30, 0, 0),
    links: ['https://www.facebook.com/events/1856140748032125/']
}, {
    band: bands[1],
    venue: venues[2],
    date: new Date(2017, 8, 1, 21, 30, 0, 0),
    links: ['https://www.facebook.com/events/1856140748032125/']
}].sort((a, b) => a.date.getTime() - b.date.getTime());

export const months =
    [
        {
            value: 'all',
            text: 'Agenda Completa',
            count: events.length
        },
        ...unique(events.map((event) => moment(event.date).startOf('month').toDate()))
            .sort((a, b) => a.getTime() - b.getTime())
            .map(month => {
                const momentMonth = moment(month);
                const monthStart = momentMonth.startOf('month').toDate();
                const monthEnd = momentMonth.endOf('month').toDate();

                return {
                    value: month.toISOString(),
                    text: moment(month).format('MMMM [de] YYYY'),
                    count: events.filter(event => event.date.getTime() >= monthStart.getTime() && event.date.getTime() <= monthEnd.getTime()).length
                };
            })
    ];

export const filterEvents = (month, city) => {
    let result = events.map(e => e);

    if (month !== 'all') {
        const momentMonth = moment(month);
        const monthStart = momentMonth.startOf('month').toDate();
        const monthEnd = momentMonth.endOf('month').toDate();

        result = result.filter(event => event.date.getTime() >= monthStart.getTime() && event.date.getTime() <= monthEnd.getTime());
    }

    if (city !== 'all') {
        const [cityName, state] = city.split('/');

        result = result.filter(event => event.venue.location.city === cityName && event.venue.location.state === state);
    }

    return result;
};

export const cities = [
    {
        value: 'all',
        text: 'Todas as Cidades',
        count: events.length
    },
    ...unique(events.map(({ venue: { location: { city, state } } }, i, arr) => ({
        value: `${city}/${state}`,
        text: `${city} - ${state.toUpperCase()}`,
        count: arr.filter(c => c.venue.location.city === city && c.venue.location.state === state).length
    }))).sort()
]

export const filterBands = (state) => {
    let result = bands.map(b => b);

    if (state !== 'all') {
        result = result.filter(band => band.location.state === state);
    }

    const sorted = unique(result.map(b => b.name))
        .sort()
        .map(name => result.find(band => band.name === name));

    return sorted;
}

const states = [{
    value: 'AC',
    text: "Acre",
    genderArticle: 'o'
},
{
    value: 'AL',
    text: "Alagoas",
    genderArticle: 'e'
},
{
    value: 'AM',
    text: "Amazonas",
    genderArticle: 'o'
},
{
    value: 'AP',
    text: "Amapá",
    genderArticle: 'o'
},
{
    value: 'BA',
    text: "Bahia",
    genderArticle: 'a'
},
{
    value: 'CE',
    text: "Ceará",
    genderArticle: 'o'
},
{
    value: 'DF',
    text: "Distrito Federal",
    genderArticle: 'o'
},
{
    value: 'ES',
    text: "Espírito Santo",
    genderArticle: 'o'
},
{
    value: 'GO',
    text: "Goiás",
    genderArticle: 'e'
},
{
    value: 'MA',
    text: "Maranhão",
    genderArticle: 'o'
},
{
    value: 'MG',
    text: "Minas Gerais",
    genderArticle: 'e'
},
{
    value: 'MS',
    text: "Mato Grosso do Sul",
    genderArticle: 'o'
},
{
    value: 'MT',
    text: "Mato Grosso",
    genderArticle: 'o'
},
{
    value: 'PA',
    text: "Pará",
    genderArticle: 'o'
},
{
    value: 'PB',
    text: "Paraíba",
    genderArticle: 'a'
},
{
    value: 'PE',
    text: "Pernambuco",
    genderArticle: 'e'
},
{
    value: 'PI',
    text: "Piauí",
    genderArticle: 'o'
},
{
    value: 'PR',
    text: "Paraná",
    genderArticle: 'o'
},
{
    value: 'RJ',
    text: "Rio de Janeiro",
    genderArticle: 'o'
},
{
    value: 'RN',
    text: "Rio Grande do Norte",
    genderArticle: 'o'
},
{
    value: 'RO',
    text: "Rondônia",
    genderArticle: 'e'
},
{
    value: 'RR',
    text: "Roraima",
    genderArticle: 'e'
},
{
    value: 'RS',
    text: "Rio Grande do Sul",
    genderArticle: 'o'
},
{
    value: 'SC',
    text: "Santa Catarina",
    genderArticle: 'e'
},
{
    value: 'SE',
    text: "Sergipe",
    genderArticle: 'e'
},
{
    value: 'SP',
    text: "São Paulo",
    genderArticle: 'e'
},
{
    value: 'TO',
    text: "Tocantins",
    genderArticle: 'o'
}];

export const stateInfo = (state) => states.find(({ value }) => value === state);