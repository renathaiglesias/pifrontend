import React, { useState } from 'react';
import './Informacao.css';
import Catador from '../images/Catador.png';
import Fornecedor from '../images/Fornecedor.png';
import Comprador from '../images/Comprador.png';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.js'


const Informacao = () => {
    const [mostrarDetalhes, setMostrarDetalhes] = useState(false);

    const mostrarMais3 = () => {
        setMostrarDetalhes(!mostrarDetalhes);
    };

    return (
        <div className="conteiner marketing">
            <div className='row'>
                <div className='col-lg-4'>
                    <img
                        className="bd-placeholder-img rounded-circle brilho"
                        width="140"
                        height="140"
                        src={Fornecedor}
                        alt="Placeholder"
                    />

                    <h2 className="fw-normal">Fornecedor</h2>
                    <p>
                        Pessoas que fornecem lixo reciclável desempenham um papel importante na cadeia de reciclagem. Elas são os responsáveis por separar e disponibilizar os materiais recicláveis para os catadores de lixo ou empresas de coleta seletiva.
                    </p>
                    <p>
                        Essas pessoas coletam e separam os materiais recicláveis em suas casas, empresas ou comunidades. Elas separam os diferentes tipos de resíduos, como papel, plástico, vidro e metal, e os armazenam separadamente em recipientes apropriados para reciclagem.
                    </p>
                </div>
                <div className='col-lg-4'>
                    <img
                        className="bd-placeholder-img rounded-circle brilho"
                        width="140"
                        height="140"
                        src={Catador}
                        alt="Placeholder"
                    />

                    <h2 className="fw-normal">Catador</h2>
                    <p>
                        Os catadores desempenham um papel fundamental na gestão de resíduos e na reciclagem, especialmente em países em desenvolvimento. Eles são trabalhadores que coletam, separam e vendem materiais recicláveis, muitas vezes encontrados em lixões, aterros sanitários e ruas.
                    </p>
                    <p>
                        Os catadores percorrem áreas urbanas, lixões ou outros locais de descarte em busca de materiais recicláveis, como papel, plástico, vidro e metal. Eles utilizam carrinhos de coleta ou outros meios de transporte para carregar os materiais coletados.
                    </p>
                </div>
                <div className='col-lg-4'>
                    <img
                        className="bd-placeholder-img rounded-circle brilho"
                        width="140"
                        height="140"
                        src={Comprador}
                        alt="Placeholder"
                    />

                    <h2 className="fw-normal">Comprador</h2>
                    <p>
                        Os compradores de lixo reciclável são empresas, indústrias ou intermediários que adquirem os materiais recicláveis coletados por catadores, fornecedores de lixo reciclável ou empresas de coleta seletiva. Esses compradores são responsáveis por encaminhá-los para o processo de reciclagem adequado.
                    </p>
                    <p>
                        Os compradores de lixo reciclável adquirem diversos tipos de materiais recicláveis, como papel, plástico, vidro, metal, entre outros. Eles estabelecem parcerias com catadores, fornecedores de lixo reciclável ou empresas de coleta seletiva para receber esses materiais.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Informacao;
