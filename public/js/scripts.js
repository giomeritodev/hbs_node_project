//Criação do modal para confirmação da deleção da categoria
$(document).ready(function(){
    $('a[data-confirm]').click(function(ev){
        var href = $(this).attr('href');
        if(!$('#confirm-delete').length){
            $('body').append(`
                <div class="modal fade" id="confirm-delete" tabindex="-1" role="dialog" aria-labelledby="TituloModalLongoExemplo" aria-hidden="true">
                  <div class="modal-dialog" role="document">
                    <div class="modal-content">
                      <div class="modal-header bg-danger text-white">
                        <h4>Excluir item</h4>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Fechar">
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div class="modal-body">
                        Tem certeza de que deseja excluir o item selecionado?
                      </div>
                      <div class="modal-footer">
                        <button type="button" class="btn btn-success" data-dismiss="modal">Cancelar</button>

                        <a class="btn btn-danger text-white" id="dataConfirmOK">Excluir</a>

                      </div>
                    </div>
                  </div>
                </div>
            `);
        }
        $('#dataConfirmOK').attr('href', href);
        $('#confirm-delete').modal({show: true}); 
        return false;
    });
});