import React from 'react';
import { Container } from 'react-bootstrap';

const Fornecedor = () => {
  return (
    <Container>
      <h1>Página do Fornecedor</h1>
      <p>Seja bem-vindo, Fornecedor!</p>
      <p>Aqui você encontrará informações sobre como fornecer e vender materiais recicláveis.</p>
      
      <div>
        <h2>Como fornecer materiais recicláveis?</h2>
        <p>O fornecimento de materiais recicláveis envolve a disponibilização de resíduos sólidos que podem ser reciclados ou reaproveitados. Esses materiais são adquiridos por empresas de reciclagem, que os transformam em novos produtos.</p>
        
        <h2>Quais materiais recicláveis podem ser fornecidos?</h2>
        <ul>
          <li>Papel e papelão</li>
          <li>Plástico</li>
          <li>Vidro</li>
          <li>Metal (alumínio, aço)</li>
        </ul>
        
        <h2>O que fazer para fornecer materiais recicláveis?</h2>
        <p>Para fornecer materiais recicláveis, é importante estabelecer parcerias com empresas de reciclagem, cooperativas ou catadores. Realize a separação correta dos materiais e entre em contato com os possíveis compradores para verificar os requisitos e condições de fornecimento.</p>
        
        <h2>Benefícios de ser um fornecedor de materiais recicláveis</h2>
        <p>Existem diversos benefícios em ser um fornecedor de materiais recicláveis, tais como:</p>
        <ul>
          <li>Contribuição para a preservação do meio ambiente</li>
          <li>Redução da quantidade de resíduos enviados para aterros sanitários</li>
          <li>Geração de renda através da venda dos materiais recicláveis</li>
          <li>Promoção da economia circular e sustentável</li>
        </ul>
      </div>
      
      <div>
        <h2>Imagens informativas:</h2>
        <img src="/caminho/para/imagem1.jpg" alt="Fornecimento de materiais recicláveis" />
        <p>Exemplo de fornecimento de materiais recicláveis</p>
        
        <img src="/caminho/para/imagem2.jpg" alt="Reciclagem de plástico" />
        <p>Processo de reciclagem de plástico</p>
        
        {/* Adicione mais imagens e informações conforme necessário */}
      </div>
    </Container>
  );
};

export default Fornecedor;
