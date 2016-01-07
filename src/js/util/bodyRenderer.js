import marked from 'marked'

const options = {
    renderer: new marked.Renderer(),
    gfm: true,
    tables: true,
    breaks: true,
    pedantic: false,
    sanitize: true,
    smartLists: true,
    smartypants: false
};

const oldLinkRule = marked.InlineLexer.rules.link;
const newLinkRegex = /^\[\[([^\]]*)\]\]/

const trx = (match) => match && [match[0], match[1], `/${match[1]}`, match[1]];

const newLinkRule = {
    exec: (src) => trx(newLinkRegex.exec(src)) || oldLinkRule.exec(src)
}

marked.InlineLexer.rules.normal.link = newLinkRule;
marked.InlineLexer.rules.pedantic.link = newLinkRule;
marked.InlineLexer.rules.gfm.link = newLinkRule;
marked.InlineLexer.rules.breaks.link = newLinkRule;


export default function bodyRenderer(text) {


    const tokens = marked.lexer(text, options);

    return marked.parser(tokens);

}

