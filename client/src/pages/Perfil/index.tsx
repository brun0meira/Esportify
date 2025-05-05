import React, { useEffect, useRef, useState } from 'react';
import { Container, ContentContainer, HeaderContent, Section, SectionTitle, UserInfo, Label, Value, ContainerCards, UploadInput, Message, ContainerForm, LabelPhoto, InputFormsPhoto,ContainerFormNd} from './style';
import Navbar from '../../components/Navbar';
import SideBar from '../../components/SideBar';
import CheckIcon from '@mui/icons-material/Check';
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';
import Button from '../../components/Button';
import signUpService from '../../services/signup';
import toast from 'react-hot-toast';

const Perfil: React.FC = () => {
    const [fileUploaded, setFileUploaded] = useState<boolean>(false);
    const [fileUploadedNd, setFileUploadedNd] = useState<boolean>(false);

    const [user, setUser] = React.useState<any>(null);

    const [selectedFile, setSelectedFile] = useState<File | null | undefined>(null);
    const [rgBack, setRgBack] = useState<File | null | undefined>(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await signUpService.findOne();
                console.log("PORRA"+response.data);
                setUser(response.data);
              } catch (error) {
                console.error("Erro ao buscar usuário:", error);
              }
        };
    
        fetchUser();
      }, []);

    const validateImages = async (event: React.FormEvent) => {
        event.preventDefault();
    
        try {
            const responsePromise = signUpService.validateDocs(selectedFile, rgBack);

            toast.promise(responsePromise, {
                loading: 'Validando seu Documento...',
                success: 'Documento Validado com Sucesso!',
                error: 'Erro ao Validar Documento!',
            });

            const response = await responsePromise;
        } catch (error) {
            console.error('Login error:', error);
        }
      };


    const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files ? event.target.files[0] : null;
        if (selectedFile) {
            setFileUploaded(true);
            setSelectedFile(selectedFile);
        } else {
            setFileUploaded(false);
            setSelectedFile(null);
        }
    };

    const handlePhotoChangeNd = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files ? event.target.files[0] : null;
        if (selectedFile) {
            console.log("PORAA")
            setFileUploadedNd(true);
            setRgBack(selectedFile);
        } else {
            setFileUploadedNd(false);
            setRgBack(null);
        }
    };

  return (
    <Container>
        <Navbar />
        <SideBar />
        <ContentContainer>
            <HeaderContent>
              <h1>Conteúdos Exclusivos para os <span>Fãs</span> Mais Fieis</h1>
              <h2>Conecte suas redes sociais, interaja com a comunidade ou aposte nos seus jogos favoritos para acumular pontos e trocar por recompensas únicas da Nação FURIA!</h2>
            </HeaderContent>
            <ContainerCards>
                <Section>
                    <SectionTitle>Perfil do Usuário</SectionTitle>
                    <UserInfo><Label>Nome:</Label> <Value>{user && user?.name}</Value></UserInfo>
                    <UserInfo><Label>Email:</Label> <Value>{user && user?.email}</Value></UserInfo>
                    <UserInfo><Label>CPF:</Label> <Value>{user && user?.cpf}</Value></UserInfo>
                    <UserInfo><Label>RG:</Label> <Value>{user && user?.rg}</Value></UserInfo>
                    <UserInfo><Label>Endereço:</Label> <Value>{user && user?.address}</Value></UserInfo>
                    <UserInfo><Label>Interesses:</Label> <Value>{user && user?.interests.join(', ')}</Value></UserInfo>
                </Section>
                <Section>
                    <SectionTitle>Validação de Identidade</SectionTitle>
                    <form onSubmit={validateImages}>
                        <ContainerForm>
                            <label>Envie a foto da frente do RG:</label>
                            <LabelPhoto htmlFor="photo">
                                {fileUploaded ? (
                                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                        <CheckIcon sx={{ marginRight: '5px', color: 'black' }} />
                                        Imagem Selecionada
                                    </div>
                                ) : (
                                    'Selecione a Imagem'
                                )}
                            </LabelPhoto>
                            <InputFormsPhoto type="file" accept="image/*" name="photo" id="photo" placeholder='' onChange={handlePhotoChange} required></InputFormsPhoto>
                        </ContainerForm>
                        <ContainerFormNd>
                            <label>Envie a foto do verso do RG:</label>
                            <LabelPhoto htmlFor="photond">
                                {fileUploadedNd ? (
                                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                        <CheckIcon sx={{ marginRight: '5px', color: 'black' }} />
                                        Imagem Selecionada
                                    </div>
                                ) : (
                                    'Selecione a Imagem'
                                )}
                            </LabelPhoto>
                            <InputFormsPhoto type="file" accept="image/*" name="photond" id="photond" placeholder='' onChange={handlePhotoChangeNd} required></InputFormsPhoto>
                        </ContainerFormNd>
                        <Button type="submit" style={{ marginTop: '20px' }} icon={<DocumentScannerIcon />}>
                        Enviar para Validação
                        </Button>
                    </form>
                </Section>
            </ContainerCards>
        </ContentContainer>
    </Container>
  );
}

export default Perfil;