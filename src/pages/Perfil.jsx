import React, { useState, useEffect } from "react";
import { collection, doc, getDoc } from "firebase/firestore";
import { auth, firestore } from "../firebaseConfig";
import './Perfil.css';

const Perfil = () => {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        try {
          const userDocRef = doc(firestore, "usuarios", user.uid);
          const userDocSnapshot = await getDoc(userDocRef);
          
          if (userDocSnapshot.exists()) {
            const userData = userDocSnapshot.data();
            setUserInfo(userData);
          }
        } catch (error) {
          console.error("Erro ao obter informações do usuário:", error);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  if (!userInfo) {
    return <div>Carregando dados...</div>;
  }

  return (
    <div className="profile-container">
      <h2>Meus dados:</h2>
      <p>Nome: {userInfo.nome}</p>
      <p>Email: {userInfo.email}</p>
      <p>CEP: {userInfo.cep}</p>
      <p>Endereço: {userInfo.endereco}</p>
      <p>CPF: {userInfo.cpf}</p>
      <p>RG: {userInfo.rg}</p>
      <p>Gênero: {userInfo.genero}</p>
      <p>Tipo de Usuário: {userInfo.tipoUsuario}</p>
    </div>
  );
  
};

//teste

export default Perfil;
