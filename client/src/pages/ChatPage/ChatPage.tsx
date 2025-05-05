import { LiveMatchChat } from '../../components/LiveMatchChat';
import { Container, ContentContainer} from './style';
import Navbar from '../../components/Navbar';
import SideBar from '../../components/SideBar';

const ChatPage: React.FC = () => {  
  return (
    <Container>
        <Navbar />
        <SideBar />
        <ContentContainer>
          <LiveMatchChat />
        </ContentContainer>
    </Container>
  );
}

export default ChatPage;