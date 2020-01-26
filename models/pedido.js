module.exports = function Pedido(pedido) {

    this.items = pedido.items || {};
    this.totalQtd = pedido.totalQtd || 0;
    this.valorTotal = pedido.valorTotal || 0;
    this.sequencia = pedido.sequencia;

    /* Função para adicionar itens na lista e salvar na session */
    this.add = function (item, id, quant) {
        var storedItem = this.items[id];
        var seq = Object.values(this.items);
        var sq = 0;     
        for (var i = 0; i <= seq.length; i++) {
            sq = i + 1;
        }
        if (!storedItem) {
            storedItem = this.items[id] = { 
                sequencia: sq, 
                item: item, 
                qtd: parseInt(quant), 
                valor: item.prod_valor 
            };
        }                
        storedItem.valor = storedItem.item.prod_valor * storedItem.qtd;
        this.totalQtd++;    
        this.valorTotal += storedItem.valor;
    };

    this.generateArray = function () {
        const arr = [];
        for (var id in this.items) {
            arr.push(this.items[id]);
        }
        return arr;
    };
};