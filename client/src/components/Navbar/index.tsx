import React, { useEffect, useState } from 'react';

import { Container, LogoContainer, LogoPhoto, CustomerInfos, CustomerPhoto } from './style';
import logo from '../../assets/logo-furia.svg';
import { useNavigate } from 'react-router-dom';
import signUpService from '../../services/signup';

const Navbar: React.FC = () => {
  const [user, setUser] = React.useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
        try {
            const response = await signUpService.findOne();
            console.log(response.data);
            setUser(response.data);
          } catch (error) {
            console.error("Erro ao buscar usuário:", error);
          }
    };

    fetchUser();
  }, []);

  return (
    <Container>
     <LogoContainer onClick={() => navigate('/')} onMouseOver={(e) => e.currentTarget.style.cursor = 'pointer'}>
        <h1>Esportify</h1>
      </LogoContainer>
      <LogoPhoto>
          <img src={logo} alt="Company Logo" />
        </LogoPhoto>
      <CustomerInfos>
        <CustomerPhoto>
          <img src={'https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png'} alt="Customer" />
        </CustomerPhoto>
            <p>Olá, <span>{user && user?.name}</span></p>
            <p>Pontos: <span style={{ color: 'green' }}>{user && user?.score}</span></p>
      </CustomerInfos>
    </Container>
  );
}

export default Navbar;