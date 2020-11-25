import linkModel, {ILinkModel} from './linkModel';
import {Link} from './link';
import LinkModel from './linkModel';

//No BANCODE DADOS - Encontrar um link para o codigo.
function findByCode(code: string){
    return linkModel.findOne<ILinkModel>({ where: { code } });
}

//No BANCODE DADOS - Adicionar um novo link.
function add(link: Link){
    return linkModel.create<ILinkModel>(link);
}

//No BANCODE DADOS - Para atualizar os hits de um link existente.
async function hit(code: string){
    const link = await findByCode(code);
    if(!link) return null;

    link.hits!++;
    link.save();
}

//Exportar as funçõers criadas para podermos utilizar no backand.
export default {
    findByCode,
    add,
    hit,
}