import React from 'react';
import { Container } from 'react-bootstrap';

const Comprador = () => {
  return (
    <Container>
      <h1>Página do Comprador</h1>
      <p>Seja bem-vindo, Comprador!</p>
      <p>Aqui você encontrará informações sobre a compra e reciclagem de materiais recicláveis.</p>
      
      <div>
        <h2>Como funciona a compra de materiais recicláveis?</h2>
        <p>A compra de materiais recicláveis envolve a aquisição de resíduos sólidos que podem ser reciclados ou reaproveitados. Os materiais adquiridos são encaminhados para empresas de reciclagem, onde serão transformados em novos produtos.</p>
        
        <h2>Quais materiais recicláveis podem ser comprados?</h2>
        <ul>
          <li>Papel e papelão</li>
          <li>Plástico</li>
          <li>Vidro</li>
          <li>Metal (alumínio, aço)</li>
        </ul>
        
        <h2>O que fazer para comprar materiais recicláveis?</h2>
        <p>Para adquirir materiais recicláveis, é importante estabelecer parcerias com catadores, cooperativas de reciclagem ou empresas especializadas. Além disso, é necessário ter um processo de triagem e separação adequado para garantir a qualidade dos materiais adquiridos.</p>
        
        <h2>Benefícios da compra de materiais recicláveis</h2>
        <p>A compra de materiais recicláveis traz diversos benefícios, tais como:</p>
        <ul>
          <li>Promoção da economia circular</li>
          <li>Redução do uso de matérias-primas virgens</li>
          <li>Contribuição para a preservação do meio ambiente</li>
          <li>Incentivo à geração de renda para catadores e cooperativas</li>
        </ul>
      </div>
      
      <div>
        <h2>Imagens informativas:</h2>
        <img src="/caminho/para/imagem1.jpg" alt="Compra de materiais recicláveis" />
        <p>Exemplo de compra de materiais recicláveis</p>
        
        <img src="/caminho/para/imagem2.jpg" alt="Reciclagem de plástico" />
        <p>Processo de reciclagem de plástico</p>
        
        {/* Adicione mais imagens e informações conforme necessário */}
      </div>
    </Container>
  );
};

export default Comprador;
