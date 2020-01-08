module.exports = function Pedido(pedido){
    
    this.items = pedido.items || {};
    this.totalQtd = pedido.totalQtd || 0;
    this.valorTotal = pedido.valorTotal || 0;

    this.add = function(item, id){
        const storedItem = this.items[id];
        if(!storedItem){
            storedItem = this.items[id] = { item: item, qtd: 0, valor: 0 };
        }
        storedItem++;
        storedItem.valor = storedItem.item.valor * storedItem.qtd;
        this.totalQtd++;
        this.valorTotal += storedItem.item.valor;
    };

    this.generateArray = function(){
        const arr = [];
        for(var id in this.items){
            arr.push(this.items[id]);
        }
        return arr;
    };    
    
};