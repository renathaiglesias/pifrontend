import React from 'react';
import { Container } from 'react-bootstrap';

const Catador = () => {
  return (
    <Container>
      <h1>Página do Catador</h1>
      <p>Seja bem-vindo, Catador!</p>
      <p>Aqui você poderá encontrar informações sobre a coleta e reciclagem de materiais.</p>
      
      <div>
        <h2>Como funciona a coleta seletiva?</h2>
        <p>A coleta seletiva é um processo de separação e recolhimento de resíduos sólidos que podem ser reciclados ou reaproveitados. Os materiais recolhidos são encaminhados para recicladoras, onde são transformados em novos produtos.</p>
        
        <h2>Quais materiais podem ser reciclados?</h2>
        <ul>
          <li>Papel e papelão</li>
          <li>Plástico</li>
          <li>Vidro</li>
          <li>Metal (alumínio, aço)</li>
        </ul>
        
        <h2>O que fazer com os materiais recicláveis?</h2>
        <p>Para facilitar a reciclagem, é importante separar os materiais recicláveis do lixo comum e destiná-los corretamente. Utilize recipientes diferentes para papel, plástico, vidro e metal. Procure pontos de coleta seletiva em sua região ou entre em contato com cooperativas de reciclagem.</p>
        
        <h2>Benefícios da reciclagem</h2>
        <p>A reciclagem traz diversos benefícios para o meio ambiente e para a sociedade, tais como:</p>
        <ul>
          <li>Redução do consumo de recursos naturais</li>
          <li>Economia de energia</li>
          <li>Redução da quantidade de resíduos enviados para aterros sanitários</li>
          <li>Geração de empregos na cadeia de reciclagem</li>
        </ul>
      </div>
      
      <div>
        <h2>Imagens informativas:</h2>
        <img src="/caminho/para/imagem1.jpg" alt="Coleta seletiva" />
        <p>Exemplo de coleta seletiva</p>
        
        <img src="/caminho/para/imagem2.jpg" alt="Reciclagem de plástico" />
        <p>Processo de reciclagem de plástico</p>
        
        {/* Adicione mais imagens e informações conforme necessário */}
      </div>
    </Container>
  );
};

export default Catador;